## Poll API

### Base URL

For local development: http://localhost:3000/poll

#### `POST /`

Allow creating new poll

**Request Body:**

```json
{
  "question": "<YOUR QUESTION>",
  "options": [
    {
      "option": "<YOUR OPTION>"
    }
  ]
}
```

**Response Body:**

- Success (201 CREATED)

```json
{
  "message": "Poll Created <POLL ID>"
}
```

- Account Not Found (404 Not Found)

```json
{
  "message": "No account found for mail <USER EMAIL>"
}
```

#### `PATCH /{id}`

Allow updating poll

**Request Params:**

```json
{
  "id": "<POLL ID>"
}
```

**Request Body:**

```json
{
  "id": "<POLL ID>",
  "question": "<YOUR QUESTION>",
  "description": "<YOUR QUESTION DESCRIPTION>",
  "isPublished": "boolean"
}
```

**Response Body:**

- Success (200 OK)

```json
{
  "message": "Poll updated <POLL ID>"
}
```

- Poll not Found (404 Not Found)

```json
{
  "message": "Poll not found"
}
```

#### `GET /{id}`

Allow fetching poll info

**Request Params:**

```json
{
  "id": "<POLL ID>"
}
```

**Response Body:**

- Sucess (200 OK)

```json
{
  "message": "Poll found <POLL ID>",
  "poll": {
    "id": "<POLL ID>",
    "ownerId": "<ONWER ID>",
    "question": "<POLL QUESTION>",
    "description": "any description",
    "isPublished": "boolean whether the poll is published or not",
    "createdAt": "timestamp",
    "updatedAt": "timestamp",
    "options": [
      {
        "id": "<OPTION ID>",
        "option": "<VALUE>"
      }
    ],
    "replies": [
      {
        "option": {
          "id": "<OPTION ID>"
        },
        "user": {
          "username": "<USERNAME>",
          "id": "<USER ID>"
        }
      }
    ]
  }
}
```

- Poll not Found (404 Not Found)

```json
{
  "message": "Poll not found"
}
```

#### `GET /`

Allow user to fetch all poll created by them ,supports pagination

**Request Query:**

```json
{
  "q": "<SEARCH QUERY>" # to get poll with question including this (OPTIONAL),
  "page":"<PAGE NUMBER>" (OPTIONAL),
  "limit":"<PAGE SIZE>" (OPTIONAL)
}
```

**Response Body:**

- Sucess (200 OK)

```json
{
  "message": "Polls found",
  "page": <PAGE NUMBER>,
  "limit": <PAGE SIZE>,
  "total": <TOTAL POLL>,
  "totalPages": <TOTAL PAGES>,
  "data": [
    {
      "id": "<POLL ID>",
      "ownerId": "<ONWER ID>",
      "question": "<POLL QUESTION>",
      "description": "any description",
      "isPublished": "boolean whether the poll is published or not",
      "createdAt": "timestamp",
      "updatedAt": "timestamp",
      "options": [
        {
          "id": "<OPTION ID>",
          "option": "<VALUE>"
        }
      ],
      "replies": [
      {
        "option": {
          "id": "<OPTION ID>"
        },
        "user": {
          "username": "<USERNAME>",
          "id": "<USER ID>"
        }
      }
    ]
    }
  ]
}
```

#### `POST /{id}/share`

Allow user to share poll invite with other users

- Server will auto add the poll id at back of redirect url

- For Example: http://localhost:3000/vote -> http://localhost:3000/vote/74297578-e31e-4984-9071-354ad6827005

**Request Params:**

```json
{
  "id": "<POLL ID>"
}
```

**Request Body:**

```json
{
  "list": [
    {
      "userId": "<USER TO SHARE>"
    }
  ],
  "redirectURL": "<FRONTEND URL WHERE TO REDIRECT USER>"
}
```

**Response Body:**

- Sucess (200 OK)

```json
{
  "message": "Poll deleted <POLL ID>"
}
```

- Poll not Found (404 Not Found)

```json
{
  "message": "Poll not found"
}
```

#### `DELETE /{id}`

Allow user to delete poll

**Request Params:**

```json
{
  "id": "<POLL ID>"
}
```

**Response Body:**

- Sucess (200 OK)

```json
{
  "message": "Poll deleted <POLL ID>"
}
```

- Poll not Found (404 Not Found)

```json
{
  "message": "Poll not found"
}
```
