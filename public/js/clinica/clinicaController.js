$(() => {

    $('#btnAltaClinica').click(() => {

        const user = firebase.auth().currentUser
  
      if(user == null){
        Materialize.toast(`Para dar de alta debes estar autenticado`, 4000)
        return 
      }

      $('#modalAltaClinica').modal('open')
      
    })

    $('#btnCreateClinica').click(() => {
        const clinica = new Clinica()

        const name = $('#nameAltaClinica').val()
        const razon = $('#razonAltaClinica').val()
        const cif = $('#cifAltaClinica').val()
        const phone = $('#phoneAltaClinica').val()
        const mail = $('#mailAltaClinica').val()
        const address = $('#addressAltaClinica').val()
        const manager = $('#managerAltaClinica').val()
        const status = $('#statusAltaClinica').val()
        $('.determinate').attr('style', `width: 0%`)
        
        clinica.createClinica(
            name,
            razon,
            cif,
            phone,
            mail, 
            address, 
            manager, 
            status)
            .then(resp => {
              Materialize.toast(`Clinica añadida correctamente`, 4000)
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
  
      if(user == null){
        Materialize.toast(`Para dar de alta debes estar autenticado`, 4000)
        return 
      }

      $('#modalNombreClinica').modal('open')

      })

      $('#btnSearchClinica').click(() => {

        const name = $('#nameSearchClinica').val()

        const clinica = new Clinica()
        clinica.showClinicaByName(name)
        $('.modal').modal('close')
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
      
  })
  