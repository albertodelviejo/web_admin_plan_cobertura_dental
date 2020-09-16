$(() => {

    $('#btnTodosTickets').click(() => {

        const ticket = new Ticket()
        ticket.showTicketAll()

      }) 

      $('#btnPacienteTickets').click(() => {
        const user = firebase.auth().currentUser
    
        if(user == null){
          Materialize.toast(`Para editar debes estar autenticado`, 4000)
          return 
        }
        $('#typeSearchClinica').val('idpaciente')
        $('#modalNombreClinica').modal('open')
      })

      
      $('#btnClinicaTickets').click(() => {
        const user = firebase.auth().currentUser
    
        if(user == null){
          Materialize.toast(`Para editar debes estar autenticado`, 4000)
          return 
        }
        $('#typeSearchClinica').val('idclinica')
        $('#modalNombreClinica').modal('open')
      })

      $('#btnConsultorTickets').click(() => {
        const user = firebase.auth().currentUser
    
        if(user == null){
          Materialize.toast(`Para editar debes estar autenticado`, 4000)
          return 
        }
        $('#typeSearchClinica').val('idconsultor')
        $('#modalNombreClinica').modal('open')
      })

      $('#btnConceptoTickets').click(() => {
        const user = firebase.auth().currentUser
    
        if(user == null){
          Materialize.toast(`Para editar debes estar autenticado`, 4000)
          return 
        }
        $('#typeSearchClinica').val('topic')
        $('#modalNombreClinica').modal('open')
      })

      $('#btnSearchClinica').click(() => {

        const type = $('#typeSearchClinica').val()
        const result = $('#nameSearchClinica').val()
        const ticket = new Ticket()
        
        switch(type){
            case "idpaciente":    
                ticket.showTicketByIdPaciente(result)
            break
            case "idclinica":
                ticket.showTicketByIdClinica(result)
            break
            case "idconsultor":
                ticket.showTicketByIdConsultor(result)
            break
            case "topic":
                ticket.showTicketByTopic(result)
            break
        }
      })

})