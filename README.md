![Screenshot (363)](https://github.com/Sourav9063/twitter-clone/assets/53114581/14af486a-42c8-4b60-a591-a703d83867ef)# twitter-clone
# Screens

![Screenshot (379)](https://github.com/Sourav9063/twitter-clone/assets/53114581/1551206f-6558-4d82-8dde-af2436c10303)
![Screenshot (374)](https://github.com/Sourav9063/twitter-clone/assets/53114581/282c78af-70db-4e48-94e8-fe939d3fc7f5)
![Screenshot (253)](https://github.com/Sourav9063/twitter-clone/assets/53114581/5f38dfd5-82ac-40fe-900d-a9763fffd163)
![Screenshot (249)](https://github.com/Sourav9063/twitter-clone/assets/53114581/7cce2bb7-022e-447b-9218-66ee9762b062)
![Screenshot (270)](https://github.com/Sourav9063/twitter-clone/assets/53114581/2b438c7a-f4de-4d26-8d03-1ba6ae1a66f2)
![Screenshot (273)](https://github.com/Sourav9063/twitter-clone/assets/53114581/973d0955-e88a-4e00-82f2-4971fbe8863c)
![Screenshot (274)](https://github.com/Sourav9063/twitter-clone/assets/53114581/2ac457b8-7ecb-445d-812c-4efd5c2cc61f)
![Screenshot (293)](https://github.com/Sourav9063/twitter-clone/assets/53114581/861711a1-a9b2-488b-9a2d-6d20b9525fa6)
![Screenshot (306)](https://github.com/Sourav9063/twitter-clone/assets/53114581/6c421765-fbdb-4936-bc0c-4371a07b524b)
![Screenshot (321)](https://github.com/Sourav9063/twitter-clone/assets/53114581/88fb72aa-771e-4c0c-961e-f1f67860998c)
![Screenshot (327)](https://github.com/Sourav9063/twitter-clone/assets/53114581/7c8bc40a-9d81-4ea7-8f43-b9b3d5ba4a3a)
![Screenshot (328)](https://github.com/Sourav9063/twitter-clone/assets/53114581/925079ba-1a2c-4e04-9d87-a15a65300438)
![Screenshot (368)](https://github.com/Sourav9063/twitter-clone/assets/53114581/afb70b07-ff65-49f0-8acc-e8aa68fcd9e7)
![Screenshot (329)](https://github.com/Sourav9063/twitter-clone/assets/53114581/d8062c6c-2475-4447-ae5b-acc8800deaf4)
![Screenshot (330)](https://github.com/Sourav9063/twitter-clone/assets/53114581/8fa306cd-9626-481d-9fdc-bcd3fab6d4ca)
![Screenshot (343)](https://github.com/Sourav9063/twitter-clone/assets/53114581/c916103e-730f-45f0-9808-1828fed25b00)
![Screenshot (340)](https://github.com/Sourav9063/twitter-clone/assets/53114581/4e93a7fb-8fd4-4bbd-8f27-e696995f7fac)
![Screenshot (356)](https://github.com/Sourav9063/twitter-clone/assets/53114581/96b2ec4e-8449-4170-bb20-0ffddae280f3)
![Screenshot (356)](https://github.com/Sourav9063/twitter-clone/assets/53114581/b46f306e-a8a2-418a-bb70-e2077dfca217)

![Screenshot (355)](https://github.com/Sourav9063/twitter-clone/assets/53114581/3087a4ac-7f28-4843-9445-8e0dde0a5378)

![Screenshot (363)](https://github.com/Sourav9063/twitter-clone/assets/53114581/a154135f-b4c5-42d5-b28c-f3d7348895dd)

![Screenshot (366)](https://github.com/Sourav9063/twitter-clone/assets/53114581/0146f8e2-5449-4f75-b8f5-efd7cd437de8)

## Indices

- [Comments](#comments)

  - [delete reply or comment](#1-delete-reply-or-comment)
  - [get Comments](#2-get-comments)
  - [get Reply](#3-get-reply)

- [Message](#message)

  - [delete Message](#1-delete-message)
  - [get Message List](#2-get-message-list)
  - [get Messages with one user](#3-get-messages-with-one-user)
  - [get unseen list](#4-get-unseen-list)
  - [post message](#5-post-message)

- [Retweet](#retweet)

  - [post Retweet](#1-post-retweet)

- [User](#user)

  - [delete token](#1-delete--token)
  - [get notification](#2-get-notification)
  - [get user by email or id](#3-get-user-by-email-or-id)
  - [patch token](#4-patch-token)
  - [post Check verifiation code](#5-post-check-verifiation-code)
  - [post email verification code](#6-post-email-verification-code)
  - [signup](#7-signup)

- [tweet](#tweet)

  - [delete tweet](#1-delete-tweet)
  - [get tweet by id](#2-get-tweet-by-id)
  - [get tweets](#3-get-tweets)
  - [patch tweet](#4-patch-tweet)
  - [post Like and unlike tweet](#5-post-like-and-unlike-tweet)
  - [post tweet](#6-post-tweet)

---

## Comments

### 1. delete reply or comment

**_Endpoint:_**

```bash
Method: DELETE
Type:
URL: http://localhost:3000/api/v2/comments/645c77883b53a43f28c62051
```

**_More example Requests/Responses:_**

##### I. Example Request: delete reply or Comment success

##### I. Example Response: delete reply or Comment success

```js
{
    "msg": "Comment deleted"
}
```

**_Status Code:_** 200

<br>

##### II. Example Request: delete Reply or comment Not authorize

##### II. Example Response: delete Reply or comment Not authorize

```js
{
    "msg": "Not authorized"
}
```

**_Status Code:_** 401

<br>

##### III. Example Request: delete reply or comment not found

##### III. Example Response: delete reply or comment not found

```js
{
    "msg": "Internal server error",
    "error": {}
}
```

**_Status Code:_** 500

<br>

### 2. get Comments

**_Endpoint:_**

```bash
Method: GET
Type:
URL: http://localhost:3000/api/v2/comments/643cff131335c25599b50299
```

**_More example Requests/Responses:_**

##### I. Example Request: get comments success

##### I. Example Response: get comments success

```js
{
    "msg": "Success",
    "comment": {
        "_id": "645c775f3b53a43f28c62034",
        "owner": {
            "_id": "645b89d45b0bc1d9a10bf9ed",
            "email": "sourav.shellbeehaken@gmail.com",
            "username": "sourav",
            "image": "/images/profiles/45b414fa9582a48599ecd8d02.jpeg"
        },
        "tweetImage": null,
        "tweetImages": [],
        "tweetText": "Nice kotha",
        "likes": 0,
        "likedBy": [],
        "likedByHashMap": {},
        "retweets": 0,
        "retweetedBy": [],
        "retweetedByHashMap": {},
        "comments": 2,
        "commentsList": [
            {
                "_id": "645c77883b53a43f28c62051",
                "owner": {
                    "_id": "645b89d45b0bc1d9a10bf9ed",
                    "email": "sourav.shellbeehaken@gmail.com",
                    "username": "sourav",
                    "image": "/images/profiles/45b414fa9582a48599ecd8d02.jpeg"
                },
                "tweetImages": [],
                "tweetText": "comment 2",
                "likes": 0,
                "likedBy": [],
                "likedByHashMap": {},
                "retweets": 0,
                "retweetedBy": [],
                "retweetedByHashMap": {},
                "comments": 0,
                "commentsList": [],
                "commentByHashMap": {},
                "type": "comment",
                "head": "645c775f3b53a43f28c62034",
                "nodes": [],
                "createdAt": "2023-05-11T05:05:12.060Z",
                "updatedAt": "2023-05-11T05:05:12.060Z",
                "__v": 0
            },
            {
                "_id": "645c776b3b53a43f28c6203e",
                "owner": {
                    "_id": "645b89d45b0bc1d9a10bf9ed",
                    "email": "sourav.shellbeehaken@gmail.com",
                    "username": "sourav",
                    "image": "/images/profiles/45b414fa9582a48599ecd8d02.jpeg"
                },
                "tweetImages": [],
                "tweetText": "Normal ??",
                "likes": 0,
                "likedBy": [],
                "likedByHashMap": {},
                "retweets": 0,
                "retweetedBy": [],
                "retweetedByHashMap": {},
                "comments": 2,
                "commentsList": [
                    "645c77703b53a43f28c62047",
                    "645c77763b53a43f28c6204c"
                ],
                "commentByHashMap": {
                    "645b89d45b0bc1d9a10bf9ed": true
                },
                "type": "comment",
                "head": "645c775f3b53a43f28c62034",
                "nodes": [
                    "645c77703b53a43f28c62047",
                    "645c77763b53a43f28c6204c"
                ],
                "createdAt": "2023-05-11T05:04:43.013Z",
                "updatedAt": "2023-05-11T05:04:54.748Z",
                "__v": 0
            }
        ],
        "commentByHashMap": {
            "645b89d45b0bc1d9a10bf9ed": true
        },
        "type": "tweet",
        "nodes": [
            "645c776b3b53a43f28c6203e",
            "645c77883b53a43f28c62051"
        ],
        "createdAt": "2023-05-11T05:04:31.006Z",
        "updatedAt": "2023-05-11T05:05:12.163Z",
        "__v": 0
    }
}
```

**_Status Code:_** 201

<br>

### 3. get Reply

**_Endpoint:_**

```bash
Method: GET
Type:
URL: http://localhost:3000/api/v2/comments/645c775f3b53a43f28c62034
```

**_More example Requests/Responses:_**

##### I. Example Request: get comments success

##### I. Example Response: get comments success

```js
{
    "msg": "Success",
    "comment": {
        "_id": "645c775f3b53a43f28c62034",
        "owner": {
            "_id": "645b89d45b0bc1d9a10bf9ed",
            "email": "sourav.shellbeehaken@gmail.com",
            "username": "sourav",
            "image": "/images/profiles/45b414fa9582a48599ecd8d02.jpeg"
        },
        "tweetImage": null,
        "tweetImages": [],
        "tweetText": "Nice kotha",
        "likes": 0,
        "likedBy": [],
        "likedByHashMap": {},
        "retweets": 0,
        "retweetedBy": [],
        "retweetedByHashMap": {},
        "comments": 2,
        "commentsList": [
            {
                "_id": "645c77883b53a43f28c62051",
                "owner": {
                    "_id": "645b89d45b0bc1d9a10bf9ed",
                    "email": "sourav.shellbeehaken@gmail.com",
                    "username": "sourav",
                    "image": "/images/profiles/45b414fa9582a48599ecd8d02.jpeg"
                },
                "tweetImages": [],
                "tweetText": "comment 2",
                "likes": 0,
                "likedBy": [],
                "likedByHashMap": {},
                "retweets": 0,
                "retweetedBy": [],
                "retweetedByHashMap": {},
                "comments": 0,
                "commentsList": [],
                "commentByHashMap": {},
                "type": "comment",
                "head": "645c775f3b53a43f28c62034",
                "nodes": [],
                "createdAt": "2023-05-11T05:05:12.060Z",
                "updatedAt": "2023-05-11T05:05:12.060Z",
                "__v": 0
            },
            {
                "_id": "645c776b3b53a43f28c6203e",
                "owner": {
                    "_id": "645b89d45b0bc1d9a10bf9ed",
                    "email": "sourav.shellbeehaken@gmail.com",
                    "username": "sourav",
                    "image": "/images/profiles/45b414fa9582a48599ecd8d02.jpeg"
                },
                "tweetImages": [],
                "tweetText": "Normal ??",
                "likes": 0,
                "likedBy": [],
                "likedByHashMap": {},
                "retweets": 0,
                "retweetedBy": [],
                "retweetedByHashMap": {},
                "comments": 2,
                "commentsList": [
                    "645c77703b53a43f28c62047",
                    "645c77763b53a43f28c6204c"
                ],
                "commentByHashMap": {
                    "645b89d45b0bc1d9a10bf9ed": true
                },
                "type": "comment",
                "head": "645c775f3b53a43f28c62034",
                "nodes": [
                    "645c77703b53a43f28c62047",
                    "645c77763b53a43f28c6204c"
                ],
                "createdAt": "2023-05-11T05:04:43.013Z",
                "updatedAt": "2023-05-11T05:04:54.748Z",
                "__v": 0
            }
        ],
        "commentByHashMap": {
            "645b89d45b0bc1d9a10bf9ed": true
        },
        "type": "tweet",
        "nodes": [
            "645c776b3b53a43f28c6203e",
            "645c77883b53a43f28c62051"
        ],
        "createdAt": "2023-05-11T05:04:31.006Z",
        "updatedAt": "2023-05-11T05:05:12.163Z",
        "__v": 0
    }
}
```

**_Status Code:_** 201

<br>

##### II. Example Request: get Reply Success

##### II. Example Response: get Reply Success

```js
{
    "msg": "Success",
    "comment": {
        "_id": "645c775f3b53a43f28c62034",
        "owner": {
            "_id": "645b89d45b0bc1d9a10bf9ed",
            "email": "sourav.shellbeehaken@gmail.com",
            "username": "sourav",
            "image": "/images/profiles/45b414fa9582a48599ecd8d02.jpeg"
        },
        "tweetImage": null,
        "tweetImages": [],
        "tweetText": "Nice kotha",
        "likes": 0,
        "likedBy": [],
        "likedByHashMap": {},
        "retweets": 0,
        "retweetedBy": [],
        "retweetedByHashMap": {},
        "comments": 2,
        "commentsList": [
            {
                "_id": "645c77883b53a43f28c62051",
                "owner": {
                    "_id": "645b89d45b0bc1d9a10bf9ed",
                    "email": "sourav.shellbeehaken@gmail.com",
                    "username": "sourav",
                    "image": "/images/profiles/45b414fa9582a48599ecd8d02.jpeg"
                },
                "tweetImages": [],
                "tweetText": "comment 2",
                "likes": 0,
                "likedBy": [],
                "likedByHashMap": {},
                "retweets": 0,
                "retweetedBy": [],
                "retweetedByHashMap": {},
                "comments": 0,
                "commentsList": [],
                "commentByHashMap": {},
                "type": "comment",
                "head": "645c775f3b53a43f28c62034",
                "nodes": [],
                "createdAt": "2023-05-11T05:05:12.060Z",
                "updatedAt": "2023-05-11T05:05:12.060Z",
                "__v": 0
            },
            {
                "_id": "645c776b3b53a43f28c6203e",
                "owner": {
                    "_id": "645b89d45b0bc1d9a10bf9ed",
                    "email": "sourav.shellbeehaken@gmail.com",
                    "username": "sourav",
                    "image": "/images/profiles/45b414fa9582a48599ecd8d02.jpeg"
                },
                "tweetImages": [],
                "tweetText": "Normal ??",
                "likes": 0,
                "likedBy": [],
                "likedByHashMap": {},
                "retweets": 0,
                "retweetedBy": [],
                "retweetedByHashMap": {},
                "comments": 2,
                "commentsList": [
                    "645c77703b53a43f28c62047",
                    "645c77763b53a43f28c6204c"
                ],
                "commentByHashMap": {
                    "645b89d45b0bc1d9a10bf9ed": true
                },
                "type": "comment",
                "head": "645c775f3b53a43f28c62034",
                "nodes": [
                    "645c77703b53a43f28c62047",
                    "645c77763b53a43f28c6204c"
                ],
                "createdAt": "2023-05-11T05:04:43.013Z",
                "updatedAt": "2023-05-11T05:04:54.748Z",
                "__v": 0
            }
        ],
        "commentByHashMap": {
            "645b89d45b0bc1d9a10bf9ed": true
        },
        "type": "tweet",
        "nodes": [
            "645c776b3b53a43f28c6203e",
            "645c77883b53a43f28c62051"
        ],
        "createdAt": "2023-05-11T05:04:31.006Z",
        "updatedAt": "2023-05-11T05:05:12.163Z",
        "__v": 0
    }
}
```

**_Status Code:_** 201

<br>

## Message

### 1. delete Message

**_Endpoint:_**

```bash
Method: DELETE
Type:
URL: http://localhost:3000/api/v2/users/getNotification
```

**_Query params:_**

| Key    | Value                    | Description |
| ------ | ------------------------ | ----------- |
| id     | 642f7cdd8d1cecb1945c6537 |             |
| sender | 642e6248e538c6d0b0a11601 |             |

### 2. get Message List

**_Endpoint:_**

```bash
Method: GET
Type:
URL: http://localhost:3000/api/v2/users/getMessages
```

**_Query params:_**

| Key | Value                    | Description |
| --- | ------------------------ | ----------- |
| id  | 645b89d45b0bc1d9a10bf9ed |             |

**_More example Requests/Responses:_**

##### I. Example Request: get Message List Success

**_Query:_**

| Key | Value                    | Description |
| --- | ------------------------ | ----------- |
| id  | 645b89d45b0bc1d9a10bf9ed |             |

##### I. Example Response: get Message List Success

```js
{
    "msg": "Success",
    "users": {
        "_id": "645b89d45b0bc1d9a10bf9ed",
        "messages": [
            {
                "sender": "643cf9ec28271f6cc91b53e7",
                "chatID": "645c63763b53a43f28c61f78",
                "cus_id": "645b89d45b0bc1d9a10bf9ed643cf9ec28271f6cc91b53e7",
                "username": "Edge",
                "email": "edge@gmail.com",
                "image": "https://api.dicebear.com/5.x/thumbs/svg?radius=50",
                "_id": "645c63763b53a43f28c61f7b"
            },
            {
                "sender": "64326d06498c08c135977357",
                "chatID": "645c923e3b53a43f28c62f21",
                "cus_id": "645b89d45b0bc1d9a10bf9ed64326d06498c08c135977357",
                "username": "Sourav Ahmed",
                "email": "sourav.ahmed5654@gmail.com",
                "image": "/images/profiles/45b414fa9582a48599ecd8d01.aee7abddddb9c68b52c5.png",
                "_id": "645c923e3b53a43f28c62f24"
            },
            {
                "sender": "645b89d45b0bc1d9a10bf9ed",
                "chatID": "645c92c33b53a43f28c62fe2",
                "cus_id": "645b89d45b0bc1d9a10bf9ed645b89d45b0bc1d9a10bf9ed",
                "username": "Sourav SBH",
                "email": "sourav.shellbeehaken@gmail.com",
                "image": "/images/profiles/324f64b501d16214b66d3d102.aee7abddddb9c68b52c5.png",
                "_id": "645c92c33b53a43f28c62fe5"
            },
            {
                "sender": "642f7cdd8d1cecb1945c6536",
                "chatID": "645c93c93b53a43f28c6311b",
                "cus_id": "645b89d45b0bc1d9a10bf9ed642f7cdd8d1cecb1945c6536",
                "username": "Username",
                "email": "sourav0123@gmail.com",
                "image": "/images/profiles/07fd1843e9997ac08f09ead14.aee7abddddb9c68b52c5.png",
                "_id": "645c93c93b53a43f28c6311e"
            },
            {
                "sender": "64363dfc356c5a8aa8fa494e",
                "chatID": "645c960a3b53a43f28c631a3",
                "cus_id": "645b89d45b0bc1d9a10bf9ed64363dfc356c5a8aa8fa494e",
                "username": "test user",
                "email": "user@gmail.com",
                "image": "https://api.dicebear.com/5.x/thumbs/svg?radius=50",
                "_id": "645c960a3b53a43f28c631a6"
            },
            {
                "sender": "642e6154e538c6d0b0a115ca",
                "chatID": "645c964a3b53a43f28c6323a",
                "cus_id": "645b89d45b0bc1d9a10bf9ed642e6154e538c6d0b0a115ca",
                "username": "testing",
                "email": "sourav112@gmail.com",
                "image": "/images/profiles/9177deb3dbe13dff3e3b0a408.png",
                "_id": "645c964a3b53a43f28c6323d"
            },
            {
                "sender": "64522fabf7edf3e77684b781",
                "chatID": "645c966c3b53a43f28c632e7",
                "cus_id": "645b89d45b0bc1d9a10bf9ed64522fabf7edf3e77684b781",
                "username": "sourav",
                "email": "1234567@gmail.com",
                "image": "https://api.dicebear.com/5.x/thumbs/svg?radius=50",
                "_id": "645c966c3b53a43f28c632ea"
            }
        ]
    }
}
```

**_Status Code:_** 200

<br>

##### II. Example Request: get Message List Not authorize

**_Query:_**

| Key | Value                    | Description |
| --- | ------------------------ | ----------- |
| id  | 645b89d45b0bc1d9a10bf9ed |             |

##### II. Example Response: get Message List Not authorize

```js
{
    "msg": "Not authorize",
    "users": {}
}
```

**_Status Code:_** 401

<br>

### 3. get Messages with one user

**_Endpoint:_**

```bash
Method: GET
Type:
URL: http://localhost:3000/api/v2/messages
```

**_Query params:_**

| Key        | Value                    | Description |
| ---------- | ------------------------ | ----------- |
| senderId   | 645b89d45b0bc1d9a10bf9ed |             |
| receiverId | 643cf9ec28271f6cc91b53e7 |             |

**_More example Requests/Responses:_**

##### I. Example Request: get Messages with one user Success

**_Query:_**

| Key        | Value                    | Description |
| ---------- | ------------------------ | ----------- |
| senderId   | 643cf9ec28271f6cc91b53e7 |             |
| receiverId | 64363dfc356c5a8aa8fa494e |             |

##### I. Example Response: get Messages with one user Success

```js
{
    "_id": "644bad9ad9172f7cad7ba8dc",
    "messages": [
        {
            "sender": "64363dfc356c5a8aa8fa494e",
            "receiver": "643cf9ec28271f6cc91b53e7",
            "body": "Onek kaj korechiiii",
            "react": "none",
            "seen": false,
            "_id": "644bad9ad9172f7cad7ba8dd",
            "createdAt": "2023-04-28T11:27:22.583Z"
        },
        {
            "sender": "64363dfc356c5a8aa8fa494e",
            "receiver": "643cf9ec28271f6cc91b53e7",
            "body": "Yo Yo Yoo",
            "react": "none",
            "seen": false,
            "_id": "644bada0d9172f7cad7ba8ee",
            "createdAt": "2023-04-28T11:27:28.424Z"
        },
        {
            "sender": "643cf9ec28271f6cc91b53e7",
            "receiver": "64363dfc356c5a8aa8fa494e",
            "body": "reply",
            "react": "none",
            "seen": false,
            "_id": "644bae40d9172f7cad7baa6c",
            "createdAt": "2023-04-28T11:30:08.256Z"
        },
        {
            "sender": "64363dfc356c5a8aa8fa494e",
            "receiver": "643cf9ec28271f6cc91b53e7",
            "body": "from firefox",
            "react": "none",
            "seen": false,
            "_id": "644baf4fd9172f7cad7bacf3",
            "createdAt": "2023-04-28T11:34:39.938Z"
        },
        {
            "cus_id": "643cf9ec28271f6cc91b53e764363dfc356c5a8aa8fa494e",
            "sender": "643cf9ec28271f6cc91b53e7",
            "receiver": "64363dfc356c5a8aa8fa494e",
            "body": "hiii",
            "react": "none",
            "seen": false,
            "_id": "6451e8c8f7edf3e77684a9fb",
            "createdAt": "2023-05-03T04:53:28.070Z"
        },
        {
            "cus_id": "643cf9ec28271f6cc91b53e764363dfc356c5a8aa8fa494e",
            "sender": "64363dfc356c5a8aa8fa494e",
            "receiver": "643cf9ec28271f6cc91b53e7",
            "body": "Hiiiiii",
            "react": "none",
            "seen": false,
            "_id": "6451e8db573d43ea6e13bb8d",
            "createdAt": "2023-05-03T04:53:47.016Z"
        },
        {
            "cus_id": "643cf9ec28271f6cc91b53e764363dfc356c5a8aa8fa494e",
            "sender": "643cf9ec28271f6cc91b53e7",
            "receiver": "64363dfc356c5a8aa8fa494e",
            "body": "oiii",
            "react": "none",
            "seen": false,
            "_id": "6451e9d2f7edf3e77684aa24",
            "createdAt": "2023-05-03T04:57:54.993Z"
        },
        {
            "cus_id": "643cf9ec28271f6cc91b53e764363dfc356c5a8aa8fa494e",
            "sender": "64363dfc356c5a8aa8fa494e",
            "receiver": "643cf9ec28271f6cc91b53e7",
            "body": "oiii",
            "react": "none",
            "seen": false,
            "_id": "6451e9f7573d43ea6e13bc8a",
            "createdAt": "2023-05-03T04:58:31.708Z"
        },
        {
            "cus_id": "643cf9ec28271f6cc91b53e764363dfc356c5a8aa8fa494e",
            "sender": "643cf9ec28271f6cc91b53e7",
            "receiver": "64363dfc356c5a8aa8fa494e",
            "body": "Hii",
            "react": "none",
            "seen": false,
            "_id": "6451ea1af7edf3e77684aa59",
            "createdAt": "2023-05-03T04:59:06.964Z"
        },
        {
            "cus_id": "643cf9ec28271f6cc91b53e764363dfc356c5a8aa8fa494e",
            "sender": "643cf9ec28271f6cc91b53e7",
            "receiver": "64363dfc356c5a8aa8fa494e",
            "body": "jflkajsfkljljsdf",
            "react": "none",
            "seen": false,
            "_id": "6451ea25f7edf3e77684aa80",
            "createdAt": "2023-05-03T04:59:17.985Z"
        },
        {
            "cus_id": "643cf9ec28271f6cc91b53e764363dfc356c5a8aa8fa494e",
            "sender": "643cf9ec28271f6cc91b53e7",
            "receiver": "64363dfc356c5a8aa8fa494e",
            "body": "holaaaa",
            "react": "none",
            "seen": false,
            "_id": "6451ea93f7edf3e77684aaa8",
            "createdAt": "2023-05-03T05:01:07.431Z"
        },
        {
            "cus_id": "643cf9ec28271f6cc91b53e764363dfc356c5a8aa8fa494e",
            "sender": "64363dfc356c5a8aa8fa494e",
            "receiver": "643cf9ec28271f6cc91b53e7",
            "body": "hello",
            "react": "none",
            "seen": false,
            "_id": "6451ea9d573d43ea6e13bd30",
            "createdAt": "2023-05-03T05:01:17.407Z"
        },
        {
            "cus_id": "643cf9ec28271f6cc91b53e764363dfc356c5a8aa8fa494e",
            "sender": "64363dfc356c5a8aa8fa494e",
            "receiver": "643cf9ec28271f6cc91b53e7",
            "body": "new msg",
            "react": "none",
            "seen": false,
            "_id": "64522674f7edf3e77684b620",
            "createdAt": "2023-05-03T09:16:36.744Z"
        },
        {
            "cus_id": "643cf9ec28271f6cc91b53e764363dfc356c5a8aa8fa494e",
            "sender": "64363dfc356c5a8aa8fa494e",
            "receiver": "643cf9ec28271f6cc91b53e7",
            "body": "new msg",
            "react": "none",
            "seen": false,
            "_id": "64522fe9f7edf3e77684b797",
            "createdAt": "2023-05-03T09:56:57.412Z"
        },
        {
            "cus_id": "643cf9ec28271f6cc91b53e764363dfc356c5a8aa8fa494e",
            "sender": "64363dfc356c5a8aa8fa494e",
            "receiver": "643cf9ec28271f6cc91b53e7",
            "body": "adfsadf",
            "react": "none",
            "seen": false,
            "_id": "64523056f7edf3e77684b7c8",
            "createdAt": "2023-05-03T09:58:46.293Z"
        }
    ]
}
```

**_Status Code:_** 200

<br>

##### II. Example Request: get Messages with one user Not authorize

**_Query:_**

| Key        | Value                    | Description |
| ---------- | ------------------------ | ----------- |
| senderId   | 643cf9ec28271f6cc91b53e7 |             |
| receiverId | 643cf9ec28271f6cc91b53e7 |             |

##### II. Example Response: get Messages with one user Not authorize

```js
{
    "msg": "Not authorized",
    "messages": []
}
```

**_Status Code:_** 401

<br>

### 4. get unseen list

**_Endpoint:_**

```bash
Method: GET
Type:
URL: http://localhost:3000/api/v2/users/getNotification
```

**_Query params:_**

| Key    | Value                    | Description |
| ------ | ------------------------ | ----------- |
| id     | 645b89d45b0bc1d9a10bf9ed | receiver id |
| type   | unseen                   |             |
| sender | 64326d06498c08c135977357 | my id       |

**_More example Requests/Responses:_**

##### I. Example Request: get unseen list Success

**_Query:_**

| Key    | Value                    | Description |
| ------ | ------------------------ | ----------- |
| id     | 643cf9ec28271f6cc91b53e7 | receiver id |
| type   | unseen                   |             |
| sender | 642f7cdd8d1cecb1945c6536 | my id       |

##### I. Example Response: get unseen list Success

```js
{
    "msg": "Success",
    "notifications": [
        {
            "chatID": "643e5dde1dbdb1179d8cd018",
            "messageID": "64523140f7edf3e77684ba3d",
            "sender": "642f7cdd8d1cecb1945c6536",
            "cus_id": "643cf9ec28271f6cc91b53e7642f7cdd8d1cecb1945c6536",
            "senderUsername": "Username",
            "senderEmail": "sourav0123@gmail.com",
            "senderImage": "/images/profiles/07fd1843e9997ac08f09ead14.aee7abddddb9c68b52c5.png",
            "body": "kjadflsjfl",
            "seen": false,
            "_id": "64523140f7edf3e77684ba44",
            "createdAt": "2023-05-03T10:02:40.663Z"
        },
        {
            "chatID": "643e5dde1dbdb1179d8cd018",
            "messageID": "64523145f7edf3e77684bb5e",
            "sender": "642f7cdd8d1cecb1945c6536",
            "cus_id": "643cf9ec28271f6cc91b53e7642f7cdd8d1cecb1945c6536",
            "senderUsername": "Username",
            "senderEmail": "sourav0123@gmail.com",
            "senderImage": "/images/profiles/07fd1843e9997ac08f09ead14.aee7abddddb9c68b52c5.png",
            "body": "Hii",
            "seen": false,
            "_id": "64523145f7edf3e77684bb65",
            "createdAt": "2023-05-03T10:02:45.406Z"
        },
        {
            "chatID": "643e5dde1dbdb1179d8cd018",
            "messageID": "6452314df7edf3e77684bc91",
            "sender": "642f7cdd8d1cecb1945c6536",
            "cus_id": "643cf9ec28271f6cc91b53e7642f7cdd8d1cecb1945c6536",
            "senderUsername": "Username",
            "senderEmail": "sourav0123@gmail.com",
            "senderImage": "/images/profiles/07fd1843e9997ac08f09ead14.aee7abddddb9c68b52c5.png",
            "body": "unseen",
            "seen": false,
            "_id": "6452314df7edf3e77684bc98",
            "createdAt": "2023-05-03T10:02:53.377Z"
        }
    ]
}
```

**_Status Code:_** 200

<br>

##### II. Example Request: get unseen list Not found

**_Query:_**

| Key    | Value                    | Description |
| ------ | ------------------------ | ----------- |
| id     | 642e6248e538c6d0b0a1160d | receiver id |
| type   | unseen                   |             |
| sender | 642e6248e538c6d0b0a11601 | my id       |

##### II. Example Response: get unseen list Not found

```js
{
    "msg": "User not found"
}
```

**_Status Code:_** 404

<br>

### 5. post message

**_Endpoint:_**

```bash
Method: POST
Type: RAW
URL: http://localhost:3000/api/v2/messages
```

**_Body:_**

```js
{
    "senderEmail": "sourav.shellbeehaken@gmail.com",
    "receiverEmail": "edge@gmail.com",
    "body": "adfsadf"
}
```

**_More example Requests/Responses:_**

##### I. Example Request: post message Success

**_Body:_**

```js
{
    "senderEmail": "user@gmail.com",
    "receiverEmail": "edge@gmail.com",
    "body": "new msg"
}
```

##### I. Example Response: post message Success

```js
{
    "_id": "64522fe9f7edf3e77684b797",
    "sender": "64363dfc356c5a8aa8fa494e",
    "receiver": "643cf9ec28271f6cc91b53e7",
    "senderUsername": "test user",
    "senderEmail": "user@gmail.com",
    "senderImage": "https://api.dicebear.com/5.x/thumbs/svg?radius=50",
    "receiverUsername": "Edge",
    "receiverEmail": "edge@gmail.com",
    "receiverImage": "https://api.dicebear.com/5.x/thumbs/svg?radius=50",
    "body": "new msg",
    "cus_id": "643cf9ec28271f6cc91b53e764363dfc356c5a8aa8fa494e"
}
```

**_Status Code:_** 201

<br>

##### II. Example Request: post message Not valid

**_Body:_**

```js
{
    "senderEmail": "user@gmail.com",
    "receiverEmail": "edge@gmail.com",
    "body": ""
}
```

##### II. Example Response: post message Not valid

```js
{
    "success": false,
    "error": "MessageDBV2 validation failed: messages.14.body: Path `body` is required."
}
```

**_Status Code:_** 400

<br>

##### III. Example Request: post message Not Found

**_Body:_**

```js
{
    "senderEmail": "user@gmail.com",
    "receiverEmail": "edgeasdfa@gmail.com",
    "body": "adfsadf"
}
```

##### III. Example Response: post message Not Found

```js
{
    "success": false,
    "error": "Cannot read properties of null (reading '_id')"
}
```

**_Status Code:_** 400

<br>

## Retweet

### 1. post Retweet

**_Endpoint:_**

```bash
Method: POST
Type: RAW
URL: http://localhost:3000/api/v2/posts/retweet
```

**_Headers:_**

| Key          | Value            | Description |
| ------------ | ---------------- | ----------- |
| Content-Type | application/json |             |

**_Body:_**

```js
{
    "owner":"642f7cdd8d1cecb1945c6536",
    "head":"64521bf7f7edf3e784b03e",
    "tweetText":"Retweet from postman"
}
```

**_More example Requests/Responses:_**

##### I. Example Request: post Retweet Success

**_Headers:_**

| Key          | Value            | Description |
| ------------ | ---------------- | ----------- |
| Content-Type | application/json |             |

**_Body:_**

```js
{
    "owner":"642f7cdd8d1cecb1945c6536",
    "head":"64521bf7f7edf3e77684b03e",
    "tweetText":"Retweet from postman"
}
```

##### I. Example Response: post Retweet Success

```js
{
    "tweet": {
        "_id": "64524834f7edf3e77684bef6",
        "owner": {
            "_id": "642f7cdd8d1cecb1945c6536",
            "email": "sourav0123@gmail.com",
            "username": "Username",
            "image": "/images/profiles/07fd1843e9997ac08f09ead14.aee7abddddb9c68b52c5.png"
        },
        "tweetImages": [],
        "tweetText": "Retweet from postman",
        "likes": 0,
        "likedBy": [],
        "likedByHashMap": {},
        "retweets": 0,
        "retweetedBy": [],
        "retweetedByHashMap": {},
        "comments": 0,
        "commentsList": [],
        "commentByHashMap": {},
        "type": "retweet",
        "head": {
            "_id": "64521bf7f7edf3e77684b03e",
            "owner": {
                "_id": "643cf9ec28271f6cc91b53e7",
                "email": "edge@gmail.com",
                "username": "Edge",
                "image": "https://api.dicebear.com/5.x/thumbs/svg?radius=50"
            },
            "tweetImage": null,
            "tweetImages": [],
            "tweetText": "Hiiiiii text",
            "likes": 0,
            "likedBy": [],
            "likedByHashMap": {},
            "retweets": 1,
            "retweetedBy": [
                "642f7cdd8d1cecb1945c6536"
            ],
            "retweetedByHashMap": {
                "642f7cdd8d1cecb1945c6536": true
            },
            "comments": 0,
            "commentsList": [],
            "commentByHashMap": {},
            "type": "tweet",
            "nodes": [
                "64524834f7edf3e77684bef6"
            ],
            "createdAt": "2023-05-03T08:31:51.316Z",
            "updatedAt": "2023-05-03T11:40:36.676Z",
            "__v": 0
        },
        "nodes": [],
        "createdAt": "2023-05-03T11:40:36.620Z",
        "updatedAt": "2023-05-03T11:40:36.620Z",
        "__v": 0
    },
    "retweets": 1
}
```

**_Status Code:_** 201

<br>

##### II. Example Request: post Retweet Error

**_Headers:_**

| Key          | Value            | Description |
| ------------ | ---------------- | ----------- |
| Content-Type | application/json |             |

**_Body:_**

```js
{
    "owner":"642f7cdd8d1cecb1945c6536",
    "head":"64521bf7f7edf3e784b03e",
    "tweetText":"Retweet from postman"
}
```

##### II. Example Response: post Retweet Error

```js
{
    "msg": "Server Error",
    "error": {
        "errors": {
            "head": {
                "stringValue": "\"64521bf7f7edf3e784b03e\"",
                "valueType": "string",
                "kind": "ObjectId",
                "value": "64521bf7f7edf3e784b03e",
                "path": "head",
                "reason": {},
                "name": "CastError",
                "message": "Cast to ObjectId failed for value \"64521bf7f7edf3e784b03e\" (type string) at path \"head\" because of \"BSONError\""
            }
        },
        "_message": "TweetDBV2 validation failed",
        "name": "ValidationError",
        "message": "TweetDBV2 validation failed: head: Cast to ObjectId failed for value \"64521bf7f7edf3e784b03e\" (type string) at path \"head\" because of \"BSONError\""
    }
}
```

**_Status Code:_** 500

<br>

## User

### 1. delete token

**_Endpoint:_**

```bash
Method: DELETE
Type: RAW
URL: http://localhost:3000/api/v2/users/token
```

**_Body:_**

```js
{
    "_id":"645b89d45b0bc1d9a10bf9ed"
}
```

**_More example Requests/Responses:_**

##### I. Example Request: delete token Not authorize

**_Body:_**

```js
{
    "_id":"64326d06498c08c135977357"
}
```

##### I. Example Response: delete token Not authorize

```js
{
    "msg": "Not authorize",
    "users": {}
}
```

**_Status Code:_** 401

<br>

##### II. Example Request: delete token Success

**_Body:_**

```js
{
    "_id":"645b89d45b0bc1d9a10bf9ed"
}
```

##### II. Example Response: delete token Success

```js
{
    "msg": "Token updated",
    "user": {
        "_id": "645b89d45b0bc1d9a10bf9ed",
        "token": "",
        "updatedAt": "2023-05-11T08:18:24.820Z"
    }
}
```

**_Status Code:_** 200

<br>

### 2. get notification

**_Endpoint:_**

```bash
Method: GET
Type:
URL: http://localhost:3000/api/v2/users/getNotification
```

**_Query params:_**

| Key | Value                    | Description |
| --- | ------------------------ | ----------- |
| id  | 643cf9ec28271f6cc91b53e7 |             |

**_More example Requests/Responses:_**

##### I. Example Request: get notification Error

**_Query:_**

| Key | Value                      | Description |
| --- | -------------------------- | ----------- |
| id  | 643cf9ec28271f6cc91b53e7fa |             |

##### I. Example Response: get notification Error

```js
{
    "msg": "Server error"
}
```

**_Status Code:_** 500

<br>

##### II. Example Request: get notification Success

**_Query:_**

| Key | Value                    | Description |
| --- | ------------------------ | ----------- |
| id  | 643cf9ec28271f6cc91b53e7 |             |

##### II. Example Response: get notification Success

```js
{
    "msg": "Success",
    "notifications": [
        {
            "chatID": "644bad9ad9172f7cad7ba8dc",
            "messageID": "64522674f7edf3e77684b620",
            "sender": "64363dfc356c5a8aa8fa494e",
            "cus_id": "643cf9ec28271f6cc91b53e764363dfc356c5a8aa8fa494e",
            "senderUsername": "test user",
            "senderEmail": "user@gmail.com",
            "senderImage": "https://api.dicebear.com/5.x/thumbs/svg?radius=50",
            "body": "new msg",
            "seen": false,
            "_id": "64522674f7edf3e77684b627",
            "createdAt": "2023-05-03T09:16:36.803Z"
        },
        {
            "chatID": "644bad9ad9172f7cad7ba8dc",
            "messageID": "64522fe9f7edf3e77684b797",
            "sender": "64363dfc356c5a8aa8fa494e",
            "cus_id": "643cf9ec28271f6cc91b53e764363dfc356c5a8aa8fa494e",
            "senderUsername": "test user",
            "senderEmail": "user@gmail.com",
            "senderImage": "https://api.dicebear.com/5.x/thumbs/svg?radius=50",
            "body": "new msg",
            "seen": false,
            "_id": "64522fe9f7edf3e77684b79e",
            "createdAt": "2023-05-03T09:56:57.465Z"
        },
        {
            "chatID": "644bad9ad9172f7cad7ba8dc",
            "messageID": "64523056f7edf3e77684b7c8",
            "sender": "64363dfc356c5a8aa8fa494e",
            "cus_id": "643cf9ec28271f6cc91b53e764363dfc356c5a8aa8fa494e",
            "senderUsername": "test user",
            "senderEmail": "user@gmail.com",
            "senderImage": "https://api.dicebear.com/5.x/thumbs/svg?radius=50",
            "body": "adfsadf",
            "seen": false,
            "_id": "64523056f7edf3e77684b7cf",
            "createdAt": "2023-05-03T09:58:46.357Z"
        }
    ]
}
```

**_Status Code:_** 200

<br>

### 3. get user by email or id

**_Endpoint:_**

```bash
Method: POST
Type: RAW
URL: http://localhost:3000/api/v2/users/user
```

**_Body:_**

```js
{
    "email":"sourav.shellbeehaken@gmail.com",
    "id":"111111111111111111111111"


}
```

**_More example Requests/Responses:_**

##### I. Example Request: get user by email or id Success

**_Body:_**

```js
{
    "email":"sourav.shellbeehaken@gmail.com",
    "id":"111111111111111111111111"


}
```

##### I. Example Response: get user by email or id Success

```js
{
    "msg": "User found",
    "user": {
        "_id": "642e61dfe538c6d0b0a115dd",
        "email": "sourav.shellbeehaken@gmail.com",
        "username": "SouravSBH",
        "image": "https://avatars.githubusercontent.com/u/124552082?v=4",
        "coverImage": "https://api.dicebear.com/5.x/thumbs/svg?radius=50",
        "bio": "This is my bio",
        "follower": [
            "6434e1c2d6976654e68781b8"
        ],
        "following": [
            "64326d06498c08c135977357"
        ],
        "posts": [],
        "likedPost": [
            "642e6e0de538c6d0b0a11689",
            "643372a5f29fc1fe4788b5d4",
            "642e6bebe538c6d0b0a1165f",
            "6433a016f29fc1fe4788c9c3",
            "643398d7f29fc1fe4788c8ba",
            "6433a23df29fc1fe4788ca7c",
            "6433a662f29fc1fe4788cb2f",
            "6433a63df29fc1fe4788cb28",
            "6433a9d7f29fc1fe4788cb51",
            "6432a29f30f1278ecd3b7d09",
            "6432a687b0b1a79223e0810f",
            "6433ae24f29fc1fe4788cbe3",
            "6433ac9ff29fc1fe4788cbb1",
            "6433b1a3f29fc1fe4788ccbf",
            "6434dfa6d6976654e6877f55",
            "6434e9b5d6976654e68785b5"
        ],
        "commentedPost": [],
        "createdAt": "2023-04-06T06:08:31.535Z",
        "updatedAt": "2023-04-26T06:07:43.205Z",
        "__v": 24,
        "isEmailVerified": false,
        "token": "fUXD3MHdtyM_kwGHonBTjd:APA91bG0y07_Os-uTb_MPidQxud-5rY1TjdH6wmB0Kg3MWD1oLhm0CnD8mNO5WGStceOUPdoxgkdAkCY7iPen2TXgfisPzI-P7YFettWOhLB-civLID3x9HsA-aAajVMbWYdnFi4B1Fj",
        "notifications": [],
        "messages": []
    }
}
```

**_Status Code:_** 200

<br>

##### II. Example Request: get user by email or id Not found

**_Body:_**

```js
{
    "email":"souravadssfeehaken@gmail.com",
    "id":"111111111111111111111111"


}
```

##### II. Example Response: get user by email or id Not found

```js
{
    "msg": "User not found"
}
```

**_Status Code:_** 400

<br>

### 4. patch token

**_Endpoint:_**

```bash
Method: PATCH
Type: RAW
URL: http://localhost:3000/api/v2/users/token
```

**_Body:_**

```js
{
    "_id":"64326d06498c08c135977357",
    "token":"Update"
}
```

**_More example Requests/Responses:_**

##### I. Example Request: patch token Success

**_Body:_**

```js
{
    "_id":"64326d06498c08c135977357",
    "token":"Update"
}
```

##### I. Example Response: patch token Success

```js
{
    "msg": "Token updated",
    "user": {
        "_id": "64326d06498c08c135977357",
        "email": "sourav.ahmed5654@gmail.com",
        "username": "Sourav Ahmed",
        "image": "/images/profiles/45b414fa9582a48599ecd8d01.aee7abddddb9c68b52c5.png",
        "coverImage": "https://api.dicebear.com/5.x/thumbs/svg?radius=50",
        "bio": "New Bio",
        "follower": [
            "642e61dfe538c6d0b0a115dd"
        ],
        "following": [],
        "posts": [],
        "likedPost": [
            "642e6e39e538c6d0b0a1168e",
            "642e6e0de538c6d0b0a11689",
            "6432a90db0b1a79223e0811d",
            "6432a916b0b1a79223e08126",
            "6432a97cb0b1a79223e08146",
            "643bb5a0000d2d56ea8e5ad6",
            "643bb59d000d2d56ea8e5ac9"
        ],
        "commentedPost": [],
        "createdAt": "2023-04-09T07:45:10.443Z",
        "updatedAt": "2023-05-11T08:13:54.200Z",
        "__v": 0,
        "notifications": [
            {
                "chatID": "645c9c763b53a43f28c6393e",
                "messageID": "645c9c8e3b53a43f28c63a35",
                "sender": "643cf9ec28271f6cc91b53e7",
                "cus_id": "643cf9ec28271f6cc91b53e764326d06498c08c135977357",
                "senderUsername": "Edge",
                "senderEmail": "edge@gmail.com",
                "senderImage": "https://api.dicebear.com/5.x/thumbs/svg?radius=50",
                "body": "jkdjaflfl",
                "seen": false,
                "_id": "645c9c8e3b53a43f28c63a3c",
                "createdAt": "2023-05-11T07:43:10.971Z"
            }
        ],
        "messages": [
            {
                "sender": "642f7cdd8d1cecb1945c6536",
                "chatID": "644a419499f6a877e31125c7",
                "cus_id": "64326d06498c08c135977357642f7cdd8d1cecb1945c6536",
                "username": "Username",
                "email": "sourav0123@gmail.com",
                "image": "/images/profiles/07fd1843e9997ac08f09ead14.aee7abddddb9c68b52c5.png",
                "_id": "644a419499f6a877e31125cc"
            },
            {
                "sender": "645b89d45b0bc1d9a10bf9ed",
                "chatID": "645c923e3b53a43f28c62f21",
                "cus_id": "645b89d45b0bc1d9a10bf9ed64326d06498c08c135977357",
                "username": "Sourav SBH",
                "email": "sourav.shellbeehaken@gmail.com",
                "image": "/images/profiles/324f64b501d16214b66d3d102.aee7abddddb9c68b52c5.png",
                "_id": "645c923e3b53a43f28c62f26"
            },
            {
                "sender": "643cf9ec28271f6cc91b53e7",
                "chatID": "645c9c763b53a43f28c6393e",
                "cus_id": "643cf9ec28271f6cc91b53e764326d06498c08c135977357",
                "username": "Edge",
                "email": "edge@gmail.com",
                "image": "https://api.dicebear.com/5.x/thumbs/svg?radius=50",
                "_id": "645c9c763b53a43f28c63941"
            }
        ],
        "isEmailVerified": true,
        "token": "Update",
        "verifyString": "d4o7sD"
    }
}
```

**_Status Code:_** 200

<br>

### 5. post Check verifiation code

**_Endpoint:_**

```bash
Method: POST
Type: RAW
URL: http://localhost:3000/api/v2/users/codeVerify
```

**_Body:_**

```js
{
    "email":"shawon.shellbeehaken@gmail.com",
    "verifyString":"DtriO1"
}
```

**_More example Requests/Responses:_**

##### I. Example Request: post Check verifiation code User Exists

**_Body:_**

```js
{
    "email":"sourav.shellbeehaken@gmail.com",
    "verifyString":"Hiiiii"
}
```

##### I. Example Response: post Check verifiation code User Exists

```js
{
    "msg": "User already exist. Please log in."
}
```

**_Status Code:_** 422

<br>

##### II. Example Request: post Check verifiation code Not matched

**_Body:_**

```js
{
    "email":"shawon.shellbeehaken@gmail.com",
    "verifyString":"Hiiiii"
}
```

##### II. Example Response: post Check verifiation code Not matched

```js
{
    "msg": "NOT MATCHED"
}
```

**_Status Code:_** 200

<br>

##### III. Example Request: post Check verifiation code Matched

**_Body:_**

```js
{
    "email":"shawon.shellbeehaken@gmail.com",
    "verifyString":"DtriO1"
}
```

##### III. Example Response: post Check verifiation code Matched

```js
{
    "msg": "MATCHED"
}
```

**_Status Code:_** 200

<br>

### 6. post email verification code

**_Endpoint:_**

```bash
Method: POST
Type: RAW
URL: http://localhost:3000//api/v2/users/emailVerify
```

**_Body:_**

```js
{
    "username":"Sourav",
    "email":"shawon.shellbeehaken@gmail.com"
}
```

**_More example Requests/Responses:_**

##### I. Example Request: post email verification code User exists

**_Body:_**

```js
{
    "username":"Sourav",
    "email":"sourav.ahmed5654@gmail.com"
}
```

##### I. Example Response: post email verification code User exists

```js
{
    "msg": "User already exist. Please log in."
}
```

**_Status Code:_** 422

<br>

##### II. Example Request: post email verification code Success

**_Body:_**

```js
{
    "username":"Sourav",
    "email":"shawon.shellbeehaken@gmail.com"
}
```

##### II. Example Response: post email verification code Success

```js
{
    "msg": "Email sent. Check you email and spam folder"
}
```

**_Status Code:_** 200

<br>

### 7. signup

**_Endpoint:_**

```bash
Method: POST
Type: RAW
URL: http://localhost:3000/api/auth/signup
```

**_Body:_**

```js
{
    "username":"sourav",
    "email":"shawon.shellbeehaken@gmail.com",
    "password":"123456"
}
```

**_More example Requests/Responses:_**

##### I. Example Request: signup Already exist

**_Body:_**

```js
{
    "username":"sourav",
    "email":"123456@gmail.com",
    "password":"123456"
}
```

##### I. Example Response: signup Already exist

```js
{
    "msg": "User already exist. Please log in."
}
```

**_Status Code:_** 422

<br>

##### II. Example Request: signup Not valid

**_Body:_**

```js
{
    "username":"sourav",
    "email":"123456@gmail.com",
    "password":"1234"
}
```

##### II. Example Response: signup Not valid

```js
{
    "msg": "Email is not valid or Password is too short"
}
```

**_Status Code:_** 422

<br>

##### III. Example Request: signup

**_Body:_**

```js
{
    "username":"sourav",
    "email":"1234567@gmail.com",
    "password":"123456"
}
```

##### III. Example Response: signup

```js
{
    "msg": "Sign Up Successful",
    "result": {
        "isEmailVerified": false,
        "email": "1234567@gmail.com",
        "username": "sourav",
        "password": "$2a$12$3XdeGkOLTwraJT81/7MMiemR9vUVHQs5ifZR6Hhot.8QhxlFKVaA6",
        "image": "https://api.dicebear.com/5.x/thumbs/svg?radius=50",
        "coverImage": "https://api.dicebear.com/5.x/thumbs/svg?radius=50",
        "bio": "This is my bio",
        "follower": [],
        "following": [],
        "posts": [],
        "likedPost": [],
        "commentedPost": [],
        "_id": "64522fabf7edf3e77684b781",
        "notifications": [],
        "messages": [],
        "createdAt": "2023-05-03T09:55:55.046Z",
        "updatedAt": "2023-05-03T09:55:55.046Z",
        "__v": 0
    }
}
```

**_Status Code:_** 201

<br>

##### IV. Example Request: signup Success with email verified

**_Body:_**

```js
{
    "username":"sourav",
    "email":"shawon.shellbeehaken@gmail.com",
    "password":"123456"
}
```

##### IV. Example Response: signup Success with email verified

```js
{
    "msg": "Sign Up Successful",
    "existingUser": {
        "_id": "645c89683b53a43f28c62ba3",
        "isEmailVerified": true,
        "verifyString": "DtriO1",
        "email": "shawon.shellbeehaken@gmail.com",
        "username": "Sourav",
        "image": "https://api.dicebear.com/5.x/thumbs/svg?radius=50",
        "coverImage": "https://api.dicebear.com/5.x/thumbs/svg?radius=50",
        "bio": "This is my bio",
        "follower": [],
        "following": [],
        "posts": [],
        "likedPost": [],
        "commentedPost": [],
        "notifications": [],
        "messages": [],
        "createdAt": "2023-05-11T06:21:28.654Z",
        "updatedAt": "2023-05-11T06:25:59.997Z",
        "__v": 0,
        "password": "$2a$12$NNzTmwTEVm3C9k3p6tyThe3KFyTU2cJtms3.lCvQQuhA3nybjzUTy"
    }
}
```

**_Status Code:_** 201

<br>

## tweet

### 1. delete tweet

**_Endpoint:_**

```bash
Method: DELETE
Type:
URL: http://localhost:3000/api/v2/posts/645c67143b53a43f28c61f91
```

**_More example Requests/Responses:_**

##### I. Example Request: delete tweet Not authorized

##### I. Example Response: delete tweet Not authorized

```js
{
    "msg": "Not authorized"
}
```

**_Status Code:_** 401

<br>

##### II. Example Request: delete tweet Success

##### II. Example Response: delete tweet Success

```js
{
    "msg": "Post deleted"
}
```

**_Status Code:_** 200

<br>

### 2. get tweet by id

**_Endpoint:_**

```bash
Method: GET
Type:
URL: http://localhost:3000/api/v2/posts/64536f0b8c5400e75a1569f7
```

**_More example Requests/Responses:_**

##### I. Example Request: get tweet by id not found

##### I. Example Response: get tweet by id not found

```js
{
    "msg": "Tweet not found"
}
```

**_Status Code:_** 500

<br>

##### II. Example Request: get tweet by id error

##### II. Example Response: get tweet by id error

```js
{
    "msg": "Internal server error"
}
```

**_Status Code:_** 500

<br>

##### III. Example Request: get tweet by id Success

##### III. Example Response: get tweet by id Success

```js
{
    "post": {
        "_id": "64536f0b8c5400e75a1569f7",
        "owner": {
            "_id": "643cf9ec28271f6cc91b53e7",
            "isEmailVerified": false,
            "email": "edge@gmail.com",
            "username": "Edge",
            "image": "https://api.dicebear.com/5.x/thumbs/svg?radius=50",
            "coverImage": "https://api.dicebear.com/5.x/thumbs/svg?radius=50",
            "bio": "This is my bio",
            "follower": [
                "645b7f665b0bc1d9a10bf0f4",
                "645b89d45b0bc1d9a10bf9ed"
            ],
            "following": [
                "642f7cdd8d1cecb1945c6536",
                "645b7f665b0bc1d9a10bf0f4"
            ],
            "posts": [],
            "likedPost": [
                "643e4ee06da446cafe86158d",
                "643bb5a0000d2d56ea8e5ad6",
                "645370d88c5400e75a156ae7",
                "645370968c5400e75a156a6b",
                "64524834f7edf3e77684bef6",
                "645384c98c5400e75a15706a",
                "645b82df5b0bc1d9a10bf35c"
            ],
            "commentedPost": [],
            "createdAt": "2023-04-17T07:49:00.459Z",
            "updatedAt": "2023-05-11T08:20:13.608Z",
            "__v": 75,
            "token": "eT2bTHm-AAp16becQd3FzT:APA91bGVeY0d9tHzEl6NYLSpYwnXbOSMureUAza7pJv-exjx6CZBjJ5mwPKT_tBYqc8LYBaAlRILzOwFnWnSasE7XM_iCB8cwlmJl5E4REDwawz3doGd_22Yj0BHhxx779V3qS-4eemx",
            "notifications": [],
            "messages": [
                {
                    "sender": "642f7cdd8d1cecb1945c6536",
                    "chatID": "643e5dde1dbdb1179d8cd018",
                    "cus_id": "643cf9ec28271f6cc91b53e7642f7cdd8d1cecb1945c6536",
                    "username": "Username",
                    "email": "sourav0123@gmail.com",
                    "image": "/images/profiles/07fd1843e9997ac08f09ead14.aee7abddddb9c68b52c5.png",
                    "_id": "644a1602328b72f696d3c5cb"
                },
                {
                    "sender": "642e6248e538c6d0b0a11601",
                    "chatID": "644a35d78272d66a4e49fe0f",
                    "cus_id": "643cf9ec28271f6cc91b53e7642e6248e538c6d0b0a11601",
                    "username": "test2",
                    "email": "sourav@gmail.com",
                    "image": "/images/profiles/9177deb3dbe13dff3e3b0a409.png",
                    "_id": "644a35d88272d66a4e49fe14"
                },
                {
                    "sender": "64363dfc356c5a8aa8fa494e",
                    "chatID": "644bad9ad9172f7cad7ba8dc",
                    "cus_id": "643cf9ec28271f6cc91b53e764363dfc356c5a8aa8fa494e",
                    "username": "test user",
                    "email": "user@gmail.com",
                    "image": "https://api.dicebear.com/5.x/thumbs/svg?radius=50",
                    "_id": "644bad9bd9172f7cad7ba8e3"
                },
                {
                    "sender": "64363de9356c5a8aa8fa4930",
                    "chatID": "64475b10aa31aade5990bf11",
                    "cus_id": "643cf9ec28271f6cc91b53e764363de9356c5a8aa8fa4930",
                    "username": "Christiano Ronaldo",
                    "email": "cr7@gmail.com",
                    "image": "/images/profiles/14503fc457890ab1afab85e06.jpeg",
                    "_id": "6451eabc37291ae9b0ca8bfb"
                },
                {
                    "sender": "645b7f665b0bc1d9a10bf0f4",
                    "chatID": "645b80515b0bc1d9a10bf135",
                    "cus_id": "645b7f665b0bc1d9a10bf0f4643cf9ec28271f6cc91b53e7",
                    "username": "Sabit",
                    "email": "sabit.shellbeehaken@gmail.com",
                    "image": "/images/profiles/45b414fa9582a48599ecd8d00.aee7abddddb9c68b52c5.png",
                    "_id": "645b80525b0bc1d9a10bf13a"
                },
                {
                    "sender": "645b89d45b0bc1d9a10bf9ed",
                    "chatID": "645c63763b53a43f28c61f78",
                    "cus_id": "645b89d45b0bc1d9a10bf9ed643cf9ec28271f6cc91b53e7",
                    "username": "sourav",
                    "email": "sourav.shellbeehaken@gmail.com",
                    "image": "/images/profiles/45b414fa9582a48599ecd8d02.jpeg",
                    "_id": "645c63763b53a43f28c61f7d"
                },
                {
                    "sender": "64326d06498c08c135977357",
                    "chatID": "645c9c763b53a43f28c6393e",
                    "cus_id": "643cf9ec28271f6cc91b53e764326d06498c08c135977357",
                    "username": "Sourav Ahmed",
                    "email": "sourav.ahmed5654@gmail.com",
                    "image": "/images/profiles/45b414fa9582a48599ecd8d01.aee7abddddb9c68b52c5.png",
                    "_id": "645c9c763b53a43f28c63943"
                }
            ]
        },
        "tweetImages": [],
        "tweetText": "-1-1empty1-1-",
        "likes": 0,
        "likedBy": [],
        "likedByHashMap": {},
        "retweets": 0,
        "retweetedBy": [],
        "retweetedByHashMap": {},
        "comments": 0,
        "commentsList": [],
        "commentByHashMap": {},
        "type": "retweet",
        "head": "64536ee28c5400e75a1569ae",
        "nodes": [],
        "createdAt": "2023-05-04T08:38:35.650Z",
        "updatedAt": "2023-05-04T10:10:22.281Z",
        "__v": 0
    }
}
```

**_Status Code:_** 200

<br>

### 3. get tweets

**_Endpoint:_**

```bash
Method: GET
Type:
URL: http://localhost:3000/api/v2/posts
```

**_Query params:_**

| Key   | Value | Description |
| ----- | ----- | ----------- |
| skip  | 5     |             |
| limit | 5     |             |

**_More example Requests/Responses:_**

##### I. Example Request: get tweets Success

**_Query:_**

| Key   | Value | Description |
| ----- | ----- | ----------- |
| skip  | 5     |             |
| limit | 5     |             |

##### I. Example Response: get tweets Success

```js
{
    "posts": [
        {
            "_id": "64490f9ee3802dfa3093132e",
            "owner": {
                "_id": "643cf9ec28271f6cc91b53e7",
                "email": "edge@gmail.com",
                "username": "Edge",
                "image": "https://api.dicebear.com/5.x/thumbs/svg?radius=50"
            },
            "tweetImage": null,
            "tweetImages": [],
            "tweetText": "Shei noakhali",
            "likes": 1,
            "likedBy": [
                "64363de9356c5a8aa8fa4930"
            ],
            "likedByHashMap": {},
            "retweets": 1,
            "retweetedBy": [
                "643cf9ec28271f6cc91b53e7"
            ],
            "retweetedByHashMap": {
                "643cf9ec28271f6cc91b53e7": true
            },
            "comments": 1,
            "commentsList": [
                {
                    "_id": "644a2206c529a4e116274551",
                    "owner": {
                        "_id": "64363de9356c5a8aa8fa4930",
                        "email": "cr7@gmail.com",
                        "username": "Christiano Ronaldo",
                        "image": "/images/profiles/14503fc457890ab1afab85e06.jpeg"
                    },
                    "tweetImages": [],
                    "tweetText": "true",
                    "likes": 0,
                    "likedBy": [],
                    "likedByHashMap": {},
                    "retweets": 0,
                    "retweetedBy": [],
                    "retweetedByHashMap": {},
                    "comments": 0,
                    "commentsList": [],
                    "commentByHashMap": {},
                    "type": "comment",
                    "head": "64490f9ee3802dfa3093132e",
                    "nodes": [],
                    "createdAt": "2023-04-27T07:19:34.658Z",
                    "updatedAt": "2023-04-27T07:19:34.658Z",
                    "__v": 0
                }
            ],
            "commentByHashMap": {
                "64363de9356c5a8aa8fa4930": true
            },
            "type": "tweet",
            "nodes": [
                "64490fade3802dfa30931338",
                "644a2206c529a4e116274551"
            ],
            "createdAt": "2023-04-26T11:48:46.330Z",
            "updatedAt": "2023-04-27T07:19:34.767Z",
            "__v": 0
        },
        {
            "_id": "643e4ee06da446cafe86158d",
            "owner": {
                "_id": "64363dfc356c5a8aa8fa494e",
                "email": "user@gmail.com",
                "username": "test user",
                "image": "https://api.dicebear.com/5.x/thumbs/svg?radius=50"
            },
            "tweetImages": [],
            "tweetText": "Oh My God!!",
            "likes": 1,
            "likedBy": [
                "643cf9ec28271f6cc91b53e7"
            ],
            "likedByHashMap": {},
            "retweets": 0,
            "retweetedBy": [],
            "retweetedByHashMap": {},
            "comments": 0,
            "commentsList": [],
            "commentByHashMap": {},
            "type": "retweet",
            "head": {
                "_id": "643cff131335c25599b50299",
                "owner": {
                    "_id": "643cf649d21344a1a5b068e4",
                    "isEmailVerified": false,
                    "email": "demo@gmail.com",
                    "username": "maruf",
                    "image": "/images/profiles/299c10739880f3cdb1d043002.com_wallpaper.jpg",
                    "coverImage": "https://api.dicebear.com/5.x/thumbs/svg?radius=50",
                    "bio": "This is my bio",
                    "follower": [],
                    "following": [],
                    "posts": [],
                    "likedPost": [
                        "643bb5a0000d2d56ea8e5ad6",
                        "643bb59d000d2d56ea8e5ac9",
                        "6437881a4235dc5f6a17d5aa"
                    ],
                    "commentedPost": [],
                    "createdAt": "2023-04-17T07:33:29.247Z",
                    "updatedAt": "2023-04-17T08:25:09.722Z",
                    "__v": 0,
                    "token": "fUrq0QeduU9z8k5Gtt0Q3c:APA91bFrJzswi9VvfuBmGhhgm9siOQto1-ikji8Z7h-dOfr96Ue8mIBdJaZ9vgz2GRHD1Ivo3e9c_FFfSG8SKBx6J0cg-Hyx51wmiiG_8d-jQ0YBnIObvyyIc2ogMEsHnBeAaxFLGaRL",
                    "notifications": [],
                    "messages": []
                },
                "tweetImage": "/images/tweets/299c10739880f3cdb1d043001.jpg",
                "tweetImages": [],
                "tweetText": "-1-1empty1-1-",
                "likes": 0,
                "likedBy": [],
                "likedByHashMap": {},
                "retweets": 1,
                "retweetedBy": [
                    "64363dfc356c5a8aa8fa494e"
                ],
                "retweetedByHashMap": {
                    "64363dfc356c5a8aa8fa494e": true
                },
                "comments": 1,
                "commentsList": [
                    "643e4dda789e4ebeb20ffdf7"
                ],
                "commentByHashMap": {
                    "642e6248e538c6d0b0a11601": true
                },
                "type": "tweet",
                "nodes": [
                    "643e4dda789e4ebeb20ffdf7",
                    "643e4ee06da446cafe86158d"
                ],
                "createdAt": "2023-04-17T08:10:59.615Z",
                "updatedAt": "2023-04-18T08:03:44.342Z",
                "__v": 0
            },
            "nodes": [],
            "createdAt": "2023-04-18T08:03:44.280Z",
            "updatedAt": "2023-04-26T03:05:00.155Z",
            "__v": 0
        },
        {
            "_id": "643cff131335c25599b50299",
            "owner": {
                "_id": "643cf649d21344a1a5b068e4",
                "email": "demo@gmail.com",
                "username": "maruf",
                "image": "/images/profiles/299c10739880f3cdb1d043002.com_wallpaper.jpg"
            },
            "tweetImage": "/images/tweets/299c10739880f3cdb1d043001.jpg",
            "tweetImages": [],
            "tweetText": "-1-1empty1-1-",
            "likes": 0,
            "likedBy": [],
            "likedByHashMap": {},
            "retweets": 1,
            "retweetedBy": [
                "64363dfc356c5a8aa8fa494e"
            ],
            "retweetedByHashMap": {
                "64363dfc356c5a8aa8fa494e": true
            },
            "comments": 1,
            "commentsList": [
                {
                    "_id": "643e4dda789e4ebeb20ffdf7",
                    "owner": {
                        "_id": "642e6248e538c6d0b0a11601",
                        "email": "sourav@gmail.com",
                        "username": "test2",
                        "image": "/images/profiles/9177deb3dbe13dff3e3b0a409.png"
                    },
                    "tweetImages": [],
                    "tweetText": "nnnn",
                    "likes": 0,
                    "likedBy": [],
                    "likedByHashMap": {},
                    "retweets": 0,
                    "retweetedBy": [],
                    "retweetedByHashMap": {},
                    "comments": 0,
                    "commentsList": [],
                    "commentByHashMap": {},
                    "type": "comment",
                    "head": "643cff131335c25599b50299",
                    "nodes": [],
                    "createdAt": "2023-04-18T07:59:22.584Z",
                    "updatedAt": "2023-04-18T07:59:22.584Z",
                    "__v": 0
                }
            ],
            "commentByHashMap": {
                "642e6248e538c6d0b0a11601": true
            },
            "type": "tweet",
            "nodes": [
                "643e4dda789e4ebeb20ffdf7",
                "643e4ee06da446cafe86158d"
            ],
            "createdAt": "2023-04-17T08:10:59.615Z",
            "updatedAt": "2023-04-18T08:03:44.342Z",
            "__v": 0
        },
        {
            "_id": "643cfed25d86196c2b7b23f7",
            "owner": {
                "_id": "643cfecc5d86196c2b7b23df",
                "email": "farhan.mahi1999@gmail.com",
                "username": "Farhan Mahtab Mahi",
                "image": "https://avatars.githubusercontent.com/u/51365144?v=4"
            },
            "tweetImage": null,
            "tweetImages": [],
            "tweetText": "Holaaaaaa",
            "likes": 0,
            "likedBy": [],
            "likedByHashMap": {},
            "retweets": 0,
            "retweetedBy": [],
            "retweetedByHashMap": {},
            "comments": 1,
            "commentsList": [
                {
                    "_id": "643d02981335c25599b5037e",
                    "owner": {
                        "_id": "643cf649d21344a1a5b068e4",
                        "email": "demo@gmail.com",
                        "username": "maruf",
                        "image": "/images/profiles/299c10739880f3cdb1d043002.com_wallpaper.jpg"
                    },
                    "tweetImages": [],
                    "tweetText": "hi",
                    "likes": 0,
                    "likedBy": [],
                    "likedByHashMap": {},
                    "retweets": 0,
                    "retweetedBy": [],
                    "retweetedByHashMap": {},
                    "comments": 0,
                    "commentsList": [],
                    "commentByHashMap": {},
                    "type": "comment",
                    "head": "643cfed25d86196c2b7b23f7",
                    "nodes": [],
                    "createdAt": "2023-04-17T08:26:00.052Z",
                    "updatedAt": "2023-04-17T08:26:00.052Z",
                    "__v": 0
                }
            ],
            "commentByHashMap": {
                "643cf649d21344a1a5b068e4": true
            },
            "type": "tweet",
            "nodes": [
                "643d02981335c25599b5037e"
            ],
            "createdAt": "2023-04-17T08:09:54.793Z",
            "updatedAt": "2023-04-17T08:26:00.211Z",
            "__v": 0
        },
        {
            "_id": "643cfead1335c25599b5028c",
            "owner": {
                "_id": "643cf649d21344a1a5b068e4",
                "email": "demo@gmail.com",
                "username": "maruf",
                "image": "/images/profiles/299c10739880f3cdb1d043002.com_wallpaper.jpg"
            },
            "tweetImages": [],
            "tweetText": "hi",
            "likes": 1,
            "likedBy": [
                "64363dfc356c5a8aa8fa494e"
            ],
            "likedByHashMap": {},
            "retweets": 0,
            "retweetedBy": [],
            "retweetedByHashMap": {},
            "comments": 1,
            "commentsList": [
                {
                    "_id": "643d06975d86196c2b7b2497",
                    "owner": {
                        "_id": "64363dfc356c5a8aa8fa494e",
                        "email": "user@gmail.com",
                        "username": "test user",
                        "image": "https://api.dicebear.com/5.x/thumbs/svg?radius=50"
                    },
                    "tweetImages": [],
                    "tweetText": "kiree ??",
                    "likes": 0,
                    "likedBy": [],
                    "likedByHashMap": {},
                    "retweets": 0,
                    "retweetedBy": [],
                    "retweetedByHashMap": {},
                    "comments": 0,
                    "commentsList": [],
                    "commentByHashMap": {},
                    "type": "comment",
                    "head": "643cfead1335c25599b5028c",
                    "nodes": [],
                    "createdAt": "2023-04-17T08:43:03.539Z",
                    "updatedAt": "2023-04-17T08:43:03.539Z",
                    "__v": 0
                }
            ],
            "commentByHashMap": {
                "64363dfc356c5a8aa8fa494e": true
            },
            "type": "retweet",
            "head": {
                "_id": "643cfea11335c25599b50284",
                "owner": {
                    "_id": "643cf649d21344a1a5b068e4",
                    "isEmailVerified": false,
                    "email": "demo@gmail.com",
                    "username": "maruf",
                    "image": "/images/profiles/299c10739880f3cdb1d043002.com_wallpaper.jpg",
                    "coverImage": "https://api.dicebear.com/5.x/thumbs/svg?radius=50",
                    "bio": "This is my bio",
                    "follower": [],
                    "following": [],
                    "posts": [],
                    "likedPost": [
                        "643bb5a0000d2d56ea8e5ad6",
                        "643bb59d000d2d56ea8e5ac9",
                        "6437881a4235dc5f6a17d5aa"
                    ],
                    "commentedPost": [],
                    "createdAt": "2023-04-17T07:33:29.247Z",
                    "updatedAt": "2023-04-17T08:25:09.722Z",
                    "__v": 0,
                    "token": "fUrq0QeduU9z8k5Gtt0Q3c:APA91bFrJzswi9VvfuBmGhhgm9siOQto1-ikji8Z7h-dOfr96Ue8mIBdJaZ9vgz2GRHD1Ivo3e9c_FFfSG8SKBx6J0cg-Hyx51wmiiG_8d-jQ0YBnIObvyyIc2ogMEsHnBeAaxFLGaRL",
                    "notifications": [],
                    "messages": []
                },
                "tweetImage": null,
                "tweetImages": [],
                "tweetText": "hey",
                "likes": 0,
                "likedBy": [],
                "likedByHashMap": {},
                "retweets": 1,
                "retweetedBy": [
                    "643cf649d21344a1a5b068e4"
                ],
                "retweetedByHashMap": {
                    "643cf649d21344a1a5b068e4": true
                },
                "comments": 1,
                "commentsList": [
                    "643d07775d86196c2b7b254d"
                ],
                "commentByHashMap": {
                    "64363dfc356c5a8aa8fa494e": true
                },
                "type": "tweet",
                "nodes": [
                    "643cfead1335c25599b5028c",
                    "643d07775d86196c2b7b254d"
                ],
                "createdAt": "2023-04-17T08:09:05.377Z",
                "updatedAt": "2023-04-17T08:46:47.732Z",
                "__v": 0
            },
            "nodes": [
                "643d06975d86196c2b7b2497"
            ],
            "createdAt": "2023-04-17T08:09:17.006Z",
            "updatedAt": "2023-04-17T08:43:03.697Z",
            "__v": 0
        }
    ]
}
```

**_Status Code:_** 200

<br>

##### II. Example Request: get tweets Error

**_Query:_**

| Key   | Value | Description |
| ----- | ----- | ----------- |
| skip  | m.m   |             |
| limit | mlk   |             |

##### II. Example Response: get tweets Error

```js
{
    "msg": "Internal server error",
    "stringValue": "\"mlk\"",
    "kind": "Number",
    "value": "mlk",
    "path": "limit",
    "valueType": "string"
}
```

**_Status Code:_** 500

<br>

### 4. patch tweet

**_Endpoint:_**

```bash
Method: PATCH
Type: RAW
URL: http://localhost:3000/api/v2/posts/645c67143b53a43f28c61f91
```

**_Body:_**

```js
{
    "owner":"645b89d45b0bc1d9a10bf9ed",
    "tweetText":"Postmant"


}
```

**_More example Requests/Responses:_**

##### I. Example Request: patch tweet Not authorized

**_Body:_**

```js
{
    "owner":"645b89d45b0bc1d9a10bf9ed",
    "tweetText":"Postmant"


}
```

##### I. Example Response: patch tweet Not authorized

```js
{
    "msg": "Not authorized"
}
```

**_Status Code:_** 401

<br>

##### II. Example Request: patch tweet Success

**_Body:_**

```js
{
    "owner":"645b89d45b0bc1d9a10bf9ed",
    "tweetText":"Postmant"


}
```

##### II. Example Response: patch tweet Success

```js
{
    "msg": "Updated",
    "post": {
        "_id": "645c67143b53a43f28c61f91",
        "owner": {
            "_id": "645b89d45b0bc1d9a10bf9ed",
            "email": "sourav.shellbeehaken@gmail.com",
            "username": "sourav",
            "image": "/images/profiles/45b414fa9582a48599ecd8d02.jpeg"
        },
        "tweetImage": null,
        "tweetImages": [],
        "tweetText": "Postmant",
        "likes": 0,
        "likedBy": [],
        "likedByHashMap": {},
        "retweets": 0,
        "retweetedBy": [],
        "retweetedByHashMap": {},
        "comments": 0,
        "commentsList": [],
        "commentByHashMap": {},
        "type": "tweet",
        "nodes": [],
        "createdAt": "2023-05-11T03:55:00.187Z",
        "updatedAt": "2023-05-11T03:55:18.074Z",
        "__v": 0
    }
}
```

**_Status Code:_** 200

<br>

##### III. Example Request: patch tweet not found

**_Body:_**

```js
{
    "owner":"645b89d45b0bc1d9a10bf9ed",
    "tweetText":"Postmant"


}
```

##### III. Example Response: patch tweet not found

```js
{
    "msg": "Post not found"
}
```

**_Status Code:_** 404

<br>

### 5. post Like and unlike tweet

**_Endpoint:_**

```bash
Method: POST
Type: RAW
URL: http://localhost:3000/api/v2/posts/645c775f3b53a43f28c62034/like
```

**_Body:_**

```js
{
    "userid":"645b89d45b0bc1d9a10bf9ed"
}
```

**_More example Requests/Responses:_**

##### I. Example Request: post Like tweet Unliked Success

**_Body:_**

```js
{
    "userid":"645b89d45b0bc1d9a10bf9ed"
}
```

##### I. Example Response: post Like tweet Unliked Success

```js
{
    "tweet": {
        "_id": "645c775f3b53a43f28c62034",
        "owner": {
            "_id": "645b89d45b0bc1d9a10bf9ed",
            "username": "Sourav SBH"
        },
        "tweetText": "Nice kotha",
        "likes": 0,
        "likedBy": [],
        "createdAt": "2023-05-11T05:04:31.006Z",
        "updatedAt": "2023-05-11T08:32:16.720Z",
        "__v": 1
    },
    "likes": 0,
    "status": "Unliked"
}
```

**_Status Code:_** 200

<br>

##### II. Example Request: post Like tweet Liked Success

**_Body:_**

```js
{
    "userid":"645b89d45b0bc1d9a10bf9ed"
}
```

##### II. Example Response: post Like tweet Liked Success

```js
{
    "tweet": {
        "_id": "645c775f3b53a43f28c62034",
        "owner": {
            "_id": "645b89d45b0bc1d9a10bf9ed",
            "username": "Sourav SBH"
        },
        "tweetText": "Nice kotha",
        "likes": 1,
        "likedBy": [
            "645b89d45b0bc1d9a10bf9ed"
        ],
        "createdAt": "2023-05-11T05:04:31.006Z",
        "updatedAt": "2023-05-11T08:32:39.713Z",
        "__v": 1
    },
    "likes": 1,
    "status": "Liked"
}
```

**_Status Code:_** 200

<br>

##### III. Example Request: post Like and unlike tweet Error

**_Body:_**

```js
{
    "userid":"643cf9ec28271f6cc91b53e7"
}
```

##### III. Example Response: post Like and unlike tweet Error

```js
{
    "msg": "Server error"
}
```

**_Status Code:_** 500

<br>

##### IV. Example Request: post Like and unlike tweet Unauthorize

**_Body:_**

```js
{
    "userid":"643cf9ec28271f6cc91b53e7"
}
```

##### IV. Example Response: post Like and unlike tweet Unauthorize

```js
{
    "msg": "Not authorize",
    "users": {}
}
```

**_Status Code:_** 401

<br>

### 6. post tweet

**_Endpoint:_**

```bash
Method: POST
Type: RAW
URL: http://localhost:3000/api/v2/posts
```

**_Body:_**

```js
{
    "owner":"645b89d45b0bc1d9a10bf9ed",
    "tweetText":"Tweet Postman"
}
```

**_More example Requests/Responses:_**

##### I. Example Request: post tweet Success

**_Body:_**

```js
{
    "owner":"643cf9ec28271f6cc91b53e7",
    "tweetText":"Hiiiiii text"
}
```

##### I. Example Response: post tweet Success

```js
{
    "post": {
        "owner": {
            "_id": "643cf9ec28271f6cc91b53e7",
            "email": "edge@gmail.com",
            "username": "Edge",
            "image": "https://api.dicebear.com/5.x/thumbs/svg?radius=50"
        },
        "tweetImage": null,
        "tweetImages": [],
        "tweetText": "Hiiiiii text",
        "likes": 0,
        "likedBy": [],
        "likedByHashMap": {},
        "retweets": 0,
        "retweetedBy": [],
        "retweetedByHashMap": {},
        "comments": 0,
        "commentsList": [],
        "commentByHashMap": {},
        "type": "tweet",
        "nodes": [],
        "_id": "64522abaf7edf3e77684b640",
        "createdAt": "2023-05-03T09:34:50.161Z",
        "updatedAt": "2023-05-03T09:34:50.161Z",
        "__v": 0
    }
}
```

**_Status Code:_** 201

<br>

##### II. Example Request: post tweet Error

**_Body:_**

```js
{
    "owner":"643cf9ec28271f6cc91b53e7",
    "tweetText":""
}
```

##### II. Example Response: post tweet Error

```js
{
    "msg": "Internal server error",
    "error": {
        "errors": {
            "tweetText": {
                "name": "ValidatorError",
                "message": "tweet required",
                "properties": {
                    "message": "tweet required",
                    "type": "required",
                    "path": "tweetText",
                    "value": ""
                },
                "kind": "required",
                "path": "tweetText",
                "value": ""
            }
        },
        "_message": "TweetDBV2 validation failed",
        "name": "ValidationError",
        "message": "TweetDBV2 validation failed: tweetText: tweet required"
    }
}
```

**_Status Code:_** 500

<br>

---

[Back to top](#twitter-clone)
