// routes/student.js
const express = require("express");
const router = express.Router();
const db = require("../db"); // Import kết nối từ db.js

// 1. READ ALL - Lấy danh sách toàn bộ sinh viên (GET)
// Endpoint: https://.../students
router.get("/", async (req, res) => {
  try {
    const [rows] = await db.query("SELECT * FROM STUDENT");
    res.json({ success: true, data: rows });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// 2. READ ONE - Lấy thông tin 1 sinh viên cụ thể theo ID (GET)
// Endpoint: https://.../students/:id
router.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const [rows] = await db.query("SELECT * FROM STUDENT WHERE SID = ?", [id]);
    if (rows.length === 0) {
      return res.status(404).json({ success: false, message: "Không tìm thấy sinh viên" });
    }
    res.json({ success: true, data: rows[0] });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// 3. CREATE - Thêm mới một sinh viên (POST)
// Endpoint: https://.../students
router.post("/", async (req, res) => {
  const { sid, sname, email, tutor_id } = req.body;

  if (!sid || !sname) {
    return res.status(400).json({ success: false, message: "SID và SNAME là bắt buộc" });
  }

  try {
    const query = "INSERT INTO STUDENT (SID, SNAME, EMAIL, Tutor_Id) VALUES (?, ?, ?, ?)";
    await db.query(query, [sid, sname, email, tutor_id || null]);
    
    res.status(201).json({ 
      success: true, 
      message: "Thêm sinh viên thành công",
      data: { sid, sname, email, tutor_id }
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// 4. UPDATE - Cập nhật thông tin sinh viên theo ID (PUT)
// Endpoint: https://.../students/:id
router.put("/:id", async (req, res) => {
  const { id } = req.params; // id này tương ứng với SID
  const { sname, email, tutor_id } = req.body;
  
  try {
    const query = "UPDATE STUDENT SET SNAME = ?, EMAIL = ?, Tutor_Id = ? WHERE SID = ?";
    const [result] = await db.query(query, [sname, email, tutor_id || null, id]);

    if (result.affectedRows === 0) {
      return res.status(404).json({ success: false, message: "Không tìm thấy sinh viên để cập nhật" });
    }

    res.json({ success: true, message: "Cập nhật thông tin sinh viên thành công" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// 5. DELETE - Xóa sinh viên theo ID (DELETE)
// Endpoint: https://.../students/:id
router.delete("/:id", async (req, res) => {
  const { id } = req.params; // id này tương ứng với SID
  try {
    const [result] = await db.query("DELETE FROM STUDENT WHERE SID = ?", [id]);

    if (result.affectedRows === 0) {
      return res.status(404).json({ success: false, message: "Không tìm thấy sinh viên để xóa" });
    }

    res.json({ success: true, message: "Xóa sinh viên thành công" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

module.exports = router;