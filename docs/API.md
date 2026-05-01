# API Documentation

## Base URL

- Development: `http://localhost:3001/api`
- Production: `https://api.your-domain.com/api`

## Authentication

All requests should include the API key in headers (future implementation):

```
Authorization: Bearer YOUR_API_KEY
```

## Endpoints

### Health Check

```http
GET /health
```

**Response:**
```json
{
  "status": "ok",
  "message": "PMO Backend API is running",
  "timestamp": "2024-05-01T12:00:00Z"
}
```

---

### Messages

#### Get Messages

```http
GET /messages?chat_id=CHAT_ID&limit=10
```

**Response:**
```json
{
  "success": true,
  "count": 10,
  "messages": [
    {
      "id": "msg-123",
      "chat_id": "chat-456",
      "content": "Hello!",
      "direction": "incoming",
      "timestamp": "2024-05-01T12:00:00Z",
      "read": true
    }
  ]
}
```

#### Send Message

```http
POST /messages
Content-Type: application/json

{
  "chat_id": "chat-456",
  "content": "Hello back!",
  "direction": "outgoing"
}
```

**Response:**
```json
{
  "success": true,
  "message": {
    "id": "msg-789",
    "chat_id": "chat-456",
    "content": "Hello back!",
    "direction": "outgoing",
    "timestamp": "2024-05-01T12:00:00Z"
  }
}
```

---

### Chats

#### Get Chats

```http
GET /chats?user_id=USER_ID
```

#### Get Chat Detail

```http
GET /chats/CHAT_ID
```

#### Create Chat

```http
POST /chats
Content-Type: application/json

{
  "user_id": "user-123",
  "contact_name": "John Doe",
  "priority": "medium"
}
```

---

### AI Features

#### Get Reply Suggestions

```http
POST /ai/suggest-reply
Content-Type: application/json

{
  "message": "What time is the meeting?",
  "contact_name": "Alice",
  "tone": "formal"
}
```

**Response:**
```json
{
  "success": true,
  "suggestions": [
    "The meeting is at 3 PM.",
    "We'll meet at 3 PM today.",
    "3 PM as per the schedule."
  ]
}
```

#### Summarize Chat

```http
POST /ai/summarize
Content-Type: application/json

{
  "chat_id": "chat-456"
}
```

---

### Automations

#### Get Automations

```http
GET /automations?user_id=USER_ID
```

#### Create Automation

```http
POST /automations
Content-Type: application/json

{
  "user_id": "user-123",
  "trigger_type": "keyword",
  "condition": "hello",
  "action": "send_predefined_message",
  "enabled": true
}
```

---

### Scheduled Messages

#### Get Scheduled Messages

```http
GET /scheduled-messages?user_id=USER_ID
```

#### Schedule Message

```http
POST /scheduled-messages
Content-Type: application/json

{
  "chat_id": "chat-456",
  "content": "Good morning!",
  "send_at": "2024-05-02T08:00:00Z"
}
```

---

## Error Handling

All errors follow this format:

```json
{
  "success": false,
  "error": "Error description"
}
```

### Common Status Codes

- `200` - OK
- `201` - Created
- `400` - Bad Request
- `401` - Unauthorized
- `404` - Not Found
- `500` - Server Error

---

## Rate Limiting

- 100 requests per minute per user
- 1000 requests per hour per user

---

## Webhooks

Optional webhook support for real-time events:

```
POST https://your-domain.com/webhook
X-PMO-Signature: signature

{
  "event": "message.received",
  "data": { ... }
}
```

Events:
- `message.received`
- `message.sent`
- `automation.triggered`
- `ai.suggestion_requested`
