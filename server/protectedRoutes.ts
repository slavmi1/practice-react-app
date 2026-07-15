/**
 * Список "защищённых" ручек для студентов.
 *
 * JSON Server сам отдаёт REST-эндпоинты для коллекций из `server/db.json`.
 * Поэтому достаточно защитить префикс вида:
 *   `/api/<collection_name>`
 *
 * Пример:
 *   collection в db.json:  "private_posts"
 *   защищённый префикс:   "/api/private_posts"
 */
export const protectedPrefixes: string[] = [
  '/api/users',
  '/api/private_posts'
]

