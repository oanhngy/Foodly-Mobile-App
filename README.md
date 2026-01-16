# Foodly-Mobile-App

## 1. Introduction
Foodly is a **cross-platform mobile application (iOS & Android)** developed using **React Native (Expo)** and **Firebase**.

This is a **side project** built to practice mobile application development, focusing on authentication, state management, real-time data handling, and basic e-commerce workflows such as ordering and cart management.

---

## 2. Main Features
- **Authentication**
  - User login and registration using Firebase Authentication

- **Menu & Ordering**
  - Browse food menu
  - Add items to cart
  - Place orders

- **Cart Management**
  - Manage cart items
  - Update quantities

- **Order Tracking**
  - Track and manage orders in real time using Firebase

- **UI/UX**
  - Modular and reusable components
  - Responsive mobile-friendly design

---

## 3. Technologies Used
- **Framework:** React Native (Expo)
- **Backend Services:** Firebase
  - Authentication
  - Firestore Database
  - Storage
- **State Management:** Redux, Redux Persist
- **Navigation:** React Navigation
- **Local Storage:** AsyncStorage

---

## 4. Project Structure
- `src/components`  
  Reusable UI components

- `src/navigation`  
  Application navigation configuration

- `src/screens`  
  Main application screens

- `src/services`  
  Firebase services and API calls

- `src/stores`  
  Redux store, reducers, and actions

- `helpers`  
  Helper functions and loading provider

- `firebaseConfig.js`  
  Firebase configuration

- `App.js`  
  Application entry point

- `.env.example`  
  Sample environment variables file

---

## 5. Installation & Run Guide
1. Clone the project from GitHub
2. Install dependencies:
   ```bash
   npm install
3. Create a .env file in the root directory
4. Run the application by "npm start" or "expo start"
  
---

## 6. Technical Highlights
- Built a cross-platform mobile app using React Native with Expo
- Integrated Firebase Authentication for user login and registration
- Used Firestore for real-time data storage and order tracking
- Implemented Redux + Redux Persist for global state management
- Organized codebase using a modular and scalable folder structure
- Applied reusable components to improve UI consistency

---

## 7. What I Learned
- Developing cross-platform mobile applications with React Native
- Managing application state using Redux
- Working with Firebase Authentication and Firestore
- Structuring mobile projects for maintainability and scalability
- Handling real-time data updates in a mobile application

---

## 8. Screenshots

App Entry (Not Logged In)

<img width="416" height="726" alt="image" src="https://github.com/user-attachments/assets/5f31592a-887c-4f30-ae6d-0e02274cb218" />


Login

<img width="412" height="723" alt="image" src="https://github.com/user-attachments/assets/d65ae3b3-48f6-47a9-9ff4-821606b94032" />


Home Screen

<img width="332" height="576" alt="image" src="https://github.com/user-attachments/assets/435ffbc0-fc6c-4e53-9a82-75113eb8a014" />


Food Search

<img width="496" height="414" alt="image" src="https://github.com/user-attachments/assets/39a7aeb9-996e-4604-b696-ca48e4e721da" />


Cart

<img width="334" height="582" alt="image" src="https://github.com/user-attachments/assets/aa7a802f-f466-4c67-a1d8-9f37d7d4f585" />
<img width="335" height="579" alt="image" src="https://github.com/user-attachments/assets/9f20bc71-4c7f-4b8d-a06e-28b4e13ecfb4" />


Add to cart

<img width="482" height="418" alt="image" src="https://github.com/user-attachments/assets/0c4e6820-a57f-4567-bac4-8d353ef45b29" />


Order Details (After Successful Order)

<img width="476" height="419" alt="image" src="https://github.com/user-attachments/assets/348c24f5-a254-4dd0-bcff-785c5e053646" />


