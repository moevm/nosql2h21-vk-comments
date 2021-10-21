import vk_api
import os
import json
from collections import deque
import datetime as dt

GROUPS_COUNT = 1
POSTS_COUNT = 100
groups_file = open("groups.json", "w")
comments_file = open("comments.json", "w")
users_file = open("users.json", "w")


def add_user(user_id):
    if user_id not in visited_users_id:
        user = vk.users.get(user_ids=str(user_id), fields='city,home_town,bdate')[0]
        try:
            friends = vk.friends.get(user_id=user_id)["items"]
        except vk_api.ApiError as e:
            if e.code == 30:
                friends = []
            else:
                raise e
        try:
            birthdate = dt.datetime.strptime(user["bdate"], "%d.%m.%Y").isoformat()+'Z'
        except ValueError:
            birthdate = None
        users[user_id] = {
            "_id": user_id,
            "first_name": user["first_name"],
            "last_name": user["last_name"],
            "town": user.get("city") or user.get("home_town"),
            "friends": friends
        }
        if birthdate:
            users[user_id]["birthdate"] = birthdate
        users_file.write(json.dumps(users[user_id])+'\n')


def add_comment(comment):
    print(comment)
    from_id = comment["from_id"]
    if from_id < 0:
        return
    if not users.get(from_id):
        add_user(from_id)
    likes = vk.likes.getList(type="comment", owner_id=comment["owner_id"], item_id=comment["id"])
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
        "time": {"$date": dt.datetime.fromtimestamp(comment["date"]).isoformat()+'Z'},
        "likes": likes["items"]
    }
    if len(groups_deque) + visited_groups_len < GROUPS_COUNT:
        current_user_groups_ids = vk.groups.get()["items"]
        groups_deque.extend(current_user_groups_ids)
    comments_file.write(json.dumps(db_comment)+'\n')


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

visited_groups_id = set()
visited_users_id = set()

visited_groups_len = 0

groups = {}
comments = {}
users = {}

while visited_groups_len < GROUPS_COUNT:
    current_group = groups_deque.pop()
    if current_group in visited_groups_id:
        continue

    group = vk.groups.getById(group_id=current_group, fields='members_count')[0]
    db_group = {
        "_id": group["id"],
        "title": group["name"],
        "users_count": group["members_count"]
    }
    groups[group["id"]] = db_group

    #TODO: limits and offset
    posts = vk.wall.get(owner_id=-current_group)
    for post in posts["items"]:
        comments = vk.wall.getComments(owner_id=-current_group, post_id=post["id"], need_likes=1)
        for comment in comments["items"]:
            add_comment(comment)
            # break
        break

    json_group = json.dumps(db_group)+'\n'
    groups_file.write(json_group)

    visited_groups_len += 1
    visited_groups_id.add(current_group)