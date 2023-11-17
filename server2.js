const express = require('express');
const app = express();
const mysql = require('mysql2');
const bodyParser = require('body-parser');

console.log("server started");

app.use(bodyParser.json());
app.use(express.static(__dirname));

const port = 3000;


const con = mysql.createConnection({
    host: "localhost",
    user: "user1",
    password: "pswd123",
    database: "user"
});

con.connect(function (err) {
    if (err) throw err;
    console.log("Connected!");
});

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/basictodo/index.html');
});
function generate()
{
    let a=[]
    for(let i=0;i<6;i++)
    {
         a[i]=Math.floor(Math.random()*10);

    }
    let sixcode=a.join('')
    return sixcode;
}

app.post('/send', (req, res) => {
    let msg = req.body.msg;
    let sendcode=generate();
    console.log("message received from server:", msg);
    console.log("unique code generated by the server:", sendcode);

    const sql = "INSERT INTO hypersend (id, message) VALUES (?, ?)";

    con.query(sql, [sendcode, msg], (err, result) => {
        if (err) {
            console.error('Error executing query:', err);
            res.status(500).send('code already in use');
            return;
        }
        console.log("1 record inserted", result);
        
    });
    
    res.send(sendcode);
});
function deletemsg(id)
{
    const sql="delete from hypersend where id=?";
    con.query(sql,[id],(err,result)=>{
        if(err)
        {
            console.error('Error executing query:', err);
            res.status(500).send('Internal Server Error');
            return;
        }
        console.log(`message with ${id} is deleted`);
        

    })
}
app.get('/getdata',(req,res)=>{
    let unqcode=req.query.code;
    const sql="select  message from hypersend where id=?";
    con.query(sql,[unqcode],(err,result)=>{
        if(result[0]){
        let val=result[0].message;
        console.log(result[0]);
        res.send(val);
        deletemsg(unqcode);
        }
        else{
            
                console.error('Error executing query:');
                res.send("invalid code!!!");
                return;
            
        }
        
       

    })
    
})

app.listen(port, () => {
    console.log("server listening on port:", port);
});
