# SubManager - Менеджер подписок

Современное веб-приложение для управления личными и бизнес подписками с поддержкой мультивалютности и AI-ассистированным импортом данных.

## 🎯 Основные возможности

- **Dashboard** - сводная информация о расходах и активных подписках
- **Управление подписками** - полный CRUD для отслеживания сервисов
- **Управление картами** - отслеживание источников оплаты
- **Мультивалютность** - поддержка RUB, USD, EUR, KZT, AMD с автоматической конвертацией
- **AI Smart Import** - импорт данных из неструктурированного текста (SMS, заметки)
- **Аналитика** - визуализация расходов по категориям и картам
- **Темная тема** - премиум дизайн с поддержкой dark mode по умолчанию

## 🛠 Технологический стек

- **Framework**: Next.js 16 (App Router, TypeScript)
- **Styling**: Tailwind CSS v4 + Shadcn/UI
- **Icons**: Lucide React
- **Database & Auth**: Supabase (PostgreSQL)
- **State Management**: TanStack Query (React Query)
- **Forms**: React Hook Form + Zod
- **AI**: OpenAI SDK

## 📋 Предварительные требования

- Node.js 18+ 
- npm или yarn
- Аккаунт Supabase
- OpenAI API key (для AI импорта)

## 🚀 Быстрый старт

### 1. Клонирование репозитория

```bash
git clone <repository-url>
cd subscribtion
```

### 2. Установка зависимостей

```bash
npm install
```

### 3. Настройка переменных окружения

Создайте файл `.env.local` на основе `.env.example`:

```bash
cp .env.example .env.local
```

Заполните переменные окружения:

```env
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key

# OpenAI Configuration
OPENAI_API_KEY=your_openai_api_key
```

### 4. Настройка Supabase

> 📘 **[Подробное пошаговое руководство по настройке Supabase →](docs/SUPABASE_SETUP.md)**

**Краткая инструкция:**

#### 4.1 Создание проекта

1. Перейдите на [supabase.com](https://supabase.com) и создайте аккаунт
2. Создайте новый проект (выберите регион и установите пароль БД)
3. Дождитесь завершения создания проекта (1-2 минуты)

#### 4.2 Получение API ключей

1. Перейдите в **Settings** → **API** в вашем проекте
2. Скопируйте:
   - `Project URL` → в `NEXT_PUBLIC_SUPABASE_URL`
   - `anon public` key → в `NEXT_PUBLIC_SUPABASE_ANON_KEY`
3. Вставьте их в файл `.env.local`

#### 4.3 Создание схемы базы данных

1. Откройте **SQL Editor** в панели Supabase
2. Нажмите **"New query"**
3. Скопируйте **ВСЁ** содержимое файла `supabase/schema.sql`
4. Вставьте в SQL Editor и нажмите **"Run"**
5. ✅ Проверьте создание таблиц в **Table Editor**

Это создаст следующие таблицы:
- `profiles` - профили пользователей
- `cards` - платёжные карты
- `subscriptions` - подписки
- `exchange_rates` - курсы валют

#### 4.3 Настройка аутентификации

1. В Supabase Dashboard перейдите в Authentication > Settings
2. Включите Email Provider
3. (Опционально) Настройте другие провайдеры

### 5. Запуск приложения

```bash
# Development
npm run dev

# Production build
npm run build
npm run start
```

Приложение будет доступно по адресу [http://localhost:3000](http://localhost:3000)

## 📁 Структура проекта

```
subscribtion/
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── layout.tsx          # Root layout
│   │   ├── page.tsx            # Dashboard
│   │   └── globals.css         # Global styles
│   ├── components/             # React компоненты
│   │   ├── ui/                 # Shadcn UI компоненты
│   │   ├── sidebar.tsx         # Навигация
│   │   └── app-layout.tsx      # Общий layout
│   ├── lib/                    # Утилиты
│   │   ├── supabase.ts         # Supabase клиент
│   │   ├── providers.tsx       # React Query provider
│   │   └── utils.ts            # Вспомогательные функции
│   └── types/                  # TypeScript типы
│       └── database.ts         # Типы для БД
├── supabase/
│   └── schema.sql              # SQL миграция
├── tailwind.config.ts          # Tailwind конфигурация
├── components.json             # Shadcn конфигурация
└── package.json
```

## 🎨 Дизайн-система

Приложение использует темную тему по умолчанию с premium визуальным стилем:

- **Цветовая схема**: Zinc-based палитра
- **Типографика**: Системные шрифты с fallback на sans-serif
- **Компоненты**: Shadcn/UI (Radix UI под капотом)
- **Layout**: Bento Grid стиль для дашборда

## 🗂 Схема базы данных

### profiles
- `id` - UUID (PK, FK to auth.users)
- `role` - ENUM (admin, assistant)
- `created_at`, `updated_at`

### cards
- `id` - UUID (PK)
- `name` - TEXT (например, "Tinkoff Black")
- `currency` - ENUM (RUB, USD, EUR, KZT, AMD)
- `last_4_digits` - TEXT
- `color_hex` - TEXT (для визуализации)
- `user_id` - UUID (FK to profiles)

### subscriptions
- `id` - UUID (PK)
- `service_name` - TEXT
- `price_original` - DECIMAL
- `currency` - ENUM
- `billing_cycle` - ENUM (monthly, yearly, quarterly, weekly)
- `start_date`, `next_payment_date` - DATE
- `status` - ENUM (active, paused, cancelled)
- `category` - ENUM (AI, Streaming, Soft, Education, Other)
- `card_id` - UUID (FK to cards)
- `description`, `image_url` - TEXT
- `user_id` - UUID (FK to profiles)

### exchange_rates
- `id` - UUID (PK)
- `from_currency`, `to_currency` - ENUM
- `rate` - DECIMAL
- `date` - DATE

## 🔐 Безопасность

Приложение использует Row Level Security (RLS) политики Supabase:
- Пользователи видят только свои данные
- Exchange rates доступны всем для чтения
- Только администраторы могут обновлять курсы валют

## 📝 Roadmap (следующие шаги)

- [ ] Реализовать CRUD для карт
- [ ] Реализовать CRUD для подписок
- [ ] Добавить Dashboard с реальной аналитикой
- [ ] Реализовать AI Smart Import функцию
- [ ] Добавить страницу аналитики с графиками
- [ ] Реализовать уведомления о предстоящих платежах
- [ ] Добавить экспорт данных в CSV/Excel
- [ ] Интеграция с банковскими API

## 🤝 Вклад

Проект в активной разработке. Feedback и предложения приветствуются!

## 📄 Лицензия

MIT License

---

**Разработано с ❤️ для управления личными финансами**
