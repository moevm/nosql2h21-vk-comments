import vk_api
import os
import json
from collections import deque

GROUPS_COUNT = 1
POSTS_COUNT = 100
groups_file = open("groups.json", "w")

def auth_handler():
    return input('Enter auth code: '), True


print('Authorization...')
vk_session = vk_api.VkApi(os.environ["LOGIN"],
                          os.environ["PASSWORD"],
                          auth_handler=auth_handler,
                          app_id=os.environ["APP_ID"])

try:
    vk_session.auth()
except vk_api.AuthError as error_msg:
    print(error_msg)
    exit(1)
print('Authorisation ended')

vk = vk_session.get_api()

current_user_groups_id = vk.groups.get()["items"]
groups_deque = deque()

groups_deque.extendleft(current_user_groups_id)

visited_groups_id = set()
visited_users_id = set()

visited_groups_len = 0

groups = []
comments = []
users = []

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

    json_group = json.dumps(db_group)+'\n'
    groups_file.write(json_group)

    visited_groups_len += 1
    visited_groups_id.add(current_group)