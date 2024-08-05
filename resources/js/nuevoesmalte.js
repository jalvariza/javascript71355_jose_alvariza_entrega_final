//Añadir campos para ingrsar otro componente y su cantidad

let componenteContador = 1;
let imagenEsmalte = null;  

document.getElementById('+componente').addEventListener('click', function () {
    componenteContador++;

    let nuevoComponente = document.createElement('div');
    nuevoComponente.className = 'componente';
    nuevoComponente.id = `componente${componenteContador}`;

    let nombreInput = document.createElement('input');
    nombreInput.className = 'nombreComponente';
    nombreInput.type = 'text';
    nombreInput.placeholder = `Componente ${componenteContador}`;

    let porcentajeInput = document.createElement('input');
    porcentajeInput.className = 'porcentajeComponente';
    porcentajeInput.type = 'text';
    porcentajeInput.placeholder = '0%';

    nuevoComponente.appendChild(nombreInput);
    nuevoComponente.appendChild(porcentajeInput);

    document.getElementById('componentes').appendChild(nuevoComponente);
});

document.getElementById('cargarImagen').addEventListener('click', function () {
    document.getElementById('inputImagen').click();
});

document.getElementById('inputImagen').addEventListener('change', function (event) {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function (e) {
            imagenEsmalte = e.target.result;
            const imagenPreview = document.getElementById('imagenPreview');
            imagenPreview.src = imagenEsmalte;
            imagenPreview.style.display = 'block';
        };
        reader.readAsDataURL(file);
    }
});

document.getElementById('guardarEsmalte').addEventListener('click', function () {
    let nombreEsmalte = document.querySelector('.nombreEsmalte').value.trim();
    if (nombreEsmalte === '') {
        Swal.fire({
            title: "Atención",
            text: "Debes ingresar un nombre para el esmalte",
            icon: "error"
        });
        return;
    }

    let componentes = [];
    document.querySelectorAll('.componente').forEach((comp) => {
        let nombre = comp.querySelector('.nombreComponente').value.trim();
        let porcentaje = parseFloat(comp.querySelector('.porcentajeComponente').value.trim());
        
        if (nombre !== '' && !isNaN(porcentaje) && porcentaje > 0) {
            componentes.push({ nombre, porcentaje });
        }
    });

    if (componentes.length === 0) {
        Swal.fire({
            title: "Atención",
            text: "Debes ingresar al menos un componente con un porcentaje válido",
            icon: "error"
        });
        return;
    }

    let esmalte = {
        nombreEsmalte,
        imagen: imagenEsmalte,
        componentes
    };

    let esmaltes = JSON.parse(localStorage.getItem('esmaltes')) || [];
    esmaltes.push(esmalte);
    localStorage.setItem('esmaltes', JSON.stringify(esmaltes));

    Swal.fire({
        title: "¡Excelente!",
        text: "Esmalte guardado correctamente",
        icon: "success",
        confirmButtonText: "Ver esmaltes",
    }).then((result) => {
        location.href = 'misesmaltes.html';
    });
});
