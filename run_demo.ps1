Write-Host "Starting Bhūmi Raksha Services..." -ForegroundColor Cyan

# Start Backend API
Write-Host "Starting Backend API on port 8000..." -ForegroundColor Yellow
Start-Process powershell -ArgumentList "-NoExit -Command `"cd backend; .\venv\Scripts\uvicorn.exe main:app --reload`""

# Wait a few seconds for backend to be ready
Start-Sleep -Seconds 3

# Start Simulation Script
Write-Host "Starting Sensor Simulation Script..." -ForegroundColor Yellow
Start-Process powershell -ArgumentList "-NoExit -Command `"cd backend; .\venv\Scripts\python.exe simulation.py`""

# Start Frontend
Write-Host "Starting Next.js Frontend on port 3000..." -ForegroundColor Yellow
Start-Process powershell -ArgumentList "-NoExit -Command `"cd frontend; yarn dev`""

Write-Host "All services started!" -ForegroundColor Green
Write-Host "Frontend: http://localhost:3000"
Write-Host "Backend API: http://localhost:8000"
