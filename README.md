# PostSpace

PostSpace es una plataforma full-stack para crear, compartir y gestionar posts con categorías. El backend está construido con Node.js y Express, utiliza MongoDB como base de datos y JWT para autenticación.

## 📋 Tabla de Contenidos

- [Requisitos Previos](#requisitos-previos)
- [Instalación Backend](#instalación-backend)
- [Configuración](#configuración)
- [Ejecución](#ejecución)
- [API Endpoints](#api-endpoints)
- [Estructura del Proyecto](#estructura-del-proyecto)
- [Autenticación](#autenticación)

---

## 🔧 Requisitos Previos

Antes de empezar, asegúrate de tener instalado:

- **Node.js** (versión 14 o superior)
- **npm** (viene con Node.js)
- **MongoDB** (local o en la nube - MongoDB Atlas)

Verifica las versiones:
```bash
node --version
npm --version
```

---

## 📥 Instalación Backend

### 1. Clona o descarga el proyecto

```bash
cd Fullstack-Project/Backend
```

### 2. Instala las dependencias

```bash
npm install
```

Esto instalará todos los paquetes necesarios listados en `package.json`:
- **express**: Framework web
- **mongoose**: ODM para MongoDB
- **bcryptjs**: Encriptación de contraseñas
- **jsonwebtoken**: Autenticación JWT
- **express-validator**: Validación de datos
- **express-rate-limit**: Límite de solicitudes
- **swagger-jsdoc** y **swagger-ui-express**: Documentación API
- **cors**: Control de acceso entre orígenes
- **dotenv**: Variables de entorno

---

## ⚙️ Configuración

### Crea un archivo `.env` en la carpeta `Backend/`

```env
# Puerto del servidor
PORT=3001

# MongoDB
MONGODB_URI=mongodb://localhost:27017/dbPostSpace
# O usa MongoDB Atlas:
# MONGODB_URI=mongodb+srv://usuario:contraseña@cluster.mongodb.net/dbPostSpace?retryWrites=true&w=majority

# JWT Secrets
JWT_SECRET=tu_clave_secreta_jwt_muy_segura
JWT_REFRESH_SECRET=tu_clave_secreta_refresh_muy_segura

# URL del Frontend (para CORS)
PWA_URL=http://localhost:3000

# Swagger
SWAGGER_SERVER_URL=http://localhost:3001
```

### Variables Importante:
- `MONGODB_URI`: Conexión a MongoDB
- `JWT_SECRET`: Clave para firmar JWT (usa una cadena larga y aleatoria)
- `JWT_REFRESH_SECRET`: Clave para refresh tokens
- `PWA_URL`: URL del frontend (para CORS)

---

## 🚀 Ejecución

### Ejecuta el servidor

```bash
npm start
```

El servidor estará disponible en: `http://localhost:3001`

### Verifica que está funcionando

Abre tu navegador en:
```
http://localhost:3001/
```

Deberías ver: `¡Hi API PostSpace!`

### Accede a la Documentación Swagger

```
http://localhost:3001/swagger
```

Aquí encontrarás toda la documentación interactiva de los endpoints.

---

## 📡 API Endpoints

### 🔐 Autenticación (`/auth`)

| Método | Endpoint | Descripción |
|--------|----------|-------------|
| POST | `/auth/register` | Registrar nuevo usuario |
| POST | `/auth/login` | Iniciar sesión |
| POST | `/auth/refresh-token` | Renovar JWT |

### 👥 Usuarios (`/users`)

| Método | Endpoint | Descripción | Protegida |
|--------|----------|-------------|-----------|
| GET | `/users` | Obtener todos los usuarios | ✅ |
| GET | `/users/:id` | Obtener usuario por ID | ❌ |
| POST | `/users` | Crear usuario | ✅ |
| PUT | `/users/:id` | Actualizar usuario | ✅ |
| DELETE | `/users/:id` | Eliminar usuario | ✅ |

### 📝 Posts (`/posts`)

| Método | Endpoint | Descripción | Protegida |
|--------|----------|-------------|-----------|
| GET | `/posts` | Obtener todos los posts | ✅ |
| GET | `/posts/:id` | Obtener post por ID | ❌ |
| POST | `/posts` | Crear post | ✅ |
| PUT | `/posts/:id` | Actualizar post | ✅ |
| DELETE | `/posts/:id` | Eliminar post | ✅ |

### 📂 Categorías (`/categories`)

| Método | Endpoint | Descripción | Protegida |
|--------|----------|-------------|-----------|
| GET | `/categories` | Obtener todas las categorías | ✅ |
| GET | `/categories/:id` | Obtener categoría por ID | ❌ |
| POST | `/categories` | Crear categoría | ✅ |
| PUT | `/categories/:id` | Actualizar categoría | ✅ |
| DELETE | `/categories/:id` | Eliminar categoría | ✅ |

---

## 🗂️ Estructura del Proyecto

```
Backend/
├── src/
│   ├── app.js                 # Configuración principal de Express
│   ├── server.js              # Punto de entrada
│   ├── Config/
│   │   ├── database.js        # Configuración de MongoDB
│   │   └── swaggerOptions.js  # Configuración de Swagger
│   ├── Controllers/           # Lógica de negocio
│   │   ├── authController.js
│   │   ├── userController.js
│   │   ├── postController.js
│   │   └── categoryController.js
│   ├── Models/                # Esquemas de Mongoose
│   │   ├── User.js
│   │   ├── Post.js
│   │   ├── Category.js
│   │   └── RefreshToken.js
│   ├── Routes/                # Definición de rutas
│   │   ├── authRoutes.js
│   │   ├── userRoutes.js
│   │   ├── postRoutes.js
│   │   └── categoryRoutes.js
│   └── Middlewares/           # Middleware personalizado
│       ├── auth.js            # Verificación de JWT
│       ├── errorHandler.js    # Manejo de errores
│       ├── validation.js      # Validación de datos
│       ├── rateLimiter.js     # Límite de solicitudes
│       └── swagger.js         # Configuración de Swagger
├── package.json
└── .env                       # Variables de entorno
```

---

## 🔑 Autenticación

El API utiliza **JWT (JSON Web Tokens)** para autenticación.

### Flujo de Autenticación:

1. **Registro**: `POST /auth/register`
   ```json
   {
     "name": "John Doe",
     "email": "john@example.com",
     "password": "password123",
     "role": "host"
   }
   ```

2. **Login**: `POST /auth/login`
   ```json
   {
     "email": "john@example.com",
     "password": "password123"
   }
   ```
   
   Respuesta:
   ```json
   {
     "token": "eyJhbGciOiJIUzI1NiIs...",
     "refreshToken": "eyJhbGciOiJIUzI1NiIs..."
   }
   ```

3. **Usar Token**: Incluye el token en el header `Authorization`
   ```
   Authorization: Bearer eyJhbGciOiJIUzI1NiIs...
   ```

4. **Renovar Token**: `POST /auth/refresh-token`
   ```json
   {
     "token": "refreshTokenAqui"
   }
   ```

### Roles de Usuario:
- **host**: Usuario normal que crea posts
- **admin**: Administrador del sistema

---

## 💡 Ejemplos de Uso

### Registrar un usuario

```bash
curl -X POST http://localhost:3001/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "email": "john@example.com",
    "password": "securepass123",
    "role": "host"
  }'
```

### Iniciar sesión

```bash
curl -X POST http://localhost:3001/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "john@example.com",
    "password": "securepass123"
  }'
```

### Crear un post (requiere autenticación)

```bash
curl -X POST http://localhost:3001/posts \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer TU_TOKEN_JWT_AQUI" \
  -d '{
    "title": "Mi primer post",
    "content": "Este es el contenido de mi post",
    "author": "ID_DEL_USUARIO",
    "category": "ID_DE_CATEGORIA"
  }'
```

---

## 📊 Respuestas de Error

El API retorna códigos HTTP estándar:

| Código | Significado |
|--------|------------|
| 200 | OK - Solicitud exitosa |
| 201 | Created - Recurso creado |
| 204 | No Content - Recurso eliminado |
| 400 | Bad Request - Datos inválidos |
| 401 | Unauthorized - Token faltante o inválido |
| 404 | Not Found - Recurso no encontrado |
| 500 | Server Error - Error interno del servidor |

---

## 🐛 Troubleshooting

### "Cannot POST /auth/register"
**Problema**: Las rutas están mal configuradas en app.js
**Solución**: Verifica que en `app.js` estén montadas correctamente:
```javascript
app.use('/auth', authRoutes);
app.use('/users', userRoutes);
app.use('/posts', postRoutes);
app.use('/categories', categoryRoutes);
```

### "MONGODB_URI not found"
**Problema**: Archivo `.env` no existe o no está configurado
**Solución**: Crea el archivo `.env` con las variables necesarias (ver sección [Configuración](#configuración))

### "Cannot connect to MongoDB"
**Problema**: MongoDB no está corriendo o URI es incorrecta
**Solución**: 
- Si usas MongoDB local: `mongod` en otra terminal
- Si usas MongoDB Atlas: Verifica que la URI y contraseña sean correctas

---

## 📝 Notas

- La contraseña mínima es de 8 caracteres
- Los tokens JWT expiran en 1 hora
- Los refresh tokens expiran en 7 días
- Cada endpoint requiere validación de datos
- Se implementó rate limiting en el registro (máx 5 intentos cada 15 minutos)

---

## 👨‍💻 Autor

PostSpace - Proyecto Full-Stack

Última actualización: Marzo 2026