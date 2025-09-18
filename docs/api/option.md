## Authentication API

### Base URL

For local development: http://localhost:3000/option

#### `POST /`

Allow user to add new option to an existing pool

**Request Body:**

```json
{
  "pollId": "<POOL ID>",
  "options": [{ "option": "<OPTION VALUE>" }]
}
```

**Response Body:**

- Success (200 OK)

```json
{
  "message": "Options created for <POLL ID>"
}
```

- Poll doesn't exist (404 Not Found)

```json
{
  "message": "Poll not found"
}
```

#### `PATCH /{id}`

Allow user to add update existing option

**Request Params:**

```json
{
  "id": "<OPTION ID>"
}
```

**Request Body:**

```json
{
  "option": "<OPTION VALUE>"
}
```

**Response Body:**

- Success (200 OK)

```json
{
  "message": "Option updated <POLL ID>"
}
```

- Option doesn't exist (404 Not Found)

```json
{
  "message": "Option not found"
}
```

#### `DELETE /{id}`

Allow user to delete options for a poll

**Request Params:**

```json
{
  "id": "<OPTION ID>"
}
```

**Response Body:**

- Success (200 OK)

```json
{
  "message": "Options deleted"
}
```

- Option doesn't exist (404 Not Found)

```json
{
  "message": "Option not found"
}
```
