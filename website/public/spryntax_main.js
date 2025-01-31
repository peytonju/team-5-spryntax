let displaycode = '#include <iostream>↵using namespace std;↵↵int main(){↵→cout << "this is more annoying than it looks";↵→return 0;↵}'

$(document).ready(function(){
    //JS fun fact: whitespaces are read as a null terminator!
    displaycode.replaceAll("\u0020","⎵"); //Spaces
    displaycode.replaceAll("\u0085","↵") //Line break
    displaycode.replaceAll("\u0009","→") //Tab
    let spannedcode = "";
    for (char in displaycode){
        if (displaycode[char] == '↵'){
            spannedcode += '<span id="main_' + char +'">' + displaycode[char] + '</span><br>';
        } else if (displaycode[char] == '→') {
            spannedcode += '<span id="main_' + char +'">'+'&emsp;</span>';
        } else {
            spannedcode += '<span id="main_' + char +'">' + displaycode[char] + '</span>';
        }
    }
    $("#main_body").html(spannedcode);
    $("#main_front").on("input", function(){
        let i = 0;
        for (char of $(this).val()){
            let innerchar = $("#main_"+i);
            if (char == innerchar.text()){
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
            i++;
        }
    })
});