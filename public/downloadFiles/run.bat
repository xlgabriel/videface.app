@echo off
TITLE VideFace Kiosk

:: Log start of script
echo Starting VideFace script...

:: Wait for 3 seconds before starting (adjustable if necessary)
timeout /t 3 /nobreak > nul

:: Kill any existing instances of Chrome and Edge to prevent conflicts
taskkill /f /im chrome.exe
taskkill /f /im msedge.exe
echo Killed any existing instances of Chrome and Edge

:: Ensure Chrome and Edge are fully terminated
timeout /t 3 /nobreak > nul
echo Waited to ensure Chrome and Edge are fully terminated

:: Clear any saved session files to prevent session restore for Chrome
set "chromeProfileDir=C:\Users\%USERNAME%\AppData\Local\Google\Chrome\User Data\Default"
if exist "%chromeProfileDir%\Sessions" rd /s /q "%chromeProfileDir%\Sessions"
if exist "%chromeProfileDir%\Current Session" del /q "%chromeProfileDir%\Current Session"
if exist "%chromeProfileDir%\Current Tabs" del /q "%chromeProfileDir%\Current Tabs"
if exist "%chromeProfileDir%\Last Session" del /q "%chromeProfileDir%\Last Session"
if exist "%chromeProfileDir%\Last Tabs" del /q "%chromeProfileDir%\Last Tabs"
echo Cleared saved session files to prevent session restore for Chrome

:: Start Google Chrome with the Default profile and open VideFace directly on DISPLAY2
start "" "C:\Program Files\Google\Chrome\Application\chrome.exe" --profile-directory="Default" --window-position=-1920,0 --window-size=1920,1080 --start-fullscreen "https://login.videface.app" --disable-pinch --autoplay-policy=no-user-gesture-required --allow-running-insecure-content --no-first-run --disable-infobars --disable-notifications --disable-popup-blocking --disable-extensions --disable-component-update --disable-features=TranslateUI --disable-session-crashed-bubble --disable-hang-monitor --disable-prompt-on-repost --noerrdialogs --disable-background-networking --safebrowsing-disable-auto-update --disable-sync --metrics-recording-only --disable-default-apps --no-first-run --disable-translate --noerrdialogs --disable-infobars --disable-new-tab-first-run --no-default-browser-check --disable-client-side-phishing-detection
echo Started Google Chrome with Default profile directly on DISPLAY2

:: Wait a few seconds to ensure Chrome has started
timeout /t 5 /nobreak > nul
echo Waited for Chrome to start

:: Start Microsoft Edge and open the specified URL on the primary monitor (DISPLAY1)
start "" "C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe" --profile-directory="Default" --window-position=0,0 --window-size=1920,1080 "https://google.com"
echo Started Microsoft Edge on the primary monitor with the specified URL

:: Automatically close the command window once everything is done
exit