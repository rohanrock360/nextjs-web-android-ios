# QuickBite - Next.js + Capacitor OTP Authentication App

A modern, clean Next.js + Capacitor application with fixed OTP authentication (code: **123456**).

## 🚀 Quick Start

### Test the App Locally

```bash
# Install dependencies
npm install

# Run development server
npm run dev
```

Open http://localhost:3000

**OTP Code: `123456`** (works for both login and register!)

---

## 📱 Build & Deploy to GitHub Actions (Get APK + IPA)

### Step 1 — Push to GitHub

```bash
git init
git add .
git commit -m "initial commit"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO.git
git push -u origin main
```

### Step 2 — GitHub Actions Automatically Builds

After pushing, GitHub Actions will automatically:
- ✅ Build web version (`/out`)
- ✅ Build Android APK (`android-apk` artifact)
- ✅ Build iOS app (`ios-build` artifact)

### Step 3 — Download Your Apps

1. Go to your GitHub repo
2. Click **Actions** tab
3. Click the latest workflow run ("Build Web, Android & iOS")
4. Scroll to bottom → **Artifacts** section
5. Download:
   - `android-apk` → Extract → Install `.apk` on Android phone
   - `ios-build` → Extract → Upload `App.app` zip to [Appetize.io](https://appetize.io) to preview in browser

---

## 🔧 Configuration Files

### next.config.ts ✅
```typescript
const nextConfig = {
  output: "export",
 images: { unoptimized: true },
  trailingSlash: true,
};
```

### capacitor.config.ts ✅
```typescript
const config = {
  appId: 'com.example.app',
  appName: 'my-app',
  webDir: 'out'
};
```

### package.json Scripts ✅
```json
{
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint",
    "build:mobile": "next build && npx cap sync",
    "build:android": "next build && npx cap sync && npx cap open android",
    "build:ios": "next build && npx cap sync && npx cap open ios",
    "sync": "npx cap sync"
  }
}
```

---

## 🧪 Testing Instructions

### Test Registration Flow

1. Go to http://localhost:3000
2. Click **"Register here"**
3. Enter email: `test@example.com`
4. Click **"Send OTP"**
5. Enter OTP: **`123456`**
6. Click **"Verify & Register"**
7. ✅ Redirects to Dashboard with welcome message!

### Test Login Flow

1. Go to http://localhost:3000
2. Click **"Login here"** (or `/login`)
3. Enter same email: `test@example.com`
4. Click **"Send OTP"**
5. Enter OTP: **`123456`**
6. Click **"Verify & Login"**
7. ✅ Redirects to Dashboard!

### Test Non-Existent User

1. Go to `/login`
2. Enter unknown email: `unknown@example.com`
3. Click **"Send OTP"**
4. ❌ Shows error: "User not found. Please register first."

### Test Logout

1. From dashboard, click **"Logout"** button
2. ✅ Clears session and redirects to login page

### Session Persistence

1. Login successfully
2. Refresh the page (F5)
3. ✅ Stays on dashboard (session persists!)

---

## 📦 Project Structure

```
my-app/
├── app/                      # Next.js App Router pages
│   ├── page.tsx             # Root redirect (session-based)
│   ├── login/page.tsx       # Login page
│   ├── register/page.tsx    # Registration page
│   └── dashboard/page.tsx   # Protected dashboard
├── components/
│   ├── ui/                  # Reusable UI components
│   │   ├── Toast.tsx
│   │   ├── OtpInput.tsx
│   │   ├── Button.tsx
│   │   └── Input.tsx
│   └── auth/                # Auth-specific components
│       ├── AuthForm.tsx
│       └── ComingSoon.tsx
├── hooks/
│   └── useAuth.ts           # Custom auth hook
├── lib/
│   └── auth.ts              # Auth utilities (localStorage)
├── .github/workflows/
│   └── build.yml            # CI/CD pipeline
├── .gitignore               # Git ignore rules
├── next.config.ts           # Next.js config
├── capacitor.config.ts      # Capacitor config
└── package.json             # Dependencies
```

---

## 🎨 Features

- ✅ Fixed OTP authentication (code: `123456`)
- ✅ Email-based registration and login
- ✅ localStorage for user management
- ✅ Session persistence
- ✅ Protected routes
- ✅ Beautiful glassmorphism UI
- ✅ Fully responsive (mobile-first)
- ✅ Smooth animations and transitions
- ✅ Toast notifications
- ✅ Loading states
- ✅ Error handling
- ✅ Static export ready
- ✅ GitHub Actions CI/CD
- ✅ Android & iOS builds automated

---

## 🛠️ Tech Stack

- **Framework:** Next.js 16.1.6 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS v4
- **Mobile:** Capacitor 8.x (Android & iOS)
- **State:** React Hooks + localStorage
- **CI/CD:** GitHub Actions

---

## 📤 Deployment Options

### Option 1: GitHub Actions (Recommended)

Automatically builds web, Android APK, and iOS IPA artifacts.

### Option 2: Vercel (Web Only)

The app is configured for static export and works perfectly on Vercel.

### Option 3: Manual Capacitor Build

```bash
# Build web
npm run build

# Sync Capacitor
npm run sync

# Open in Android Studio
npm run build:android

# Open in Xcode
npm run build:ios
```

---

## 🔐 Security Notes

- OTP code is fixed (`123456`) for testing purposes only
- In production, implement proper backend with real OTP generation
- Never use fixed OTP in production apps
- This is a prototype/demo application

---

## 📝 License

MIT

---

## 🙏 Credits

Built with ❤️ using Next.js, Capacitor, and Tailwind CSS.
