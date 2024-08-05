// Variables y objetos necesarios
let saldo = 0;
const precioCompra = 5; // Precio por FIFA Coin
const precioVenta = 4; // Precio por FIFA Coin

let transacciones = JSON.parse(localStorage.getItem('transacciones')) || [];

// Objeto para manejar las operaciones de compra y venta
const mercado = {
    comprar: function(cantidad) {
        const costo = cantidad * precioCompra;
        if (saldo >= costo) {
            saldo -= costo;
            transacciones.push({ tipo: "Compra", cantidad: cantidad, costo: costo });
            localStorage.setItem('transacciones', JSON.stringify(transacciones));
            mostrarResultado(`Has comprado ${cantidad} FIFA Coins por $${costo}. Saldo actual: $${saldo}.`);
        } else {
            mostrarResultado("No tienes suficiente saldo para realizar esta compra.");
        }
    },
    vender: function(cantidad) {
        const ganancia = cantidad * precioVenta;
        saldo += ganancia;
        transacciones.push({ tipo: "Venta", cantidad: cantidad, ganancia: ganancia });
        localStorage.setItem('transacciones', JSON.stringify(transacciones));
        mostrarResultado(`Has vendido ${cantidad} FIFA Coins por $${ganancia}. Saldo actual: $${saldo}.`);
    },
    mostrarTransacciones: function() {
        let historial = "Historial de transacciones:<br>";
        transacciones.forEach(transaccion => {
            historial += `Tipo: ${transaccion.tipo}, Cantidad: ${transaccion.cantidad}, Monto: $${transaccion.costo || transaccion.ganancia}<br>`;
        });
        mostrarResultado(historial);
    }
};

function mostrarResultado(mensaje) {
    document.getElementById('resultados').innerHTML = mensaje;
}

// Event Listeners
document.getElementById('iniciarSimulacionBtn').addEventListener('click', () => {
    saldo = parseFloat(document.getElementById('saldoInicial').value);
    if (!isNaN(saldo) && saldo >= 0) {
        document.getElementById('operaciones').style.display = 'block';
        mostrarResultado(`Simulación iniciada con saldo de $${saldo}.`);
    } else {
        mostrarResultado('Por favor, ingresa un saldo inicial válido.');
    }
});

document.getElementById('comprarBtn').addEventListener('click', () => {
    const cantidadCompra = parseInt(document.getElementById('cantidad').value);
    if (!isNaN(cantidadCompra) && cantidadCompra > 0) {
        mercado.comprar(cantidadCompra);
    } else {
        mostrarResultado('Por favor, ingresa una cantidad válida para comprar.');
    }
});

document.getElementById('venderBtn').addEventListener('click', () => {
    const cantidadVenta = parseInt(document.getElementById('cantidad').value);
    if (!isNaN(cantidadVenta) && cantidadVenta > 0) {
        mercado.vender(cantidadVenta);
    } else {
        mostrarResultado('Por favor, ingresa una cantidad válida para vender.');
    }
});

document.getElementById('mostrarTransaccionesBtn').addEventListener('click', () => {
    mercado.mostrarTransacciones();
});