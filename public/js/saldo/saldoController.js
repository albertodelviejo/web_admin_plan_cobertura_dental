$(() => {

    $('#btnTotalSaldo').click(() => {

        const saldo = new Saldo()
        saldo.showSaldoTotal()

      })

      $('#btnPacienteSaldo').click(() => {
        const user = firebase.auth().currentUser
    
        if(user == null){
          Materialize.toast(`Para editar debes estar autenticado`, 4000)
          return 
        }
        $('#typeSearchClinica').val('idpacientesaldo')
        $('#modalNombreClinica').modal('open')
      })

      
      $('#btnClinicaSaldo').click(() => {
        const user = firebase.auth().currentUser
    
        if(user == null){
          Materialize.toast(`Para editar debes estar autenticado`, 4000)
          return 
        }
        $('#typeSearchClinica').val('idclinicasaldo')
        $('#modalNombreClinica').modal('open')
      })

      $('#btnConsultorSaldo').click(() => {
        const user = firebase.auth().currentUser
    
        if(user == null){
          Materialize.toast(`Para editar debes estar autenticado`, 4000)
          return 
        }
        $('#typeSearchClinica').val('idconsultorsaldo')
        $('#modalNombreClinica').modal('open')
      })

      $('#btnSearchClinica').click(() => {

        const type = $('#typeSearchClinica').val()
        const result = $('#nameSearchClinica').val()
        const saldo = new Saldo()
        
        
        switch(type){
            case "idpacientesaldo":    
            saldo.showSaldoByIdPaciente(result)
            break
            case "idclinicasaldo":
            saldo.showSaldoByIdClinica(result)
            break
            case "idconsultorsaldo":
            saldo.showSaldoByIdConsultor(result)
            break
        }
      })
})