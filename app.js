const express = require('express');
const router = require('./routes/routes');
const port = 3000;
const app = express();

app.use(express.json())

const server = app.listen(port, (error) => {
    if (error) return console.log(`Error: ${error}`);
    console.log(`Server listening on port ${server.address().port}`);
});


const sql = require('mssql');
const config = {
    user: 'SA',
    password: 'quan1612?',
    database: 'Nihongo',
    server: 'localhost',
    options: {
        encrypt: false, // for azure
        trustServerCertificate: false // change to true for local dev / self-signed certs
    }
}


const startUp = async () => {
    try{
        await sql.connect(config);
        const result = await sql.query(`select * from [Words]`); // where [Kanji] like N'%目%'
        const data = result.recordset;
        // console.log(data);
        app.get('/', (req, res)=>{
            res.send(data);
        })
    }
    catch(err){
        console.log(err);
    }
}

startUp()
