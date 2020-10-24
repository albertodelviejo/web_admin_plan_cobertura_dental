class Cita {
    constructor() {
        this.db = firebase.firestore()
    }

    createCita(concept, idPaciente, date) {

        var docRef = this.db.collection("citas").doc();
        docRef.set({
            concept: concept,
            idPaciente: idPaciente,
            date: date
        }).then(refDoc => {
            // console.log(`Id de clinica => ${refDoc.cif}`)
            Materialize.toast(`Cita añadida correctamente`, 4000)
            $('.modal').modal('close')
        }).catch(error => {
            console.log(`Error de alta => ${error}`)
            Materialize.toast(`Error de alta`, 4000)
            $('.modal').modal('close')
        })
    }

    showModalAlta() {
        $('#modalNuevaCita').modal('open')
    }
}