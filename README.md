# ACCEPT II

## Before Start

Do not forget to fill up .env files

- API_ENDPOINT for server-side communication with backend
- WEBSOCKET_API for client-side communication with backend sockets

## Docker build commands

docker build -t accept-front-docker .

docker compose up --build

## Docker run commands

docker run -p 3000:3000 accept-front-docker

docker compose up
