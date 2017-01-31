var upozorenje = {
	kartica: ["Master", "Visa"],
	gotovina: "Prazno polje"
};

var boje = {
	crvena: "red",
	plava: "blue"
};

function provera(forma) {
    var ime = forma.ime.value;
    var prezime = forma.prezime.value;
    var email = forma.email.value;
    
    var flag = false;
    
    if(ime.trim() == "") {
        flag = true;
    }
    
    if(prezime.trim() == "") {
        flag = true;
    }
    
    if(email.trim() == "") {
        flag = true;
    }
    
    
    if (flag) {
        return false;
    } else {
        return true;
    }
}

function selectChecker(polje) {
    if(polje.value == "Kartica") {
        ispisi(upozorenje.kartica, boje.crvena, nacinPlacanja);
    } else if(polje.value == "Gotovina") {
        ispisi(upozorenje.gotovina, boje.plava, nacinPlacanja);
    }
}

function ispisi(upozorenje, boja, callback) {
    callback(upozorenje, boja);
}

function nacinPlacanja(upozorenje, boja) {
    var tip = document.getElementById("select_tip");
    tip.innerHTML = "U selektu Tip molimo odaberite: " + upozorenje;
    tip.style.color = boja;
}

$(document).ready(function() {
    var $select = $("select[name=nacin]");
    $select.change(function() {
        if($(this).val() == "Kartica") {
            var $input = $("<input>");
            $input.attr({
                type: "number",
                name: "code",
                id: "code"
            });
            $input.addClass("form-control");
            var $label = $("<label></label>");
            $label.attr("for", "code");
            $label.text("Validation Code:");
            var $br = $("<br>");
            if($("#code").length === 0) {
                if($("#valuta").length > 0) {
                    $("#valuta").prevUntil("select").remove();
                    $("#valuta").remove();
                }
                $select.after($br, $label, $input);
            }
        } else if($(this).val() == "Gotovina") {
            var $input = $("<input>");
            $input.attr({
                type: "text",
                name: "valuta",
                id: "valuta"
            });
            $input.addClass("form-control");
            var $label = $("<label></label>");
            $label.attr("for", "valuta");
            $label.text("Valuta:");
            var $br = $("<br>");
            if($("#valuta").length === 0) {
                if($("#code").length > 0) {
                    $("#code").prevUntil("select").remove();
                    $("#code").remove();
                }
                $select.after($br, $label, $input);
            }
        }
    })
    
    $("form").on("submit", function() {
        if($("#code").length > 0) {
            if($("#code").val().length !== 3) {
                return false;
            }
        }
        if($("#valuta").length > 0) {
            if($("#valuta").val().length < 2 || $("#valuta").val() !== $("#valuta").val().toUpperCase()) {
                return false;
            }
        }
    })
})