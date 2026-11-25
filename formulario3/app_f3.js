document.addEventListener('DOMContentLoaded', () => {
    const formulario = document.getElementById('formulario-infantil');
    const modal = document.getElementById('modal-aventura');
    const mensajeAventura = document.getElementById('mensaje-aventura');
    const emojiGanador = document.getElementById('emoji-ganador');

    // Función para lanzar confeti colorido
    function lanzarConfeti() {
        confetti({
            particleCount: 90,
            spread: 75,
            origin: { y: 0.6 },
            colors: ['#fb7185', '#facc15', '#38bdf8', '#a855f7', '#4ade80']
        });
    }

    formulario.addEventListener('submit', (evento) => {
        evento.preventDefault();

        if (!formulario.checkValidity()) {
            formulario.reportValidity();
            return;
        }

        const nombre = document.getElementById('nombre-explorador').value.trim();
        const mascotaSeleccionada = formulario.querySelector('input[name="mascota"]:checked').value;
        const emoji = mascotaSeleccionada.split(' ').pop();

        emojiGanador.textContent = emoji;
        mensajeAventura.textContent = `¡Genial, ${nombre}! Tú y tu ${mascotaSeleccionada} ya formáis parte del campamento.`;

        modal.showModal();
        lanzarConfeti();
    });

    // Botón extra dentro del modal para volver a lanzar confeti
    document.getElementById('boton-lanzar-confeti').addEventListener('click', lanzarConfeti);

    // Cerrar modal y reiniciar formulario
    document.getElementById('cerrar-modal-infantil').addEventListener('click', () => {
        modal.close();
        formulario.reset();
    });
});