## User API

### Base URL

For local development: http://localhost:3000/user

#### `GET /search`

Allow user paginated response, allow search on basis of username

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

- Success (200 OK)

```json
{
  "message": "Users list with similar username",
  "users": [
    {
      "username": null,
      "id": "<USER ID>",
      "email": "<USER EMAIL>",
      "createdAt": "timestamp"
    }
  ],
  "total": "<NUMBER>",
  "totalPage": "<NUMBER>",
  "limit": "<NUMBER>",
  "page": "<NUMBER>"
}
```

#### `PATCH /`

Allow updating user details

**Request Body:**

```json
{
  "username": "daman2004",
  "bio": "hello des231431"
}
```

**Response Body:**

- Success (200 OK)

```json
{
  "message": "Account created <USER EMAIL>"
}
```

- Account not Found (404 Not Found)

```json
{
  "message": "Account not found"
}
```

#### `GET /`

Allow fetching user info

**Response Body:**

- Sucess (200 OK)

```json
{
  "message": "Account found damanjeetsingh434@gmail.com",
  "user": {
    "username": "<USERNAME>",
    "id": "<USER ID>",
    "email": "<USER EMAIL>",
    "bio": "<DESCRIPTION>",
    "createdAt": "timestamp"
  }
}
```

- Account not Found (404 Not Found)

```json
{
  "message": "Account not found"
}
```
