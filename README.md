# Foodly-Mobile-App
## 1. GIỚI THIỆU
Ứng dụng mobile đa nền tảng (iOS, Android) phát triển bằng React Native (Expo) kết hợp Firebase. Ứng dụng cho phép người dùng đăng nhập, duyệt menu, thêm món vào giỏ hàng, đặt hàng và quản lý đơn hàng theo thời gian thực

## 2. MAIN FUNCTION
- Authentication: Đăng nhập, đăng ký bằng Firebase Authentication
- Menu và Order: Duyệt món ăn, thêm vào giỏ, đặt hàng
- Cart Management: Quản lý giở hàng, cập nhật số lượng món
- Order Trachking: Quản lý và theo dõi đơn hàng bằng Firebase
- UX/UI: Modular components, responsive design

## 3. CÔNG NGHỆ
- React Native (Expo): Đa nền tảng
- Firebase: Authentication, Firestore Database, Storage
- Redux + Redux Persist: Quản lý state
- React Navigation: Điều hướng
- AsyncStorage: Lưu trữ cục bộ
  
## 4. CẤU TRÚC
- src/components: Các UI component tái sử dụng
- src/navigation: Điều hướng
- src/screens: Các màn hình chính
- src/services: Firebase service, APO call
- src/stores: Redux store, reducers, actions
- helpers: Helper function, loading provider
- firebaseConfig.js
- App.js: Điểm khởi chạy ứng dụng
- .env.example: File mẫu biến môi trường
  
## 5. CÀI ĐẶT + CHẠY CHƯƠNG TRÌNH
- Clone dự án
- Cài đặt dependencies
- Tạo file .env tại thư mục gốc
- Chạy ứng dụng
  
## 6. HÌNH MINH HỌA
Khi mới vào App, chưa đăng nhập

<img width="416" height="726" alt="image" src="https://github.com/user-attachments/assets/5f31592a-887c-4f30-ae6d-0e02274cb218" />


Đăng nhập

<img width="412" height="723" alt="image" src="https://github.com/user-attachments/assets/d65ae3b3-48f6-47a9-9ff4-821606b94032" />


Giao diện Home

<img width="332" height="576" alt="image" src="https://github.com/user-attachments/assets/435ffbc0-fc6c-4e53-9a82-75113eb8a014" />


Tìm kiếm món

<img width="496" height="414" alt="image" src="https://github.com/user-attachments/assets/39a7aeb9-996e-4604-b696-ca48e4e721da" />


Giỏ hàng

<img width="334" height="582" alt="image" src="https://github.com/user-attachments/assets/aa7a802f-f466-4c67-a1d8-9f37d7d4f585" />
<img width="335" height="579" alt="image" src="https://github.com/user-attachments/assets/9f20bc71-4c7f-4b8d-a06e-28b4e13ecfb4" />


Add to cart

<img width="482" height="418" alt="image" src="https://github.com/user-attachments/assets/0c4e6820-a57f-4567-bac4-8d353ef45b29" />


Order detail (sau khi đặt hàng thành công)

<img width="476" height="419" alt="image" src="https://github.com/user-attachments/assets/348c24f5-a254-4dd0-bcff-785c5e053646" />


