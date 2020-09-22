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
        idConsultor,
        is_credit_plan,
        marital_status,
        mobile_number,
        status
        ){
            var docRef = this.db.collection("pacientes").doc(id);

        docRef.get().then(function(doc) {
            if (doc.exists) {
                Materialize.toast(`El paciente ya existe`, 4000)
            } else {

            const clinica = new Clinica()

            clinica.addPacienteToClinica(idClinica, id)

            docRef.set({
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
                idConsultor: idConsultor,
                is_credit_plan: is_credit_plan,
                marital_status: marital_status,
                mobile_number: mobile_number,
                paid_balance: 0,
                points: 0,
                total_balance: 0,
                status: status
            }).then(refDoc => {
                console.log(`Id de paciente => ${refDoc.id}`)
                Materialize.toast(`El paciente se ha dado de alta`, 4000)
            }).catch(error => {
              console.log(`Error de alta => ${error}`)
            })
        }
    })
}

updatePaciente(name, 
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
    status){
    var docRef = this.db.collection("pacientes").doc(id);

    docRef.get().then(function(doc) {
        if (doc.exists) {
            docRef.update({
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
                idConsultor: idConsultor,
                is_credit_plan: is_credit_plan,
                marital_status: marital_status,
                mobile_number: mobile_number,
                status: status
            }).then(refDoc => {
                // console.log(`Id de clinica => ${refDoc.cif}`)
                 Materialize.toast(`Paciente actualizado correctamente`, 4000)
                 $('.modal').modal('close')
             }).catch(error => {
               console.log(`Error de alta => ${error}`)
               Materialize.toast(`Error de alta`, 4000)
                 $('.modal').modal('close')
             })
        } else {
            Materialize.toast(`El paciente no existe`, 4000)
        }
        }).catch(function(error) {
            console.log("Error getting document:", error);
        });
}

    showPacienteAll(){
        this.db.collection('pacientes')
    .onSnapshot(querySnapshot => {
        $('#clinicas').empty()
        if(querySnapshot.empty){
            $('#clinicas').append(`<h4>No se han encontrado resultados</h4>`)//this.obtenerTemplatePostVacio())
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
                       "ID",
                       post.data().id
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
                $('#clinicas').append(`<h4>No se han encontrado resultados</h4>`)//this.obtenerTemplatePostVacio())
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

    showIsCreditPaciente(){
        this.db.collection('pacientes')
        .where('is_credit_plan', '==', "true")
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

    

    getPacienteById(id){
        this.db.collection('pacientes')
        .where('id', '==', id)
    .onSnapshot(querySnapshot => {
        $('#clinicas').empty()
        if(querySnapshot.empty){
            $('#clinicas').append(`<h2>No se ha encontrado ningun paciente<h3>`)//this.obtenerTemplatePostVacio())
        }else{
           querySnapshot.forEach(post => {
        $('#nameAltaPaciente').val(post.data().name)
        $('#surname1AltaPaciente').val(post.data().surname1) 
        $('#surname2AltaPaciente').val(post.data().surname2)
        $('#mailAltaPaciente').val(post.data().email)
        switch(post.data().gender){
            case "male":
                $('#maleActivePaciente').prop("checked",true)
            break
            case "female":
                $('#femaleActivePaciente').prop("checked",true)
            break
            case "other":
                $('#otherActivePaciente').prop("checked",true)
            break
        }
        $('#birthdayAltaPaciente').val(post.data().birthday)
        $('#addressAltaPaciente').val(post.data().address)
        $('#phoneAltaPaciente').val(post.data().phone_number)
        switch(post.data().id_type){
            case "DNI":
                $('#dniActivePaciente').prop("checked",true)
            break
            case "Passport":
                $('#passActivePaciente').prop("checked",true)
            break
            case "NIE":
                $('#nieActivePaciente').prop("checked",true)
            break
        }
        $('#idAltaPaciente').val(post.data().id)
        $('#idclinicaAltaPaciente').val(post.data().idClinica)
        $('#idconsultorAltaPaciente').val(post.data().idConsultor)
        switch(post.data().is_credit_plan){
            case "true":
                $('#iscredittruePaciente').prop("checked",true)
            break
            case "false":
                $('#iscreditfalsePaciente').prop("checked",true)
            break
        }
        $('#maritalAltaPaciente').val(post.data().marital_status)
        $('#mobileAltaPaciente').val(post.data().mobile_number) 
        switch(post.data().status){
            case "active":
                $('#statusActive').prop("checked",true)
            break
            case "inactive":
                $('#statusInactive').prop("checked",true)
            break
            case "standby":
                $('#statusStandby').prop("checked",true)
            break
        }
        $('.determinate').attr('style', `width: 0%`)

        $('typeForm').val('update')
              
            $('#modalAltaPaciente').modal('open')
           })
        }
    })
    }

    getPacienteforModal(id){
        this.db.collection('pacientes')
        .where('id', '==', id)
    .onSnapshot(querySnapshot => {
        $('#clinicas').empty()
        if(querySnapshot.empty){
            $('#clinicas').append(`<h2>Error<h3>`)//this.obtenerTemplatePostVacio())
        }else{
           querySnapshot.forEach(post => {
            $('#modaltitlepaciente').text(post.data().name)
            $('#idPaciente').val(id)
            
            $('.determinate').attr('style', `width: 0%`)
              
            $('#modalItemPaciente').modal('open')
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
        field7title,
        field7,
      ) {
        return `
        <article onclick=test("${field7}") class="post">
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
              <script>
                function test(id){
                 const paciente = new Paciente();
                 paciente.getPacienteforModal(id);
                }
                </script>
          </article>`
      }

}