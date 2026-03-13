@echo off
echo ============================================
echo   HAKAMANA - Deploy automatico a Vercel
echo ============================================
echo.

:: Verificar si Node.js esta instalado
where node >nul 2>nul
if %errorlevel% neq 0 (
    echo ERROR: Node.js no esta instalado.
    echo Descargalo de https://nodejs.org
    pause
    exit /b 1
)

:: Verificar si Vercel CLI esta instalado
where vercel >nul 2>nul
if %errorlevel% neq 0 (
    echo Instalando Vercel CLI...
    npm install -g vercel
    if %errorlevel% neq 0 (
        echo ERROR: No se pudo instalar Vercel CLI.
        pause
        exit /b 1
    )
    echo Vercel CLI instalado correctamente.
    echo.
)

:: Login en Vercel
echo Paso 1: Iniciando sesion en Vercel...
echo Se abrira tu navegador para autenticarte.
echo.
vercel login
if %errorlevel% neq 0 (
    echo ERROR: No se pudo iniciar sesion en Vercel.
    pause
    exit /b 1
)

echo.
echo Paso 2: Deployando el proyecto...
echo.
vercel deploy --yes
if %errorlevel% neq 0 (
    echo ERROR: El deploy fallo.
    pause
    exit /b 1
)

echo.
echo ============================================
echo   Deploy completado exitosamente!
echo ============================================
echo.
echo IMPORTANTE - Configura las variables de entorno:
echo   1. Ve a https://vercel.com/dashboard
echo   2. Haz clic en el proyecto "hakamana"
echo   3. Settings ^> Environment Variables
echo   4. Agrega: RESEND_API_KEY = tu API key de Resend
echo.
pause
