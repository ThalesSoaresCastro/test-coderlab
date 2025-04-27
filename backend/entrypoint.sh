#!/bin/sh
npx prisma migrate deploy
npm run seed:js
npm run start:prod