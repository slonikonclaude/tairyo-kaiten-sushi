@echo off
chcp 65001 >nul
cd /d "%~dp0"
set "OUTDIR=%~dp0..\maps\raw"
if not exist "%OUTDIR%" mkdir "%OUTDIR%"
node gallery.mjs "Todas,Comida y bebida,Ambiente,Sushi,Carta,Del propietario,Más recientes,Vídeos" > "%OUTDIR%\gallery.log" 2>&1
set PORT=9801
set PROFILE=chrome-profile
node reviews.mjs es relevant 500 > "%OUTDIR%\reviews-es-relevant.log" 2>&1
node reviews.mjs es newest 500 > "%OUTDIR%\reviews-es-newest.log" 2>&1
node reviews.mjs en relevant 400 > "%OUTDIR%\reviews-en.log" 2>&1
echo done > "%OUTDIR%\scrape.done"
