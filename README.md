# Maintena Backend

A comprehensive maintenance management system backend built with Elysia.js, TypeORM, and MySQL. This API provides endpoints for managing assets, work orders, preventive maintenance, employees, locations, parts, and more.

## Features

- **Asset Management**: Track and manage company assets
- **Work Order System**: Create, assign, and track maintenance work orders
- **Preventive Maintenance**: Schedule and manage preventive maintenance tasks
- **Employee Management**: Manage company employees and roles
- **Location Tracking**: Organize assets by locations
- **Parts Inventory**: Manage spare parts and inventory
- **AI Chat Integration**: Integrated chat system for maintenance assistance
- **Authentication & Authorization**: Secure user authentication with role-based access

## Tech Stack

- **Framework**: Elysia.js
- **Database**: MySQL with TypeORM
- **Runtime**: Bun
- **Authentication**: JWT with bcrypt
- **AI Integration**: LlamaIndex with OpenAI
- **Validation**: Zod schemas
- **Logging**: Winston

## Getting Started

### Prerequisites

- Bun runtime
- MySQL database
- Node.js (for TypeORM CLI if needed)

### Installation

1. Clone the repository:

```bash
git clone <repository-url>
cd maintena-backend
```

2. Install dependencies:

```bash
bun install
```

3. Set up environment variables:
   Copy `.env.example` to `.env` and configure your database and other settings.

4. Run database migrations/seeding:

```bash
bun run seed
```

5. Start the development server:

```bash
bun run dev
```

The server will start on `http://localhost:3000` (or as configured).

## Scripts

- `bun run dev`: Start development server with hot reload
- `bun run seed`: Run database seeders
- `bun run format`: Format code with Prettier

## API Documentation

### Authentication

#### POST /auth/login

Authenticate user and return access token.

**Body:**

```json
{
  "email": "user@example.com",
  "password": "password"
}
```

#### POST /auth/register

Register a new user account.

**Body:**

```json
{
  "email": "user@example.com",
  "password": "password",
  "password_confirmation": "password",
  "name": "User Name"
}
```

### Company

#### POST /company

Create a new company (requires authentication).

**Body:**

```json
{
  "name": "Company Name",
  "description": "Company description"
}
```

### Profile

#### GET /profile

Get current user profile information.

#### PUT /profile

Update current user profile.

**Body:**

```json
{
  "name": "Updated Name",
  "email": "newemail@example.com"
}
```

### Employee Management

#### GET /employee

Get all employees for the company.

#### POST /employee

Register a new employee (company owner only).

**Body:**

```json
{
  "name": "Employee Name",
  "email": "employee@example.com",
  "password": "password",
  "role": "technician"
}
```

#### PUT /employee/:id

Update employee information (company owner only).

#### DELETE /employee/:id

Delete an employee (company owner only).

### Asset Management

#### POST /asset

Create a new asset.

**Body:**

```json
{
  "code": "ASSET001",
  "name": "Asset Name",
  "description": "Asset description",
  "location_id": 1,
  "category_id": 1
}
```

#### GET /asset

Get all assets for the company.

#### GET /asset/:code

Get specific asset by code.

#### PUT /asset/:code

Update asset information.

#### DELETE /asset/:code

Delete an asset.

### Location Management

#### GET /location

Get all locations for the company.

#### POST /location

Create a new location.

**Body:**

```json
{
  "name": "Location Name",
  "description": "Location description",
  "address": "Location address"
}
```

#### GET /location/:id

Get specific location by ID.

#### PUT /location/:id

Update location information.

#### DELETE /location/:id

Delete a location.

### Parts Management

#### POST /part

Create a new part.

**Body:**

```json
{
  "code": "PART001",
  "name": "Part Name",
  "description": "Part description",
  "quantity": 100,
  "price": 50.0
}
```

#### GET /part

Get all parts for the company.

#### GET /part/:code

Get specific part by code.

#### PUT /part/:code

Update part information.

#### DELETE /part/:code

Delete a part.

### Preventive Maintenance

#### POST /preventive-maintenance

Create a preventive maintenance schedule.

**Body:**

```json
{
  "asset_id": 1,
  "title": "Monthly Inspection",
  "description": "Regular maintenance check",
  "schedule_type": "monthly",
  "next_due_date": "2024-02-01"
}
```

#### GET /preventive-maintenance

Get all preventive maintenance schedules.

#### GET /preventive-maintenance/:id

Get specific preventive maintenance by ID.

#### PUT /preventive-maintenance/:id

Update preventive maintenance schedule.

#### DELETE /preventive-maintenance/:id

Delete a preventive maintenance schedule.

### Work Orders

#### POST /work-order

Create a new work order.

**Body:**

```json
{
  "asset_id": 1,
  "title": "Repair Issue",
  "description": "Fix broken component",
  "priority": "high",
  "due_date": "2024-01-15"
}
```

#### GET /work-order

Get all work orders for the company.

#### GET /work-order/:id

Get specific work order by ID.

#### PUT /work-order/:id

Update work order information.

#### PUT /work-order/:id/assign

Assign work order to an employee.

**Body:**

```json
{
  "employee_id": 2
}
```

#### DELETE /work-order/:id

Delete a work order.

### Work Order Used Parts

#### POST /work-order/:id/used-part

Add a used part to a work order.

**Body:**

```json
{
  "part_code": "PART001",
  "quantity": 2
}
```

#### GET /work-order/:id/used-part

Get all used parts for a work order.

#### PUT /work-order/:id/used-part/:usedPartId

Update used part quantity.

**Body:**

```json
{
  "quantity": 3
}
```

#### DELETE /work-order/:id/used-part/:usedPartId

Remove a used part from work order.

### Chat

#### POST /chat

Send a message to the AI chat system for maintenance assistance.

**Body:**

```json
{
  "message": "How do I fix a broken pump?"
}
```

### Health Check

#### GET /check-health

Check API health status.

## Database Schema

The application uses TypeORM entities for the following models:

- User
- Company
- Employee
- Asset
- AssetCategory
- Location
- Part
- WorkOrder
- WorkOrderUsedPart
- PreventiveMaintenance

## Authentication

The API uses JWT tokens for authentication. Include the token in the Authorization header:

```
Authorization: Bearer <your-jwt-token>
```

Some endpoints require specific roles (e.g., company owner for employee management).

## Error Handling

The API returns standardized error responses with appropriate HTTP status codes and error messages.
