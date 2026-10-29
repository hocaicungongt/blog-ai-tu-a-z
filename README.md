# Góc nhỏ của mình

Blog tĩnh tiếng Việt về học AI cho người mới, xây bằng Vite và HTML/CSS/JavaScript thuần. Bài viết dùng Markdown; blog có tìm kiếm không dấu, giao diện điện thoại và chế độ tối theo máy.

## Chạy trên máy

Cài Node.js (phiên bản 22.12 trở lên), mở terminal trong thư mục dự án rồi chạy:

```bash
npm install
npm run dev
```

Mở địa chỉ mà terminal hiển thị để xem blog.

## Thêm bài viết

Tạo một file `.md` trong `posts/`, ví dụ `posts/bai-hoc-dau-tien.md`. Dùng tên file không dấu, ngăn cách bằng dấu gạch ngang. Nội dung mẫu:

```markdown
---
title: Bài học AI đầu tiên của mình
date: 2026-10-29
excerpt: Một vài điều thú vị mình học được khi bắt đầu tìm hiểu AI.
---

Đây là đoạn mở đầu của bài viết.

## Điều mình đã học

- Viết yêu cầu rõ ràng.
- Kiểm tra lại câu trả lời của AI.
```

Giữ đủ `title` (tiêu đề), `date` (ngày theo dạng `YYYY-MM-DD`) và `excerpt` (mô tả ngắn). Lưu file để bài tự xuất hiện trên trang chủ, bài mới nhất đứng trước. Đường dẫn bài mẫu là `#/bai/bai-hoc-dau-tien`.

## Triển khai trên Vercel

Dự án có thể được deploy miễn phí trên Vercel. Khi nhập kho mã vào Vercel, chọn **Vite**, lệnh build **`npm run build`** và thư mục đầu ra **`dist`**.

Để kiểm tra bản build trên máy:

```bash
npm run build
npm run preview
```
