const mongoose = require ('mongoose');
mongoose.connect('mongodb://localhost:27017/OpeProject' ,  { useNewUrlParser: true },
                (err) => {
                    if (err) {
                        console.log("Error in connection with database")
                    }else{
                        console.log("Database connected with success ! . ")
                    }
                }
)
mongoose.set('useCreateIndex', true);

module.exports =  mongoose ; 