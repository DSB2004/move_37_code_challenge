## Authentication API

### Base URL

For local development: http://localhost:3000/auth

#### `POST /auth/login/`

Allow user login

**Request Body:**

```json
{
    "email":<USER EMAIL>,
    "password":<USER PASSWORD>,
    "redirectURL" # For frontend page where the mail will redirect the user

}
```

**Response Body:**

- Success (200 OK)

```json
{
  "accessToken": "eyJhbGciOiJIUzI1NiJ....",
  "refreshToken": "eyJhbGciOiJIUzI1...",
  "message": "Login successful"
}
```

- Incorrect Credentials (400 Bad Request)

```json
{
  "message": "Incorrect credentials for <USER EMAIL>"
}
```

- Account Not Found (404 Not Found)

```json
{
  "message": "No account found for mail <USER EMAIL>"
}
```

- Need Email Verification (403 Forbidden)

```json
{
  "message": "Verification email has been sent <USER EMAIL>"
}
```

#### `POST /auth/signup/`

Allow user signup

**Request Body:**

```json
{
    "email":<USER EMAIL>,
    "password":<USER PASSWORD>,
    "redirectURL" # For frontend page where the mail will redirect the user

}
```

**Response Body:**

- Success (200 OK)

```json
{
  "message": "Account created! Mail sent for <USER EMAIL>"
}
```

- Already existing (400 Bad Request)

```json
{
  "message": "Accopunt for mail <USER EMAIL> already exist"
}
```

#### `POST /verify`

Allow suer email verification

**Request Params:**

```json
{
  "authToken": "eyJhbGciOiJIUzI1NiJ9..."
}
```

**Response Body:**

- Sucess (200 OK)

```json
{
  "accessToken": "eyJhbGciOiJIUzI1NiJ9...",
  "refreshToken": "eyJhbGciOiJIUzI1NiJ9..."
}
```

- Session Expired (403 Forbidden)

```json
{
  "message": "Session expired or token is not valid"
}
```

- Account not Found (404 Not Found)

```json
{
  "message": "Failed! No Account found with email <USER EMAIL>"
}
```

#### `POST /password/forget`

Allow user to create a reset password request

**Request Params:**

```json
{
  "email": "<USER EMAIL>",
  "redirectURL" # For frontend page where the mail will redirect the user
}
```

**Response Body:**

- Sucess (200 OK)

```json
{
  "message": "Verification email has been sent"
}
```

- Account not Found (404 Not Found)

```json
{
  "message": "Failed! No Account found with email <USER EMAIL>"
}
```

#### `POST /password/reset`

Allow reseting password

**Request Params:**

```json
{
  "password": "<USER PASSWORD>",
  "authToken": "eyJhbGciOiJIUzI1NiJ9..."
}
```

**Response Body:**

- Sucess (200 OK)

```json
{
  "message": "Password has been changed successfully"
}
```

- Account not Found (404 Not Found)

```json
{
  "message": "Failed! No Account found with email <USER EMAIL>"
}
```

- Session expired (403 Forbidden)

```json
{
  "message": "Failed! Unable to change password, Session Expired"
}
```
