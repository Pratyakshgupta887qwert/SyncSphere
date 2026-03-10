# 🌐 SyncSphere — Global Meeting Sync Engine  
### Schedule once in UTC. See it correctly in every timezone.

**SyncSphere** is a full-stack scheduling platform built to eliminate international time coordination errors. It provides a clean workflow to **create meetings in a single reference timezone (UTC)** and **render them in any local timezone (e.g., IST)** with consistent conversion, storage, and display.

Timezone bugs usually happen when apps store “local time” without context (offset/zone), or when conversions are done inconsistently across UI, API, and database. SyncSphere avoids that by using a strict **UTC normalization strategy** end-to-end.

---

## Table of Contents
- [Problem SyncSphere Solves](#problem-syncsphere-solves)
- [Key Capabilities](#key-capabilities)
- [Tech Stack](#tech-stack)
- [System Architecture](#system-architecture)
- [Setup & Installation](#setup--installation)
  - [Prerequisites](#prerequisites)
  - [Backend Setup (.NET 8)](#backend-setup-net-8)
  - [Frontend Setup (React + Vite)](#frontend-setup-react--vite)
- [API Documentation](#api-documentation)
- [Timezone Engine (UTC Normalization)](#timezone-engine-utc-normalization)
- [Data & Time Handling Guidelines](#data--time-handling-guidelines)
- [Development Notes](#development-notes)
- [Roadmap](#roadmap)
- [License](#license)

---

## Problem SyncSphere Solves

Global scheduling fails in predictable ways:

1. **Ambiguous local time inputs**
   - Example: “02:30” on a DST transition day may occur twice or not at all in some regions.
2. **Inconsistent data storage**
   - Storing “2026-03-10 10:00” without timezone context becomes meaningless across geographies.
3. **Mixed conversion responsibilities**
   - UI converts one way, backend converts another way, DB stores something else → drift and bugs.

**SyncSphere solves these issues by:**
- accepting or normalizing meeting creation into **UTC**
- storing timestamps as **UTC ISO-8601**
- rendering in the user’s selected timezone using a single, consistent conversion utility

---

## Key Capabilities

### 1) Precision Timezone Engine (Luxon)
SyncSphere uses **Luxon** to:
- parse ISO-8601 timestamps reliably
- convert between timezones using explicit zone identifiers
- ensure consistent formatting and display

### 2) Create in UTC, View Anywhere
- Meetings are created using **UTC** as the source-of-truth timezone.
- The dashboard displays those same meeting instants in the user’s local timezone (example: `Asia/Kolkata`).

This design ensures that every user sees the *same instant* represented in their local context.

### 3) Live Conversion Preview
During meeting creation, SyncSphere provides real-time feedback:
- user enters/selects a UTC time
- UI immediately previews the converted local time before saving
- prevents “I thought it was my time” mistakes

### 4) Cloud-Native Persistence (MongoDB Atlas)
Meetings are persisted as documents in MongoDB:
- scalable storage model
- straightforward schemas for meeting metadata
- fast retrieval for dashboard views

### 5) Clean REST API (ASP.NET Core .NET 8)
Backend is built with:
- **ASP.NET Core Web API**
- a clean layering approach:
  - Controllers → request/response boundary
  - Services → business logic + validation
  - Repositories → database operations

This structure keeps time logic consistent and testable.

### 6) Dashboard-First UX
Frontend focuses on fast clarity:
- meeting cards or dashboard views showing local timezone times
- predictable formatting and display rules
- quick create/delete flows with API sync

---

## Tech Stack

| Layer | Technology |
|------|------------|
| Frontend | React.js (Vite), Tailwind CSS, Lucide Icons |
| Time/Date | Luxon |
| HTTP Client | Axios |
| Backend | C# .NET 8, ASP.NET Core Web API |
| Database | MongoDB Atlas |
| API Docs | Swagger UI / OpenAPI |

---

## System Architecture

```text
SyncSphere/
├── Frontend/                 # React + Vite UI
│   ├── src/components/       # UI: Dashboard, SyncModal, MeetingCard (etc.)
│   └── src/utils/            # Timezone conversion utilities (Luxon)
└── Backend/                  # ASP.NET Core Web API
    ├── Controllers/          # REST endpoints
    ├── Services/             # Business logic, validation, orchestration
    ├── Repositories/         # MongoDB queries and persistence
    ├── Models/               # BSON/DTO models and schemas
    └── Settings/             # Configuration (MongoDB options, etc.)
```

---

## Setup & Installation

### Prerequisites
Install the following:
- **Node.js** (LTS recommended)
- **.NET SDK 8.0**
- **MongoDB Atlas** connection string (or local MongoDB instance)

> Keep your connection string secret. Prefer environment variables for production setups.

---

### Backend Setup (.NET 8)

1. Move into the backend directory:
   ```bash
   cd Backend
   ```

2. Configure MongoDB connection
   - Update `appsettings.json` with your MongoDB connection string and database name.
   - If your project supports environment variables, you can store secrets there instead of committing them.

3. Run the API:
   ```bash
   dotnet run
   ```

Backend will be available at:
- `http://localhost:5162`

Swagger UI:
- `http://localhost:5162/swagger`

---

### Frontend Setup (React + Vite)

1. Move into the frontend directory:
   ```bash
   cd Frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

Frontend will be available at:
- `http://localhost:5173`

---

## API Documentation

The backend exposes interactive OpenAPI docs via Swagger:

- `http://localhost:5162/swagger`

Typical endpoints (may vary slightly depending on your controller naming):
- `POST /api/meetings` — Create a meeting sync point
- `GET /api/meetings` — Retrieve all meetings
- `DELETE /api/meetings/{id}` — Delete a meeting by id

**Recommendation:** Use Swagger to validate:
- required payload fields
- response schemas
- example requests

---

## Timezone Engine (UTC Normalization)

SyncSphere uses a simple rule that prevents almost every timezone bug:

> **Store everything in UTC. Convert only for display.**

### Capture (User Input → UTC)
When a meeting time is entered, it is treated as a UTC timestamp (or converted to UTC immediately):

```js
DateTime.fromISO(input, { zone: "UTC" })
```

### Normalize (UTC ISO-8601 Storage)
The meeting instant is stored in the database as a normalized UTC ISO-8601 string.

Examples:
- `2026-03-10T14:30:00.000Z`
- `2026-03-10T09:00:00.000Z`

This guarantees:
- timestamps are comparable and sortable
- backend logic doesn’t depend on server timezone
- multi-region users always reference the same instant

### Localize (UTC → Target Timezone for UI)
When rendering, convert the stored UTC instant into the user’s timezone:

```js
DateTime.fromISO(storedTime).setZone("Asia/Kolkata")
```

You can swap `"Asia/Kolkata"` with any IANA timezone, such as:
- `"America/New_York"`
- `"Europe/London"`
- `"Asia/Tokyo"`

---

## Data & Time Handling Guidelines

To keep behavior correct and predictable across environments:

1. **Never store “local time” without zone context**
   - Avoid storing “10:00 AM” without `Z` or offset info.
2. **Use ISO-8601 consistently**
   - Prefer strings like `2026-03-10T14:30:00.000Z`
3. **Keep conversion logic centralized**
   - Don’t duplicate timezone math in multiple components/files.
4. **Treat database as UTC source of truth**
   - UI is responsible for local display formatting only.
5. **Use IANA timezone identifiers**
   - Example: `Asia/Kolkata` rather than `IST` (acronyms can be ambiguous).

---

## Development Notes

- If you add new features (filters, calendar views, recurring meetings), keep these boundaries:
  - **Frontend:** conversion for display + user interactions
  - **Backend:** validation + persistence + API contracts
  - **Database:** UTC timestamps stored as ISO-8601

- If you add user profiles later, store a user’s preferred timezone as an IANA string (e.g., `America/Los_Angeles`) and render meetings accordingly.

---

## Roadmap

Planned enhancements (optional):
- User accounts + per-user timezone preferences
- Recurring meetings with DST-safe recurrence rules
- Calendar integration (Google / Outlook)
- Conflict detection and availability windows
- Real-time updates (WebSockets / SignalR)

---

## License

Add your license here (MIT, Apache-2.0, etc.).  
Create a `LICENSE` file in the repository root and reference it in this section.
