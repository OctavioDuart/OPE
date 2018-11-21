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
                            if (response.data == 200 && response.data == true ) {
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
                        if (response.data == 200 && response.data !== true) {
                            vm.result = response
                            console.log(vm.result);
                        }
                         else if (response.data == 200 && response.data == false) {
                             alert("Não há candidatos com esse  ID")
                         }else{
                             alert("Erro ao consultar")
                         }
                    }
                )
            }
       }
    }
})();