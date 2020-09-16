$(() => {

    $('#btnAltaPaciente').click(() => {

        const user = firebase.auth().currentUser
  
      if(user == null){
        Materialize.toast(`Para dar de alta debes estar autenticado`, 4000)
        return 
      }

      $('#modalAltaPaciente').modal('open')
      
    })

    $('#btnCreatePaciente').click(() => {
        const paciente = new Paciente()

        const name = $('#nameAltaPaciente').val()
        const surname1 = $('#surname1AltaPaciente').val() 
        const surname2 = $('#surname2AltaPaciente').val()
        const email = $('#mailAltaPaciente').val()
        const gender = $('#genderAltaPaciente').val()
        const birthday = $('#birthdayAltaPaciente').val()
        const address = $('#addressAltaPaciente').val()
        const phone_number = $('#phoneAltaPaciente').val()
        const id_type = $('#idtypeAltaPaciente').val()
        const id = $('#idAltaPaciente').val()
        const idClinica = $('#idclinicaAltaPaciente').val()
        const idConsultor = $('#idconsultorAltaPaciente').val()
        const is_credit_plan = $('#iscreditAltaPaciente').val()
        const marital_status = $('#maritalAltaPaciente').val()
        const mobile_number = $('#mobileAltaPaciente').val() 
        const status = $('#statusAltaPaciente').val()
        $('.determinate').attr('style', `width: 0%`)    
        
        paciente.createPaciente(
            name, 
        surname1, 
        surname2, 
        email, 
        gender, 
        birthday, 
        address, 
        phone_number,
        id_type, 
        id, 
        idClinica,
        idConsultor,
        is_credit_plan,
        marital_status,
        mobile_number,
        status)
            .then(resp => {
              Materialize.toast(`Paciente añadida correctamente`, 4000)
              $('.modal').modal('close')
            })
            .catch(err => {
              Materialize.toast(`Error => ${err}`, 4000)
            })
        
      })

    $('#btnEditarClinica').click(() => {

      const user = firebase.auth().currentUser

    if(user == null){
      Materialize.toast(`Para editar debes estar autenticado`, 4000)
      return 
    }

    $('#modalCifClinica').modal('open')
  })

  $('#btnIdPacientes').click(() => {
    const user = firebase.auth().currentUser

    if(user == null){
      Materialize.toast(`Para editar debes estar autenticado`, 4000)
      return 
    }


    $('#modalNombreClinica').modal('open')
  })

  $('#btnSearchClinica').click(() => {

    const id = $('#nameSearchClinica').val()

    const paciente = new Paciente()
    paciente.showPacientesById(id)
  })

  $('#btnEditarPaciente').click(() => {

    const user = firebase.auth().currentUser

  if(user == null){
    Materialize.toast(`Para editar debes estar autenticado`, 4000)
    return 
  }

  $('#modalCifClinica').modal('open')
})

$('#btnSearchCifClinica').click(() => {
  const paciente = new Paciente();
  const id = $('#nameSearchClinicaCif').val()

  paciente.getPacienteById(id)

})    

    

      $('#btnTodosPacientes').click(() => {

        const paciente = new Paciente()
        paciente.showPacienteAll()

      })  

      
      $('#btnActivosPacientes').click(() => {

        const paciente = new Paciente()
        paciente.showActivePaciente()

      })

      $('#btnInactivosPacientes').click(() => {

        const paciente = new Paciente()
        paciente.showInactivePaciente()

      })

      $('#btnEsperaPacientes').click(() => {

        const paciente = new Paciente()
        paciente.showStandbyPaciente()

      })

      $('#btnCreditPlanPacientes').click(() => {

        const paciente = new Paciente()
        paciente.showIsCreditPaciente()

      })
      
  })