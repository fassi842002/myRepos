/// <reference path="jquery-3.4.1.js"/>

$("#btnChk").click(function() {
    var patientNr = document.getElementById("patientNr");
    var xhr = new XMLHttpRequest();
    xhr.open("GET", "json/patients-data.json");
    var patientsData;
    var person;
    xhr.onload = function() {
        patientsData = JSON.parse(xhr.responseText);
        console.log(patientsData);
        if (patientNr.value == "") {
            $("#info").html("first you have to the enter patient number");
        } else if (patientsData[0] == undefined) {
            $("#info").html("There is not Patient yet");
        } else {
            let patientId = Number(patientNr.value) - 1;
            if (patientNr.value > patientsData.length || patientNr.value < 1) {
                $("#info").html(
                    "there are only " + patientsData.length + " patient(s)"
                );
            } else {
                if (patientsData[patientId].gender == "female") {
                    person = "she";
                } else {
                    person = "he";
                }
                console.log(patientId);
                $("#info").html(
                    "Patient is name is " +
                        patientsData[patientId].name +
                        " and " +
                        person +
                        " is " +
                        patientsData[patientId].age +
                        " year old"
                );
            }
        }
    };

    xhr.send();
});
