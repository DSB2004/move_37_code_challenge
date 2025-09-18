# API Documentation

This document outlines the available API endpoints, expected request/response structures, and authentication requirements

---

## API Status Codes Reference

This section explains common HTTP status codes used across the backend.

| Status Code          | Meaning              | Description                                                                   |
| -------------------- | -------------------- | ----------------------------------------------------------------------------- |
| **200 OK**           | Success              | The request was processed successfully and a valid response is returned.      |
| **201 Created**      | Resource Created     | The request was successful and a new resource has been created.               |
| **400 Bad Request**  | Invalid Input        | The request is malformed or required fields are missing/invalid.              |
| **401 Unauthorized** | Access Token Expired | Authentication failed due to missing or expired access token.                 |
| **403 Forbidden**    | Access Denied        | The request is understood but not allowed. The user lacks proper permissions. |

- Incase of **401** error code, user would have to re-login to continue

## Route Protection

- The application uses **Access Tokens** and **Refresh Tokens** to authenticate requests and retrieve user information.
- Certain routes (e.g., `/auth`) are **public** and do not require tokens.
- All other **protected routes** require a valid **Access Token** in the request headers.
- The **Access Token** is sent as `access_token` and the **Refresh Token** as `refresh_token`.
- The **Access Token** is valid for **15 minutes**, while the **Refresh Token** is valid for **7 days**.
- If the **Access Token** is expired, the server will attempt to validate it using the **Refresh Token**.
- On successful validation, the server issues **new tokens** (both Access and Refresh), which are returned in the response headers.
- The **client application** must update its stored tokens with these new values to maintain a valid session.
- If both tokens are invalid or expired, the client must prompt the user to re-authenticate (login again).

## Know More

- [Authentication API Documentation](./auth.md)
- [User API Documentation](./user.md)
- [Poll API Documentation](./poll.md)
- [Vote API Documentation](./vote.md)
- [Option API Documentation](./option.md)
- [Socket Documentation](./socket.md)
