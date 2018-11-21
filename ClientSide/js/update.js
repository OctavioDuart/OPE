(function (){
    angular
    .module('myApp' , [])
    .controller('myCtrlUpdate' , myCtrlUpdate)

    function myCtrlUpdate ($http) {
        var vm = this ; 
        vm.conditional = false;
        vm.updateData = updateData ; 
        vm.srcCandidateForUpdate = srcCandidateForUpdate

       function updateData (idCandidate , personalData , contactData , documents ,  pcd ) {
                 const dataForAPI = {
                    name : personalData.name,
                    name_tratament : personalData.name_tratament,
                    date_born : personalData.date_born,
                    sex : personalData.sex,
                    documents : documents,
                    schooling : personalData.schooling,
                    contacts : contactData  ,
                    pcd : pcd ,
                    study_area : personalData.study_area
                }
                $http({
                    method: "PUT",
                    url   : 'http://localhost:8000/update/candidate/' + idCandidate,
                    data : dataForAPI
                }).then(
                    function  (response) {
                            if (response.status == 200 && response.data == true ) {
                                alert ("Dados alterados ")
                                vm.conditional = true ; 
                            }else {
                                alert("Erro ao alterar dados")
                            }
                    }
                )
             }
       

       function srcCandidateForUpdate (idCandidate) {
            vm.conditional  = false ; 
            if (idCandidate == null || idCandidate == false || idCandidate == '') {
                return alert("Preencha o campo ID");
            }else {
                $http({
                    method: "GET",
                    url: 'http://localhost:8000/filter/candidate/' + idCandidate
                }).then(
                    function (response) {
                        if (response.status == 200 && response.data !== false) {
                            vm.model = {};
                            vm.documents = {}; 
                            vm.contacts = {};
                            vm.pcd = {};

                            vm.model.name = response.data.name;
                            vm.model.name_tratament = response.data.name_tratament;
                            vm.model.sex = response.data.sex;
                            vm.model.schooling = response.data.schooling;
                            vm.model.study_area = response.data.study_area;                               

                            vm.documents.rg = response.data.documents.rg;
                            vm.documents.cpf = response.data.documents.cpf;
                            vm.documents.work_number = response.data.documents.work_number;

                            vm.contacts.email = response.data.contacts.email;
                            vm.contacts.number = response.data.contacts.number;

                             if (response.data.pcd.answer == false){
                                vm.pcd.answer = "Não"
                            }else{
                                vm.pcd.answer = "Sim"
                            }
                            vm.conditional = true ;
                        }
                         else if (response.data == 200 && response.data == false) {
                             alert("Não há candidatos com esse  ID")
                             vm.conditional = false; 
                         }else{
                             alert("Erro ao consultar"); 
                             vm.conditional = false; 
                         }
                    }
                )
            }
       }
    }
})();