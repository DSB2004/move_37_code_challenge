## Vote API

### Base URL

For local development: http://localhost:3000/vote

#### `PUT /:id`

Allow adding or updating user vote

**Request Params:**

```json
{
  "id": "<POLL ID>"
}
```

**Request Body:**

```json
{
  "pollId": "<POLL ID>",
  "optionId": "<OPTION ID>"
}
```

**Response Body:**

- Success (200 OK)

```json
{
  "message": "Vote added/updated"
}
```

#### `GET /:id`

- Allow getting info regarding poll

- Works as a public endpoint

**Request Params:**

```json
{
  "id": "<POLL ID>"
}
```

**Response Body:**

- Success (200 OK)

```json
{
  "message": "Poll found 74297578-e31e-4984-9071-354ad6827005",
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
  },
  "user": "<USER ID>" # User that made the request to allow frontend to check if user has already responsed ,only incase user is logged in
}
```
