# Forja de Héroes

Web sencilla para crear un personaje de D&D 5e: nombre, raza, clase (habilidades, equipo inicial, dominio o patrón), conjuros, trasfondo, personalidad, retrato (Picrew o imagen propia) e historia, con descarga en PDF.

Es una web estática (HTML + CSS + JS, sin compilación). Datos sacados de [dnd5e.wikidot.com](https://dnd5e.wikidot.com) y traducidos al castellano, en [data.js](data.js).

## Probar en local

Abre `index.html` en el navegador, o sirve la carpeta:

```bash
python3 -m http.server 8000
# http://localhost:8000
```

## Publicar gratis

**Vercel**
1. Sube esta carpeta a un repositorio de GitHub.
2. En vercel.com → *Add New Project* → importa el repositorio.
3. Framework preset: **Other**. Sin comando de build. *Deploy*.

O desde la terminal: `npx vercel` dentro de la carpeta.

**Netlify**: arrastra la carpeta a app.netlify.com/drop.

**GitHub Pages**: Settings → Pages → *Deploy from branch* → `main` / root.

## Archivos

- `index.html` – estructura de la página
- `styles.css` – estética de boceto (web y ficha)
- `data.js` – razas, clases, trasfondos y equipo inicial
- `spells.js` – trucos y conjuros de nivel 1 por clase, y reglas de lanzamiento de conjuros
- `personality.js` – tablas de personalidad de los trasfondos, alineamientos e idiomas
- `sketch.js` – formas «dibujadas a mano» de la ficha en PDF
- `app.js` – lógica del asistente, cartas y ficha PDF (html2canvas + jsPDF)
