$(() => {    

    const objAuth = new Autenticacion();

    $("#btnRegistroEmail").click(() => {
        const nombres = $('#nombreContactoReg').val();
        const email = $('#emailContactoReg').val();
        const password = $('#passwordReg').val();
        const idConsultor = $('#idconsultorReg').val();
        const auth = new Autenticacion()
        auth.crearCuentaEmailPass(email, password, nombres, idConsultor)
    });

    $("#btnInicioEmail").click(() => {
        const email = $('#emailSesion').val();
        const password = $('#passwordSesion').val();
        const auth = new Autenticacion()
        auth.autEmailPass(email,password)
    });

    $('#btnRegistrarse').click(() => {
        $('#modalSesion').modal('close');
        $('#modalRegistro').modal('open');
    });

    $('#btnIniciarSesion').click(() => {
        $('#modalRegistro').modal('close');
        $('#modalSesion').modal('open');
    });

});