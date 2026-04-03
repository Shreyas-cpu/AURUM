@echo off
echo Starting AURUM Project...

echo ========================================================
echo 1. Starting PostgreSQL Database (Docker)...
echo ========================================================
docker-compose up -d

echo ========================================================
echo 2. Starting Node.js Backend API (Port 3001)...
echo ========================================================
start cmd /k "title AURUM Node API & cd backend\api && npm start"

echo ========================================================
echo 3. Starting Python ML Engine (Port 8000)...
echo ========================================================
start cmd /k "title AURUM ML Engine & cd backend\ml_engine && uvicorn main:app --reload --host 0.0.0.0 --port 8000"

echo ========================================================
echo 4. Starting React Frontend (Vite)...
echo ========================================================
start cmd /k "title AURUM React Frontend & cd frontend && npm run dev"

echo ========================================================
echo AURUM all services have been launched in separate windows!
echo It might take a few moments for all servers to become fully available.
echo Frontend will be running at: http://localhost:5173
echo ========================================================
pause
