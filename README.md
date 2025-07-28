# WhatsApp Chat Viewer

**Visualizador de chat para exportaciones de WhatsApp**

Este proyecto permite importar un archivo `.txt` exportado desde WhatsApp y visualizarlo en una interfaz similar una conversación de chat. Soporta la visualización de mensajes con formato de texto simple, manteniendo la estructura original de la conversación.

## Características

- **Visualización de chats exportados**: Importa chats exportados desde WhatsApp en formato `.txt`.
- **Soporte para conversación individual**: Detecta los diferentes participantes de la conversación.
- **Soporte para archivos sin medios**: La aplicación está diseñada para procesar solo el texto (sin imágenes, videos, etc.).

## Tecnologías usadas

- **Vue 3**: Framework JavaScript para construir la interfaz de usuario.
- **Vuetify**: Librería de componentes para UI moderna y adaptativa.
- **FileReader API**: Para leer el archivo `.txt` y procesar su contenido.
- **CSS**: Estilos personalizados para la interfaz.

## Instalación

### 1. Clonar el repositorio

```bash
git clone https://github.com/EmanuelRdzM/message-chat-viewer.git
cd whatsapp-chat-viewer
```

### 2. Instalar dependencias.

Usa npm o yarn para instalar las dependencias del proyecto.

con npm
```bash
npm install
```

con yarn
```bash
yarn install
```

### Uso
1. Subir archivo de chat: Arrastra y suelta un archivo .txt exportado desde WhatsApp en la zona de carga o selecciona el archivo desde tu dispositivo.

2. Ver conversación: Los mensajes se mostrarán en una interfaz similar a whatsapp. Los participantes estarán identificados y los mensajes se presentarán en orden cronológico.

3. Cambiar chat: Si deseas cargar otro archivo de chat, simplemente haz clic en el botón "Subir otro chat" y selecciona el nuevo archivo.

Formato del archivo .txt
El archivo .txt debe seguir el siguiente formato de exportación de WhatsApp:

```bash
15/2/23, 7:12 p. m. - Usuario 1: Mensaje de ejemplo
15/2/23, 7:13 p. m. - Usuario 2: Respuesta al mensaje
15/2/23, 7:14 p. m. - Usuario 1: Mensaje con salto de línea
16/2/23, 9:00 a. m. - Usuario 2: Nuevo día, nuevo mensaje
```
