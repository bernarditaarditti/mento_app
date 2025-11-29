# 🎯 MENTO - Aplicación de Bienestar Emocional

Aplicación web para el bienestar emocional desarrollada con Next.js y SQLite.

## 📋 Requisitos Previos

Antes de usar esta aplicación, necesitas tener instalado:

1. **Node.js** (versión 18 o superior)
   - Descarga desde: https://nodejs.org/
   - Verifica la instalación: `node --version`

2. **npm** (viene con Node.js)
   - Verifica la instalación: `npm --version`

## 🚀 Instalación y Uso

### Pasos para ejecutar la app en cualquier computadora:

1. **Copia esta carpeta completa** a tu computadora

2. **Abre una terminal** en la carpeta del proyecto

3. **Instala las dependencias** (solo la primera vez):
   ```bash
   npm install
   ```
   ⏱️ Esto puede tardar 2-5 minutos la primera vez

4. **Inicia la aplicación**:
   ```bash
   npm run dev
   ```

5. **Abre tu navegador** y ve a:
   ```
   http://localhost:3000
   ```

¡Listo! 🎉 Ya puedes usar la aplicación.

## 📝 Primera vez usando la app

1. **Regístrate** en: `http://localhost:3000/register`
   - Ingresa un email
   - Ingresa una contraseña
   - Haz clic en el botón verde

2. **Inicia sesión** en: `http://localhost:3000/login`
   - Usa el email y contraseña que registraste

## 📁 Archivos Importantes

- `dev.db` - Base de datos SQLite (se crea automáticamente si no existe)
- `lib/db.ts` - Configuración de la base de datos
- `package.json` - Dependencias del proyecto

## ⚠️ Solución de Problemas

### Error: "npm no se reconoce como comando"
- **Solución**: Instala Node.js desde https://nodejs.org/

### Error: "El puerto 3000 ya está en uso"
- **Solución**: Cierra otras aplicaciones que usen el puerto 3000, o cambia el puerto en `package.json`

### Error al ejecutar `npm install`
- **Solución**: 
  - Asegúrate de tener conexión a internet
  - Intenta de nuevo: `npm install`
  - Si persiste, elimina `node_modules` y `package-lock.json` y vuelve a intentar

### La base de datos no funciona
- **Solución**: La base de datos se crea automáticamente. Si hay problemas, elimina `dev.db` y reinicia la app

## 🔧 Comandos Disponibles

```bash
npm run dev      # Inicia la app en modo desarrollo
npm run build    # Construye la app para producción
npm run start    # Inicia la app en modo producción (después de build)
npm run lint     # Revisa el código por errores
```

## 📚 Más Información

Para más detalles sobre cómo funciona la aplicación, consulta:
- `INSTRUCCIONES_SIMPLE.md` - Guía rápida de uso
- `README_CONEXION.md` - Documentación técnica completa

## ✅ Checklist para Nueva Computadora

- [ ] Node.js instalado (versión 18+)
- [ ] Carpeta del proyecto copiada
- [ ] Ejecutado `npm install` en la carpeta
- [ ] Ejecutado `npm run dev`
- [ ] Abierto `http://localhost:3000` en el navegador

---

**¿Problemas?** Revisa la sección "Solución de Problemas" arriba o consulta `INSTRUCCIONES_SIMPLE.md`

