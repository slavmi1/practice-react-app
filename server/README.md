# Mock API (json-server) + Bearer token

Этот проект использует `vite-plugin-json-server`, чтобы поднять mock REST API на пути `/api` во время разработки.

## Установка (npm)

Если вы переносите/подключаете `vite-plugin-json-server` в свой проект, могут появляться конфликты `peerDependencies` (у этого пакета старое требование к версии `vite`).

Для npm используйте:

```bash
npm install vite-plugin-json-server --save-dev --legacy-peer-deps
```

## Пользователи и регистрация

Пользователи хранятся в `server/db.json` в массиве `users`.

Стартовые пользователи:

- `admin` / `admin`
- `student` / `student`

Важно: это учебный mock-сервер, поэтому пароли лежат в `db.json` в открытом виде.

Эндпоинты авторизации:

- `POST /api/auth/register`
- `POST /api/auth/login`

Оба эндпоинта принимают JSON body:

```json
{
  "username": "student",
  "password": "student"
}
```

Успешный ответ содержит Bearer token:

```json
{
  "ok": true,
  "token": "some-token",
  "tokenType": "Bearer",
  "user": {
    "_id": 2,
    "username": "student",
    "role": "user"
  }
}
```

## Публичные и защищённые ручки: как дописывать

Важно: в этом проекте `vite-plugin-json-server` по умолчанию использует поле идентификатора `_id` (а не `id`).
Поэтому для элементов коллекций в `server/db.json` добавляйте именно `_id`.

### 1) Добавить публичную ручку

1. Открой `server/db.json`
2. Добавь новую коллекцию, например `public_comments` (массив объектов)
3. Готово: json-server автоматически создаст CRUD-ручки на `/api/public_comments`.

Пример коллекции:

`"public_comments": [{ "_id": 1, "text": "..." }]`

### 2) Добавить защищённую ручку

1. Добавь коллекцию в `server/db.json`, например `private_comments`
2. Открой `server/protectedRoutes.ts`
3. В массив `protectedPrefixes` добавь префикс вида:

`'/api/private_comments'`

После этого все запросы на `/api/private_comments/...` будут требовать Bearer token.

## Как отправлять запросы

### Логин

```js
const loginResponse = await fetch('/api/auth/login', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    username: 'admin',
    password: 'admin',
  }),
})

const authData = await loginResponse.json()
const token = authData.token
```

### Защищённая ручка

После логина нужно сохранить `token` и передавать его так:

```js
const res = await fetch('/api/private_posts', {
  headers: {
    Authorization: `Bearer ${token}`,
  },
})

console.log(await res.json())
```

## Что важно

- Публичные CRUD-ручки создаются автоматически из `server/db.json`.
- Защищённые ручки указываются в `server/protectedRoutes.ts`.
- Регистрация создаёт нового пользователя и записывает его в `server/db.json`.
- Клиенту нужно сохранить `token` после `login` или `register`, а потом использовать его в `Authorization`.