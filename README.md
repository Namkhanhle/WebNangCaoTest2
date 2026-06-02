# WebNangCaoTest2
# Student CRUD System

Ứng dụng quản lý sinh viên (CRUD) sử dụng **Node.js (Express)** kết nối tới cơ sở dữ liệu **MySQL** được triển khai trên nền tảng **Aiven Cloud**. Dự án được cấu hình tối ưu để phát triển mượt mà trong môi trường **GitHub Codespaces**.

## 🛠️ Công nghệ sử dụng

* **Backend:** Node.js, Express.js
* **Database:** MySQL (Hosted on Aiven Cloud)
* **Thư viện kết nối:** `mysql2` (Hỗ trợ Promise API)
* **Môi trường dev:** GitHub Codespaces

## 📐 Cấu trúc cơ sở dữ liệu

Hệ thống quản lý cơ sở dữ liệu có tên là `STUDENTSREG` bao gồm các bảng chính:
* `TUTOR`: Lưu thông tin người hướng dẫn.
* `STUDENT`: Lưu thông tin sinh viên (Khóa ngoại `Tutor_Id` liên kết với `TUTOR`).
* `MODULES`: Danh sách môn học.
* `STUDENT_ENROLEMENT`: Bảng trung gian quản lý việc đăng ký môn học của sinh viên.
* `TOPICS`: Các chủ đề thuộc môn học.
* `LEARN_PREFERENCE`: Sở thích học tập của sinh viên.

## 🚀 Hướng dẫn cài đặt và chạy ứng dụng

### 1. Cài đặt các thư viện phụ thuộc
Mở terminal tại thư mục dự án và chạy lệnh sau để cài đặt các gói cần thiết (`express`, `mysql2`):
```bash
npm install
const mysql = require('mysql2');

const pool = mysql.createPool({
  host: 'mysql-webb-khanhle.l.aivencloud.com',       
  user: 'avnadmin',            
  password: 'AVNS_Dm49i2X23duMBrqtfAE', 
  database: 'STUDENTSREG',  
  port: 27665, 
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
  ssl: {
    rejectUnauthorized: false
  }
});

module.exports = pool.promise();
### Khởi tạo Server
node server.js

Khi terminal hiển thị thông báo sau là hệ thống đã kết nối thành công:

Plaintext
Đã nạp thông số cổng kết nối Aiven Cloud thành công!
🔄 Đang kiểm tra và khởi tạo cấu trúc bảng trên Cloud...
Server đang chạy thành công tại http://localhost:3000
✅ Các bảng đã tồn tại sẵn dữ liệu cấu trúc.
