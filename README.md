# ACCEPT frontend

## Before Start

Do not forget to fill up .env files.

- API_ENDPOINT for server-side communication with backend
- WEBSOCKET_API for client-side communication with backend sockets

Check .templates files for more information.

## Before release

- Update version in `package.json`
- Update history in `src/constants/History.tsx`
- Make sure that you have the actual version of the backend: it is important for building stage
- Make sure your can properly build frontend

## On adding new route

Update the `src/constants/protectedRoutes` if necessary
