$(() => {

    $('#btnCreditPlan').click(() => {

        const user = firebase.auth().currentUser

        if (user == null) {
            Materialize.toast(`Para dar de alta debes estar autenticado`, 4000)
            return
        }

        $('#modalNuevaCita').modal('open')

    })

    $('#btnCreateCita').click(() => {

        const cita = new Cita()

        const concept = $('#nameAltaCita').val()
        const idPaciente = $('#idpacienteAltaCita').val()
        const date = $('#fechaAltaCita').val()

        if (concept == "") {
            alert("Por favor, introduzca un concepto");
            return false;
        }
        if (idPaciente == "") {
            alert("Por favor, introduzca el id del Paciente");
            return false;
        }
        if (date == "") {
            alert("Por favor, introduzca una fecha");
            return false;
        }

        $('.determinate').attr('style', `width: 0%`)

        cita.createCita(concept, idPaciente, date)
    })

})