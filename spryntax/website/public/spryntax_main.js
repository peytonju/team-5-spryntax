let displaycode = (typeof DATA_LEVEL) !== "undefined" ? DATA_LEVEL["lines"] : "#include\u0020<iostream>↵using namespace std;↵↵int main(){↵→cout << \"this is more annoying than it looks\";↵→return 0;↵}";

//Define a progress object
let progress = {
    "starttime": null,
    "errors": 0,
    "lbreaks": 0, //Count for linebreaks
    "pasted": false
};

function validate(){
    if (progress.starttime == null){ //Set the user's time
        progress.starttime = Date.now();
    }
    let i = 0, j = 0, l = 0;
    let typed = [];
    for (char of $("#main_front").val()){ //Go through the input values
        let innerchar = $("#main_"+i);
        if (char == innerchar.text()){ //Condition when the input at position matches the exact character
            if (innerchar.hasClass("span_incorrect")){
                innerchar.removeClass("span_incorrect");
            }
            innerchar.addClass("span_correct");
        } else {
            if ((innerchar.hasClass("space")&&char == " ")||
            (innerchar.hasClass("tab")&&char == "\t")||
            (innerchar.hasClass("lbreak")&&char=="\n")){
                if (innerchar.hasClass("span_incorrect")){
                    innerchar.removeClass("span_incorrect");
                    progress.errors++;
                }
                innerchar.addClass("span_correct");
            } else {
                if (innerchar.hasClass("span_correct")){
                    innerchar.removeClass("span_correct");
                }
                innerchar.addClass("span_incorrect");
            }
        }
        typed.push("main_"+i);
        if(char == "\n"){ 
            j++;
        }
        i++;
    }
    i = 0;
    $(".span").each(function(index,element){ //Select all spans in the font
        let span = $("#main_"+index);
        l++;
        if (!typed.includes("main_"+index)){ //User pressed backspace
            if (span.hasClass("span_correct")){
                span.removeClass("span_correct");
            }
            if (span.hasClass("span_incorrect")){
                span.removeClass("span_incorrect");
                progress.errors++;
            }
        } else {
            if (span.hasClass("span_correct")){ //Count correct classes
                i++;
            }
        }
    })
    if (j > progress.lbreaks){ // If the number of lines in the input is more than the expected amount
        let trimmed = "";
        console.log(j,progress.lbreaks);
        let k = progress.lbreaks;
        for (index in $("#main_front").val()){ //Access the user input
            if ($("#main_front").val()[index] == "\n"){ //Removes everything after the extra enter
                k--;
            }
            trimmed += $("#main_front").val()[index];
            if (k == 0){
                break;
            }
        }
        $("#main_front").val(trimmed);
        validate(); //Call the validation function again
        return;
    }
    if (i==l){ //If the number of correct characters matches the number of expected characters
        $("#main_front").attr("disabled", true);
        $("#wincheck").attr("hidden", false);
        let displaywin = $("#wincheck").html() + "<br>"; 
        let diff = (Date.now() - progress.starttime);
        displaywin += Math.floor(diff/1000/60/60) + ":" + String(Math.floor(diff/1000/60)).padStart(2, '0') + ":" + (diff/1000) + "<br>";
        displaywin += (progress.errors) + " error";
        if (progress.errors != 1){
            displaywin += "s"; //Add S for plurality
        }
        displaywin += "<br>"+ l + " characters<br>";
        displaywin += (Math.round(l/5)/(diff/1000/60)).toFixed(2) + " WPM, " + (l/(diff/1000)).toFixed(2) + " CPS";
        $("#wincheck").html(displaywin);
    }
}

$(document).ready(function(){
    //JS fun fact: whitespaces are read as a null terminator!
    displaycode.replaceAll("\u0020","⎵"); //Spaces
    displaycode.replaceAll("\u0085","↵") //Line break
    displaycode.replaceAll("\u0009","→") //Tab
    let spannedcode = "";
    for (char in displaycode){
        if (displaycode[char] == '↵'){
            spannedcode += '<span class="span noselect lbreak" hidden id="main_' + char +'"></span><br class="noselect">';
            progress.lbreaks++;
        } else if (displaycode[char] == '→') {
            spannedcode += '<span class="span noselect tab" id="main_' + char +'">'+'&emsp;</span>';
        } else if (displaycode[char] == '\u0020') {
            spannedcode += '<span class="span noselect space" id="main_' + char +'">'+'&ensp;</span>'; 
        } else {
            spannedcode += '<span class="span noselect" id="main_' + char +'">' + displaycode[char] + '</span>';
        }
    }
    $("#main_body").html(spannedcode);
    $("#main_back").on("keydown", "#main_front", function(e){
        var keycode = e.keycode || e.which;
        if (keycode == 9){ //specific to tab
            $("#main_front").val($("#main_front").val() + "\t");
            e.preventDefault();
            validate();
        }
    });
    $("#main_front").on("input", function(){
        validate();
    })
});