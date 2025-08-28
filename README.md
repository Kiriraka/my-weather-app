# LAB-07:Frontend Development with Modern JavaScript (ES6+) P1

เว็บแอปเช็คสภาพอากาศ ใช้ **OpenWeatherMap API**  
พร้อมฟีเจอร์: พยากรณ์ล่วงหน้า, เปลี่ยนพื้นหลังตามสภาพอากาศ, และบันทึกการค้นหาล่าสุด  

---
PART1
## 📂 ไฟล์และฟีเจอร์
    weather-app/
    │── index.html      # หน้าเว็บหลัก โครงสร้าง UI ของแอป
    │── style.css       # จัดการ UI, สีพื้นหลัง, animation
    │── script.js       # ฟังก์ชันหลัก เรียก API, logic ของแอป

### 1. `index.html`
- โครงสร้างหลักของแอป
- ฟอร์มค้นหาชื่อเมือง
- ส่วนแสดงสภาพอากาศปัจจุบัน
- ส่วนแสดงพยากรณ์อากาศล่วงหน้า

### 2. `style.css`
- จัดการ UI และ Theme ของแอป
- พื้นหลังเปลี่ยนตามสภาพอากาศ
  - ☀️ Clear → เหลือง/ส้ม
  - 🌧️ Rain → น้ำเงินเข้ม
  - ☁️ Cloud → เทาอ่อน
- Animation (fade-in)
- การ์ดแสดงพยากรณ์ 5 วัน

### 3. `script.js`
- ติดต่อ OpenWeatherMap API
  - `/weather` → สภาพอากาศปัจจุบัน
  - `/forecast` → พยากรณ์อากาศล่วงหน้า 5 วัน
- ฟีเจอร์:
  - แสดงอุณหภูมิ, ความชื้น, ความเร็วลม
  - พื้นหลังเปลี่ยนตาม `weather.main`
  - บันทึกชื่อเมืองล่าสุดใน **LocalStorage**
  - โหลดเมืองล่าสุดอัตโนมัติเมื่อเปิดเว็บใหม่
  - แสดงการ์ดพยากรณ์อากาศรายวัน (ช่วงเวลา 12:00)

---
## ดูผลลัพธ์
### [เปิดหน้าเว็บ](https://enchanting-chebakia-19cfe2.netlify.app/)

#
## [เอกสาร](https://docs.google.com/document/d/1CkBsPqXEGCGwgipGnpByEeNlSO5KxhsWF2_sGRFt8fw/edit?usp=sharing)
