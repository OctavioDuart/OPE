(function (){
    angular
    .module('myApp' , [])
    .controller('myCtrlList' , myCtrlList)

    function myCtrlList ($http) {
        var vm = this ; 

        init() ;
        vm.deleteCandidate = deleteCandidate

        function init () { 
            $http({
                method: "GET",
                url : 'http://localhost:8000/get/all/candidates'
            }).then(
                function (response) {
                    if (response.status === 200 ) {
                        vm.result = response.data;
                        for (var i = 0 ; i < vm.result.length ; i++) {
                            if (vm.result[i].pcd.answer == false ) {
                                vm.result[i].pcd.answer = "Não"
                            }else {
                                vm.result[i].pcd.answer = "Sim"
                            }
                        }
                    }else {
                        alert("Erro ao consultar candidatos ! . ")
                    }
                }
            )
        }


        function deleteCandidate (id) {
           $http({
               method: "DELETE",
               url : 'http://localhost:8000/delete/candidate/' + id
           }).then(
               function (response) {
                   if (response.status === 200 ) {
                       alert ("Candidato deletado com sucesso");
                       init()
                   }else {
                       alert ("Erro ao deletar candidato")
                   }
               }
           )
        }
    }
})();