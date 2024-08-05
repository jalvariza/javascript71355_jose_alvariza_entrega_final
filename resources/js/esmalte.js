//Se llama al array de esmaltes y se busca el que coincida con el nombre de mensionado en la card. Luego se muestran los componentes de ese esmalte.

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

        let detallesComponente = document.getElementById('detallesComponente');
        esmalte.componentes.forEach((componente, index) => {
            let divComponente = document.createElement('div');
            divComponente.id = `componente${index}`;
            divComponente.innerHTML = `<div class=cardComponente>
            <div class="porcentajeNombre">
                <p>
                    (${componente.porcentaje}%) ${componente.nombre}</div>
                </p> 
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
            }

            let sumatoriaPorcentajes = esmalte.componentes.reduce((sum, componente) => sum + componente.porcentaje, 0);

            esmalte.componentes.forEach((componente, index) => {
                let cantidadComponente = (cantidadEsmalte / sumatoriaPorcentajes) * componente.porcentaje;
                let divComponente = document.getElementById(`componente${index}`);
                divComponente.innerHTML = `
                <div class=cardComponente>
                    <div class="porcentajeNombre">
                        <p>
                            (${componente.porcentaje}%) ${componente.nombre}</div>
                        </p>
                    <div class="cantidadComponente">
                        <p>
                            ${cantidadComponente.toFixed(2)}g
                        </p>
                    </div> 
                </div>`;
            });
        });
    } else {
        document.getElementById('nombreEsmalte').textContent = 'Esmalte no encontrado';
    }
});
