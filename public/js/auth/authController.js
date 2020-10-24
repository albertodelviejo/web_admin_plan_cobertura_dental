$(() => {    

    const objAuth = new Autenticacion();

    $("#btnRegistroEmail").click(() => {
        const nombres = $('#nombreContactoReg').val();
        const email = $('#emailContactoReg').val();
        const password = $('#passwordReg').val();
        const dni = $('#dniReg').val();
        var isAdmin = "";

        if($('#optionAdminTrue').prop("checked")){
            isAdmin = true;
          }else{
            isAdmin = false;
          }

        const auth = new Autenticacion()
        auth.crearCuentaEmailPass(email, password, nombres, dni, isAdmin)
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