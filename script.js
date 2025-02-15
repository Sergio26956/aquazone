function mostrarSubcategorias(categoria) {
    document.querySelectorAll('.subcategoria').forEach(div => div.style.display = 'none');
    document.getElementById(categoria).style.display = 'block';
}

function mostrarContenido(seccion) {
    const info = {
        piscinas: "Descripción de piscinas...",
        playas: "Descripción de playas...",
        urbano: "Descripción del Parque Urbano Móvil...",
        kamikaze: "Descripción del Kamikaze Jump..."
    };
    document.getElementById("info").innerHTML = info[seccion] || "Contenido no disponible.";
}
