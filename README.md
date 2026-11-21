# Forja de Héroes

Web sencilla para crear un personaje de D&D 5e: nombre, raza, clase (habilidades, equipo inicial, dominio o patrón), conjuros, trasfondo, personalidad, retrato (Picrew o imagen propia) e historia, con descarga en PDF.

Es una web estática (HTML + CSS + JS, sin compilación). Datos sacados de [dnd5e.wikidot.com](https://dnd5e.wikidot.com) y traducidos al castellano, en [data.js](data.js).

## Probar en local

Abre `index.html` en el navegador, o sirve la carpeta:

```bash
python3 -m http.server 8000
# http://localhost:8000
```

## Archivos

- `index.html` – estructura de la página
- `styles.css` – estética de boceto (web y ficha)
- `data.js` – razas, clases, trasfondos y equipo inicial
- `spells.js` – trucos y conjuros de nivel 1 por clase, y reglas de lanzamiento de conjuros
- `personality.js` – tablas de personalidad de los trasfondos, alineamientos e idiomas
- `icons.js` – iconos dibujados a mano de clases y trasfondos
- `img/` – imágenes de las razas (ver `img/LEEME.md`)
- `sketch.js` – formas «dibujadas a mano» de la ficha en PDF
- `app.js` – lógica del asistente, cartas y ficha PDF (html2canvas + jsPDF)
