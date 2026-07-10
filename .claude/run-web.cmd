@echo off
set PATH=C:\Program Files\nodejs;%PATH%
cd /d "%~dp0..\runelands\app"
call npm run web -- --port 8090
