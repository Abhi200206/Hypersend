const express=require('express');
const app=express();
const body=require('body-parser');
port=5000;
let msg="";
let code="";
console.log("server started");
app.use(body.json())
app.use(express.static(__dirname));
app.get('/',(req,res)=>{
    res.send(__dirname +'/basictodo/index.html')
})
app.post('/send',(req,res)=>{
    msg=req.body.msg;
    code=req.body.unqcode;
    console.log("message recived from server: ",msg);
    console.log("unique code received from server : ",code);
})
app.get('/getdata',(req,res)=>{
    let unqcode=req.query.code;
    console.log("unqcode from get btn: ",unqcode);
    if(unqcode==code)
    {
        console.log("accepted: ",msg)

        res.send(msg);
    }
    else{
        res.send("Error 404 not found")
    }

})
app.listen(port,()=>{
    console.log("server listening on port 5000")
})