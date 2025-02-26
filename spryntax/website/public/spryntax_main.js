let displaycode =
  typeof DATA_LEVEL !== "undefined"
    ? DATA_LEVEL["lines"]
    : '#include\u0020<iostream>↵using namespace std;↵↵int main(){↵→cout << "this is more annoying than it looks";↵→return 0;↵}';

//Define a progress object
let progress = {
  starttime: null,
  errors: 0,
  lbreaks: 0, //Count for linebreaks
  pasted: false,
  lines: [],
};

function validate() {
  if (progress.starttime == null) {
    //Set the user's time
    progress.starttime = Date.now();
  }
  let typed = [],
    typedlines = [],
    storedline = [];
  let total = 0,
    lb = 0,
    spans = 0,
    correct = 0;
  for (let tchar of $("#main_front").val()) {
    //Get all typed characters by line
    storedline.push(tchar);
    typed.push("#main_" + total);
    if (tchar == "\n") {
      typedlines.push(storedline);
      storedline = [];
      lb++;
    }
    total++;
  }
  typedlines.push(storedline);
  for (let currline = 0; currline < progress.lines.length; currline++) {
    for (let dchar_i in progress.lines[currline]) {
      // For each character in displayed line
      let innerchar = $(progress.lines[currline][dchar_i]);
      let tchar = typedlines[currline];
      if (tchar != null) {
        tchar = tchar[dchar_i];
      } else {
        if (innerchar.hasClass("span_incorrect")) {
          innerchar.removeClass("span_incorrect");
          progress.errors++;
        }
        if (innerchar.hasClass("span_correct")) {
          innerchar.removeClass("span_correct");
        }
        continue;
      }
      if (tchar != null) {
        if (tchar == innerchar.text()) {
          if (innerchar.hasClass("span_incorrect")) {
            innerchar.removeClass("span_incorrect");
            progress.errors++;
          }
          innerchar.addClass("span_correct");
        } else {
          if (
            (innerchar.hasClass("space") && tchar == " ") ||
            (innerchar.hasClass("tab") && tchar == "\t") ||
            (innerchar.hasClass("lbreak") && tchar == "\n")
          ) {
            if (innerchar.hasClass("span_incorrect")) {
              innerchar.removeClass("span_incorrect");
              progress.errors++;
            }
            innerchar.addClass("span_correct");
          } else {
            if (innerchar.hasClass("span_correct")) {
              innerchar.removeClass("span_correct");
            }
            innerchar.addClass("span_incorrect");
          }
        }
      }
    }
  }
  $(".span").each(function (index, element) {
    //Select all spans in the font
    let span = $("#main_" + index);
    spans++;
    if (span.hasClass("span_correct")) {
      //Count correct classes
      correct++;
    }
  });
  if (typedlines.length - 1 > progress.lbreaks) {
    // If the number of lines in the input is more than the expected amount
    let trimmed = "";
    for (fixedline in typedlines) {
      if (fixedline < progress.lbreaks) {
        for (fixedchar of typedlines[fixedline]) {
          trimmed += fixedchar;
        }
      }
    }
    $("#main_front").val(trimmed);
    validate(); //Call the validation function again
    return;
  }
  if (total == spans && spans == correct) {
    //If the number of correct characters matches the number of expected characters
    $("#main_front").attr("disabled", true);
    $("#wincheck").attr("hidden", false);
    let displaywin = $("#wincheck").html() + "<br>";
    let diff = Date.now() - progress.starttime;
    displaywin +=
      Math.floor(diff / 1000 / 60 / 60) +
      ":" +
      String(Math.floor(diff / 1000 / 60)).padStart(2, "0") +
      ":" +
      diff / 1000 +
      "<br>";
    displaywin += progress.errors + " error";
    if (progress.errors != 1) {
      displaywin += "s"; //Add S for plurality
    }
    displaywin += "<br>" + spans + " characters<br>";
    displaywin +=
      (Math.round(spans / 5) / (diff / 1000 / 60)).toFixed(2) +
      " WPM, " +
      (spans / (diff / 1000)).toFixed(2) +
      " CPS";
    if (progress.pasted) {
      displaywin += "<br><b>Use of Pasting Detected.</b>";
      $("#wincheck").addClass("lose");
    }
    $("#wincheck").html(displaywin);
  }
}

$(document).ready(function () {
  //JS fun fact: whitespaces are read as a null terminator!
  displaycode = displaycode.replaceAll("\u0085", "↵"); //Line break
  displaycode = displaycode.replaceAll("\u0009", "→"); //Tab
  let spannedcode = "";
  let insertlines = [];
  for (char in displaycode) {
    insertlines.push("#main_" + char);
    if (displaycode[char] == "↵") {
      spannedcode +=
        '<span class="span noselect lbreak" id="main_' + char + '"></span><br>';
      progress.lines.push(insertlines);
      progress.lbreaks++;
      insertlines = [];
      continue;
    } else if (displaycode[char] == "→") {
      spannedcode +=
        '<span class="span noselect tab" id="main_' +
        char +
        '">' +
        "&emsp;</span>";
    } else if (displaycode[char] == "\u0020") {
      spannedcode +=
        '<span class="span noselect space" id="main_' +
        char +
        '">' +
        "&ensp;</span>";
    } else {
      spannedcode +=
        '<span class="span noselect" id="main_' +
        char +
        '">' +
        displaycode[char] +
        "</span>";
    }
  }
  progress.lines.push(insertlines);
  let testing = false;
  if (testing) {
    //Show code to paste.
    displaycode = displaycode.replaceAll("⎵", "\u0020"); //Spaces
    displaycode = displaycode.replaceAll("↵", "\u0085"); //Line break
    displaycode = displaycode.replaceAll("→", "\u0009"); //Tab
    let testline = "";
    for (testchar of displaycode) {
      if (testchar == "\u0085") {
        testline += "\n";
      } else {
        testline += testchar;
      }
    }
    console.log(testline);
  }
  $("#main_body").html(spannedcode);
  $("#main_back").on("keydown", "#main_front", function (e) {
    var keycode = e.keycode || e.which;
    if (keycode == 9) {
      //specific to tab
      $("#main_front").val($("#main_front").val() + "\t");
      e.preventDefault();
      validate();
    }
  });
  $("#main_front").on("paste", function () {
    progress.pasted = true;
  });
  $("#main_front").on("input", function () {
    validate();
  });
});
