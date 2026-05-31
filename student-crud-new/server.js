// server.js
const express = require("express");
const cors = require("cors");
const db = require("./db"); // Import kết nối để chạy tự động tạo bảng

const app = express();

app.use(cors());
app.use(express.json()); 

// Hàm tự động tạo cấu trúc CSDL trực tiếp trên Aiven Cloud nếu chưa có
async function initDatabase() {
  try {
  
    console.log("🔄 Đang kiểm tra và khởi tạo cấu trúc bảng trên Cloud...");
    
    // 1. Tạo bảng TUTOR trước vì STUDENT có khóa ngoại tham chiếu tới bảng này
    await db.query(`
      CREATE TABLE IF NOT EXISTS TUTOR (
        Tut_Id VARCHAR(10) NOT NULL,
        TName VARCHAR(45) NOT NULL,
        DoB DATE NOT NULL,
        HOURS DOUBLE,
        PRIMARY KEY (Tut_Id)
      );
    `);

    // 2. Tự động tạo bảng STUDENT chuẩn cấu trúc
    await db.query(`
      CREATE TABLE IF NOT EXISTS STUDENT (
        SID VARCHAR(10) NOT NULL,
        SNAME VARCHAR(30),
        EMAIL VARCHAR(30),
        Tutor_Id VARCHAR(10),
        PRIMARY KEY (SID),
        FOREIGN KEY (Tutor_Id) REFERENCES TUTOR(Tut_Id)
          ON DELETE SET NULL
          ON UPDATE CASCADE
      );
    `);

    // 3. Chèn thử một vài dữ liệu mẫu nếu bảng STUDENT đang trống rỗng
    const [rows] = await db.query("SELECT COUNT(*) as total FROM STUDENT");
    if (rows[0].total === 0) {
      console.log("📥 Bảng trống, đang nạp dữ liệu mẫu sinh viên...");
      await db.query(`
        INSERT INTO TUTOR VALUES 
        ('1000','Rong Yang','1982-01-01',4),
        ('1003','Jun Hong','1970-01-01',1);
      `);
      await db.query(`
        INSERT INTO STUDENT VALUES 
        ('1000','Abdul Basit Chaudhry','abc@abc.com','1003'),
        ('1001','Daniel Everret Fernandes','def@def.com','1000');
      `);
      console.log("✅ Đã nạp dữ liệu mẫu thành công.");
    } else {
      console.log("✅ Các bảng đã tồn tại sẵn dữ liệu cấu trúc.");
    }

  } catch (error) {
    console.error("❌ Lỗi khởi tạo cấu trúc bảng dữ liệu:", error.message);
  }
}

// Kích hoạt tiến trình khởi tạo cấu trúc dữ liệu tự động
initDatabase();

// Đăng ký các tuyến đường API
const studentRoutes = require("./routes/student");
app.use("/students", studentRoutes);

app.get("/", (req, res) => {
  res.send("API is running...");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server đang chạy thành công tại http://localhost:${PORT}`);
});