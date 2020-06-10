const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const app = express();
const https = require("https");


app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

app.get("/", function(req,res){
   res.sendFile(__dirname + "/signup.html");
});

app.post("/", function(req, res){
   const fn = req.body.firstname;
   const ln = req.body.lastname;
   const mail = req.body.email;
   
   const data={
   	 members:[
       { 
       		email_address: mail,
       		status: "subscribed",
       		merge_fields:{
       			FNAME: fn,
       			LNAME: ln
       		}
       }
   	 ]
   };

   const jsonData = JSON.stringify(data);

   const url ="https://us10.api.mailchimp.com/3.0/lists/a5ba759e25";

   const options={
   	method: "POST",
   	auth: "vigneshkrishna:caec1b2ee157bda366ad2d7b731cf9b6-us10"
   };

  const request =  https.request(url, options, function(response){
   		
   		if (response.statusCode === 200) {
   			res.sendFile(__dirname + "/success.html");
   		}
   		else{
   			res.sendFile(__dirname + "/failure.html");
   		}

   		response.on("data", function(data){

   			console.log(JSON.parse(data));
   		})
   })

request.write(jsonData);
request.end();
});

app.post("/failure", function(req, res){
	res.redirect("/");
})



app.listen(process.env.PORT || 3000, function(){
   console.log("Server started on port 3000");
});

// API Key
// caec1b2ee157bda366ad2d7b731cf9b6-us10

// List ID
// a5ba759e25