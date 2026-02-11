## User Routes

### `POST /api/v1/user/login`

- **Description:** Logs in a user.
- **Access:** Public
- **Request Body:**
  ```json
  {
    "email": "user@example.com",
    "password": "password123"
  }
  ```
- **Response:**
  ```json
  {
    "status": "success",
    "message": "Logged in successfully.",
    "accessToken": "your_access_token",
    "user": {
      "id": "user_id",
      "email": "user@example.com",
      "username": "username"
    }
  }
  ```

### `GET /api/v1/user/logout`

- **Description:** Logs out a user.
- **Access:** Private (Requires authentication)
- **Response:**
  ```json
  {
    "message": "Logged out successfully"
  }
  ```
