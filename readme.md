# API Documentation

## Overview
Đây là một API đơn giản được xây dựng bằng Node.js và Express.js để quản lý sản phẩm. API bao gồm hai endpoint chính:
- **GET /products**: Lấy danh sách sản phẩm.
- **POST /products**: Tạo một sản phẩm mới.

---

## Installation


### Steps to Run
1. Clone repository:
   ```bash
   git clone https://github.com/poin4003/devops_jenkins.git
   ```
2. Di chuyển vào thư mục dự án:
   ```bash
   cd devops_jenkins
   ```
3. Cài đặt các dependencies:
   ```bash
   npm install
   ```
4. Khởi chạy server:
   ```bash
   node index.js
   ```
   Mặc định server sẽ chạy tại `http://localhost:3001`.

---

## API Endpoints

### 1. Lấy danh sách sản phẩm
#### Endpoint
```http
GET /products
```
#### Response
- **200 OK**: Trả về danh sách sản phẩm dưới dạng JSON.

##### Response Body
```json
[
  {
    "id": 1,
    "name": "Sản phẩm A",
    "price": 100000,
  },
  {
    "id": 2,
    "name": "Sản phẩm B",
    "price": 200000,
  }
]
```

### 2. Tạo sản phẩm mới
#### Endpoint
```http
POST /products
```
#### Request
- **Headers**:
  - `Content-Type: application/json`
- **Body**: JSON chứa thông tin sản phẩm cần tạo.

##### Request Body
```json
{
  "name": "Tên sản phẩm",
  "price": 150000,
}
```

#### Response
- **200 Created**: Trả về thông tin sản phẩm vừa được tạo.

##### Response Body
```json
{
  "id": 3,
  "name": "Tên sản phẩm",
  "price": 150000,
}
```

- **400 Bad Request**: Trả về nếu dữ liệu gửi lên không hợp lệ.

##### Response Body
```json
{
  "error": "Invalid request data"
}
```

