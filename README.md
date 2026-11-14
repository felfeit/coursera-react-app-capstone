# 🍋 Little Lemon Food Ordering App

A mobile application built with **React Native** and **Expo** for the Little Lemon restaurant. This project is the Capstone Project for the **Meta React Native Developer Professional Certificate** on Coursera.

## 📱 About the App

Little Lemon is a family-owned Mediterranean restaurant. This app allows customers to:
- Register and create a profile.
- Browse a dynamically fetched menu from a remote API.
- Filter dishes by categories (Starters, Mains, Desserts, Drinks) and search by name.
- Access the menu offline (data is cached locally using SQLite).
- Update personal information, upload an avatar, and manage notification preferences.

## ✨ Key Features

- **🔐 Onboarding & Authentication:** First-time users are greeted with a registration form. Login state is persisted using `AsyncStorage`.
- **🏠 Home Screen:**
  - Hero section with restaurant description and search bar.
  - Multi-select category filtering.
  - **Debounced Search** (500ms) to optimize database queries.
  - Menu list fetched from a remote API and cached locally.
- **📴 Offline Support:** Menu data is stored in a local **SQLite** database (`little_lemon.db`). If the database is empty, the app fetches from the API; otherwise, it loads from SQLite.
- **👤 Profile Screen:**
  - Auto-populates data from onboarding.
  - Image picker for avatar (with initials fallback).
  - Phone number validation (US format).
  - Persist changes to `AsyncStorage`.
  - Logout functionality that clears all data and redirects to Onboarding.
- **🎨 UI/UX:** Custom fonts (**Markazi Text** for display, **Karla** for body) and a color palette matching the Little Lemon brand.

## 🛠️ Tech Stack

| Category         | Technology                                                                                               |
| :--------------- | :------------------------------------------------------------------------------------------------------- |
| **Framework**    | [React Native](https://reactnative.dev/) + [Expo](https://expo.dev/)                                     |
| **Language**     | TypeScript                                                                                               |
| **Navigation**   | [Expo Router](https://docs.expo.dev/router/introduction/) (File-based routing)                           |
| **Database**     | [expo-sqlite](https://docs.expo.dev/versions/latest/sdk/sqlite/)                                         |
| **Storage**      | [@react-native-async-storage/async-storage](https://react-native-async-storage.github.io/async-storage/) |
| **Image Picker** | [expo-image-picker](https://docs.expo.dev/versions/latest/sdk/imagepicker/)                              |
| **Fonts**        | [expo-font](https://docs.expo.dev/versions/latest/sdk/font/)                                             |

## 🚀 How to Run the Project

1. **Clone the repository:**
   ```bash
   git clone https://github.com/felfeit/coursera-react-app-capstone.git
   cd coursera-react-app-capstone
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the Expo development server:**
   ```bash
   npx expo start -c
   ```

4. **Run the app:**
   - **Android:** Scan the QR code with the **Expo Go** app.
   - **iOS:** Scan the QR code with the default **Camera** app.
   - **Emulator:** Press `a` for Android or `i` for iOS in the terminal.

## 📸 Screenshots

*(Tambahkan screenshot aplikasi kamu di sini. Upload gambar ke folder `assets/screenshots/` lalu sesuaikan link di bawah).*

|                          Onboarding                           |                          Home                           |                          Profile                           |
| :-----------------------------------------------------------: | :-----------------------------------------------------: | :--------------------------------------------------------: |
| <img src="./assets/screenshots/onboarding.png" width="200" /> | <img src="./assets/screenshots/home.png" width="200" /> | <img src="./assets/screenshots/profile.png" width="200" /> |

## 📂 Project Structure

```text
LittleLemon/
├── assets/
│   ├── fonts/                  # Custom fonts (Karla & Markazi Text)
│   └── images/                 # App icons, favicon, & Little Lemon logo
├── src/
│   ├── app/                    # Expo Router (File-based routing)
│   │   ├── (tabs)/             # Bottom Tab Screens
│   │   │   ├── _layout.tsx     # Tab Navigator Configuration
│   │   │   ├── index.tsx       # Home Screen
│   │   │   └── profile.tsx     # Profile Screen
│   │   ├── _layout.tsx         # Root Layout (Auth Check & Font Loading)
│   │   └── onboarding.tsx      # Onboarding Screen
│   ├── components/             # Reusable UI Components
│   │   ├── Checkbox.tsx
│   │   ├── Header.tsx
│   │   ├── Hero.tsx
│   │   ├── MenuBreakdown.tsx
│   │   ├── MenuItem.tsx
│   │   └── SplashScreen.tsx
│   ├── constants/
│   │   └── theme.ts            # Color Palette
│   ├── hooks/
│   │   └── useAuth.ts          # AsyncStorage Auth Logic
│   ├── types/
│   │   └── index.ts            # TypeScript Interfaces
│   └── utils/
│       ├── api.ts              # Remote API Fetching
│       └── database.ts         # SQLite Database Operations
├── app.json                    # Expo Configuration
├── package.json
└── tsconfig.json
```

## 🔗 API Reference

The menu data is fetched from the following API:
- **Menu Data:** `https://raw.githubusercontent.com/Meta-Mobile-Developer-PC/Working-With-Data-API/main/capstone.json`
- **Images:** `https://github.com/Meta-Mobile-Developer-PC/Working-With-Data-API/blob/main/images/{imageName}?raw=true`

## 📄 License

This project is for educational purposes as part of the **Meta React Native Developer Professional Certificate** on Coursera.