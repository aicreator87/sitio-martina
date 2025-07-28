# Invitación de 15 Años - Martina

Un elegante sitio web de invitación para la celebración de los 15 años de Martina.

## 🎉 Características

- **Diseño lujoso y elegante** con gradientes dorados y animaciones suaves
- **Galería de fotos** con efectos visuales y overlays elegantes
- **Contador regresivo** en tiempo real hasta la fecha del evento
- **Formulario de confirmación** con validación de datos
- **Mapa interactivo** con la ubicación del evento
- **Música de fondo** con control de reproducción
- **Completamente responsivo** para móviles y tablets
- **Almacenamiento local** de confirmaciones

## 📋 Información del Evento

- **Fecha**: 14 de Diciembre de 2024
- **Hora**: 13:00 hrs
- **Lugar**: Jano's - Avellaneda 4
- **Dirección**: Gral. Güemes 897, B1873 Crucecita, Avellaneda
- **Dress Code**: Elegante Sport

## 🚀 Configuración

### 1. Fotos de Martina ✅

Las fotos de Martina ya están integradas en el sitio:
- Foto principal en el header: `public/RT906109.JPEG`
- Galería de fotos con ambas imágenes: `public/RT906109.JPEG` y `public/RT906107.JPEG`
- Efectos visuales elegantes con overlays dorados y animaciones

### 2. Configurar el mapa de Google

Actualmente el mapa tiene coordenadas de ejemplo. Para configurar el mapa real:

1. Ve a [Google Maps](https://www.google.com/maps)
2. Busca: "Gral. Güemes 897, B1873 Crucecita, Avellaneda"
3. Haz clic en "Compartir" → "Insertar un mapa"
4. Copia el código iframe
5. Reemplaza el iframe en `index.html` (línea ~108)

### 3. Agregar música de fondo

Para agregar música de fondo:

1. Descarga un archivo de audio (.mp3 o .wav)
2. Colócalo en la carpeta raíz del proyecto
3. Actualiza las rutas en `index.html` (líneas 14-17):

```html
<audio id="backgroundMusic" autoplay loop>
    <source src="tu-cancion.mp3" type="audio/mpeg">
    <source src="tu-cancion.wav" type="audio/wav">
</audio>
```

**Nota**: La reproducción automática puede estar bloqueada por algunos navegadores. Los usuarios pueden activar la música manualmente.

### 4. Configurar el backend (Opcional)

Para enviar confirmaciones a un servidor:

1. Descomenta la línea en `script.js` (línea 118): `// sendToServer(guestData);`
2. Configura tu endpoint en la función `sendToServer` (línea 122)
3. Implementa tu API para recibir los datos

## 📱 Uso

### Para los invitados:
1. Visitan el sitio web
2. Ven la información del evento y el contador regresivo
3. Hacen clic en "Confirmar Asistencia"
4. Llenan el formulario con sus datos
5. Reciben confirmación de que su asistencia fue registrada

### Para los organizadores:
Puedes acceder a funciones administrativas desde la consola del navegador:

```javascript
// Ver estadísticas de confirmaciones
window.partyUtils.getStats()

// Exportar confirmaciones a CSV
window.partyUtils.exportData()

// Limpiar todas las confirmaciones (solo para desarrollo)
window.partyUtils.clearData()
```

## 🎨 Personalización

### Colores
Los colores principales están definidos en `styles.css` (líneas 8-16):
- `--primary-color`: Color dorado principal
- `--secondary-color`: Color marrón secundario
- `--accent-color`: Color de acento claro

### Fuentes
El sitio usa:
- **Dancing Script**: Para títulos elegantes
- **Playfair Display**: Para texto general

### Animaciones
Todas las animaciones están optimizadas para rendimiento y pueden ser personalizadas en `styles.css`.

## 🌐 Despliegue

### Hosting gratuito recomendado:
- [Netlify](https://www.netlify.com/) - Arrastra y suelta la carpeta
- [Vercel](https://vercel.com/) - Conecta con GitHub
- [GitHub Pages](https://pages.github.com/) - Hosting directo desde repositorio

### Pasos para Netlify:
1. Crea una cuenta en Netlify
2. Arrastra la carpeta del proyecto a Netlify
3. Tu sitio estará disponible en una URL como `https://nombre-aleatorio.netlify.app`

## 📞 Soporte

Si necesitas ayuda con:
- Configuración del mapa
- Problemas con la música
- Personalización del diseño
- Configuración del backend

No dudes en contactar para asistencia técnica.

## 🎵 Música recomendada

Para la música de fondo, considera:
- Música instrumental elegante
- Vals clásico
- Música suave y romántica
- Duración: 3-5 minutos (se reproduce en loop)

## 📝 Notas técnicas

- El sitio es completamente estático (HTML, CSS, JS)
- Las confirmaciones se guardan en localStorage del navegador
- Compatible con todos los navegadores modernos
- Optimizado para SEO y velocidad de carga
- Accesible en dispositivos móviles

¡Que tengas una celebración maravillosa! 🎉✨ 