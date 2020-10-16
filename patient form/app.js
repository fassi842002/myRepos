var express = require("express");
var app = express();
var formidable = require("formidable");
var fs = require("fs");

app.use(express.static(__dirname + "/public"));
app.get("/", function(request, response) {
    response.redirect("patient.html");
    response.send();
});

app.post("/thanks", function(request, response) {
    var form = new formidable.IncomingForm();
    form.parse(request, function(err, fields) {
        var person = {
            firstName: fields.firstName,
            lastName: fields.lastName,
            gender: fields.gender,
            age: fields.age,
            childeren: fields.childeren
        };
                // hier voeg ik hele name in
        person.name = person.firstName + ' ' + person.lastName;
                // hier hij pakt data van json file
        var old = fs.readFileSync("public/json/patients-data.json");
        var oldData = JSON.parse(old)
                // hier voeg ik new data in oude data
        function newPatient(){
            oldData.push(person)
            return  JSON.stringify(oldData, null, 2)
        }
        fs.writeFileSync("public/json/patients-data.json", newPatient());
        response.writeHead(200, { "content-type": "text/html" });
        response.end("request recieved from " + person.name);
    });
});

var port = 2000;
app.listen(port);
console.log("Listening at port: " + port);
