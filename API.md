# VOID//SIGNAL — API Reference

## Base URL

```
Development: http://localhost:8000/api/v1
Production:  https://api.void-signal.org/v1
```

## Authentication

API keys via `X-API-Key` header:

```bash
curl -H "X-API-Key: your-key" https://api.void-signal.org/v1/articles
```

Rate limits: Free 100/hr, Pro 10K/hr, Enterprise custom.

## Endpoints

### Health Check

```http
GET /health
```

```json
{
  "status": "healthy",
  "version": "1.0.0",
  "services": {
    "database": "connected",
    "redis": "connected",
    "ingester": "running"
  }
}
```

### List Articles

```http
GET /articles?channel=world&bias_level=low&limit=10
```

| Parameter | Type | Description |
|-----------|------|-------------|
| `channel` | string | world, tech, ai, security, science |
| `bias_level` | string | low, medium, high |
| `source` | string | Filter by source name |
| `q` | string | Full-text search |
| `limit` | integer | Max 100, default 20 |
| `offset` | integer | Default 0 |

```json
{
  "articles": [
    {
      "id": "a1b2c3d4e5f67890",
      "title": "Climate summit reaches agreement",
      "source": "Reuters",
      "channel": "world",
      "bias_score": 0.15,
      "bias_classification": "low",
      "published_at": "2026-07-11T08:30:00Z"
    }
  ],
  "total": 142,
  "has_more": true
}
```

### Get Article

```http
GET /articles/{id}
```

### List Broadcasts

```http
GET /broadcasts
```

### Latest Broadcast

```http
GET /broadcasts/latest
```

### System Stats

```http
GET /stats
```

### Trigger Ingestion

```http
POST /ingest/trigger
```

Body: `{"channels": ["world", "tech"], "limit": 50}`

## Error Codes

| Code | Status | Description |
|------|--------|-------------|
| VALIDATION_ERROR | 400 | Invalid parameters |
| AUTHENTICATION_ERROR | 401 | Invalid API key |
| RATE_LIMIT_ERROR | 429 | Too many requests |
| NOT_FOUND | 404 | Resource not found |

## WebSocket (Planned)

```javascript
const ws = new WebSocket('wss://api.void-signal.org/v1/stream');
ws.onmessage = (e) => console.log(JSON.parse(e.data));
```

---

*API version: 1.0.0 | Last updated: 2026-07-11*
