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

**Request Body:**

```json
{
  "email": "string",
  "password": "string"
}
```

#### POST /auth/register

**Request Body:**

```json
{
  "email": "string",
  "password": "string",
  "password_confirmation": "string",
  "name": "string"
}
```

### Profile

#### GET /profile

#### PUT /profile

**Request Body:**

```json
{
  "name": "string",
  "password": "string",
  "password_confirmation": "string"
}
```

### Company

#### POST /company

**Request Body:**

```json
{
  "name": "string",
  "employees_count_range": ["number", "number"],
  "email": "string",
  "address": "string"
}
```

### Employee Management

#### GET /employee

#### POST /employee

**Request Body:**

```json
{
  "name": "string",
  "email": "string",
  "role": "string",
  "is_admin": "boolean"
}
```

#### PUT /employee/{id}

**Path Parameters:**

- `id` (number, required)

**Request Body:**

```json
{
  "role": "string",
  "is_admin": "boolean"
}
```

#### DELETE /employee/{id}

**Path Parameters:**

- `id` (number, required)

### Location Management

#### GET /location

#### POST /location

**Request Body:**

```json
{
  "name": "string",
  "parent_id": "number"
}
```

#### GET /location/{id}

**Path Parameters:**

- `id` (string, required)

#### PUT /location/{id}

**Path Parameters:**

- `id` (string, required)

**Request Body:**

```json
{
  "name": "string",
  "parent_id": "number"
}
```

#### DELETE /location/{id}

**Path Parameters:**

- `id` (string, required)

### Asset Management

#### POST /asset

**Request Body:**

```json
{
  "category_id": "number",
  "location_id": "number",
  "name": "string"
}
```

#### GET /asset

#### GET /asset/{code}

**Path Parameters:**

- `code` (string, required)

#### PUT /asset/{code}

**Path Parameters:**

- `code` (string, required)

**Request Body:**

```json
{
  "category_id": "number",
  "location_id": "number",
  "name": "string"
}
```

#### DELETE /asset/{code}

**Path Parameters:**

- `code` (string, required)

### Parts Management

#### POST /part

**Request Body:**

```json
{
  "name": "string",
  "quantity": "number",
  "price": "number",
  "location_id": "number"
}
```

#### GET /part

#### GET /part/{code}

**Path Parameters:**

- `code` (string, required)

#### PUT /part/{code}

**Path Parameters:**

- `code` (string, required)

**Request Body:**

```json
{
  "name": "string",
  "quantity": "number",
  "price": "number",
  "location_id": "number"
}
```

#### DELETE /part/{code}

**Path Parameters:**

- `code` (string, required)

### Preventive Maintenance

#### POST /preventive-maintenance

**Request Body:**

```json
{
  "frequency": "string",
  "asset_id": "string",
  "description": "string",
  "last_service_at": "Date|string|number",
  "next_service_at": "Date|string|number"
}
```

#### GET /preventive-maintenance

#### GET /preventive-maintenance/{id}

**Path Parameters:**

- `id` (number, required)

#### PUT /preventive-maintenance/{id}

**Path Parameters:**

- `id` (number, required)

**Request Body:**

```json
{
  "frequency": "string",
  "asset_id": "string",
  "description": "string",
  "last_service_at": "Date|string|number",
  "next_service_at": "Date|string|number"
}
```

#### DELETE /preventive-maintenance/{id}

**Path Parameters:**

- `id` (number, required)

### Work Orders

#### POST /work-order

**Request Body:**

```json
{
  "asset_id": "string",
  "description": "string",
  "priority": "string",
  "type": "string"
}
```

#### GET /work-order

#### GET /work-order/{id}

**Path Parameters:**

- `id` (number, required)

#### PUT /work-order/{id}

**Path Parameters:**

- `id` (number, required)

**Request Body:**

```json
{
  "assigned_to": "number",
  "due_at": "Date|string|number",
  "status": "string",
  "description": "string",
  "priority": "string"
}
```

#### DELETE /work-order/{id}

**Path Parameters:**

- `id` (number, required)

#### PUT /work-order/{id}/assign

**Path Parameters:**

- `id` (number, required)

**Request Body:**

```json
{
  "assigned_to": "number",
  "due_at": "Date|string|number"
}
```

### Work Order Used Parts

#### POST /work-order/{id}/used-part

**Path Parameters:**

- `id` (number, required)

**Request Body:**

```json
{
  "part_id": "number",
  "quantity": "number"
}
```

#### GET /work-order/{id}/used-part

**Path Parameters:**

- `id` (number, required)

#### PUT /work-order/{id}/used-part/{usedPartId}

**Path Parameters:**

- `id` (number, required)
- `usedPartId` (number, required)

### Health Check

#### GET /check-health

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
