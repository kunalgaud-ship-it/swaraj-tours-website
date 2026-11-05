@echo off
title Swaraj Tours Website - Stop Server
cd /d "%~dp0"

echo ==========================================
echo   Swaraj Tours Website - Server STOP
echo ==========================================
echo.

set FOUND=0

REM Port 3000 pe jo bhi process LISTEN kar raha hai use band karo
for /f "tokens=5" %%p in ('netstat -ano ^| findstr ":3000 " ^| findstr "LISTENING"') do (
    set FOUND=1
    echo Port 3000 pe process mila, PID: %%p - band kiya ja raha hai...
    taskkill /PID %%p /T /F >nul 2>&1
)

REM Minimized server window (agar abhi bhi khuli hai) ko bhi band karo
taskkill /FI "WINDOWTITLE eq SwarajTours-Server*" /T /F >nul 2>&1

if "%FOUND%"=="1" (
    echo.
    echo [OK] Server band ho gaya.
) else (
    echo Port 3000 pe koi server nahi chal raha tha. Kuch band karne ki zarurat nahi.
)

echo.
pause
