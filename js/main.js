let esmaltes = [];

function calcularCantidad(cantidadEsmalte, sumatoriaPorcentajes, porcentajeElemento) {
    return (cantidadEsmalte / sumatoriaPorcentajes) * porcentajeElemento;
}

do {
    let nombreEsmalte;
    while (true) {
        nombreEsmalte = prompt('Ingresa el nombre del esmalte que quieres formular').toUpperCase();
        if (nombreEsmalte !== '') {
            break;
        }
        alert('El nombre del esmalte no puede estar vacío. Por favor, ingrésalo nuevamente.');
    }

    let cantidadEsmalte = prompt('Ingresa la cantidad de kilos de esmalte que quieres formular');
        if (isNaN(cantidadEsmalte) || cantidadEsmalte <= 0) { 
            alert('Debes ingresar un número mayor a 0');
        } else {
            let cantidadElementos = parseInt(prompt('Ingresa la cantidad de elementos que integran el esmalte'));
            if (isNaN(cantidadElementos) || cantidadElementos < 2) {
                alert('Debes ingresar un número igual o mayor a 2');
            } else {

                let elementos = [];
            
                for (let i = 0; i < cantidadElementos; i++) {
                    let elemento = prompt(`Ingresa el nombre del elemento ${i + 1} que compone tu esmalte`);

                    let porcentajeElemento = parseInt(prompt(`Ingresa el porcentaje del elemento ${elemento}`));
                    if (isNaN(porcentajeElemento) || porcentajeElemento <= 0) { 
                        alert('Debes ingresar un número mayor a 0');
                        i--;
                    } else {
                        elementos.push({ nombre: elemento, porcentaje: porcentajeElemento });
                    }
                }
            
            elementos.sort((a, b) => b.porcentaje - a.porcentaje);

            let sumatoriaPorcentajes = elementos.reduce((sum, elemento) => sum + elemento.porcentaje, 0);

            console.log(`Estas son las cantidades que necesitas para preparar ${cantidadEsmalte}kg de esmalte ${nombreEsmalte}:`);
            elementos.forEach(elemento => {
                let cantidad = calcularCantidad(cantidadEsmalte, sumatoriaPorcentajes, elemento.porcentaje);
                let cantidadRedondeada = cantidad.toFixed(2);
                console.log(`${elemento.nombre}: ${cantidadRedondeada}kg`);
            });

            esmaltes.push([nombreEsmalte, elementos]);

            const maximoPorcentajeElemento = elementos.find(elemento => elemento.porcentaje === elementos[0].porcentaje);
            console.log(`Elemento con mayor porcentaje en las recetas es: ${maximoPorcentajeElemento.nombre}, ${maximoPorcentajeElemento.porcentaje}%`);
            

        }
    }
    let continuar = prompt('¿Deseas realizar otro cálculo? (si/no)').toLowerCase();
    if (continuar !== 'si') {
        alert('¡Hasta luego!');
        break;   
    }
} while (true);

esmaltes.forEach((esmalte) => {
    console.log(`Esmalte: ${esmalte[0]}`);
    console.table(esmalte[1]);
});
