## WebSocket Documentation

The server uses **WebSockets** to push **live poll updates** to all connected users in real-time.  
We use [Socket.IO](https://socket.io/) under the hood to manage connections and events.

### How It Works

- Clients connect to the WebSocket server (same host/port as the API server).
- Each poll has its own **room** (identified by the poll ID).
- When a client joins a poll room, they will automatically receive all updates related to that poll (e.g., new votes).

### Connecting to the Server

In your frontend, you need to connect to the Socket.IO server.

- In both dev/prod, client must add the `<POLL ID>` as a query params with key `poll` in the websocket url, as it is required by server to push the user into a particular chatroom

- On Connection the client will be put into a `<POLL ID>` Chatroom room, where they will receive the updates on the poll

- On disconnection, the client auto leaves the poll room

```javascript
import { io } from "socket.io-client";

// Replace <POLL_ID> with the actual poll ID
const socket = io("http://localhost:3000?poll=<POOL ID>");
```

### Receiving Updates

On successful connection, the client can then subscribe to

- `poll.update` event to receive updates on the poll
- `poll.vote` event to receive vote updates on the poll
- `poll.delete` event incase the poll gets deleted

```javascript
socket.on("poll.update", (data) => {
  console.log("Poll updated:", data);
});
```

#### Event Types

The event listed below can contains the current messages. For Example

`poll.vote`

```json
{
  "pollId": "74297578-e31e-4984-9071-354ad6827005",
  "vote": {
    "b5d40c5c-cfaf-4810-bdfd-95a413071640": 0,
    "e4964f48-ce5f-4323-90b5-0335eb6ebfed": 1,
    "e3f459aa-d056-4ad8-8458-937be99b247b": 0,
    "cd17d641-307c-4ab3-9966-ece31f23959a": 0
  }
}
```

`poll.update`

```json
{
  "pollId": "74297578-e31e-4984-9071-354ad6827005",
  "data": {
    "id": "74297578-e31e-4984-9071-354ad6827005",
    "ownerId": "aa3834ec-d7de-432a-b062-aa766ba6171d",
    "question": "What will you rate this app",
    "description": null,
    "isPublished": true,
    "createdAt": "2025-09-17T17:21:20.123Z",
    "updatedAt": "2025-09-17T17:21:20.123Z",
    "options": [
      {
        "id": "b5d40c5c-cfaf-4810-bdfd-95a413071640",
        "option": "Below 50"
      },
      {
        "id": "e4964f48-ce5f-4323-90b5-0335eb6ebfed",
        "option": "Above 60"
      },
      {
        "id": "e3f459aa-d056-4ad8-8458-937be99b247b",
        "option": "Below 30"
      },
      {
        "id": "cd17d641-307c-4ab3-9966-ece31f23959a",
        "option": "Above 80"
      },
      {
        "id": "f778a112-8d1a-4afe-8f02-3bd99f6845b9",
        "option": "above 90"
      },
      {
        "id": "fb3dcdc4-408b-4790-8ae1-f8679472d100",
        "option": "below 90 updated 1234"
      }
    ]
  }
}
```

`poll.delete`

```json
{
  "pollId": "c01e0594-fc33-4d66-9efa-37e827997138",
  "data": null
}
```
