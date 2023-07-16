//this is the app 
const express= require("express");
const bodyParser=require("body-parser");
const request=require("request");
const https=require("https");
const app=express();
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:true}));
app.get("/",function(req,res){
    res.sendFile(__dirname+"/signup.html");
});

app.post("/",function(req,res){
    var firstname=req.body.fname;
    var lastname=req.body.lname;
    var email=req.body.email;

    var data={
        members:[
            {
                email_address:email,
                status:"subscribed",
                merge_fields: {
                    FNAME:firstname,
                    LNAME:lastname
                }
            }
        ]
    };
    var jsonData=JSON.stringify(data)

    console.log(firstname,lastname,email);

    const url="https://us8.api.mailchimp.com/3.0/lists/b219cc6cd5";
    const options={
        method:"POST",
        auth:"anshu1:f0add576b1ada065d41466c9cb48fcc8-us8"
    }

    const request=https.request(url,options,function(response){
        if(response.statusCode ===200){
            res.sendFile(__dirname+"/success.html");
        }
        else{
            res.sendFile(__dirname+"/failure.html")
        }
        response.on("data",function(data){
            console.log(JSON.parse(data));
        })
    })
    request.write(jsonData);
    request.end();



})
app.post("/failure",function(req,res){
    res.redirect("/");
})
app.listen(process.env.PORT || 3000,function(){
    console.log("I am ON")

})

//api key f0add576b1ada065d41466c9cb48fcc8-us8

//list id b219cc6cd5


