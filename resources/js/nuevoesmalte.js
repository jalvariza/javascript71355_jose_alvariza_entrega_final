//El usuario mediante inputs puede ingresar el nombre de la receta del esmalte y los elementos, y porcentajes correspondientes, que componen dicha receta. El input al ser activado sugiere al usuario elementos que toma de la base de datos, si el usuario elige alguno de ellos se suma la información de formula química y del peso molecular. También se puede agregar una imagen.

let componenteContador = 0;
let imagenEsmalte = null;
let data = [];

document.addEventListener('DOMContentLoaded', function () {
    fetch('../resources/js/materiasdb.json')
        .then(response => response.json())
        .then(jsonData => {
            data = jsonData.materias;
        })
        .catch(error => console.error('Error al cargar los datos:', error));

    document.getElementById('+componente').addEventListener('click', function () {
        componenteContador++;

        let nuevoComponente = document.createElement('div');
        nuevoComponente.className = 'componente';
        nuevoComponente.id = `componente${componenteContador}`;

        let nombreInput = document.createElement('input');
        nombreInput.className = 'nombreComponente';
        nombreInput.type = 'text';
        nombreInput.placeholder = `Componente ${componenteContador}`;

        let sugerenciaContenedor = document.createElement('div');
        sugerenciaContenedor.className = 'sugerencias';
        nuevoComponente.appendChild(sugerenciaContenedor);

        let detallesContenedor = document.createElement('div');
        detallesContenedor.className = 'detallesComponente';

        let formulaElemento = document.createElement('p');
        formulaElemento.className = 'formulaMateria';
        formulaElemento.textContent = '';

        let pesoElemento = document.createElement('p');
        pesoElemento.className = 'pesoMolecular';
        pesoElemento.textContent = '';

        detallesContenedor.appendChild(formulaElemento);
        detallesContenedor.appendChild(pesoElemento);

        let porcentajeInput = document.createElement('input');
        porcentajeInput.className = 'porcentajeComponente';
        porcentajeInput.type = 'text';
        porcentajeInput.placeholder = '0%';

        nuevoComponente.appendChild(nombreInput);
        nuevoComponente.appendChild(sugerenciaContenedor);
        nuevoComponente.appendChild(detallesContenedor);
        nuevoComponente.appendChild(porcentajeInput);

        document.getElementById('componentes').appendChild(nuevoComponente);

        nombreInput.addEventListener('input', function () {
            const query = this.value.toLowerCase();
            if (query.length > 0) {
                const sugerenciasFiltradas = data.filter(item =>
                    item.nombreMateria.toLowerCase().includes(query)
                );
                mostrarSugerencias(sugerenciasFiltradas, sugerenciaContenedor, nombreInput, formulaElemento, pesoElemento);
            } else {
                sugerenciaContenedor.style.display = 'none';
                formulaElemento.textContent = '';
                pesoElemento.textContent = '';
            }
        });

        document.addEventListener('click', function (event) {
            if (!sugerenciaContenedor.contains(event.target) && event.target !== nombreInput) {
                sugerenciaContenedor.style.display = 'none';
            }
        });
    });

    function mostrarSugerencias(sugerencias, sugerenciaContenedor, inputField, formulaElemento, pesoElemento) {
        sugerenciaContenedor.innerHTML = '';

        if (sugerencias.length > 0) {
            sugerencias.forEach(sugerencia => {
                const sugerenciaItem = document.createElement('div');
                sugerenciaItem.className = 'sugerenciaItem';
                sugerenciaItem.textContent = sugerencia.nombreMateria;
                sugerenciaItem.addEventListener('click', function () {
                    inputField.value = sugerencia.nombreMateria;
                    sugerenciaContenedor.style.display = 'none';
                    formulaElemento.textContent = `Fórmula: ${sugerencia.formulaMateria}`;
                    pesoElemento.textContent = `Peso Molecular: ${sugerencia.pesoMolecular}`;
                });
                sugerenciaContenedor.appendChild(sugerenciaItem);
            });
            sugerenciaContenedor.style.display = 'block';
        } else {
            sugerenciaContenedor.style.display = 'none';
        }
    }
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
