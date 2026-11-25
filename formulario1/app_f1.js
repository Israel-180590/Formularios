document.addEventListener('DOMContentLoaded', () => {
    // 1. Inicializar librería Tagify en el campo de intereses
    const inputEtiquetas = document.getElementById('etiquetas-intereses');
    const tagify = new Tagify(inputEtiquetas, {
        whitelist: ['Valorant', 'League of Legends', 'Minecraft', 'CSS Art', 'React', 'Indie Games', 'Pixel Art', 'Streaming', 'World of Warcraft'],
        maxTags: 6,
        dropdown: {
            enabled: 1,
            maxItems: 5
        }
    });

    // 2. Barra de progreso dinámica
    const formulario = document.getElementById('formulario-juvenil');
    const barraProgreso = document.getElementById('barra-energia');
    const textoPorcentaje = document.getElementById('porcentaje-texto');
    const camposObligatorios = formulario.querySelectorAll('[required]');

    function actualizarProgreso() {
        let completados = 0;

        camposObligatorios.forEach(campo => {
            if (campo.type === 'checkbox') {
                if (campo.checked) completados++;
            } else if (campo.value.trim() !== '' && campo.checkValidity()) {
                completados++;
            }
        });

        const porcentaje = Math.round((completados / camposObligatorios.length) * 100);
        barraProgreso.value = porcentaje;
        textoPorcentaje.textContent = `${porcentaje}%`;
    }

    formulario.addEventListener('input', actualizarProgreso);
    formulario.addEventListener('change', actualizarProgreso);

    // 3. Envío del formulario y apertura del modal nativo <dialog>
    const modal = document.getElementById('modal-exito');
    const mensajeConfirmacion = document.getElementById('mensaje-confirmacion');
    const botonCerrar = document.getElementById('cerrar-modal');

    formulario.addEventListener('submit', (e) => {
        e.preventDefault();

        if (!formulario.checkValidity()) {
            formulario.reportValidity();
            return;
        }

        const alias = formulario.alias.value.trim();
        const rolSeleccionado = formulario.querySelector('input[name="rol"]:checked').nextElementSibling.textContent;

        mensajeConfirmacion.textContent = `¡Bienvenido/a ${alias}! Tu perfil como ${rolSeleccionado} ya está activo.`;
        modal.showModal();
    });

    botonCerrar.addEventListener('click', () => {
        modal.close();
        formulario.reset();
        tagify.removeAllTags();
        actualizarProgreso();
    });
});