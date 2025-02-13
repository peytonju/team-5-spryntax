const fs = require("fs");

const DIR_WRITE = "levels.json";
const DIR_PREFIX = "algs-";
const CATEGORIES = ["bubblesort", "mergesort", "slink", "dlink", "queue", "insertionsort", "stack"];
const LANGUAGES = {
    "c": {
        "line": "//",
        "mline": ["/*", "*/"],
        "aline": "*"
    },
    "py": {
        "line": "#",
        "mline": ["'''", "''''"],
        "aline": "#"
    }
};


function line_formatter(line) {
    let new_line = line;
    
    /* carriage return */
    new_line = new_line.replaceAll("\r", "↵");
    /* tab */
    new_line = new_line.replaceAll("\t", "→");

    return new_line;
}


function is_comment_line(line, comment_styles) {
    const CLEAN_LINE = line.replaceAll(" ", "").replaceAll("\t", "");
    if (CLEAN_LINE.indexOf(comment_styles["line"]) == 0) {
        return 1;
    }
    if (CLEAN_LINE.indexOf(comment_styles["mline"][0]) == 0) {
        if (CLEAN_LINE.indexOf(comment_styles["mline"][1]) >= 0) {
            return 1;
        }
        return 2;
    }
    if (CLEAN_LINE.indexOf(comment_styles["mline"][1]) == 0) {
        return 3;
    }
    return 0;
    /* returns 1 if its a line comment, 2 if it's the start of a block, 3 if it's the end of a block, 0 if it's not a comment */
}

function main() {
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

            let comment_buffer = "";
            let block_comment_present = false;
            let cur_line = 0;
            for (line of ALL_LINES) {
                const IS_COMMENT = is_comment_line(line, COMMENT_STYLES);
                if (block_comment_present || IS_COMMENT != 0) {
                    /* append this comment to the buffer. */
                    comment_buffer = comment_buffer.concat(line);

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
                        all_jsons[CATEGORY][LANGUAGE]["comments"][cur_line] = comment_buffer;
                        comment_buffer = "";
                    }
                    cur_line++;
                }
            }
        }
    }

    /* dump the JSON onto a file */
    fs.writeFileSync(DIR_WRITE, JSON.stringify(all_jsons), "utf8");
}

main();