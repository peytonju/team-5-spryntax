const assert = require("assert");
const fs = require("fs");

const DIR_WRITE = "levels.json";
const DIR_PREFIX = "algs-";
const CATEGORIES = ["bubblesort", "mergesort", "slink", "dlink", "queue", "insertionsort", "stack", "pattern", "heapsort", "depthfirstsearch","radixsort","knapsackproblem"];
const LANGUAGES = {
    "c": {
        "line": "//",
        "mline": ["/*", "*/"],
        "aline": " * "
    },
    "py": {
        "line": "#",
        "mline": ["'''", "'''"],
        "aline": null
    }
};


function sanity_tests() {
    /* trailing carriages tests */
    assert(remove_trailing_carriages("↵↵↵↵↵↵") == "");
    assert(remove_trailing_carriages("↵") == "");
    assert(remove_trailing_carriages("uy1h49uihsdj124hlasd↵↵↵↵") == "uy1h49uihsdj124hlasd");
    assert(remove_trailing_carriages("") == "");

    /* trailing spaces tests */
    assert(remove_trailing_spaces("        ↵") == "↵");
    assert(remove_trailing_spaces("asdlajsd    ↵") == "asdlajsd↵");
    assert(remove_trailing_spaces(" ↵") == "↵");
    assert(remove_trailing_spaces("    asdf↵") == "    asdf↵");

    /* is_line_fluff tests */
    assert(is_line_fluff("     \r\n\t  ") == true);
    assert(is_line_fluff("    a   ") == false);
    assert(is_line_fluff("asdf") == false);
    assert(is_line_fluff("\r") == true);
    assert(is_line_fluff("") == true);

    /* comment tests */
    /* c */
    assert(is_comment_line("asdf", LANGUAGES["c"]) == 0);
    assert(is_comment_line("//asdf", LANGUAGES["c"]) == 1);
    assert(is_comment_line("/* asdf", LANGUAGES["c"]) == 2);
    assert(is_comment_line("asdf*/", LANGUAGES["c"]) == 3);
    assert(is_comment_line("/*asdf*/", LANGUAGES["c"]) == 1);
    /* py */
    assert(is_comment_line("asdf", LANGUAGES["py"]) == 0);
    assert(is_comment_line("#asdf", LANGUAGES["py"]) == 1);
    assert(is_comment_line("'''asdf", LANGUAGES["py"]) == 2);
    assert(is_comment_line("asdf'''", LANGUAGES["py"]) == 3);
    assert(is_comment_line("'''asdf'''", LANGUAGES["py"]) == 1);

    /* 
     * NOTE about block comments!: 
     *      '''asdf'''asdf
     *          This is a block comment that has a non-comment next to it-- this entire line will be read as a single comment!
     * Not currently an issue with how comments are currently done in the algorithms.
    */
}


function remove_trailing_carriages(line) {
    let new_line = line;
    /* while the last entry is a carriage return, */
    while (new_line[new_line.length - 1] == '↵') {
        /* just keep slicing it */
        new_line = new_line.slice(0, new_line.length - 1);
    }
    return new_line;
}


function remove_trailing_spaces(line) {
    let new_line = line;
    /* while the 2nd-to-last last entry is an empty space, */
    while (new_line[new_line.length - 2] == ' ') {
        /* keep slicing it */
        new_line = new_line.slice(0, new_line.length - 2) + new_line[new_line.length - 1];
    }
    return new_line
}


function is_line_fluff(line) {
    for (char of line) {
        /* if the current character isn't \n, \t, or an empty space, */
        if (char != '\t' && char != '\n' && char != ' ' && char != "\r") {
            /* not a fluff line. */
            return false;
        }
    }
    return true;
}


function lacks_line_return(line) {
    if (line[line.length - 1] != "\r") {
        return true;
    }
    return false;
}


function line_formatter(line) {
    /* if the line is just fluff, just return nothing. */
    if (is_line_fluff(line)) { return "↵"; }

    let new_line = line;
    /* if there's no line return at the end of this, */
    if (lacks_line_return(line)) {
        /* just add it */
        new_line = new_line.concat("↵");
    }

    /* remove trailing spaces */
    new_line = remove_trailing_spaces(new_line);

    /* carriage return */
    new_line = new_line.replaceAll("\r", "↵");

    /* tab */
    new_line = new_line.replaceAll("\t", "→");

    return new_line;
}


