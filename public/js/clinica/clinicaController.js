$(() => {

    $('#btnAltaClinica').click(() => {

        const user = firebase.auth().currentUser

        if (user == null) {
            Materialize.toast(`Para dar de alta debes estar autenticado`, 4000)
            return
        }

        $('#type').val('create')
        $('#modalAltaClinica').modal('open')

    })

    $('#btnCreateClinica').click(() => {

        const type = $('#type').val()

        const clinica = new Clinica()

        const name = $('#nameAltaClinica').val()
        const razon = $('#razonAltaClinica').val()
        const cif = $('#cifAltaClinica').val()
        const phone = $('#phoneAltaClinica').val()
        const mail = $('#mailAltaClinica').val()
        const address = $('#addressAltaClinica').val()
        const manager = $('#managerAltaClinica').val()
        var status = ""

        if ($('#statusActive').prop("checked")) {
            status = "active"
        } else if ($('#statusInactive').prop("checked")) {
            status = "inactive"
        } else if ($('#statusStandby').prop("checked")) {
            status = "standby"
        }

        if (name == "") {
            alert("Por favor, introduzca un nombre");
            return false;
        }
        if (razon == "") {
            alert("Por favor, introduzca una razón social");
            return false;
        }
        if (cif == "") {
            alert("Por favor, introduzca un cif");
            return false;
        }
        if (phone == "") {
            alert("Por favor, introduzca un teléfono");
            return false;
        }
        if (mail == "") {
            alert("Por favor, introduzca un email");
            return false;
        }
        if (address == "") {
            alert("Por favor, introduzca una dirección");
            return false;
        }
        if (manager == "") {
            alert("Por favor, introduzca un manager");
            return false;
        }
        if (status == "") {
            alert("Por favor, introduzca un estatus");
            return false;
        }


        $('.determinate').attr('style', `width: 0%`)

        switch (type) {
            case "create":
                clinica.createClinica(
                    name,
                    razon,
                    cif,
                    phone,
                    mail,
                    address,
                    manager,
                    status)
                break
            case "update":
                clinica.updateClinica(
                    name,
                    razon,
                    cif,
                    phone,
                    mail,
                    address,
                    manager,
                    status
                )
                break;
        }
    })




    $('#btnEditarClinica').click(() => {

        const user = firebase.auth().currentUser

        if (user == null) {
            Materialize.toast(`Para editar debes estar autenticado`, 4000)
            return
        }

        $('#type').val('update')
        $('#modalCifClinica').modal('open')
    })

    $('#btnSearchCifClinica').click(() => {
        const clinica = new Clinica();
        const cif = $('#nameSearchClinicaCif').val()

        clinica.getClinicaByCIF(cif)

    })

    $('#btnTodasClinicas').click(() => {

        const clinica = new Clinica()
        clinica.showClinicaAll()

    })

    $('#btnNameClinicas').click(() => {

        const user = firebase.auth().currentUser

        if (user == null) {
            Materialize.toast(`Para dar de alta debes estar autenticado`, 4000)
            return
        }

        $('#typeSearchClinica').val("NameClinica")
        $('#modalNombreClinica').modal('open')

    })

    $('#btnSearchClinica').click(() => {

        const name = $('#nameSearchClinica').val()
        const type = $('#typeSearchClinica').val()

        if (type == "NameClinica") {
            const clinica = new Clinica()
            clinica.showClinicaByName(name)
            $('.modal').modal('close')
        }
    })

    $("#btnSearchNameClinica").click(() => {
        const value = $('#searchValueClinica').val()

        const clinica = new Clinica()
        clinica.showClinicaByName(value)
    })

    $('#btnActivasClinicas').click(() => {

        const clinica = new Clinica()
        clinica.showActiveClinica()

    })

    $('#btnInactivasClinicas').click(() => {

        const clinica = new Clinica()
        clinica.showInactiveClinica()

    })

    $('#btnEsperaClinicas').click(() => {

        const clinica = new Clinica()
        clinica.showStandbyClinica()

    })

    $('#btnTodosPacientesClinica').click(() => {

        const clinica = new Clinica()
        const cif = $('#cifClinica').val()
        clinica.showPacientesByIdClinica(cif)

    })

    $('#btnActivosPacientesClinica').click(() => {

        const clinica = new Clinica()
        const cif = $('#cifClinica').val()
        clinica.showPacientesActivosByClinica(cif)

    })

    $('#btnInactivosPacientesClinica').click(() => {

        const clinica = new Clinica()
        const cif = $('#cifClinica').val()
        clinica.showPacientesInactivosByClinica(cif)

    })

    $('#btnEsperaPacientesClinica').click(() => {

        const clinica = new Clinica()
        const cif = $('#cifClinica').val()
        clinica.showPacientesEsperaByClinica(cif)

    })

    $('#btnIdPacientesClinica').click(() => {
        const user = firebase.auth().currentUser

        if (user == null) {
            Materialize.toast(`Para editar debes estar autenticado`, 4000)
            return
        }

        $('#typeSearchid').val('findidpacienteclinica')
        $('#modalId').modal('open')
    })

    $('#btnSearchid').click(() => {

        const id = $('#idSearch').val()
        const type = $('#typeSearchid').val()
        const cif = $('#cifClinica').val()

        const clinica = new Clinica()

        if (type == "findidpacienteclinica") {
            clinica.showPacientesByIdByClinica(cif, id)
        }

    })

})