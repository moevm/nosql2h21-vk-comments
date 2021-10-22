import vk_api
import os
import json
from collections import deque
import datetime as dt
from tqdm import tqdm

GROUPS_COUNT = 1
POSTS_COUNT = 100

_MAX_COUNT = 4

groups_file = open("groups.json", "w")
comments_file = open("comments.json", "w")
users_file = open("users.json", "w")


def add_user(user_id):
    if users.get(user_id) is None:
        user = vk.users.get(user_ids=str(user_id), fields='city,home_town,bdate')[0]
        try:
            friends = vk.friends.get(user_id=user_id)["items"]
        except vk_api.ApiError as e:
            if e.code == 30:
                friends = []
            else:
                raise e

        users[user_id] = {
            "_id": user_id,
            "first_name": user["first_name"],
            "last_name": user["last_name"],
            "friends": friends
        }

        try:
            birthdate = dt.datetime.strptime(user["bdate"], "%d.%m.%Y").isoformat() + 'Z'
        except (ValueError, KeyError):
            birthdate = None
        if birthdate:
            users[user_id]["birthdate"] = birthdate

        town = None
        if user.get("city"):
            town = user["city"]["title"]
        elif user.get("home_town"):
            town = user.get("home_town")
        if town:
            users[user_id]["town"] = town

        users_file.write(json.dumps(users[user_id]) + '\n')


def add_comment(comment):
    from_id = comment["from_id"]
    if users.get(from_id) is None:
        add_user(from_id)
    if comment["likes"]["count"] > 0:
        likes = vk.likes.getList(type="comment", owner_id=comment["owner_id"], item_id=comment["id"])["items"]
    else:
        likes = []
    db_comment = {
        "_id": comment["id"],
        "user": {
            "_id": from_id,
            "first_name": users[from_id]["first_name"],
            "last_name": users[from_id]["last_name"]
        },
        "group": {
            "_id": -comment["owner_id"],
            "title": groups[-comment["owner_id"]]["title"]
        },
        "text": comment["text"],
        "time": {"$date": dt.datetime.fromtimestamp(comment["date"]).isoformat() + 'Z'},
        "likes": likes
    }
    if len(groups_deque) + visited_groups_count < GROUPS_COUNT:
        current_user_groups_ids = vk.groups.get()["items"]
        groups_deque.extendleft(current_user_groups_ids)
    comments_file.write(json.dumps(db_comment) + '\n')


def proceed_comment(comment):
    from_id = comment["from_id"]
    if from_id <= 0 or comment.get("deleted", False):
        return
    add_comment(comment)
    if comment.get("thread") and comment["thread"]["count"] > 0:
        thread_comments = vk_api.VkTools(vk).get_all_iter("wall.getComments", max_count=_MAX_COUNT, values={
            "owner_id": comment["owner_id"],
            "post_id": comment["post_id"],
            "comment_id": comment["id"],
            "need_likes": 1
        })
        for tc in thread_comments:
            proceed_comment(tc)


def auth_handler():
    return input('Enter auth code: '), True


print('Authorization...')
vk_session = vk_api.VkApi(os.environ["LOGIN"],
                          os.environ["PASSWORD"],
                          auth_handler=auth_handler,
                          app_id=int(os.environ["APP_ID"]))

try:
    vk_session.auth()
except vk_api.AuthError as error_msg:
    print(error_msg)
    exit(1)
print('Authorisation ended')

vk = vk_session.get_api()

current_user_groups_ids = vk.groups.get()["items"]
groups_deque = deque()

groups_deque.extendleft(current_user_groups_ids)
visited_groups_count = 0

groups = {}
comments = {}
users = {}

with tqdm(total=GROUPS_COUNT) as groups_bar:
    while visited_groups_count < GROUPS_COUNT:
        current_group = groups_deque.pop()
        if groups.get(current_group) is not None:
            continue

        group = vk.groups.getById(group_id=current_group, fields='members_count')[0]
        db_group = {
            "_id": group["id"],
            "title": group["name"],
            "users_count": group["members_count"]
        }
        groups[group["id"]] = db_group

        posts = vk_api.VkTools(vk).get_all_iter('wall.get', max_count=_MAX_COUNT, values={
            "owner_id": -current_group
        }, limit=POSTS_COUNT)

        with tqdm(total=POSTS_COUNT) as post_bar:
            for post in posts:

                comments = vk_api.VkTools(vk).get_all_iter('wall.getComments', max_count=_MAX_COUNT, values={
                    "owner_id": -current_group,
                    "post_id": post["id"],
                    "need_likes": 1
                })

                for comment in tqdm(comments):
                    proceed_comment(comment)

                post_bar.update(1)

        json_group = json.dumps(db_group) + '\n'
        groups_file.write(json_group)

        visited_groups_count += 1
        groups_bar.update(1)
