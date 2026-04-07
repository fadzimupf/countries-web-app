# Countries Application
A full-stack application consisting of a .NET API backend (`CountriesApplication.Server`) and a Vite-powered frontend client (`countriesapplication.client`), with Docker Compose.

## Prerequisites
Ensure the following are installed on your machine before getting started:
- [Docker](https://www.docker.com/get-started) 
- [Docker Compose](https://docs.docker.com/compose/install/)

## Environment Setup
Create a .env file at the root of the project and add the following values (these can also be copied from `.env.example`):

```env
# Port the API will be accessible on from your host machine
API_PORT=5000
# Port the web frontend will be accessible on from your host machine
WEB_PORT=3000
# ASP.NET Core environment (Development | Staging | Production)
ASPNETCORE_ENVIRONMENT=Development
# The origin URL of the frontend, used for CORS configuration on the API
WEB_ORIGIN=http://localhost:3000
```

## Running the Application
### 1. Build and start all services
From the project root directory, run:
```bash
docker compose up --build
```
This will:
- Build the .NET API image from `CountriesApplication.Server/Dockerfile`
- Build the Vite frontend image from `countriesapplication.client/Dockerfile` (with `VITE_API_URL` injected at build time)
- Start both containers and expose them on the ports defined in your `.env`

### 2. Access the application
- Navigate to `http://localhost:3000` to access the web application
- Navigate to `http://localhost:8080` to access the web api. See the following examples:
  - http://localhost:8080/Countries/Peru
  - http://localhost:8080/Countries
- Navigate to `http://localhost:8080/openapi/v1.json` to access the web api openapi documentation

### 4. Stop the application
```bash
docker compose down
```
---
