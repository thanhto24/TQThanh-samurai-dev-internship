# TQThanh-samurai-dev-internship
# Setup Instructions

## 1. Local Development
- Clone project
- Đi vào thư mục **frontend/** và **backend/**
- Cài đặt dependencies:
  ```bash
  npm install
  ```
- Chạy dự án:
  ```bash
  npm run dev
  ```
- Cấu hình `.env` dựa trên file `.env.example` trong cả frontend và backend.

---

## 2. Assumptions / Trade-offs
- **Authentication**: chỉ sử dụng email và password để đăng nhập, **không dùng OAuth**.
- **Database**: sử dụng **MongoDB** để setup nhanh hơn so với SQL.
- **UI**: sử dụng **shadcn/ui** để custom giao diện theo nhu cầu.
- **State management**: sử dụng **Redux** để quản lý state xuyên suốt ứng dụng.
- Dùng **TanStack Query** để quản lý data fetching / caching từ API, giúp hạn chế re-render và code ngắn gọn hơn.
- Dùng **Zod + React Hook Form** để quản lý form, validate dữ liệu, và hiển thị cảnh báo lỗi cho người dùng.

---

## 3. Screenshots
<p align="center">
  <img src="https://github.com/user-attachments/assets/3203b6a5-fc51-41b7-9752-def83007b988" width="45%" />
  <img src="https://github.com/user-attachments/assets/cd93c844-704e-497a-a665-c13640061905" width="45%" />
</p>

<p align="center">
  <img src="https://github.com/user-attachments/assets/b917ce6a-4511-4432-b325-44b702791040" width="45%" />
  <img src="https://github.com/user-attachments/assets/ead26544-8021-4cb2-8e25-28976b520f3a" width="45%" />
</p>

<p align="center">
  <img src="https://github.com/user-attachments/assets/88b5561a-0334-45e3-ae29-4160b38a0128" width="45%" />
  <img src="https://github.com/user-attachments/assets/ffc9644e-623d-4bc3-9d5d-fe8b6a1a435a" width="45%" />
</p>

---

## 4. Demo Link
### [Deployed Web](https://fe-tqthanh-internship.vercel.app/)
