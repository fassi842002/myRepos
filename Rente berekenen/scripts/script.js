var btn = document.getElementById('btn');
btn.onclick = function(){
    var bedrag = Number(document.getElementById("bedrag").value),
    rente = Number(document.getElementById("rente").value),
    maandeRent,
    jaarRente,
    bestedenBedrag = bedrag,
    maandenTemijn = bedrag / 60,
    maandenTemijnMetRent = 0;
    var info = document.getElementById('info');
    if(info.childNodes.length != 0){
        while(info.hasChildNodes()){
        info.removeChild(info.firstChild)
    }
    }

    var totaalJaarRente =0;
    for (let i = 0; i < 5; i++) {
        var chiilN = i
        var infoDiv = document.createElement("div");
        var pInfo = document.createElement('p');
        pInfo.setAttribute("class", "paraInfo")
        infoDiv.setAttribute("class", "infoDiv")
        document.getElementById('info').append(infoDiv)
        document.getElementsByClassName('infoDiv')[chiilN].append(pInfo)

            // per jaar berekenen

        pInfo.innerHTML += "-------------" + (i + 1) + " jaar"+ "-------------" +"<br>"
        jaarRente = (bedrag / 100) * rente;
        totaalJaarRente += jaarRente;
        pInfo.innerHTML +="jaar rente " + Math.round(jaarRente) +"<br>"
        pInfo.innerHTML +="totaal jaar rente " + Math.round(totaalJaarRente) +"<br>"
        pInfo.innerHTML += bedrag + " - " + (maandenTemijn * 12) + " = " +Math.round(bestedenBedrag) + "<br>"
        bedrag -= (maandenTemijn * 12)
        maandeRent = jaarRente / 12;

            // per maand berekenen

        for(let i =0;i<12;i++){
            maandeRent = jaarRente/ 12;
            maandenTemijnMetRent += maandenTemijn + maandeRent;
            pInfo.innerHTML += "---------------------------------<br>";
            pInfo.innerHTML += "---------"+ "Maand Nr " +(i+1) +"---------<br>"
            pInfo.innerHTML += "maandrente: " +Math.round(maandeRent) + "<br>"
            pInfo.innerHTML += "maandtermijn(ex rente): " +Math.round(maandenTemijn) +"<br>"
            pInfo.innerHTML += "Termijn met rente: "+Math.round(maandenTemijn + maandeRent) +"<br>"
            pInfo.innerHTML += "Totaal betaald: "+Math.round(maandenTemijnMetRent) +"<br>"
            bestedenBedrag -= maandenTemijn
            
        }
    }
}