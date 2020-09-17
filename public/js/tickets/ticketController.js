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
        $('#typeSearchid').val('idpaciente')
        $('#modalId').modal('open')
      })

      
      $('#btnClinicaTickets').click(() => {
        const user = firebase.auth().currentUser
    
        if(user == null){
          Materialize.toast(`Para editar debes estar autenticado`, 4000)
          return 
        }
        $('#typeSearchid').val('idclinica')
        $('#modalId').modal('open')
      })

      $('#btnConsultorTickets').click(() => {
        const user = firebase.auth().currentUser
    
        if(user == null){
          Materialize.toast(`Para editar debes estar autenticado`, 4000)
          return 
        }
        $('#typeSearchid').val('idconsultor')
        $('#modalId').modal('open')
      })

      $('#btnConceptoTickets').click(() => {
        const user = firebase.auth().currentUser
    
        if(user == null){
          Materialize.toast(`Para editar debes estar autenticado`, 4000)
          return 
        }
        $('#typeSearchid').val('topic')
        $('#modalId').modal('open')
      })

      $('#btnSearchid').click(() => {

        const type = $('#typeSearchid').val()
        const result = $('#idSearch').val()
        const ticket = new Ticket()
        const cif = $('#cifClinica').val()
        
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
            case "topicclinica":   
              ticket.showTicketByTopicClinica(cif,result)
            break
            case "pacienteclinica":
              ticket.showTicketByPacienteClinica(cif,result)
            break
        }
        $('#modalId').modal('close')
      })

      $('#btnTodosTicketsClinica').click(() => {

        const tiket = new Ticket()
        const cif = $('#cifClinica').val()
        tiket.showTicketByIdClinica(cif)

      })

      $('#btnConceptoTicketsClinica').click(() => {

        const user = firebase.auth().currentUser
    
        if(user == null){
          Materialize.toast(`Para editar debes estar autenticado`, 4000)
          return 
        }
        $('#typeSearchid').val('topicclinica')
        $('#modalId').modal('open')
        

      })

      $('#btnPacienteTicketsClinica').click(() => {

        const user = firebase.auth().currentUser
    
        if(user == null){
          Materialize.toast(`Para editar debes estar autenticado`, 4000)
          return 
        }
        $('#typeSearchid').val('pacienteclinica')
        $('#modalId').modal('open')
        

      })



})