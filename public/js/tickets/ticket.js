class Ticket {

    constructor () {
      this.db = firebase.firestore()
  }

  showTicketAll(){
    this.db.collection('tickets')
    .orderBy('date', 'desc')
    .onSnapshot(querySnapshot => {
    $('#clinicas').empty()
    if(querySnapshot.empty){
        $('#clinicas').append()
    }else{
       querySnapshot.forEach(post => {
            let postHtml = this.obtenerPostTemplate(
                   post.data().topic,
                   "Precio",
                   post.data().price,
                   "CIF Clínica",
                   post.data().idClinica,
                   "Id Consultor",
                   post.data().idConsultor,
                   "DNI Paciente",
                   post.data().idPaciente,
                   "Puntos ganados",
                   post.data().points,
                   "Fecha",
                   post.data().date,
               )
               $('#clinicas').append(postHtml) 
       })
    }
})
}

showTicketByIdPaciente(idPaciente){
    this.db.collection('tickets')
    .where('idPaciente', '==', idPaciente)
    .onSnapshot(querySnapshot => {
        $('#clinicas').empty()
        if(querySnapshot.empty){
            $('#clinicas').append()//this.obtenerTemplatePostVacio())
        }else{
           querySnapshot.forEach(post => {
            const title = post.data().name + post.data().surname1 + post.data().surname2
            var creditPlan ="";
            let postHtml = this.obtenerPostTemplate(
                post.data().topic,
                "Precio",
                post.data().price,
                "CIF Clínica",
                post.data().idClinica,
                "Id Consultor",
                post.data().idConsultor,
                "DNI Paciente",
                post.data().idPaciente,
                "Puntos ganados",
                post.data().points,
                "Fecha",
                post.data().date,
               )
               $('#clinicas').append(postHtml) 
           })
        }
    })
}

showTicketByIdClinica(idClinica){
    this.db.collection('tickets')
    .where('idClinica', '==', idClinica)
    .onSnapshot(querySnapshot => {
        $('#clinicas').empty()
        if(querySnapshot.empty){
            $('#clinicas').append()//this.obtenerTemplatePostVacio())
        }else{
           querySnapshot.forEach(post => {
            let postHtml = this.obtenerPostTemplate(
                post.data().topic,
                "Precio",
                post.data().price,
                "CIF Clínica",
                post.data().idClinica,
                "Id Consultor",
                post.data().idConsultor,
                "DNI Paciente",
                post.data().idPaciente,
                "Puntos ganados",
                post.data().points,
                "Fecha",
                post.data().date,
               )
               $('#clinicas').append(postHtml) 
           })
        }
    })
}

showTicketByIdConsultor(idConsultor){
    this.db.collection('tickets')
    .where('idConsultor', '==', idConsultor)
    .onSnapshot(querySnapshot => {
        $('#clinicas').empty()
        if(querySnapshot.empty){
            $('#clinicas').append()//this.obtenerTemplatePostVacio())
        }else{
           querySnapshot.forEach(post => {
            let postHtml = this.obtenerPostTemplate(
                post.data().topic,
                "Precio",
                post.data().price,
                "CIF Clínica",
                post.data().idClinica,
                "Id Consultor",
                post.data().idConsultor,
                "DNI Paciente",
                post.data().idPaciente,
                "Puntos ganados",
                post.data().points,
                "Fecha",
                post.data().date,
               )
               $('#clinicas').append(postHtml) 
           })
        }
    })
}

showTicketByTopic(topic){
    this.db.collection('tickets')
    .where('topic', '==', topic)
    .onSnapshot(querySnapshot => {
        $('#clinicas').empty()
        if(querySnapshot.empty){
            $('#clinicas').append()//this.obtenerTemplatePostVacio())
        }else{
           querySnapshot.forEach(post => {
            let postHtml = this.obtenerPostTemplate(
                post.data().topic,
                "Precio",
                post.data().price,
                "CIF Clínica",
                post.data().idClinica,
                "Id Consultor",
                post.data().idConsultor,
                "DNI Paciente",
                post.data().idPaciente,
                "Puntos ganados",
                post.data().points,
                "Fecha",
                post.data().date,
               )
               $('#clinicas').append(postHtml) 
           })
        }
    })
}

obtenerPostTemplate (
    title,
    field1title,
    field1,
    field2title,
    field2,
    field3title,
    field3,
    field4title,
    field4,
    field5title,
    field5,
    field6title,
    field6,
  ) {
    return `
    <article class="post">
          <div class="post-titulo">
              <h5>${title}</h5>
          </div>
          <div class="row">
              <div class="col m6">
                  ${field1title}: ${field1}
              </div>
              <div class="col m6">
                  ${field2title}: ${field2}
              </div>
          </div>
          <div class="row">
              <div class="col m6">
                  ${field3title}: ${field3}
              </div>
              <div class="col m6">
                  ${field4title}: ${field4}
              </div>
          </div>
          <div class="row">
              <div class="col m6">
              ${field5title}: ${field5}
              </div>
              <div class="col m6">
              ${field6title}: ${field6}
              </div>        
          </div>
      </article>`
  }
}