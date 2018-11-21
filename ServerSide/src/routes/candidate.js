const express = require ('express');
const router = express.Router();
const promise = require ('bluebird');
const model_candidate = require ('../../models/candidate');



router.post('/send/candidate' , function (req , res ) {
    return promise.try(promiseSendDataForDatabase)
           .then(promiseReturn)
           .catch(promiseError)

    function promiseSendDataForDatabase() {
          if (req.body.pcd.answer == "Não") {
                req.body.pcd.answer = false ;
          }else{
            req.body.pcd.answer = true ; 
          }
          const candidate_model = new model_candidate(req.body);
          candidate_model.save();
    }
    function promiseReturn(result){
        return res.status(200).send(true);
    }

    function promiseError(ex) {
        return res.status(500).send("Error in API ==> " , ex.message) ;
    }
});

router.get('/get/all/candidates' , function (req , res ) {
    return promise.try(promiseGetCandidates)
                  .then(promiseReturn)
                  .catch(promiseError) 

    function promiseGetCandidates () { 
            return model_candidate.find() ; 
    }

    function promiseReturn (result) {
        return res.status(200).send(result)
    }

    function promiseError (ex) {
        return res.status(500).send("Error in API ==> " , ex.message)
    }
})

router.delete('/delete/candidate/:id' , function (req , res ) {
    return promise.try(promiseDeleteCandidate)
                  .then(promiseReturn) 
                  .catch(promiseError)

    function promiseDeleteCandidate () {
        var idCandidate = req.params.id ; 

        model_candidate.findByIdAndDelete(idCandidate , function (err) {
            if (err) 
                return false;
        })

        return true;
    };

    function promiseReturn (result) {
        if (result === true) {
            return res.status(200).send(result);
        }
    }

    function promiseError (ex) {
        return res.status(500).send("Error in API ==> " , ex.message);
    }
})

router.get('/filter/candidate/:id' , function (req , res) {
    return promise.try(promiseGetCandidate)
                  .then(promiseReturnData)
                  .catch(promiseError)
     
    function promiseGetCandidate () {
        var id = req.params; 
        return model_candidate.findById(id.id)
    }

    function promiseReturnData (result) {
        if (result === undefined || result === null || result.length === 0 ) {           
            return res.status(200).send(false);
        }else{
            return res.status(200).send(result);
        }
    }

    function promiseError (ex) {
        return res.status(500).send("Error in API ==> " , ex.message)
    }

    
});

router.put("/update/candidate/:id" , function (req , res ) {
        return promise.try(promiseUpdateCandidate)
                      .then(promiseReturn)
                      .catch(promiseError)
    
        function  promiseUpdateCandidate () {
                if (req.body.pcd.answer == "Não") {
                        req.body.pcd.answer = false ;
                }else{
                    req.body.pcd.answer = true ; 
                }
              return model_candidate.findByIdAndUpdate(req.params.id , req.body   )
        }

        function promiseReturn (result) {
            return res.status(200).send(true);
        }

        function promiseError (ex) {
            return res.status(500).send("Error in API ==> " , ex.message)
        }
})


module.exports = app => app.use('/' , router); 