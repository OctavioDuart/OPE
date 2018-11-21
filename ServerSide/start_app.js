const express = require ('express');
const bodyParser = require ('body-parser');
const cors = require ('cors');
const port = process.env.PORT || 8000;
const log_database = require ('./database/db_connection');
const app = express(); 


app.use(cors({origin : 'http://127.0.0.1:5500'}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended : true}));

require('./src/routes/candidate')(app);

app.listen(port , function () {
    console.log("Application running in port : " , port);
});