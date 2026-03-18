let carrito = [];
let totalActual = 0;

function toggleSeleccion(element, nombre, precio) {
    const idx = carrito.findIndex(i => i.nombre === nombre);
    if (idx > -1) {
        carrito.splice(idx, 1);
        element.classList.remove('selected');
    } else {
        carrito.push({ nombre, precio: Number(precio) });
        element.classList.add('selected');
    }
    actualizarTotal();
}

function actualizarTotal() {
    let subtotal = carrito.reduce((sum, item) => sum + item.precio, 0);
    const extra = document.getElementById('extraDesayuno');
    if (carrito.length > 0 && extra && extra.checked) {
        subtotal += 38;
    }
    const extraL = document.getElementById('extraLunch');
    if (carrito.length > 0 && extraL && extraL.checked) {
        subtotal += 25;
    }
    animarNumero(subtotal);
}

function animarNumero(objetivo) {
    const duracion = 450;
    const inicio = totalActual;
    const tInicio = performance.now();

    function frame(tActual) {
        const progreso = Math.min((tActual - tInicio) / duracion, 1);
        const valorIntermedio = inicio + (objetivo - inicio) * progreso;
        document.getElementById('totalLabel').innerText = `$${Math.floor(valorIntermedio)}`;
        
        if (progreso < 1) {
            requestAnimationFrame(frame);
        } else {
            totalActual = objetivo;
            document.getElementById('totalLabel').innerText = `$${objetivo}`;
        }
    }
    requestAnimationFrame(frame);
}

function enviarPedido() {
    if (carrito.length === 0) return alert("Selecciona algo del menú primero.");
    const lista = carrito.map(i => i.nombre).join(", ");
    const exD = document.getElementById('extraDesayuno').checked ? " + PAQUETE DESAYUNO" : "";
    const exL = document.getElementById('extraLunch').checked ? " + AGUA FRESCA" : "";
    const msg = `¡Hola Toto Café! 👋 Me gustaría pedir: ${lista}${exD}${exL}. Total estimado: $${totalActual}`;
    window.open(`https://wa.me/5544797668?text=${encodeURIComponent(msg)}`);
}

function initFloatAnimation() {
    const decos = document.querySelectorAll('.js-float');
    decos.forEach((deco, index) => {
        const duration = 15 + Math.random() * 8;
        const delay = -Math.random() * 20;
        deco.style.animation = `float ${duration}s ease-in-out ${delay}s infinite`;
    });
}

window.addEventListener('DOMContentLoaded', initFloatAnimation);