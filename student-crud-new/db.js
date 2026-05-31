// db.js
const mysql = require('mysql2');

const pool = mysql.createPool({
  // 1. Host lấy từ trang Aiven của bạn
  host: 'mysql-webb-khanhle.l.aivencloud.com',       

  // 2. User mặc định
  user: 'avnadmin',            

  // 3. Mật khẩu: Bạn quay lại trang Aiven, bấm vào hình CON MẮT chỗ chữ Password để hiện ra chuỗi mật khẩu rồi copy dán vào đây thay cho chữ 'MẬT_KHẨU_CỦA_BẠN' nhé!
  password: 'process.env.DB_PASSWORD', 

  // 4. Database Name trên Cloud của bạn đang hiển thị mặc định
  database: 'defaultdb',  

  // 5. Port số từ trang quản trị Aiven
  port: 27665, 

  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
  
  // Aiven bắt buộc phải bật SSL mã hóa bảo mật
  ssl: {
    rejectUnauthorized: false
  }
});

const promisePool = pool.promise();

console.log("Đã nạp thông số cổng kết nối Aiven Cloud thành công!");

module.exports = promisePool;