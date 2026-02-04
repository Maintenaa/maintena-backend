# API Documentation - Maintena Backend

Dokumentasi ini menyediakan panduan lengkap untuk Frontend Developer dalam mengintegrasikan aplikasi dengan API Maintena. Setiap endpoint mencakup informasi Authorization, Request Parameters, Request Body, dan Response Format.

---

## Table of Contents

1. [Authentication Module](#authentication-module)
   - [POST /auth/login](#post-authlogin)
   - [POST /auth/register](#post-authregister)
2. [Profile Module](#profile-module)
   - [GET /profile](#get-profile)
   - [PUT /profile](#put-profile)
3. [Company Module](#company-module)
   - [POST /company](#post-company)
4. [User Module](#user-module)
   - [POST /user](#post-user)
   - [PUT /user/:id](#put-userid)
5. [Asset Module](#asset-module)
   - [POST /asset](#post-asset)
   - [GET /asset](#get-asset)
   - [GET /asset/:code](#get-assetcode)
   - [PUT /asset/:code](#put-assetcode)
   - [DELETE /asset/:code](#delete-assetcode)
6. [Location Module](#location-module)
   - [GET /location](#get-location)
   - [POST /location](#post-location)
   - [GET /location/:id](#get-locationid)
   - [PUT /location/:id](#put-locationid)
   - [DELETE /location/:id](#delete-locationid)
7. [Part Module](#part-module)
   - [POST /part](#post-part)
   - [GET /part](#get-part)
   - [GET /part/:code](#get-partcode)
   - [PUT /part/:code](#put-partcode)
   - [DELETE /part/:code](#delete-partcode)
8. [Employee Module](#employee-module)
   - [GET /employee](#get-employee)
   - [POST /employee](#post-employee)
   - [PUT /employee/:id](#put-employeeid)
   - [DELETE /employee/:id](#delete-employeeid)
9. [General Information](#general-information)

---

## Authentication Module

### POST /auth/login

Melakukan autentikasi pengguna dan mengembalikan access token serta refresh token.

**Authorization:** Tidak diperlukan (Public endpoint)

**Request Headers:**

| Header       | Type   | Required | Description                |
| ------------ | ------ | -------- | -------------------------- |
| Content-Type | String | Yes      | Must be `application/json` |

**Request Body:**

```json
{
  "email": "string",
  "password": "string"
}
```

| Field    | Type   | Required | Validation                 | Description                   |
| -------- | ------ | -------- | -------------------------- | ----------------------------- |
| email    | String | Yes      | Must be valid email format | Email pengguna yang terdaftar |
| password | String | Yes      | Min 1 character            | Password pengguna             |

**Example Request:**

```bash
curl -X POST http://localhost:3000/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "john@example.com",
    "password": "securepassword123"
  }'
```

**Success Response (200 OK):**

```json
{
  "message": "Successfully signed in",
  "user": {
    "id": 1,
    "name": "John Doe",
    "email": "john@example.com",
    "is_superadmin": false,
    "created_at": "2025-01-15T10:30:00.000Z",
    "updated_at": "2025-01-15T10:30:00.000Z"
  },
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "refresh_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

| Field              | Type     | Description                                                 |
| ------------------ | -------- | ----------------------------------------------------------- |
| message            | String   | Status message dari response                                |
| user               | Object   | Data user yang berhasil login                               |
| user.id            | Number   | Unique ID user                                              |
| user.name          | String   | Nama lengkap user                                           |
| user.email         | String   | Email user                                                  |
| user.is_superadmin | Boolean  | Flag untuk superadmin user                                  |
| user.created_at    | DateTime | Timestamp pembuatan akun                                    |
| user.updated_at    | DateTime | Timestamp terakhir update                                   |
| access_token       | String   | JWT token untuk authentication (expired dalam 1 hari)       |
| refresh_token      | String   | JWT token untuk refresh access token (expired dalam 7 hari) |

**Error Response (401 Unauthorized):**

```json
{
  "message": "Email or password incorrect"
}
```

---

### POST /auth/register

Mendaftarkan pengguna baru dan langsung melakukan login otomatis.

**Authorization:** Tidak diperlukan (Public endpoint)

**Request Headers:**

| Header       | Type   | Required | Description                |
| ------------ | ------ | -------- | -------------------------- |
| Content-Type | String | Yes      | Must be `application/json` |

**Request Body:**

```json
{
  "email": "string",
  "password": "string",
  "password_confirmation": "string",
  "name": "string"
}
```

| Field                 | Type   | Required | Validation                         | Description                    |
| --------------------- | ------ | -------- | ---------------------------------- | ------------------------------ |
| email                 | String | Yes      | Must be valid email format, unique | Email pengguna baru            |
| password              | String | Yes      | Min 8 characters                   | Password baru (min 8 karakter) |
| password_confirmation | String | Yes      | Must match password                | Konfirmasi password            |
| name                  | String | Yes      | Min 1 character                    | Nama lengkap pengguna          |

**Example Request:**

```bash
curl -X POST http://localhost:3000/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "newuser@example.com",
    "password": "securepassword123",
    "password_confirmation": "securepassword123",
    "name": "New User"
  }'
```

**Success Response (200 OK):**

```json
{
  "message": "Successfully registered account",
  "user": {
    "id": 2,
    "name": "New User",
    "email": "newuser@example.com",
    "is_superadmin": false,
    "created_at": "2025-01-15T11:00:00.000Z",
    "updated_at": "2025-01-15T11:00:00.000Z"
  },
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "refresh_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

| Field         | Type   | Description                                      |
| ------------- | ------ | ------------------------------------------------ |
| message       | String | Status message "Successfully registered account" |
| user          | Object | Data user yang baru dibuat                       |
| access_token  | String | JWT token untuk authentication                   |
| refresh_token | String | JWT token untuk refresh                          |

**Error Response (401 Unauthorized):**

```json
{
  "message": "Email already registered"
}
```

**Error Response (400 Bad Request):**

```json
{
  "message": "Confirmation password doesn't match"
}
```

---

## Profile Module

### GET /profile

Mengambil data profil pengguna yang sedang login.

**Authorization:** Diperlukan - Bearer Token

**Request Headers:**

| Header        | Type   | Required | Description                |
| ------------- | ------ | -------- | -------------------------- |
| Authorization | String | Yes      | `Bearer <access_token>`    |
| Content-Type  | String | Yes      | Must be `application/json` |

**Example Request:**

```bash
curl -X GET http://localhost:3000/profile \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
```

**Success Response (200 OK):**

```json
{
  "profile": {
    "id": 1,
    "name": "John Doe",
    "email": "john@example.com",
    "is_superadmin": false,
    "created_at": "2025-01-15T10:30:00.000Z",
    "updated_at": "2025-01-15T10:30:00.000Z",
    "employee": {
      "id": 1,
      "role": "OWNER",
      "is_owner": true,
      "company": {
        "id": 1,
        "code": "uuid-string-here",
        "name": "PT Maju Bersama",
        "email": "contact@majubersama.com",
        "address": "Jl. Sudirman No. 123",
        "employees_count_range": [10, 50]
      }
    }
  }
}
```

| Field                                          | Type     | Description                               |
| ---------------------------------------------- | -------- | ----------------------------------------- |
| profile                                        | Object   | Data lengkap profil user                  |
| profile.id                                     | Number   | Unique ID user                            |
| profile.name                                   | String   | Nama lengkap user                         |
| profile.email                                  | String   | Email user                                |
| profile.is_superadmin                          | Boolean  | Flag superadmin                           |
| profile.created_at                             | DateTime | Timestamp pembuatan akun                  |
| profile.updated_at                             | DateTime | Timestamp update                          |
| profile.employee                               | Object   | Data employee (jika ada)                  |
| profile.employee.id                            | Number   | ID employee                               |
| profile.employee.role                          | String   | Peran employee (OWNER, ADMIN, STAFF, dll) |
| profile.employee.is_owner                      | Boolean  | Apakah owner company                      |
| profile.employee.company                       | Object   | Data company                              |
| profile.employee.company.id                    | Number   | ID company                                |
| profile.employee.company.code                  | String   | Unique code company (UUID)                |
| profile.employee.company.name                  | String   | Nama company                              |
| profile.employee.company.email                 | String   | Email company                             |
| profile.employee.company.address               | String   | Alamat company                            |
| profile.employee.company.employees_count_range | Array    | Range jumlah employee                     |

**Error Response (401 Unauthorized):**

```json
{
  "message": "Silahkan login terlebih dahulu"
}
```

---

### PUT /profile

Mengupdate data profil pengguna.

**Authorization:** Diperlukan - Bearer Token

**Request Headers:**

| Header        | Type   | Required | Description                |
| ------------- | ------ | -------- | -------------------------- |
| Authorization | String | Yes      | `Bearer <access_token>`    |
| Content-Type  | String | Yes      | Must be `application/json` |

**Request Body:**

```json
{
  "name": "string",
  "password": "string",
  "password_confirmation": "string"
}
```

| Field                 | Type   | Required | Validation          | Description                        |
| --------------------- | ------ | -------- | ------------------- | ---------------------------------- |
| name                  | String | Yes      | Min 1 character     | Nama lengkap baru                  |
| password              | String | No       | Min 8 characters    | Password baru (jika ingin diganti) |
| password_confirmation | String | No       | Must match password | Konfirmasi password baru           |

**Example Request:**

```bash
curl -X PUT http://localhost:3000/profile \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..." \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Updated",
    "password": "newpassword123",
    "password_confirmation": "newpassword123"
  }'
```

**Success Response (200 OK):**

```json
{
  "message": "Berhasil mengupdate profil",
  "id": 1,
  "name": "John Updated",
  "email": "john@example.com",
  "is_superadmin": false,
  "created_at": "2025-01-15T10:30:00.000Z",
  "updated_at": "2025-01-15T12:00:00.000Z"
}
```

| Field         | Type     | Description                                 |
| ------------- | -------- | ------------------------------------------- |
| message       | String   | Status message "Berhasil mengupdate profil" |
| id            | Number   | ID user yang diupdate                       |
| name          | String   | Nama terbaru                                |
| email         | String   | Email (tidak berubah)                       |
| is_superadmin | Boolean  | Flag superadmin                             |
| created_at    | DateTime | Timestamp pembuatan akun                    |
| updated_at    | DateTime | Timestamp update terbaru                    |

**Error Response (401 Unauthorized):**

```json
{
  "message": "Silahkan login terlebih dahulu"
}
```

**Error Response (400 Bad Request):**

```json
{
  "message": "password konfirmasi tidak sama"
}
```

---

## Company Module

### POST /company

Membuat company baru dan menjadikan user yang login sebagai owner.

**Authorization:** Diperlukan - Bearer Token

**Request Headers:**

| Header        | Type   | Required | Description                |
| ------------- | ------ | -------- | -------------------------- |
| Authorization | String | Yes      | `Bearer <access_token>`    |
| Content-Type  | String | Yes      | Must be `application/json` |

**Request Body:**

```json
{
  "name": "string",
  "employees_count_range": [number, number],
  "email": "string",
  "address": "string"
}
```

| Field                 | Type   | Required | Validation        | Description                      |
| --------------------- | ------ | -------- | ----------------- | -------------------------------- |
| name                  | String | Yes      | Min 1 character   | Nama company                     |
| employees_count_range | Array  | Yes      | Exactly 2 numbers | Range jumlah employee [min, max] |
| email                 | String | Yes      | Valid email       | Email company                    |
| address               | String | Yes      | Min 1 character   | Alamat company                   |

**Example Request:**

```bash
curl -X POST http://localhost:3000/company \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..." \
  -H "Content-Type: application/json" \
  -d '{
    "name": "PT Maju Bersama",
    "employees_count_range": [10, 50],
    "email": "contact@majubersama.com",
    "address": "Jl. Sudirman No. 123, Jakarta Pusat"
  }'
```

**Success Response (200 OK):**

```json
{
  "message": "Berhasil membuat perusahaan",
  "company": {
    "id": 1,
    "code": "a1b2c3d4-e5f6-7890-abcd-ef1234567890",
    "name": "PT Maju Bersama",
    "employees_count_range": [10, 50],
    "email": "contact@majubersama.com",
    "address": "Jl. Sudirman No. 123, Jakarta Pusat",
    "created_at": "2025-01-15T10:00:00.000Z",
    "updated_at": "2025-01-15T10:00:00.000Z",
    "owner": {
      "id": 1,
      "name": "John Doe",
      "email": "john@example.com"
    }
  }
}
```

| Field                         | Type     | Description                                  |
| ----------------------------- | -------- | -------------------------------------------- |
| message                       | String   | Status message "Berhasil membuat perusahaan" |
| company                       | Object   | Data company yang dibuat                     |
| company.id                    | Number   | Unique ID company                            |
| company.code                  | String   | Unique code company (UUID v4)                |
| company.name                  | String   | Nama company                                 |
| company.employees_count_range | Array    | Range jumlah employee                        |
| company.email                 | String   | Email company                                |
| company.address               | String   | Alamat company                               |
| company.created_at            | DateTime | Timestamp pembuatan company                  |
| company.updated_at            | DateTime | Timestamp update                             |
| company.owner                 | Object   | Data owner company                           |
| company.owner.id              | Number   | ID user owner                                |
| company.owner.name            | String   | Nama owner                                   |
| company.owner.email           | String   | Email owner                                  |

**Error Response (401 Unauthorized):**

```json
{
  "message": "Silahkan login terlebih dahulu"
}
```

---

## General Information

### Token Usage

**Access Token:**

- Berlaku selama 1 hari (24 jam)
- Digunakan untuk mengakses endpoint yang memerlukan authorization
- Expired token akan menghasilkan response 401

**Refresh Token:**

- Berlaku selama 7 hari
- Digunakan untuk mendapatkan access token baru tanpa perlu login ulang
- Disimpan dalam cookie dengan flag httpOnly untuk keamanan

**Authorization Header Format:**

```
Authorization: Bearer <access_token>
```

### HTTP Status Codes

| Code | Description                             |
| ---- | --------------------------------------- |
| 200  | Success                                 |
| 201  | Created (resource successfully created) |
| 400  | Bad Request (validation error)          |
| 401  | Unauthorized (invalid or missing token) |
| 404  | Not Found (resource tidak ditemukan)    |
| 500  | Internal Server Error                   |

### Error Response Format

```json
{
  "message": "Error description here"
}
```

### Security Schemes

| Scheme       | Type   | Description                                  |
| ------------ | ------ | -------------------------------------------- |
| Bearer Auth  | JWT    | Standard Bearer token authentication         |
| Company Auth | Header | Company code header for multi-tenant support |

**Company Code Header:**

```
Company-Code: <company_uuid>
```

Digunakan untuk operasi yang memerlukan konteks company pada endpoint lain.

### Response Field Data Types

| Type     | Description                        |
| -------- | ---------------------------------- |
| String   | Text field                         |
| Number   | Integer or float                   |
| Boolean  | true or false                      |
| Array    | List of values                     |
| DateTime | ISO 8601 timestamp format          |
| Object   | Nested data structure              |
| UUID     | Universally Unique Identifier (v4) |

### Best Practices for Frontend

1. **Simpan Token:**
   - access_token: localStorage atau memory (berkurang saat refresh page)
   - refresh_token: httpOnly cookie (di-handle oleh backend)

2. **Error Handling:**
   - Selalu tangani response 401 dengan redirect ke halaman login
   - Tampilkan message error yang user-friendly

3. **Request Validation:**
   - Validasi form sebelum mengirim request
   - Tampilkan feedback real-time untuk password confirmation

4. **State Management:**
   - Simpan data user di global state (context/redux)
   - Update state setelah profile update

---

# Appendix: Module Documentation (User, Asset, Location, Part, Employee)

Dokumentasi tambahan untuk module User, Asset, Location, Part, dan Employee.

## User Module

Module User digunakan untuk mengelola data pengguna (khusus superadmin).

### POST /user

Membuat user baru (hanya untuk superadmin).

**Authorization:** Diperlukan - Bearer Token + Superadmin

**Request Headers:**

| Header        | Type   | Required | Description      |
| ------------- | ------ | -------- | ---------------- |
| Authorization | String | Yes      | Bearer token     |
| Content-Type  | String | Yes      | application/json |

**Request Body:**

| Field                 | Type    | Required | Validation           | Description         |
| --------------------- | ------- | -------- | -------------------- | ------------------- |
| email                 | String  | Yes      | Format email unik    | Email user baru     |
| password              | String  | Yes      | Min 8 karakter       | Password user       |
| password_confirmation | String  | Yes      | Sama dengan password | Konfirmasi password |
| name                  | String  | Yes      | Min 1 karakter       | Nama lengkap user   |
| is_superadmin         | Boolean | No       | Default: false       | Flag superadmin     |

**Example Request:**

```bash
curl -X POST http://localhost:3000/user \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1Ni..." \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@company.com","password":"secure123","password_confirmation":"secure123","name":"Admin","is_superadmin":true}'
```

**Success Response (201):**

```json
{
  "id": 3,
  "name": "Admin",
  "email": "admin@company.com",
  "is_superadmin": true,
  "created_at": "2025-01-15T12:00:00.000Z",
  "updated_at": "2025-01-15T12:00:00.000Z"
}
```

---

## Asset Module

Module Asset mengelola aset perusahaan. Setiap asset memiliki kode UUID unik.

### POST /asset

Membuat asset baru dalam company.

**Authorization:** Diperlukan - Bearer Token + Company-Code header

**Request Headers:**

| Header        | Type   | Required | Description      |
| ------------- | ------ | -------- | ---------------- |
| Authorization | String | Yes      | Bearer token     |
| Content-Type  | String | Yes      | application/json |
| Company-Code  | String | Yes      | UUID company     |

**Request Body:**

| Field       | Type   | Required | Validation     | Description          |
| ----------- | ------ | -------- | -------------- | -------------------- |
| category_id | Number | Yes      | Min 1          | ID kategori asset    |
| location_id | Number | Yes      | Min 1          | ID lokasi penempatan |
| name        | String | Yes      | Min 1 karakter | Nama asset           |

**Example Request:**

```bash
curl -X POST http://localhost:3000/asset \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1Ni..." \
  -H "Content-Type: application/json" \
  -H "Company-Code: a1b2c3d4-e5f6-7890-abcd-ef1234567890" \
  -d '{"category_id":1,"location_id":2,"name":"Mesin CNC milling"}'
```

**Success Response (201):**

```json
{
  "code": "f47ac10b-58cc-4372-a567-0e02b2c3d479",
  "company_id": 1,
  "category_id": 1,
  "location_id": 2,
  "name": "Mesin CNC milling",
  "created_at": "2025-01-15T10:00:00.000Z",
  "updated_at": "2025-01-15T10:00:00.000Z",
  "category": { "id": 1, "name": "Mesin Produksi" },
  "location": { "id": 2, "name": "Gudang Utama" }
}
```

### GET /asset

Mengambil semua asset dalam company.

**Authorization:** Diperlukan - Bearer Token + Company-Code

**Response:** Array of asset objects

### GET /asset/:code

Mengambil satu asset berdasarkan UUID code.

**Path Parameters:**

| Parameter | Type   | Required | Description     |
| --------- | ------ | -------- | --------------- |
| code      | String | Yes      | UUID code asset |

**Error (404):** `{ "message": "Asset not found" }`

### PUT /asset/:code

Mengupdate data asset.

**Path Parameters:**

| Parameter | Type   | Required | Description     |
| --------- | ------ | -------- | --------------- |
| code      | String | Yes      | UUID code asset |

**Request Body (all optional):**

| Field       | Type   | Validation     | Description |
| ----------- | ------ | -------------- | ----------- |
| category_id | Number | Min 1          | ID kategori |
| location_id | Number | Min 1          | ID lokasi   |
| name        | String | Min 1 karakter | Nama asset  |

### DELETE /asset/:code

Menghapus asset.

**Path Parameters:**

| Parameter | Type   | Required | Description     |
| --------- | ------ | -------- | --------------- |
| code      | String | Yes      | UUID code asset |

**Success Response:**

```json
{ "message": "Asset deleted successfully" }
```

---

## Location Module

Module Location mengelola lokasi penempatan. Mendukung struktur hierarki (parent-child).

### GET /location

Mengambil semua lokasi dalam company.

**Authorization:** Diperlukan - Bearer Token + Company-Code

**Response:**

```json
[
  {
    "id": 1,
    "name": "Gedung Utama",
    "company_id": 1,
    "created_at": "...",
    "updated_at": "..."
  },
  {
    "id": 2,
    "name": "Lantai 1",
    "parent_id": 1,
    "company_id": 1,
    "created_at": "...",
    "updated_at": "..."
  }
]
```

### POST /location

Membuat lokasi baru.

**Request Body:**

| Field     | Type   | Required | Validation     | Description                  |
| --------- | ------ | -------- | -------------- | ---------------------------- |
| name      | String | Yes      | Min 1 karakter | Nama lokasi                  |
| parent_id | Number | No       | Min 1          | ID parent (untuk sub-lokasi) |

**Error (404):** `{ "message": "Parent location not found" }`

### GET /location/:id

Mengambil satu lokasi berdasarkan ID.

### PUT /location/:id

Mengupdate lokasi.

### DELETE /location/:id

Menghapus lokasi.

**Success Response:**

```json
{ "message": "Location deleted" }
```

---

## Part Module

Module Part mengelola spare parts/parts inventory.

### POST /part

Membuat part baru.

**Request Headers:** Authorization + Company-Code

**Request Body:**

| Field       | Type   | Required | Validation     | Description           |
| ----------- | ------ | -------- | -------------- | --------------------- |
| name        | String | Yes      | Min 1 karakter | Nama part             |
| quantity    | Number | Yes      | Min 0          | Jumlah stok           |
| price       | Number | Yes      | Min 0          | Harga per unit        |
| location_id | Number | Yes      | Min 1          | ID lokasi penyimpanan |

**Example:**

```bash
curl -X POST http://localhost:3000/part \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1Ni..." \
  -H "Company-Code: a1b2c3d4-..." \
  -d '{"name":"Bearing SKF 6205","quantity":50,"price":150000,"location_id":1}'
```

**Success Response (201):**

```json
{
  "code": "b58cc-4372-a567-0e02b2c3d479",
  "company_id": 1,
  "name": "Bearing SKF 6205",
  "quantity": 50,
  "price": 150000,
  "location_id": 1,
  "created_at": "...",
  "updated_at": "...",
  "location": { "id": 1, "name": "Gudang" }
}
```

### GET /part

Mengambil semua parts dalam company.

### GET /part/:code

Mengambil satu part berdasarkan UUID code.

**Error (404):** `{ "message": "Part not found" }`

### PUT /part/:code

Mengupdate part.

### DELETE /part/:code

Menghapus part.

**Success Response:**

```json
{ "message": "Part deleted successfully" }
```

---

## Employee Module

Module Employee mengelola karyawan dalam company. Endpoint tertentu memerlukan Company Owner.

### GET /employee

Mengambil semua karyawan dalam company.

**Authorization:** Diperlukan - Bearer Token + Company-Code

**Response:**

```json
{
  "employees": [
    {
      "id": 1,
      "role": "OWNER",
      "is_owner": true,
      "is_admin": false,
      "is_active": true,
      "user": { "id": 1, "name": "John Doe", "email": "john@example.com" },
      "created_at": "...",
      "updated_at": "..."
    }
  ]
}
```

### POST /employee

Mendaftarkan karyawan baru (hanya Company Owner).

**Authorization:** Diperlukan - Bearer Token + Company-Code + IsCompanyOwner

**Request Body:**

| Field    | Type    | Required | Validation     | Description                                                       |
| -------- | ------- | -------- | -------------- | ----------------------------------------------------------------- |
| name     | String  | Yes      | Min 5 karakter | Nama lengkap karyawan                                             |
| email    | String  | Yes      | Format email   | Email karyawan                                                    |
| role     | String  | Yes      | Enum role      | Peran (OWNER, ADMIN, LEADER, MANAGER, SUPERVISOR, MEMBER, WORKER) |
| is_admin | Boolean | No       | Default: false | Apakah admin                                                      |

**Example:**

```bash
curl -X POST http://localhost:3000/employee \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1Ni..." \
  -H "Company-Code: a1b2c3d4-..." \
  -H "Content-Type: application/json" \
  -d '{"name":"Jane Smith","email":"jane@company.com","role":"MANAGER","is_admin":true}'
```

**Success Response (201):**

```json
{
  "message": "Berhasil mendaftarkan karyawan",
  "user": { "id": 4, "name": "Jane Smith", "email": "jane@company.com" },
  "employee": {
    "id": 2,
    "role": "MANAGER",
    "is_owner": false,
    "is_admin": true,
    "is_active": true,
    "created_at": "...",
    "updated_at": "..."
  }
}
```

**Error (401):** `{ "message": "Anda bukan pemilik perusahaan" }`

### PUT /employee/:id

Mengupdate data karyawan (hanya Company Owner).

**Path Parameters:**

| Parameter | Type   | Required | Description |
| --------- | ------ | -------- | ----------- |
| id        | Number | Yes      | ID employee |

**Request Body:**

| Field    | Type    | Required | Description |
| -------- | ------- | -------- | ----------- |
| role     | String  | Yes      | Peran baru  |
| is_admin | Boolean | No       | Flag admin  |

### DELETE /employee/:id

Menghapus karyawan (hanya Company Owner).

**Success Response:**

```json
{ "message": "Karyawan berhasil dihapus" }
```

---

## Employee Roles

| Role       | Description                        |
| ---------- | ---------------------------------- |
| OWNER      | Pemilik company (satu per company) |
| ADMIN      | Administrator dengan akses penuh   |
| LEADER     | Kepala tim/divisi                  |
| MANAGER    | Manajer                            |
| SUPERVISOR | Supervisor                         |
| MEMBER     | Anggota regular                    |
| WORKER     | Pegawai/tenaga kerja               |

---

_End of Documentation_
