//Se llama al array de esmaltes y se busca el que coincida con el nombre mensionado en la card. Luego se muestran los componentes de ese esmalte. Se incluye la función calcular para que el usuario pueda automatizar la receta de esmalte cerámico.

document.addEventListener('DOMContentLoaded', function () {
    const urlParams = new URLSearchParams(window.location.search);
    const nombreEsmalte = urlParams.get('nombreEsmalte');

    let esmaltes = JSON.parse(localStorage.getItem('esmaltes')) || [];
    let esmalte = esmaltes.find(e => e.nombreEsmalte === nombreEsmalte);

    if (esmalte) {
        document.getElementById('nombreEsmalte').textContent = esmalte.nombreEsmalte;

        const imagenEsmalte = document.getElementById('imagenEsmalte');
        if (esmalte.imagen) {
            imagenEsmalte.src = esmalte.imagen;
        } else {
            imagenEsmalte.alt = 'Imagen no disponible';
        }

        fetch('../resources/js/materiasdb.json')
            .then(response => response.json())
            .then(jsonData => {
                let data = jsonData.materias;
                let detallesComponente = document.getElementById('detallesComponente');

                esmalte.componentes.forEach((componente, index) => {
                    let materia = data.find(item => item.nombreMateria === componente.nombre);
                    componente.formulaMateria = materia ? materia.formulaMateria : '';
                    componente.pesoMolecular = materia ? materia.pesoMolecular : '';

                    let divComponente = document.createElement('div');
                    divComponente.id = `componente${index}`;
                    divComponente.innerHTML = `
                    <div class="cardComponente">
                        <div class="porcentajeNombre">
                            <p>(${componente.porcentaje}%) ${componente.nombre}</p>
                            <p class="datamateria">${componente.formulaMateria ? `Fórmula: ${componente.formulaMateria}` : ''}</p>
                            <p class="datamateria">${componente.pesoMolecular ? `Peso Molecular: ${componente.pesoMolecular}` : ''}</p>
                        </div>
                    </div>`;

                    detallesComponente.appendChild(divComponente);
                });

                document.getElementById('calcular').addEventListener('click', function () {
                    let cantidadEsmalte = parseFloat(document.querySelector('.cantidadEsmalte').value);

                    if (isNaN(cantidadEsmalte) || cantidadEsmalte <= 0) {
                        Swal.fire({
                            title: "Atención",
                            text: "Debes ingresar una cantidad de esmalte a preparar",
                            icon: "error"
                        });
                        return;
                    }

                    let sumatoriaPorcentajes = esmalte.componentes.reduce((sum, componente) => sum + componente.porcentaje, 0);

                    esmalte.componentes.forEach((componente, index) => {
                        let cantidadComponente = (cantidadEsmalte / sumatoriaPorcentajes) * componente.porcentaje;
                        let divComponente = document.getElementById(`componente${index}`);
                        divComponente.innerHTML = `
                        <div class="cardComponente">
                            <div class="porcentajeNombre">
                                <p>(${componente.porcentaje}%) ${componente.nombre}</p>
                                <p class="datamateria">${componente.formulaMateria ? `Fórmula: ${componente.formulaMateria}` : ''}</p>
                                <p class="datamateria">${componente.pesoMolecular ? `Peso Molecular: ${componente.pesoMolecular}` : ''}</p>
                            </div>
                            <div class="cantidadComponente">
                                <p>${cantidadComponente.toFixed(2)}g</p>
                            </div>
                        </div>`;
                    });
                });
            })
            .catch(error => console.error('Error al cargar los datos del JSON de materias:', error));
    } else {
        document.getElementById('nombreEsmalte').textContent = 'Esmalte no encontrado';
    }
});

