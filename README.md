# 🎉 Thiệp Mời Sinh Nhật Thị Mỳ

Dự án website thiệp mời sinh nhật dành cho bé Thị Mỳ - tròn 6 tuổi!

## 📋 Tổng Quan Dự Án

Dự án là một trang web tương tác với đầy đủ tính năng cho bữa tiệc sinh nhật, bao gồm thiệp mời 3D, hiệu ứng pháo hoa, bài hát sinh nhật tương tác, bộ sưu tập ảnh, và tính năng Time Capsule cho phép gửi lời nhắn đến tương lai.

### Các Trang Chính

| Trang | Mô tả |
|-------|-------|
| `html/index.html` | Thiệp mời sinh nhật dạng thiệp 3D có thể mở ra |
| `html/main.html` | Trang chính với đầy đủ tính năng: timeline, bài hát, bộ sưu tập ảnh, Time Capsule |

## 🚀 Cách Chạy Dự Án

### Cách 1: Sử dụng Vite (Khuyến nghị - Development)

```bash
# Di chuyển vào thư mục dự án
cd WebVui

# Cài đặt dependencies
npm install

# Chạy server phát triển
npm run dev
```

Sau đó truy cập `http://localhost:5173/html/main.html` hoặc `http://localhost:5173/html/index.html`

### Cách 2: Build và Deploy

```bash
# Build dự án
npm run build

# Xem trước bản build
npm run preview
```

File build sẽ nằm trong thư mục `dist/`.

### Cách 3: Deploy lên Netlify (đã có sẵn)

Dự án đã được deploy lên Netlify:
- **Trang chính:** [https://webvui.netlify.app/html/main.html](https://webvui.netlify.app/html/main.html)
- **Thiệp mời:** [https://webvui.netlify.app/html/index.html](https://webvui.netlify.app/html/index.html)

### Cách 4: Các phương thức khác

1. **VS Code + Live Server:**
   - Cài extension "Live Server"
   - Chuột phải vào file HTML → "Open with Live Server"

2. **Python:**
   ```bash
   python -m http.server 8000
   ```
   Truy cập: `http://localhost:8000/html/index.html`

## 📁 Cấu Trúc Thư Mục

```
WebVui/
├── html/
│   ├── index.html       # Thiệp mời sinh nhật 3D
│   └── main.html        # Trang chính với đầy đủ tính năng
├── css/
│   ├── index.css        # CSS cho trang thiệp
│   └── main.css         # CSS cho trang chính
├── script/
│   ├── index.js         # JavaScript cho trang thiệp
│   └── main.js          # JavaScript cho trang chính
├── images/              # Thư mục chứa hình ảnh
│   ├── birthday/        # Ảnh sinh nhật
│   ├── Christmas/       # Ảnh Giáng sinh
│   ├── cry/             # Ảnh dễ thương
│   ├── family/          # Ảnh gia đình
│   ├── friend/          # Ảnh bạn bè
│   ├── halloween/       # Ảnh Halloween
│   ├── hang out/        # Ảnh đi chơi
│   ├── quần áo/         # Ảnh quần áo
│   ├── sea/             # Ảnh biển
│   └── tết/             # Ảnh Tết
├── public/              # Thư mục public cho Vite (file tĩnh)
├── dist/                # Thư mục build output
├── index.html           # Entry point cho Vite
├── vite.config.js       # Cấu hình Vite
├── package.json         # Dependencies và scripts
├── .env                 # Biến môi trường (Firebase config)
└── README.md            # File này
```

## 🎯 Các Tính Năng

### Trang Thiệp Mời (index.html)
- ✨ Hiệu ứng confetti rơi
- 🎈 Bóng bay bay lên
- 💖 Trái tim trôi nổi
- 📖 Thiệp 3D có thể mở ra với animation mượt mà
- 🎂 Hình bánh sinh nhật động
- 👆 Nút mời tham gia với hiệu ứng hover

### Trang Chính (main.html)
- 🌟 Hiệu ứng pháo hoa khi load trang
- 🎵 Bài hát sinh nhật tương tác:
  - Chế độ tự động phát (auto-play)
  - Chế độ chơi từng nốt nhạc thủ công (piano mode)
- 📸 Bộ sưu tập ảnh với bộ lọc theo chủ đề (family, friend, hang out, sea, halloween, tết, christmas, cry)
- ⏳ Time Capsule - Gửi lời nhắn cho tương lai (sử dụng Firebase Firestore)
- 📅 Thông tin bữa tiệc (ngày, giờ, địa điểm)
- 👶 Timeline 6 năm phát triển của bé

## ⚙️ Cấu Hình Firebase

Dự án đã được cấu hình sẵn Firebase cho tính năng Time Capsule. Nếu bạn muốn sử dụng Firebase của riêng mình:

1. Tạo project Firebase tại [console.firebase.google.com](https://console.firebase.google.com)
2. Bật Firestore Database
3. Cập nhật thông tin trong file `.env`:

```env
VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id
VITE_FIREBASE_MEASUREMENT_ID=your_measurement_id
```

## 🛠️ Công Nghệ Sử Dụng

| Công nghệ | Mô tả |
|-----------|-------|
| **Vite** | Công cụ build và development server |
| **HTML5** | Cấu trúc trang |
| **CSS3** | Styling, animations và effects |
| **JavaScript (ES6+)** | Logic tương tác |
| **Firebase Firestore** | Lưu trữ tin nhắn Time Capsule |
| **Font Awesome** | Icons |
| **Google Fonts** | Typography (fonts VN) |

## 📝 Cách Tùy Chỉnh

### Thay đổi thông tin bữa tiệc

Chỉnh sửa trong `script/main.js`:

```javascript
const partyConfig = {
    date: "Ngày / Tháng / Năm",
    time: "Giờ",
    location: "Địa điểm"
};
```

### Thêm ảnh mới

1. Đặt ảnh vào thư mục `images/` phù hợp với chủ đề
2. Cập nhật cấu hình trong `script/main.js`

### Thêm bộ lọc ảnh mới

Thêm thư mục mới trong `images/` và cập nhật mảng `albumFilters` trong `script/main.js`:

```javascript
const albumFilters = ['family', 'friend', 'hang out', 'sea', 'halloween', 'tết', 'christmas', 'cry'];
```

## 📄 Giấy Phép

Made with ❤️ for Thị Mỳ's 6th Birthday!
