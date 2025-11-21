# 🚀 Подробное руководство по настройке Supabase для SubManager

Это пошаговое руководство поможет вам настроить базу данных Supabase для приложения SubManager.

## Шаг 1: Создание аккаунта и проекта в Supabase

### 1.1 Регистрация

1. Перейдите на сайт [https://supabase.com](https://supabase.com)
2. Нажмите кнопку **"Start your project"** в правом верхнем углу
3. Войдите через GitHub (рекомендуется) или создайте аккаунт по email

### 1.2 Создание нового проекта

1. После входа вы попадёте в Dashboard
2. Нажмите **"New Project"** (или "Create a new project")
3. Выберите или создайте **Organization** (можно использовать личную)
4. Заполните данные проекта:
   ```
   Name: SubManager (или любое другое имя)
   Database Password: [создайте надёжный пароль и СОХРАНИТЕ его!]
   Region: выберите ближайший регион (например, Frankfurt для Европы)
   Pricing Plan: Free (для начала)
   ```
5. Нажмите **"Create new project"**
6. ⏳ Подождите 1-2 минуты, пока проект создаётся

---

## Шаг 2: Получение credentials (API ключей)

### 2.1 Где найти ключи

1. После создания проекта откройте его
2. В левом меню найдите **⚙️ Settings** (внизу)
3. Выберите раздел **API**
4. Вы увидите следующие данные:

   ```
   Project URL: https://xxxxxxxxxxxxx.supabase.co
   anon public key: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
   service_role key: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9... (не нужен для фронтенда)
   ```

### 2.2 Настройка .env.local

1. Откройте проект SubManager в вашем редакторе
2. Скопируйте файл `.env.example` в `.env.local`:
   ```bash
   cp .env.example .env.local
   ```

3. Откройте `.env.local` и заполните данные:
   ```env
   # Supabase Configuration
   NEXT_PUBLIC_SUPABASE_URL=https://xxxxxxxxxxxxx.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.ey...
   
   # OpenAI Configuration (пока можно оставить пустым)
   OPENAI_API_KEY=your_openai_api_key_here
   ```

4. Сохраните файл

> ⚠️ **Важно:** Никогда не коммитьте `.env.local` в git! Этот файл уже добавлен в `.gitignore`.

---

## Шаг 3: Создание схемы базы данных

### 3.1 Открыть SQL Editor

1. В Dashboard вашего проекта Supabase
2. В левом меню найдите **🗄️ SQL Editor**
3. Нажмите на него

### 3.2 Выполнить миграцию

#### Вариант A: Через веб-интерфейс (рекомендуется)

1. В SQL Editor нажмите **"New query"**
2. Откройте файл `supabase/schema.sql` в вашем проекте
3. **Скопируйте ВСЁ содержимое** файла (Ctrl+A, Ctrl+C)
4. Вставьте в окно SQL Editor в Supabase (Ctrl+V)
5. Нажмите **"Run"** (или F5) в правом нижнем углу
6. ✅ Если всё прошло успешно, вы увидите сообщение "Success. No rows returned"

#### Вариант B: Через Supabase CLI (для продвинутых)

Если у вас установлен Supabase CLI:

```bash
# Установка CLI (если ещё не установлен)
npm install -g supabase

# Логин
supabase login

# Линк к проекту
supabase link --project-ref your-project-ref

# Применить миграцию
supabase db push
```

### 3.3 Проверка создания таблиц

1. В левом меню откройте **📊 Table Editor**
2. Вы должны увидеть созданные таблицы:
   - ✅ `profiles`
   - ✅ `cards`
   - ✅ `subscriptions`
   - ✅ `exchange_rates`

---

## Шаг 4: Настройка Authentication (аутентификация)

### 4.1 Включить Email провайдер

1. В левом меню откройте **🔐 Authentication**
2. Перейдите в **Providers**
3. Найдите **Email** и убедитесь, что он **включён** (enabled)
4. (Опционально) Настройте Email Templates в разделе **Email Templates**

### 4.2 Создать тестового пользователя

**Способ 1: Через UI (проще)**

1. В разделе **Authentication** → **Users**
2. Нажмите **"Add user"** → **"Create new user"**
3. Заполните:
   ```
   Email: your-email@example.com
   Password: your-password
   Auto Confirm User: ✅ (включите!)
   ```
4. Нажмите **"Create user"**

**Способ 2: Через регистрацию в приложении**

После запуска приложения вы сможете зарегистрироваться через стандартную форму.

### 4.3 Создать профиль для пользователя

После создания пользователя нужно создать профиль в таблице `profiles`:

1. Откройте **Table Editor** → `profiles`
2. Нажмите **"Insert"** → **"Insert row"**
3. Заполните:
   ```
   id: [вставьте UUID пользователя из Authentication → Users]
   role: admin
   ```
4. Нажмите **"Save"**

> 💡 **Совет:** UUID пользователя можно скопировать из раздела Authentication → Users (колонка ID)

---

## Шаг 5: Проверка подключения

### 5.1 Запуск приложения

```bash
# Установите зависимости (если ещё не сделали)
npm install

# Запустите в dev режиме
npm run dev
```

### 5.2 Проверка в браузере

1. Откройте [http://localhost:3000](http://localhost:3000)
2. Вы должны увидеть дашборд SubManager
3. Если появляются ошибки подключения - проверьте `.env.local`

### 5.3 Проверка в консоли браузера

Откройте DevTools (F12) и выполните:

```javascript
console.log(process.env.NEXT_PUBLIC_SUPABASE_URL)
```

Должен вывести ваш URL Supabase.

---

## Шаг 6: Добавление тестовых данных (опционально)

### 6.1 Добавить валютные курсы

Курсы уже добавлены автоматически при выполнении миграции (`schema.sql`):

```sql
-- Проверьте в Table Editor → exchange_rates
RUB → RUB: 1.00
USD → RUB: 95.00
EUR → RUB: 103.00
KZT → RUB: 0.21
AMD → RUB: 0.24
```

### 6.2 Добавить тестовую карту

1. Откройте **Table Editor** → `cards`
2. Нажмите **"Insert row"**
3. Заполните:
   ```
   name: Tinkoff Black
   currency: RUB
   last_4_digits: 1234
   color_hex: #FFDD2D
   user_id: [ваш UUID из profiles]
   ```
4. Сохраните

### 6.3 Добавить тестовую подписку

1. Откройте **Table Editor** → `subscriptions`
2. Нажмите **"Insert row"**
3. Заполните:
   ```
   service_name: ChatGPT Plus
   price_original: 20.00
   currency: USD
   billing_cycle: monthly
   start_date: 2024-01-01
   next_payment_date: 2024-12-01
   status: active
   category: AI
   card_id: [UUID карты из предыдущего шага]
   user_id: [ваш UUID]
   ```
4. Сохраните

---

## 🔧 Troubleshooting (Решение проблем)

### Ошибка: "Failed to fetch"

**Причина:** Неверный URL или ключ API

**Решение:**
1. Проверьте `.env.local`
2. Убедитесь, что файл называется именно `.env.local` (не `.env`)
3. Перезапустите сервер разработки (`npm run dev`)

### Ошибка: "JWT expired" или "Invalid JWT"

**Причина:** Неверный anon key

**Решение:**
1. Пересоздайте проект или сбросьте JWT secret в Settings → API
2. Обновите ключи в `.env.local`

### Ошибка: "Row Level Security policy violation"

**Причина:** Нет прав доступа к данным

**Решение:**
1. Убедитесь, что пользователь создан в Authentication
2. Убедитесь, что есть запись в таблице `profiles` с `user_id = auth.uid()`
3. Проверьте, что RLS политики применены (это делается автоматически через `schema.sql`)

### Таблицы не создались

**Причина:** Ошибка в SQL запросе

**Решение:**
1. Откройте SQL Editor
2. Посмотрите на ошибку выполнения (если была)
3. Попробуйте выполнить миграцию построчно или блоками
4. Убедитесь, что расширение `uuid-ossp` включено

---

## 📚 Дополнительные ресурсы

- [Официальная документация Supabase](https://supabase.com/docs)
- [Supabase Auth Guide](https://supabase.com/docs/guides/auth)
- [Row Level Security](https://supabase.com/docs/guides/auth/row-level-security)
- [Supabase JavaScript Client](https://supabase.com/docs/reference/javascript/introduction)

---

## ✅ Чеклист настройки

Убедитесь, что выполнены все шаги:

- [ ] Создан проект в Supabase
- [ ] Получены и сохранены API credentials
- [ ] Заполнен файл `.env.local`
- [ ] Выполнена SQL миграция из `schema.sql`
- [ ] Созданы таблицы: profiles, cards, subscriptions, exchange_rates
- [ ] Включён Email провайдер в Authentication
- [ ] Создан тестовый пользователь
- [ ] Создан профиль пользователя в таблице profiles
- [ ] Приложение успешно запускается (`npm run dev`)
- [ ] Нет ошибок подключения в консоли

---

**Готово!** 🎉 Теперь ваше приложение SubManager полностью настроено и готово к работе!

Если возникли проблемы, проверьте раздел Troubleshooting или создайте issue в репозитории проекта.
