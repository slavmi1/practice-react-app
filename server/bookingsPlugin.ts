import crypto from "node:crypto";
import type { Plugin } from "vite";

import fs from "node:fs";

import { getCookie, readJsonBody, sendJson, verifyToken } from "./auth.ts";

type CreateBookingBody = {
  serviceId?: string;
  date?: string;
  time?: string;
};

type DbBooking = {
  _id: string;
  userId: string;
  serviceId: string;
  date: string;
  time: string;
  status: "new" | "confirmed" | "completed" | "cancelled";
};

type DbShape = {
  bookings: DbBooking[];
};

const dbUrl = new URL("./db.json", import.meta.url);

function readDb(): DbShape {
  const content = fs.readFileSync(dbUrl, "utf8");

  return JSON.parse(content) as DbShape;
}

function writeDb(db: DbShape) {
  fs.writeFileSync(dbUrl, `${JSON.stringify(db, null, 2)}\n`, "utf8");
}

export function bookingsPlugin(): Plugin {
  return {
    name: "barbertime-bookings",

    configureServer(server) {
      server.middlewares.use(async (req, res, next) => {
        const isGetBookings =
          req.method === "GET" && req.url === "/api/bookings";

        const isCreateBooking =
          req.method === "POST" && req.url === "/api/bookings";

        const cancelMatch = req.url?.match(
          /^\/api\/bookings\/([^/]+)\/cancel$/,
        );

        const isCancelBooking = req.method === "PATCH" && Boolean(cancelMatch);

        if (!isCreateBooking && !isGetBookings && !isCancelBooking) {
          next();
          return;
        }

        const token = getCookie(req.headers.cookie, "authToken");

        if (!token) {
          sendJson(res, 401, {
            error: "Пользователь не авторизован",
          });
          return;
        }

        const payload = verifyToken(token);

        if (!payload) {
          sendJson(res, 401, {
            error: "Недействительный токен",
          });
          return;
        }

        if (isGetBookings) {
          const db = readDb();

          const userBookings = db.bookings.filter(
            (booking) => booking.userId === payload.userId,
          );

          sendJson(res, 200, userBookings);
          return;
        }

        if (isCreateBooking) {
          const body = await readJsonBody<CreateBookingBody>(req);

          if (!body.serviceId || !body.date || !body.time) {
            sendJson(res, 400, {
              error: "Необходимо заполнить данные записи",
            });
            return;
          }

          const booking: DbBooking = {
            _id: crypto.randomUUID(),
            userId: payload.userId,
            serviceId: body.serviceId,
            date: body.date,
            time: body.time,
            status: "new",
          };

          const db = readDb();

          db.bookings.push(booking);

          writeDb(db);

          sendJson(res, 201, booking);
          return;
        }

        if (isCancelBooking) {
          if (!cancelMatch) {
            next();
            return;
          }

          const bookingId = cancelMatch[1];

          if (!bookingId) {
            sendJson(res, 400, {
              error: "Некорректный ID записи",
            });
            return;
          }

          const userId = payload.userId;
          const db = readDb();

          const booking = db.bookings.find(
            (booking) => booking._id === bookingId && booking.userId === userId,
          );

          if (!booking) {
            sendJson(res, 404, {
              error: "Запись не найдена",
            });
            return;
          }

          if (
            booking.status === "completed" ||
            booking.status === "cancelled"
          ) {
            sendJson(res, 400, {
              error: "Эту запись нельзя отменить",
            });
            return;
          }

          booking.status = "cancelled";

          writeDb(db);

          sendJson(res, 200, booking);
          return;
        }
      });
    },
  };
}
