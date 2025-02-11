let displaycode = '#include\u0020<iostream>↵using namespace std;↵↵int main(){↵→cout << "this is more annoying than it looks";↵→return 0;↵}'

function validate(){
    let i = 0, j = 0, k = 0, l = 0;
    let typed = [];
    for (char of $("#main_front").val()){
        let innerchar = $("#main_"+i);
        if (char == innerchar.text()){
            if (innerchar.hasClass("span_incorrect")){
                innerchar.removeClass("span_incorrect");
            }
            innerchar.addClass("span_correct");
        } else {
            if ((innerchar.hasClass("space")&&char == " ")||
            (innerchar.hasClass("tab")&&char == "\t")||
            (innerchar.hasClass("break")&&char=="\n")){
                if (innerchar.hasClass("span_incorrect")){
                    innerchar.removeClass("span_incorrect");
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
        if(innerchar.hasClass("break")){
            k++;
        }
        i++;
    }
    i = 0;
    $(".span").each(function(index,element){
        let span = $("#main_"+index);
        l++;
        if (!typed.includes("main_"+index)){
            if (span.hasClass("span_correct")){
                span.removeClass("span_correct");
            }
            if (span.hasClass("span_incorrect")){
                span.removeClass("span_incorrect");
            }
        } else {
            if (span.hasClass("span_correct")){
                i++;
            }
        }
    })
    if (i==l){
        $("#main_front").attr("disabled", true);
        $("#wincheck").attr("hidden", false);
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
            spannedcode += '<span class="span noselect break" hidden id="main_' + char +'"></span><br class="noselect">';
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