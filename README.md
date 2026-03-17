# 🎉 Thiệp Mời Sinh Nhật Thị Mỳ

Dự án website thiệp mời sinh nhật dành cho bé Thị Mỳ - tròn 6 tuổi!

## 📋 Tổng Quan Dự Án

Dự án bao gồm 2 trang chính:

| Trang | Mô tả |
|-------|-------|
| `html/index.html` | Thiệp mời sinh nhật dạng thiệp có thể mở ra |
| `html/main.html` | Trang chính với đầy đủ tính năng: timeline, bài hát sinh nhật tương tác, bộ sưu tập ảnh, time capsule |

## 🚀 Cách Chạy Dự Án

### Cách 1: Chạy trên máy cục bộ

1. **Sử dụng VS Code với Live Server:**
   - Mở folder dự án trong VS Code
   - Cài đặt extension "Live Server"
   - Chuột phải vào `html/index.html` hoặc `html/main.html`
   - Chọn "Open with Live Server"

2. **Sử dụng Python:**
   ```bash
   # Di chuyển vào thư mục dự án
   cd WebVui
   
   # Chạy server
   python -m http.server 8000
   ```
   Sau đó truy cập: `http://localhost:8000/html/index.html`

3. **Sử dụng Node.js:**
   ```bash
   # Cài đặt http-server
   npm install -g http-server
   
   # Chạy server
   http-server
   ```

### Cách 2: Deploy lên Netlify (đã có sẵn)

Dự án đã được deploy lên Netlify:
- **Link:** [https://webvui.netlify.app](https://webvui.netlify.app)
- **Trang chính:** [https://webvui.netlify.app/html/main.html](https://webvui.netlify.app/html/main.html)

## 📁 Cấu Trúc Thư Mục

```
WebVui/
├── html/
│   ├── index.html      # Thiệp mời sinh nhật
│   └── main.html       # Trang chính
├── css/
│   ├── index.css       # CSS cho trang thiệp
│   └── main.css        # CSS cho trang chính
├── script/
│   ├── index.js        # JavaScript cho trang thiệp
│   └── main.js         # JavaScript cho trang chính
├── images/             # Thư mục chứa hình ảnh
│   ├── birthday/       # Ảnh sinh nhật
│   ├── christmas/      # Ảnh Giáng sinh
│   ├── cry/           # Ảnh dễ thương
│   ├── family/        # Ảnh gia đình
│   ├── friend/        # Ảnh bạn bè
│   ├── halloween/     # Ảnh Halloween
│   ├── hang out/     # Ảnh đi chơi
│   ├── sea/           # Ảnh biển
│   └── tết/          # Ảnh Tết
└── README.md          # File này
```

## 🎯 Các Tính Năng

### Trang Thiệp Mời (index.html)
- ✨ Hiệu ứng confetti rơi
- 🎈 Bóng bay bay lên
- 💖 Trái tim trôi nổi
- 📖 Thiệp có thể mở ra
- 🎂 Hình bánh sinh nhật động
- 👆 Nút mời tham gia

### Trang Chính (main.html)
- 🌟 Hiệu ứng pháo hoa
- 🎵 Bài hát sinh nhật tương tác (play từng nốt hoặc auto-play)
- 📸 Bộ sưu tập ảnh với bộ lọc theo chủ đề
- ⏳ Time Capsule - Gửi lời nhắn cho tương lai (sử dụng Firebase Firestore)
- 📅 Thông tin bữa tiệc
- 👶 Timeline 6 năm phát triển của bé

## ⚙️ Cấu Hình Time Capsule (Firebase)

Để Time Capsule hoạt động, cần cấu hình Firebase:

1. Tạo project Firebase tại [console.firebase.google.com](https://console.firebase.google.com)
2. Bật Firestore Database
3. Lấy config Firebase và cập nhật trong `script/main.js`

## 🛠️ Công Nghệ Sử Dụng

- **HTML5** - Cấu trúc trang
- **CSS3** - Styling và animations
- **JavaScript (ES6+)** - Logic tương tác
- **Firebase Firestore** - Lưu trữ tin nhắn Time Capsule
- **Font Awesome** - Icons
- **Google Fonts** - Typography

## 📝 Cách Tùy Chỉnh

### Thay đổi thông tin bữa tiệc
Chỉnh sửa trong `script/main.js`:
```javascript
const partyConfig = {
    date: "Ngày // Tháng // Năm",
    time: "Giờ",
    location: "Địa điểm"
};
```

### Thêm ảnh mới
1. Đặt ảnh vào thư mục `images/` phù hợp
2. Cập nhật cấu hình trong `script/main.js`

## 📄 Giấy Phép

Made with ❤️ for Thị Mỳ's 6th Birthday!
