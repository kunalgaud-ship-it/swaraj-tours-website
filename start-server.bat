@echo off
title Swaraj Cab Website - Server
cd /d "%~dp0"

echo ==========================================
echo   Swaraj Cab Website - Server START
echo ==========================================
echo.

REM Agar node_modules nahi hai to pehle install karo
if not exist "node_modules" (
    echo node_modules nahi mila, dependencies install ho rahi hain...
    call npm install
    if errorlevel 1 (
        echo.
        echo [ERROR] npm install fail ho gaya.
        pause
        exit /b 1
    )
)

REM Agar port 3000 pe pehle se kuch chal raha hai to warn karo
for /f "tokens=5" %%p in ('netstat -ano ^| findstr ":3000 " ^| findstr "LISTENING"') do (
    echo [WARNING] Port 3000 pe pehle se server chal raha hai, PID: %%p
    echo Pehle stop-server.bat chalao, phir dobara start karo.
    pause
    exit /b 1
)

echo Server start ho raha hai: http://localhost:3000
echo Band karne ke liye stop-server.bat chalao.
echo.

REM Server ko alag minimized window me chalao (title se stop-server.bat use pehchanta hai)
start "SwarajTours-Server" /min cmd /c "npm run dev > vite-dev.log 2>&1"

REM 4 second wait karo aur browser me website kholo
ping -n 5 127.0.0.1 >nul
start "" http://localhost:3000

echo Server background me chal raha hai (minimized window "SwarajTours-Server").
echo Log file: vite-dev.log
echo.
pause
