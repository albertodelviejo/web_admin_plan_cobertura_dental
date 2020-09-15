class Paciente {
    constructor () {
        this.db = firebase.firestore()
    }


    showPacienteAll(){
        this.db.collection('pacientes')
    .onSnapshot(querySnapshot => {
        $('#clinicas').empty()
        if(querySnapshot.empty){
            $('#clinicas').append()//this.obtenerTemplatePostVacio())
        }else{
           querySnapshot.forEach(post => {
            const title = post.data().name + post.data().surname1 + post.data().surname2
                const creditPlan = "";
                if (post.data().is_credit_plan){
                    creditPlan = "Sí"
                }else{
                    creditPlan = "No"
                }
                let postHtml = this.obtenerPostTemplate(
                       title,
                       "Dirección",
                       post.data().address,
                       "Email",
                       post.data().email,
                       "Teléfono",
                       post.data().phone_number,
                       "Puntos",
                       post.data().points,
                       "Credit Plan",
                       creditPlan,
                       "Saldo Pagado",
                       post.data().payed_balance + "€",
                   )
                   $('#clinicas').append(postHtml) 
           })
        }
    })
    }

    showPacientesById(idUser){
        this.db.collection('pacientes')
        .where('id', '==', idUser)
        .onSnapshot(querySnapshot => {
            $('#clinicas').empty()
            if(querySnapshot.empty){
                $('#clinicas').append()//this.obtenerTemplatePostVacio())
            }else{
               querySnapshot.forEach(post => {
                const title = post.data().name + post.data().surname1 + post.data().surname2
                const creditPlan ="";
                if (post.data().is_credit_plan){
                    creditPlan = "Sí"
                }else{
                    creditPlan = "No"
                }
                let postHtml = this.obtenerPostTemplate(
                       title,
                       "Dirección",
                       post.data().address,
                       "Email",
                       post.data().email,
                       "Teléfono",
                       post.data().phone_number,
                       "ID",
                       post.data().id,
                       "Credit Plan",
                       creditPlan,
                       "Saldo Pagado",
                       post.data().payed_balance + "€",
                   )
                   $('#clinicas').append(postHtml) 
               })
            }
        })
    }

    showPacientesByIdClinica(idClinica){
        this.db.collection('pacientes')
        .where('idClinica','==', idClinica)
        .onSnapshot(querySnapshot => {
            $('#clinicas').empty()
            if(querySnapshot.empty){
                $('#clinicas').append()//this.obtenerTemplatePostVacio())
            }else{
               querySnapshot.forEach(post => {
                const title = post.data().name + post.data().surname1 + post.data().surname2
                const creditPlan = "";
                if (post.data().is_credit_plan){
                    creditPlan = "Sí"
                }else{
                    creditPlan = "No"
                }
                let postHtml = this.obtenerPostTemplate(
                       title,
                       "Dirección",
                       post.data().address,
                       "Email",
                       post.data().email,
                       "Teléfono",
                       post.data().phone_number,
                       "ID",
                       post.data().id,
                       "Credit Plan",
                       creditPlan,
                       "Saldo Pagado",
                       post.data().payed_balance + "€",
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
                        <p>${field1title}: ${field1}</p>
                    </div>
                    <div class="col m6">
                        <p>${field2title}: ${field2}</p>
                    </div>
                </div>
                <div class="row">
                    <div class="col m6">
                        <p>${field3title}: ${field3}</p>
                    </div>
                    <div class="col m6">
                        <p>${field4title}: ${field4}</p>
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