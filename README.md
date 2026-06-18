# PulGuru — Expo React Native App

> AI-powered personal finance app for the Uzbekistan market. Track expenses, income, budgets and savings via SMS-based transaction detection.

[![Expo](https://img.shields.io/badge/Expo-52-black?logo=expo)](https://expo.dev)
[![React Native](https://img.shields.io/badge/React%20Native-0.76-blue?logo=react)](https://reactnative.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.3-blue?logo=typescript)](https://typescriptlang.org)

## Screens

| Screen | Route | Description |
|--------|-------|-------------|
| Onboarding | `/onboarding` | 5-step welcome flow with language + permissions |
| Dashboard | `/(tabs)/` | Balance, AI insight, chart, recent transactions |
| Transactions | `/(tabs)/transactions` | Searchable + filterable transaction list |
| AI Insights | `/(tabs)/insights` | Health score, weekly bars, category breakdown |
| Budgets | `/(tabs)/budgets` | Category budgets with progress bars |
| Profile | `/(tabs)/profile` | Language, dark mode, SMS toggle, settings |
| Add Transaction | `/add-transaction` | Modal input form |
| Subscriptions | `/subscriptions` | SMS-detected recurring payments |
| Savings Goals | `/savings` | Goal cards + achievement badges |

## Color System

| Token | Value | Usage |
|-------|-------|-------|
| `emerald` | `#00B26F` | Primary brand, CTAs |
| `navy` | `#0F172A` | Headers, dark surfaces |
| `gold` | `#F59E0B` | Savings, achievements |
| `red` | `#EF4444` | Overspending, warnings |

## Getting Started

```bash
npm install
npx expo start
```

Then press `i` for iOS, `a` for Android, or scan the QR code with Expo Go.

## Project Structure

```
pulguru-app/
├── app/
│   ├── _layout.tsx          # Root layout
│   ├── index.tsx            # Entry → onboarding
│   ├── onboarding.tsx       # 5-step onboarding
│   ├── add-transaction.tsx  # Add tx modal
│   ├── subscriptions.tsx
│   ├── savings.tsx
│   └── (tabs)/
│       ├── _layout.tsx      # Tab bar
│       ├── index.tsx        # Dashboard
│       ├── transactions.tsx
│       ├── insights.tsx
│       ├── budgets.tsx
│       └── profile.tsx
├── constants/
│   ├── Colors.ts            # Design tokens
│   └── Data.ts              # Mock data
└── README.md
```

## Uzbekistan-specific Features

- **UZS currency** throughout the app
- **SMS-based detection** (READ_SMS permission)
- **3 languages**: O'zbekcha, Русский, English
- **Uzcard / Humo** card ecosystem
- **Click & Payme** integration placeholder

---

Built with ❤️ in Uzbekistan · Powered by Expo
