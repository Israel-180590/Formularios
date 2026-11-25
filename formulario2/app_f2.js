document.addEventListener('DOMContentLoaded', () => {
    // 1. Actualizar valor del slider de presupuesto en vivo
    const rangoPresupuesto = document.getElementById('presupuesto');
    const salidaPresupuesto = document.getElementById('valor-presupuesto');

    rangoPresupuesto.addEventListener('input', () => {
        const valorFormateado = Number(rangoPresupuesto.value).toLocaleString('es-ES');
        salidaPresupuesto.textContent = `${valorFormateado} € / mes`;
    });

    // 2. Configurar validación profesional con JustValidate
    const validacion = new JustValidate('#formulario-empresa', {
        validateBeforeSubmitting: true,
        focusInvalidField: true
    });

    validacion
        .addField('#nombre', [
            { rule: 'required', errorMessage: 'Introduce tu nombre completo' },
            { rule: 'minLength', value: 3, errorMessage: 'Mínimo 3 caracteres' }
        ])
        .addField('#correo', [
            { rule: 'required', errorMessage: 'El correo corporativo es obligatorio' },
            { rule: 'email', errorMessage: 'Introduce un formato de correo válido' }
        ])
        .addField('#empresa', [
            { rule: 'required', errorMessage: 'Indica el nombre de tu empresa' }
        ])
        .addField('#tamano', [
            { rule: 'required', errorMessage: 'Selecciona el tamaño del equipo' }
        ])
        .addField('#privacidad', [
            { rule: 'required', errorMessage: 'Debes aceptar la política de privacidad' }
        ])
        .onSuccess((evento) => {
            evento.preventDefault();

            const nombre = document.getElementById('nombre').value.trim();
            const empresa = document.getElementById('empresa').value.trim();
            const modal = document.getElementById('modal-empresa');
            const resumen = document.getElementById('resumen-solicitud');

            resumen.textContent = `Gracias, ${nombre}. Hemos registrado la solicitud de demo para ${empresa} (${salidaPresupuesto.textContent}).`;
            modal.showModal();
        });

    // 3. Cerrar modal y limpiar formulario
    document.getElementById('cerrar-modal-empresa').addEventListener('click', () => {
        document.getElementById('modal-empresa').close();
        document.getElementById('formulario-empresa').reset();
        validacion.refresh();
        salidaPresupuesto.textContent = '2.500 € / mes';
    });
});