function comment_line_formatter(comments, comment_styles) {
    if (comments.length <= 0) { return ""; }

    let leading_tab_count = 0;
    while (comments[0][leading_tab_count] == '\t') {
        leading_tab_count++;
    }

    let comment_str = "";
    for (const LINE of comments) {
        let new_line = LINE;

        /* delete leading tabs */
        new_line = new_line.slice(leading_tab_count);

        if (new_line.indexOf(comment_styles["line"]) == 0) {
            new_line = new_line.slice(comment_styles["line"].length);
        } else if (new_line.indexOf(comment_styles["mline"][0] == 0)) {
            new_line = new_line.slice(comment_styles["mline"][0].length);
        } else if (comment_styles["aline"] && new_line.indexOf(comment_styles["aline"]) == 0) {
            new_line = new_line.slice(comment_styles["aline"].length);
        }
        
        if ((new_line.indexOf(comment_styles["mline"][1]) == (new_line.length - comment_styles["mline"][1].length - 1))) {
            new_line = new_line.slice(0, new_line.length - comment_styles["mline"][1].length - 2) + new_line[new_line.length - 1];
        }

        /* line breaks for carriage returns */
        new_line = new_line.replaceAll("\r", "<br>");

        /* replacement for tabs */
        new_line = new_line.replaceAll("\t", "&emsp;");

        comment_str = comment_str.concat(new_line);
    }

    return comment_str;
}


function is_comment_line(line, comment_styles) {
    const CLEAN_LINE = line.replaceAll(" ", "").replaceAll("\t", "").replaceAll("\r", "");
    if (CLEAN_LINE.indexOf(comment_styles["line"]) == 0) {
        return 1;
    }
    if (CLEAN_LINE.indexOf(comment_styles["mline"][0]) == 0) {
        if (CLEAN_LINE.slice(comment_styles["mline"][0].length).indexOf(comment_styles["mline"][1]) >= 0) {
            return 1;
        }
        return 2;
    }
    if ((CLEAN_LINE.indexOf(comment_styles["mline"][1]) >= 0)) {
        return 3;
    }
    return 0;
    /* returns 1 if its a line comment, 2 if it's the start of a block, 3 if it's the end of a block, 0 if it's not a comment */
}

function main() {
    sanity_tests();

    let all_jsons = {};

    for (const CATEGORY of CATEGORIES) {
        all_jsons[CATEGORY] = {};
        for (const LANGUAGE in LANGUAGES) {
            all_jsons[CATEGORY][LANGUAGE] = {};
            all_jsons[CATEGORY][LANGUAGE]["lines"] = "";
            all_jsons[CATEGORY][LANGUAGE]["comments"] = {}; 

            const COMMENT_STYLES = LANGUAGES[LANGUAGE];
            const FILE_CONTENT = (fs.readFileSync(DIR_PREFIX + LANGUAGE + "/" + CATEGORY + "." + LANGUAGE)).toString();
            const ALL_LINES = FILE_CONTENT.split("\n");

            let comment_buffer = [];
            let block_comment_present = false;
            let cur_line = 0;
            for (line of ALL_LINES) {
                const IS_COMMENT = is_comment_line(line, COMMENT_STYLES);
                if (block_comment_present || IS_COMMENT != 0) {
                    /* append this comment to the buffer. */
                    comment_buffer.push(line);

                    if (IS_COMMENT == 2) {
                        block_comment_present = true;
                    } else if (IS_COMMENT == 3) {
                        block_comment_present = false;
                    }
                } else {
                    /* this line is just a piece of code. append it. */
                    all_jsons[CATEGORY][LANGUAGE]["lines"] = all_jsons[CATEGORY][LANGUAGE]["lines"].concat(line_formatter(line));

                    /* flush the comment buffer */
                    if (comment_buffer != "") {
                        all_jsons[CATEGORY][LANGUAGE]["comments"][cur_line] = comment_line_formatter(comment_buffer, COMMENT_STYLES);
                        comment_buffer = [];
                    }
                    cur_line++;
                }
            }
            all_jsons[CATEGORY][LANGUAGE]["lines"] = remove_trailing_carriages(all_jsons[CATEGORY][LANGUAGE]["lines"]);
        }
    }

    /* dump the JSON onto a file */
    fs.writeFileSync(DIR_WRITE, JSON.stringify(all_jsons), "utf8");
}

main();
