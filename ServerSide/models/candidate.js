const mongoose = require ('../database/db_connection');

const model = new mongoose.Schema({
    name :           {type :  String ,  required : true , trim : true},
    name_tratament : {type :  String ,  required : true , trim : true},
    date_born      : {type :  Date   ,  required : true , trim : true},
    sex            : {type :  String ,  required : true , trim : true},
    documents : {
        rg         : {type :  String ,  required : true , trim : true , unique : true},
        cpf        : {type :  String ,  required : true , trim : true , unique : true},
        work_number: {type :  String ,  required : true , trim : true , unique : true}
    },
    schooling      : {type :  String ,  required : true , trim : true},
    study_area     : {type :  String ,  required : true , trim : true},    
    contacts : {
        email      : {type : String , required : true , unique : true },
        number     : {type : String , required : false}
    },
    pcd : {
        answer     :{type : Boolean , required : true},
    }
});

module.exports = mongoose.model('candidate' , model);