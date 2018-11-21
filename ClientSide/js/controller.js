(function (){
    angular
    .module('myApp', [])
    .controller('myCtrl' ,  myCtrl)

    function myCtrl ($http) {
        var vm = this ; 

        vm.sendData = sendData ;


       
        function sendData (personalData , contactData , documents ,  pcd  ) {
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
                method : "POST",
                url    : 'http://localhost:8000/send/candidate' ,
                data   : dataForAPI 
            }).then(
                function (response) {
                    if (response.status === 200 ) {
                        alert ("Dados cadastrados com sucesso")
                        vm.model = undefined
                        vm.contacts = undefined
                        vm.documents = undefined
                        vm.pcd = undefined
                    }else{ 
                        alert("Erro no cadastro de dados ")
                    }
                }
            )
        }

       
    }
})();