$(() => {

    $('#btnAltaConsultor').click(() => {

        const user = firebase.auth().currentUser
  
      if(user == null){
        Materialize.toast(`Para dar de alta debes estar autenticado`, 4000)
        return 
      }

      $('#modalAltaConsultor').modal('open')
      
    })

    $('#btnCreateConsultor').click(() => {
        const consultor = new Consultor()

        const name = $('#nameAltaConsultor').val()
        const surname1 = $('#surname1AltaConsultor').val() 
        const surname2 = $('#surname2AltaConsultor').val()
        const email = $('#mailAltaConsultor').val()
        const birthday = $('#birthdayAltaConsultor').val()
        const address = $('#addressAltaConsultor').val()
        const phone_number = $('#phoneAltaConsultor').val()
        const dni = $('#dniAltaConsultor').val()
        const idConsultor = $('#idConsultorAltaConsultor').val()
        const status = $('#statusAltaConsultor').val()
        $('.determinate').attr('style', `width: 0%`)    
        
        consultor.createConsultor(
            name, 
        surname1, 
        surname2, 
        idConsultor,
        dni, 
        phone_number,
        email,  
        birthday, 
        address, 
        status)
            .then(resp => {
              Materialize.toast(`Consultor añadido correctamente`, 4000)
              $('.modal').modal('close')
            })
            .catch(err => {
              Materialize.toast(`Error => ${err}`, 4000)
            })
        
      })

    $('#btnEditarConsultor').click(() => {

      const user = firebase.auth().currentUser

    if(user == null){
      Materialize.toast(`Para editar debes estar autenticado`, 4000)
      return 
    }

    $('#typeSearchid').val('editconsultor')
    $('#modalId').modal('open')
  })

  $('#btnIdConsultores').click(() => {
    const user = firebase.auth().currentUser

    if(user == null){
      Materialize.toast(`Para editar debes estar autenticado`, 4000)
      return 
    }
    $('#typeSearchid').val('findidconsultor')
    $('#modalId').modal('open')
  })

     $('#btnSearchid').click(() => {

        const id = $('#idSearch').val()
        const type = $('#typeSearchid').val()

        const consultor = new Consultor()

        switch(type){
          case "findidconsultor":
          consultor.showConsultorById(id)
          break
          case "editconsultor":
          consultor.getConsultorById(id)
          break
    }
    $('#modalId').modal('close')
  })
  
      $('#btnTodosConsultores').click(() => {

        const consultor = new Consultor()
        consultor.showConsultorAll()

      })  

      
      $('#btnActivosConsultores').click(() => {

        const consultor = new Consultor()
        consultor.showActiveConsultor()

      })

      $('#btnInactivosConsultores').click(() => {

        const consultor = new Consultor()
        consultor.showInactiveConsultor()

      })

      $('#btnEsperaConsultores').click(() => {

        const consultor = new Consultor()
        consultor.showStandbyConsultor()

      })
      
  })