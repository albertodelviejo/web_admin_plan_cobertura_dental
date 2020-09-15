class Paciente {
    constructor () {
        this.db = firebase.firestore()
    }

    createPaciente(
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
        is_credit_plan,
        marital_status,
        mobile_number,
        status
        ){

            const clinica = new Clinica()

            clinica.addPacienteToClinica(idClinica, id)

            return this.db.collection("pacientes").doc(id).set({
                name: name,
                surname1: surname1,
                surname2: surname2,
                email: email,
                gender: gender,
                birthday: birthday,
                address: address,
                phone_number: phone_number,
                id_type: id_type,
                id: id,
                idClinica: idClinica,
                is_credit_plan: is_credit_plan,
                marital_status: marital_status,
                mobile_number: mobile_number,
                payed_balance: 0,
                points: 0,
                total_balance: 0,
                status: status
            }).then(refDoc => {
                console.log(`Id de paciente => ${refDoc.id}`)
            }).catch(error => {
              console.log(`Error de alta => ${error}`)
            })
    }


    showPacienteAll(){
        this.db.collection('pacientes')
    .onSnapshot(querySnapshot => {
        $('#clinicas').empty()
        if(querySnapshot.empty){
            $('#clinicas').append()//this.obtenerTemplatePostVacio())
        }else{
           querySnapshot.forEach(post => {
            const title = post.data().name + " " + post.data().surname1 + " " + post.data().surname2
                var creditPlan = "";
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
                var creditPlan ="";
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
                var creditPlan = "";
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

    showActivePaciente(){
        this.db.collection('pacientes')
        .where('status', '==', "active")
        .onSnapshot(querySnapshot => {
        $('#clinicas').empty()
        if(querySnapshot.empty){
            $('#clinicas').append(`<h4>No se han encontrado resultados</h4>`)//this.obtenerTemplatePostVacio())
        }else{
           querySnapshot.forEach(post => {
            const title = post.data().name + post.data().surname1 + post.data().surname2
            var creditPlan = "";
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

    showInactivePaciente(){
        this.db.collection('pacientes')
        .where('status', '==', "inactive")
        .onSnapshot(querySnapshot => {
        $('#clinicas').empty()
        if(querySnapshot.empty){
            $('#clinicas').append(`<h4>No se han encontrado resultados</h4>`)//this.obtenerTemplatePostVacio())
        }else{
           querySnapshot.forEach(post => {
            const title = post.data().name + post.data().surname1 + post.data().surname2
            var creditPlan = "";
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

    showStandbyPaciente(){
        this.db.collection('pacientes')
        .where('status', '==', "standby")
        .onSnapshot(querySnapshot => {
        $('#clinicas').empty()
        if(querySnapshot.empty){
            $('#clinicas').append(`<h4>No se han encontrado resultados</h4>`)//this.obtenerTemplatePostVacio())
        }else{
           querySnapshot.forEach(post => {
            const title = post.data().name + post.data().surname1 + post.data().surname2
            var creditPlan = "";
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