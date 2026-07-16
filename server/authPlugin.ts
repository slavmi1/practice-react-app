import type { Plugin } from "vite";

import {
  createTokenForUser,
  createUser,
  findUserByEmail,
  findUserById,
  getCookie,
  readJsonBody,
  sanitizeUser,
  sendJson,
  verifyPassword,
  verifyToken,
} from "./auth.ts";

type RegisterBody = {
  name?: string;
  email?: string;
  phone?: string;
  password?: string;
};

type LoginBody = {
  email?: string;
  password?: string;
};

export function authPlugin(): Plugin {
  return {
    name: "barbertime-auth",

    configureServer(server) {
      server.middlewares.use(async (req, res, next) => {
        const isRegister =
          req.method === "POST" && req.url === "/api/auth/register";

        const isLogin = req.method === "POST" && req.url === "/api/auth/login";

        const isSession =
          req.method === "GET" && req.url === "/api/auth/session";

        const isLogout =
          req.method === "POST" && req.url === "/api/auth/logout";

        if (!isRegister && !isLogin && !isSession && !isLogout) {
          next();
          return;
        }

        if (isRegister) {
          try {
            const body = await readJsonBody<RegisterBody>(req);

            if (!body.name || !body.email || !body.phone || !body.password) {
              sendJson(res, 400, {
                error: "Необходимо заполнить все поля",
              });
              return;
            }

            const result = await createUser(
              body.name,
              body.email,
              body.phone,
              body.password,
            );

            if (!result.ok) {
              sendJson(res, 409, {
                error: result.error,
              });
              return;
            }

            const token = createTokenForUser(result.user);

            res.setHeader(
              "Set-Cookie",
              `authToken=${token}; HttpOnly; Path=/; SameSite=Lax; Max-Age=604800`,
            );

            sendJson(res, 201, {
              user: sanitizeUser(result.user),
            });
            return;
          } catch {
            sendJson(res, 400, {
              error: "Некорректные данные запроса",
            });
            return;
          }
        }

        if (isLogin) {
          try {
            const body = await readJsonBody<LoginBody>(req);

            if (!body.email || !body.password) {
              sendJson(res, 400, {
                error: "Введите email и пароль",
              });
              return;
            }

            const user = findUserByEmail(body.email);

            if (!user) {
              sendJson(res, 401, {
                error: "Неверный email или пароль",
              });
              return;
            }

            const isPasswordValid = await verifyPassword(
              body.password,
              user.password,
            );

            if (!isPasswordValid) {
              sendJson(res, 401, {
                error: "Неверный email или пароль",
              });
              return;
            }

            const token = createTokenForUser(user);

            res.setHeader(
              "Set-Cookie",
              `authToken=${token}; HttpOnly; Path=/; SameSite=Lax; Max-Age=604800`,
            );

            sendJson(res, 200, {
              user: sanitizeUser(user),
            });
          } catch {
            sendJson(res, 400, {
              error: "Некорректные данные запроса",
            });
            return;
          }
        }

        if (isSession) {
          const token = getCookie(req.headers.cookie, "authToken");

          if (!token) {
            sendJson(res, 200, {
              user: null,
            });
            return;
          }

          const payload = verifyToken(token);

          if (!payload) {
            sendJson(res, 200, {
              user: null,
            });
            return;
          }

          const user = findUserById(payload.userId);

          if (!user) {
            res.setHeader(
              "Set-Cookie",
              "authToken=; HttpOnly; Path=/; SameSite=Lax; Max-Age=0",
            );

            sendJson(res, 200, {
              user: null,
            });
            return;
          }

          sendJson(res, 200, {
            user: sanitizeUser(user),
          });
          return;
        }

        if (isLogout) {
          res.setHeader(
            "Set-Cookie",
            "authToken=; HttpOnly; Path=/; SameSite=Lax; Max-Age=0",
          );

          sendJson(res, 200, {
            message: "Выход выполнен",
          });
          return;
        }
      });
    },
  };
}
