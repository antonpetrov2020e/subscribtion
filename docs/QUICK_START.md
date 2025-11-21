# ⚡ Быстрый старт SubManager

## 3 шага до запуска

### 📦 Шаг 1: Установка (2 минуты)

```bash
# Клонируйте репозиторий
git clone <your-repo-url>
cd subscribtion

# Установите зависимости
npm install

# Создайте .env файл
cp .env.example .env.local
```

---

### 🗄️ Шаг 2: Настройка Supabase (5 минут)

1. **Создайте проект:**
   - Откройте [supabase.com](https://supabase.com)
   - New Project → Выберите имя и регион
   - Сохраните пароль БД!

2. **Скопируйте ключи:**
   - Settings → API
   - Копируйте `Project URL` и `anon public key`
   
3. **Заполните .env.local:**
   ```env
   NEXT_PUBLIC_SUPABASE_URL=https://xxx.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbG...
   ```

4. **Создайте таблицы:**
   - SQL Editor → New query
   - Копируйте весь `supabase/schema.sql`
   - Run ▶️

---

### 🚀 Шаг 3: Запуск (30 секунд)

```bash
npm run dev
```

Откройте [http://localhost:3000](http://localhost:3000)

---

## 🎯 Первые действия в приложении

### 1. Создайте пользователя

**В Supabase Dashboard:**
- Authentication → Users → Add user
- Email: `test@example.com`
- Password: `test123456`
- ✅ Auto Confirm User

**Создайте профиль:**
- Table Editor → profiles → Insert row
- `id`: UUID пользователя из Authentication
- `role`: `admin`

### 2. Добавьте карту

**В приложении или через Supabase:**
- Table Editor → cards → Insert row
  ```
  name: "Tinkoff Black"
  currency: RUB
  last_4_digits: "1234"
  color_hex: "#FFDD2D"
  user_id: [ваш UUID]
  ```

### 3. Добавьте подписку

**Через Supabase:**
- Table Editor → subscriptions → Insert row
  ```
  service_name: "ChatGPT Plus"
  price_original: 20.00
  currency: USD
  billing_cycle: monthly
  start_date: 2024-01-01
  next_payment_date: 2024-12-01
  status: active
  category: AI
  card_id: [UUID карты]
  user_id: [ваш UUID]
  ```

---

## 🔍 Проверка работы

### Всё работает если:

✅ Приложение открывается на localhost:3000  
✅ Видна тёмная тема с сайдбаром  
✅ На дашборде отображаются карточки статистики  
✅ Нет ошибок в консоли браузера (F12)  

### Что-то не работает?

```bash
# Проверьте переменные окружения
echo $NEXT_PUBLIC_SUPABASE_URL

# Перезапустите dev сервер
# Ctrl+C для остановки
npm run dev

# Проверьте логи в терминале
```

---

## 📊 Структура таблиц

```
profiles           cards              subscriptions
├─ id (UUID)      ├─ id (UUID)      ├─ id (UUID)
├─ role           ├─ name           ├─ service_name
├─ created_at     ├─ currency       ├─ price_original
└─ updated_at     ├─ last_4_digits  ├─ currency
                  ├─ color_hex      ├─ billing_cycle
                  └─ user_id (FK)   ├─ status
                                    ├─ category
                                    ├─ card_id (FK)
                                    └─ user_id (FK)
```

---

## 🆘 Частые проблемы

| Проблема | Решение |
|----------|---------|
| `Failed to fetch` | Проверьте `.env.local`, перезапустите сервер |
| `JWT expired` | Неверный anon key в `.env.local` |
| `Row Level Security` | Создайте профиль в таблице `profiles` |
| Белый экран | Откройте консоль (F12), посмотрите ошибки |

---

## 📚 Дополнительно

- 📘 [Полное руководство по Supabase](SUPABASE_SETUP.md)
- 📖 [README проекта](../README.md)
- 🌐 [Документация Supabase](https://supabase.com/docs)

---

**Готово!** Теперь у вас работающее приложение SubManager 🎉
