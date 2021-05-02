const verificationReserve = () => {
    var settings = {
        "url": "https://heikhal-shlomo-ad2397.appdrag.site/api/recupereration",
        "data": {
            "reserve": "1",
            "AD_PageNbr": "1",
            "AD_PageSize": "500"
        },
        "method": "GET",
        "async": true,
        "crossDomain": true,
        "processData": true
    };
    $.ajax(settings).done(function (response) {
        console.log(response)
        for (const i of response.Table) {
            if (document.getElementById(i.parasha) != null) {
                document.getElementById(i.parasha).className += ' disable'
                document.querySelector('.disable').removeAttribute("onclick");
                document.querySelector('.disable').style.cursor = 'default !important'
            }
            if (document.getElementById(i.parasha + 'R') != null) {
                document.getElementById(i.parasha + 'R').className += ' disable'
                document.querySelector('.disable').removeAttribute("onclick");
                document.querySelector('.disable').style.cursor = 'default !important'
            }
        }
    });

}


verificationReserve();

function openForm(parasha) {
    document.querySelector('.Cinterieur').style.display = 'none'
    document.querySelector('.Rinterieur').style.display = 'none'
    document.querySelector(".computer").innerHTML += `
                        <div class="row justify-content-center ">
                            <div class="col-5 ">
                                <div class="m-4 mt-5 text-center" id='seferShemot'>
                                    <h2>Parashat ${parasha}</h2>
                                    <input type="firstname" name="prenom" placeholder="Prénom"
                                        class="prenom inputBC">
                                    <input type="lastname" name="nom" placeholder="Nom"
                                        class="nom inputBC">
                                    <input type="tel" name="telephone"
                                        placeholder="N° de Téléphone" class="telephone inputBC">
                                    <input type="mail" name="email" placeholder="E-mail"
                                        class="email inputBC">
                                </div>
                            </div>
                            <div class="col-5">
                                <div class="m-3 mt-5 ml-5 text-center" id='seferShemot'>
                                    <textarea name="nomsLNRS"
                                        placeholder="Noms Pour Refoua Shelema ou Le'eylouy Nishmat"
                                        class="inputLN inputBC"></textarea>
                                    <textarea placeholder="Rédigez votre message ..."
                                        class="inputMSG inputBC mt-5"></textarea>
                                    <div type="submit" class="submitBtn">Reserver votre Parasha
                                    </div>
                                </div>
                            </div>
                        </div>
                        `
        document.querySelector(".iphone").innerHTML += `
                        <div class="container mt-2 pt-1 text-center">
                            <div class="row justify-content-center " >
                                <div class="m-4 mt-5 text-center" id='seferShemot'>
                                    <h2>Parashat ${parasha.substring(0, parasha.length - 1)}</h2>
                                    <input type="firstname" name="prenom" placeholder="Prénom"
                                        class="prenom inputBC">
                                    <input type="lastname" name="nom" placeholder="Nom" class="nom inputBC">
                                    <input type="tel" name="telephone" placeholder="N° de Téléphone"
                                        class="telephone inputBC">
                                    <input type="mail" name="email" placeholder="E-mail" class="email inputBC">
                                    <textarea name="nomsLNRS"
                                        placeholder="Noms Pour Refoua Shelema ou Le'eylouy Nishmat"
                                        class="inputLN inputBC"></textarea>
                                    <textarea name="message" placeholder="Rédigez votre message ..."
                                        class="inputMSG inputBC"></textarea>
                                    <div type="submit" class="submitBtn">Reserver votre Parasha</div>
                                </div>
                            </div>
                        </div>
    `
    
    





    document.getElementById('submitBtn').addEventListener('click', (e) => { e.preventDefault; verif(parasha) })
}

const verif = async (parasha) => {
    var settings = {
        "url": "https://heikhal-shlomo-ad2397.appdrag.site/api/Verification",
        "data": {
            "parasha": parasha,
            "AD_PageNbr": "1",
            "AD_PageSize": "500"
        },
        "method": "GET",
        "async": true,
        "crossDomain": true,
        "processData": true
    };
    await $.ajax(settings).done(function (response) {
        if (response.Table[0].reserve === 0) {
            var settings = {
                "url": "https://heikhal-shlomo-ad2397.appdrag.site/api/reservationParasha",
                "data": {
                    "prenom": document.getElementById('prenom').value,
                    "nom": document.getElementById('nom').value,
                    "telephone": document.getElementById('telephone').value,
                    "email": document.getElementById('email').value,
                    "nomsLNRS": document.getElementById('inputLN').value,
                    "message": document.getElementById('inputMSG').value,
                    "parasha": parasha
                },
                "method": "POST",
                "async": true,
                "crossDomain": true,
                "processData": true
            };
            $.ajax(settings).done(function (response) {
                if (response.status == "OK") {
                    document.querySelector('.livre').style.display = 'flex';
                    document.querySelector('.form').style.display = 'none'
                    document.querySelector("#alert").innerHTML = `<div class="alert success">
        <span class="closebtn" onclick="this.parentElement.style.display='none';">&times;</span> 
        <strong>Success!</strong> Vous venez de Reserver la Parasha ${parasha} ! Vous allez recevoir un mail de confirmation.
      </div>`
            document.getElementById(parasha).className += ' disable'
                }

            });
        } else {
            document.querySelector('.livre').style.display = 'flex';
            document.querySelector('.form').style.display = 'none'
            document.querySelector("#alert").innerHTML = `<div class="alert">
        <span class="closebtn" onclick="this.parentElement.style.display='none';">&times;</span> 
        <strong>Attention!</strong> Cette Parasha a déjà été réservée. Veuillez en choisir une autre
      </div>`
        }
    });

}



