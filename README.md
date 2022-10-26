# ACCEPT II

## Before Start

- Do not forget to add new server URL to the src/constants/url

## Docker build commands

docker build -t accept-front-docker .

docker compose up --build

## Docker run commands

docker run -p 3000:3000 accept-front-docker

docker compose up --build
