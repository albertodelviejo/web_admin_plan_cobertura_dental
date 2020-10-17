class Paciente {
    constructor() {
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
    ) {
        var docRef = this.db.collection("pacientes").doc(id);

        docRef.get().then(function (doc) {
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
                   status) {
        var docRef = this.db.collection("pacientes").doc(id);

        docRef.get().then(function (doc) {
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
        }).catch(function (error) {
            console.log("Error getting document:", error);
        });
    }

    updatePatientShortDetails(
        name,
        surname1,
        surname2,
        email,
        address,
        phone_number,
        id,
        is_credit_plan,
        status) {
        var docRef = this.db.collection("pacientes").doc(id);

        docRef.get().then(function (doc) {
            if (doc.exists) {
                docRef.update({
                    name: name,
                    surname1: surname1,
                    surname2: surname2,
                    email: email,
                    address: address,
                    phone_number: phone_number,
                    id: id,
                    is_credit_plan: is_credit_plan,
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
        }).catch(function (error) {
            console.log("Error getting document:", error);
        });
    }


    showPacienteAll() {
        this.db.collection('pacientes')
            .onSnapshot(querySnapshot => {
                $('#clinicas').empty()
                if (querySnapshot.empty) {
                    $('#clinicas').append(`<h4>No se han encontrado resultados</h4>`)//this.obtenerTemplatePostVacio())
                } else {
                    querySnapshot.forEach(post => {
                        const title = post.data().name + " " + post.data().surname1 + " " + post.data().surname2

                        let postHtml = this.obtenerPostTemplate(
                            title,
                            post.data().name,
                            post.data().surname1,
                            post.data().surname2,
                            post.data().phone_number,
                            post.data().address,
                            post.data().email,
                            post.data().is_credit_plan,
                            post.data().id,
                            post.data().status,
                            post.data().url,
                        );
                        $("#section-title").text("Pacientes")
                        $("#menuPaciente").show();
                        $("#clinicas").attr('class', 'posts');
                        $('#clinicas').append(postHtml)
                    });
                    paginate_view("#clinicas");
                }
            })
    }

    showPacienteByName(name) {
        this.db.collection('pacientes')
            .where('name', '==', name)
            .onSnapshot(querySnapshot => {
                $('#clinicas').empty()
                if (querySnapshot.empty) {
                    $('#clinicas').append(`<h4>No se han encontrado resultados</h4>`)//this.obtenerTemplatePostVacio())
                } else {
                    querySnapshot.forEach(post => {
                        const title = post.data().name + " " + post.data().surname1 + " " + post.data().surname2
                        let postHtml = this.obtenerPostTemplate(
                            title,
                            post.data().name,
                            post.data().surname1,
                            post.data().surname2,
                            post.data().phone_number,
                            post.data().address,
                            post.data().email,
                            post.data().is_credit_plan,
                            post.data().id,
                            post.data().status,
                            post.data().url,
                        );
                        $('#clinicas').append(postHtml)
                    });
                    paginate_view("#clinicas");
                }
            })
    }

    showPacientesById(idUser) {
        this.db.collection('pacientes')
            .where('id', '==', idUser)
            .onSnapshot(querySnapshot => {
                $('#clinicas').empty()
                if (querySnapshot.empty) {
                    $('#clinicas').append(`<h4>No se han encontrado resultados</h4>`)//this.obtenerTemplatePostVacio())
                } else {
                    querySnapshot.forEach(post => {
                        const title = post.data().name + post.data().surname1 + post.data().surname2
                        var creditPlan = "";
                        let postHtml = this.obtenerPostTemplate(
                            title,
                            post.data().name,
                            post.data().surname1,
                            post.data().surname2,
                            post.data().phone_number,
                            post.data().address,
                            post.data().email,
                            post.data().is_credit_plan,
                            post.data().id,
                            post.data().status,
                            post.data().url,
                        );
                        $('#clinicas').append(postHtml)
                    });
                    paginate_view("#clinicas");
                }
            })
    }

    showPacientesByIdClinica(idClinica) {
        this.db.collection('pacientes')
            .where('idClinica', '==', idClinica)
            .onSnapshot(querySnapshot => {
                $('#clinicas').empty()
                if (querySnapshot.empty) {
                    $('#clinicas').append(`<h4>No se han encontrado resultados</h4>`)//this.obtenerTemplatePostVacio())
                } else {
                    querySnapshot.forEach(post => {
                        const title = post.data().name + post.data().surname1 + post.data().surname2
                        let postHtml = this.obtenerPostTemplate(
                            title,
                            post.data().name,
                            post.data().surname1,
                            post.data().surname2,
                            post.data().phone_number,
                            post.data().address,
                            post.data().email,
                            post.data().is_credit_plan,
                            post.data().id,
                            post.data().status,
                            post.data().url,
                        );
                        $('#clinicas').append(postHtml)
                    });
                    paginate_view("#clinicas");
                }
            })
    }

    showActivePaciente() {
        this.db.collection('pacientes')
            .where('status', '==', "active")
            .onSnapshot(querySnapshot => {
                $('#clinicas').empty()
                if (querySnapshot.empty) {
                    $('#clinicas').append(`<h4>No se han encontrado resultados</h4>`)//this.obtenerTemplatePostVacio())
                } else {
                    querySnapshot.forEach(post => {
                        const title = post.data().name + post.data().surname1 + post.data().surname2
                        let postHtml = this.obtenerPostTemplate(
                            title,
                            post.data().name,
                            post.data().surname1,
                            post.data().surname2,
                            post.data().phone_number,
                            post.data().address,
                            post.data().email,
                            post.data().is_credit_plan,
                            post.data().id,
                            post.data().status,
                            post.data().url,
                        );
                        $('#clinicas').append(postHtml)
                    });
                    paginate_view("#clinicas");
                }
            })
    }

    showInactivePaciente() {
        this.db.collection('pacientes')
            .where('status', '==', "inactive")
            .onSnapshot(querySnapshot => {
                $('#clinicas').empty()
                if (querySnapshot.empty) {
                    $('#clinicas').append(`<h4>No se han encontrado resultados</h4>`)//this.obtenerTemplatePostVacio())
                } else {
                    querySnapshot.forEach(post => {
                        const title = post.data().name + post.data().surname1 + post.data().surname2
                        let postHtml = this.obtenerPostTemplate(
                            title,
                            post.data().name,
                            post.data().surname1,
                            post.data().surname2,
                            post.data().phone_number,
                            post.data().address,
                            post.data().email,
                            post.data().is_credit_plan,
                            post.data().id,
                            post.data().status,
                            post.data().url,
                        );
                        $('#clinicas').append(postHtml)
                    });
                    paginate_view("#clinicas");
                }
            })
    }

    showStandbyPaciente() {
        this.db.collection('pacientes')
            .where('status', '==', "standby")
            .onSnapshot(querySnapshot => {
                $('#clinicas').empty()
                if (querySnapshot.empty) {
                    $('#clinicas').append(`<h4>No se han encontrado resultados</h4>`)//this.obtenerTemplatePostVacio())
                } else {
                    querySnapshot.forEach(post => {
                        const title = post.data().name + post.data().surname1 + post.data().surname2
                        let postHtml = this.obtenerPostTemplate(
                            title,
                            post.data().name,
                            post.data().surname1,
                            post.data().surname2,
                            post.data().phone_number,
                            post.data().address,
                            post.data().email,
                            post.data().is_credit_plan,
                            post.data().id,
                            post.data().status,
                            post.data().url,
                        );
                        $('#clinicas').append(postHtml)
                    });
                    paginate_view("#clinicas");
                }
            })
    }

    showIsCreditPaciente() {
        this.db.collection('pacientes')
            .where('is_credit_plan', '==', "true")
            .onSnapshot(querySnapshot => {
                $('#clinicas').empty()
                if (querySnapshot.empty) {
                    $('#clinicas').append(`<h4>No se han encontrado resultados</h4>`)//this.obtenerTemplatePostVacio())
                } else {
                    querySnapshot.forEach(post => {
                        const title = post.data().name + post.data().surname1 + post.data().surname2
                        let postHtml = this.obtenerPostTemplate(
                            title,
                            post.data().name,
                            post.data().surname1,
                            post.data().surname2,
                            post.data().phone_number,
                            post.data().address,
                            post.data().email,
                            post.data().is_credit_plan,
                            post.data().id,
                            post.data().status,
                            post.data().url,
                        );
                        $('#clinicas').append(postHtml)
                    });
                    paginate_view("#clinicas");
                }
            })
    }


    getPacienteById(id) {
        this.db.collection('pacientes')
            .where('id', '==', id)
            .onSnapshot(querySnapshot => {
                $('#clinicas').empty()
                if (querySnapshot.empty) {
                    $('#clinicas').append(`<h2>No se ha encontrado ningun paciente<h3>`)//this.obtenerTemplatePostVacio())
                } else {
                    querySnapshot.forEach(post => {
                        $('#nameAltaPaciente').val(post.data().name)
                        $('#surname1AltaPaciente').val(post.data().surname1)
                        $('#surname2AltaPaciente').val(post.data().surname2)
                        $('#mailAltaPaciente').val(post.data().email)
                        switch (post.data().gender) {
                            case "male":
                                $('#maleActivePaciente').prop("checked", true)
                                break
                            case "female":
                                $('#femaleActivePaciente').prop("checked", true)
                                break
                            case "other":
                                $('#otherActivePaciente').prop("checked", true)
                                break
                        }
                        $('#birthdayAltaPaciente').val(post.data().birthday)
                        $('#addressAltaPaciente').val(post.data().address)
                        $('#phoneAltaPaciente').val(post.data().phone_number)
                        switch (post.data().id_type) {
                            case "DNI":
                                $('#dniActivePaciente').prop("checked", true)
                                break
                            case "Passport":
                                $('#passActivePaciente').prop("checked", true)
                                break
                            case "NIE":
                                $('#nieActivePaciente').prop("checked", true)
                                break
                        }
                        $('#idAltaPaciente').val(post.data().id)
                        $('#idclinicaAltaPaciente').val(post.data().idClinica)
                        $('#idconsultorAltaPaciente').val(post.data().idConsultor)
                        switch (post.data().is_credit_plan) {
                            case "true":
                                $('#iscredittruePaciente').prop("checked", true)
                                break
                            case "false":
                                $('#iscreditfalsePaciente').prop("checked", true)
                                break
                        }
                        $('#maritalAltaPaciente').val(post.data().marital_status)
                        $('#mobileAltaPaciente').val(post.data().mobile_number)
                        switch (post.data().status) {
                            case "active":
                                $('#statusActive').prop("checked", true)
                                break
                            case "inactive":
                                $('#statusInactive').prop("checked", true)
                                break
                            case "standby":
                                $('#statusStandby').prop("checked", true)
                                break
                        }
                        $('.determinate').attr('style', `width: 0%`)

                        $('typeForm').val('update')

                        $('#modalAltaPaciente').modal('open')
                    })
                }
            })
    }

    getPacienteforModal(id) {
        this.db.collection('pacientes')
            .where('id', '==', id)
            .onSnapshot(querySnapshot => {
                if (querySnapshot.empty) {
                    $('#clinicas').append(`<h2>Error<h3>`)//this.obtenerTemplatePostVacio())
                } else {
                    querySnapshot.forEach(post => {
                        $('#modaltitlepaciente').text(post.data().name)
                        $('#idPaciente').val(id)

                        $('.determinate').attr('style', `width: 0%`)

                        $('#modalItemPaciente').modal('open')
                    })
                }
            })
    }


    obtenerPostTemplate(
        title,
        name,
        surname1,
        surname2,
        phone_number,
        address,
        email,
        creditPlan,
        id,
        status,
        patient_url
    ) {
        return `<article class="post">
    <div class="card">
        <div class="card-header">
            <div class="post-titulo">
                <h5>${title}<a class="pull-right collapsed card-link btn-floating btn waves-effect waves-light blue" data-toggle="collapse" href="#collapse_${id}">
                    <i class="material-icons">add</i>
                </a></h5>

            </div>
            <p>DNI: ${id} Teléfono: ${phone_number} Email: ${email} Dirección: ${address}</p>
        </div>
        <div id="collapse_${id}" class="collapse" data-parent="#accordion">
            <div class="card-body">
                <div class="row">
                    <div class="col-sm-12 col-md-3 registro-bienvenida">
                        <div class="text-center mt-5">
                        <a class="btn btn-primary mt-5" href="${patient_url}" target="_blank" >Añadir cita</a>
                        </div>
                    </div>
                    <div class="col-sm-12 col-md-9 registro-formulario">
                        <div class="col s4 m6">
                            <div class="input-field">
                                <input id="patient_name_${id}" type="text" value="${name}" maxlength="30" data-length="30" required/>
                                <label for="patient_name_${id}">Nombre:</label>
                            </div>
                        </div>   
                        <div class="col s4 m6">
                            <div class="input-field">
                                <input id="patient_surname1_${id}" type="text" value="${surname1}" maxlength="30" data-length="30" required/>
                                <label for="patient_surname1_${id}">Primer apellido:</label>
                            </div>
                        </div>
                        <div class="col s4 m6">
                            <div class="input-field">
                                <input id="patient_surname2_${id}" type="text" value="${surname2}" maxlength="30" data-length="30" required/>
                                <label for="patient_surname2_${id}">Segundo apellido:</label>
                            </div>
                        </div>
                        <div class="col s12 m6">
                            <div class="input-field">
                                <input id="patient_phone_${id}" value="${phone_number}" type="text" maxlength="30" data-length="30" required/>
                                <label for="patient_phone_${id}">Teléfono:</label>
                            </div>
                        </div>

                        <div class="col s12 m12">
                            <div class="input-field">
                                <input id="patient_address_${id}" value="${address}" type="text" required />
                                <label for="patient_address_${id}">Direccion:</label>
                            </div>
                        </div>

                        <div class="col s12 m6">
                            <div class="input-field">
                                <input id="patient_email_${id}" value="${email}" type="text" required />
                                <label for="patient_email_${id}">E-mail:</label>
                            </div>
                        </div>

                        <div class="col s12 m6">
                            <div class="input-field">
                                <input id="patient_id_${id}" value="${id}" type="text" required />
                                <label for="patient_id_${id}">DNI:</label>
                            </div>
                        </div>
                        <div class="col s12 m6">
                          
                                <label>Credit Plan:</label>
                                <form>
                                    <input id="patient_plan_yes${id}" type="radio"  name="patient_plan_${id}" value="true" ${(creditPlan == "true") ? 'checked' : ''} >
                                    <label for="patient_plan_yes${id}" >si</label>
                                    <input id="patient_plan_no${id}" type="radio"  name="patient_plan_${id}" value="false" ${(creditPlan == "false") ? 'checked' : ''} >
                                    <label for="patient_plan_no${id}">no</label>
                                </form>
                           
                        </div>

                        <div class="col s12 m6">
                            <label>Estatus:</label>
                            <form>
                                <input id="statusActive_${id}" type="radio"  name="status_${id}" value="active" ${(status == "active") ? 'checked' : ''} >
                                <label for="statusActive_${id}" >Activa</label>
                                <input id="statusInActive_${id}" type="radio"  name="status_${id}" value="inactive" ${(status == "inactive") ? 'checked' : ''}>
                                <label for="statusInActive_${id}">Inactiva</label>
                                <input id="statusStandBy_${id}" type="radio"  name="status_${id}" value="standby" ${(status == "standby") ? 'checked' : ''}>
                                <label  for="statusStandBy_${id}">En espera</label>
                            </form>
                        </div>
                        <div class="div-btnInicioSesion">
                            <a  onclick="updatePatient('${id}')" class="btn waves-effect waves-light">Guardar<i class="material-icons left">create</i></a>
                        </div>
                    </div>
                </div>

            </div>
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

function updatePatient(pid) {
    var patient = new Paciente();
    var name = $('#patient_name_' + pid).val();
    var surname1 = $('#patient_surname1_' + pid).val();
    var surname2 = $('#patient_surname2_' + pid).val();
    var phone_number = $('#patient_phone_' + pid).val();
    var address = $('#patient_address_' + pid).val();
    var email = $('#patient_email_' + pid).val();
    var id = $('#patient_id_' + pid).val();
    var is_credit_plan = $("input[name='patient_plan_" + pid + "']:checked").val();
    var status = $("input[name='status_" + pid + "']:checked").val();

    var result = patient.updatePatientShortDetails(
        name,
        surname1,
        surname2,
        email,
        address,
        phone_number,
        id,
        is_credit_plan,
        status);
    if (result) {
        patient.showPacienteAll();
    }
}