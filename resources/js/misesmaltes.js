// Toma el arrays esmaltes desde el localStorage y muestra cada objeto esmalte en una nueva card.

let esmaltes = JSON.parse(localStorage.getItem('esmaltes')) || [];

let contenedorEsmaltes = document.getElementById('esmaltes');

contenedorEsmaltes.innerHTML = '';

esmaltes.forEach(function (esmalte, index) {
    let card = document.createElement('div');
    card.className = 'cardEsmalte';

    let imagen = document.createElement('img');
    imagen.src = esmalte.imagen;
    imagen.alt = `Imagen de ${esmalte.nombreEsmalte}`;

    let titulo = document.createElement('h3');
    titulo.className = 'tituloCard';
    titulo.textContent = esmalte.nombreEsmalte;

    let botonEliminar = document.createElement('button');
    botonEliminar.textContent = 'Eliminar';
    botonEliminar.className = 'btnEliminar';

    botonEliminar.addEventListener('click', function (event) {
        event.stopPropagation();

        Swal.fire({
            title: '¿Estás seguro?',
            text: "Perderas la receta del esmalte.",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Eliminar',
            cancelButtonText: 'Cancelar',
        }).then((result) => {
            if (result.isConfirmed) {
                esmaltes.splice(index, 1);
                localStorage.setItem('esmaltes', JSON.stringify(esmaltes));
                card.remove();
                Swal.fire(
                    '¡Eliminado!',
                    'El esmalte ha sido eliminado.',
                    'success'
                );
            }
        });
    });

    card.appendChild(imagen);
    card.appendChild(titulo);
    card.appendChild(botonEliminar);

    card.addEventListener('click', function () {
        window.location.href = `esmalte.html?nombreEsmalte=${encodeURIComponent(esmalte.nombreEsmalte)}`;
    });

    contenedorEsmaltes.appendChild(card);
});
