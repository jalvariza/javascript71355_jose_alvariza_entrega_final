function calcularCantidad(totalEsmalte, porcentaje) {
    return (totalEsmalte / 100) * porcentaje;
}


do {
    let nombreEsmalte = prompt('¡Hola!, te ayudaré a preparar la fórmula para tu esmalte cerámico. Ingresa el nombre de tu esmalte').toUpperCase    ();

    let totalEsmalte = parseInt(prompt('¿Cuántos kilos de esmalte necesitas preparar?'));
    if (isNaN(totalEsmalte) || totalEsmalte <= 0) { 
        alert('Debes ingresar un número mayor a 0kg');
        continue;
    } else {
        console.log(`Estas son las cantidades que necesitas para preparar ${totalEsmalte}kg de esmalte ${nombreEsmalte}:`);

        let cantidadElementos = parseInt(prompt('¿Cuántos elementos tiene tu esmalte?'));
        if (isNaN(cantidadElementos) || cantidadElementos < 2) {
            alert('Debes ingresar al menos 2 elementos');
            continue;
        } else {
            let x = 1;
            while (x <= cantidadElementos) {
                let elemento = prompt(`Ingrese el nombre del Elemento número ${x}`);
                let porcentaje = parseInt(prompt(`Ingrese el porcentaje del ${elemento}`));
                if (isNaN(porcentaje) || porcentaje <= 0) {
                    alert('Debes ingresar un porcentaje mayor a 0');
                    continue;

                } else {
                    let cantidad = calcularCantidad(totalEsmalte, porcentaje);
                    console.log(`${elemento} (%${porcentaje}): ${cantidad}kg`);
                    x++;
                } 
            }
        }
    }
    let continuar = prompt('¿Deseas realizar otro cálculo? (si/no)').toLowerCase();
    if (continuar !== 'si') {
        alert('¡Hasta luego!');
        break;   
    }

} while (true);

