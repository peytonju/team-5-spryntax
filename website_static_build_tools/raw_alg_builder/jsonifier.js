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
            all_jsons[CATEGORY][LANGUAGE]["lines"] = {};
            all_jsons[CATEGORY][LANGUAGE]["comments"] = {}; 

            const COMMENT_STYLES = LANGUAGES[LANGUAGE];
            const FILE_CONTENT = (fs.readFileSync(DIR_PREFIX + LANGUAGE + "/" + CATEGORY + "." + LANGUAGE)).toString();
            const ALL_LINES = FILE_CONTENT.split("\n");

            let cur_line = 0;
            let is_block_comment = 0;
            for (line of ALL_LINES) {
                const IS_COMMENT = is_comment_line(line, COMMENT_STYLES);

                if (is_block_comment != 0) {
                    all_jsons[CATEGORY][LANGUAGE]["comments"][cur_line + 2 - is_block_comment] = 
                        all_jsons[CATEGORY][LANGUAGE]["comments"][cur_line + 2 - is_block_comment].concat(line);

                    if (IS_COMMENT == 3) {
                        /* move everything to this last line */
                        all_jsons[CATEGORY][LANGUAGE]["comments"][cur_line + 2] = all_jsons[CATEGORY][LANGUAGE]["comments"][cur_line + 2 - is_block_comment];
                        /* delete the old data */
                        delete all_jsons[CATEGORY][LANGUAGE]["comments"][cur_line + 2 - is_block_comment];
                        is_block_comment = 0;
                    } else {
                        /* now 1 more away on the next iteration */
                        is_block_comment++;
                    }
                } else if (IS_COMMENT != 0) {
                    /* IS_COMMENT == 1 automatically caught here */
                    if (IS_COMMENT == 1) {
                        all_jsons[CATEGORY][LANGUAGE]["comments"][cur_line + 2] = line, COMMENT_STYLES;
                    }
                    else if (IS_COMMENT == 2) {
                        all_jsons[CATEGORY][LANGUAGE]["comments"][cur_line + 2] = line;
                        /* now 1 away on the next iteration */
                        is_block_comment = 1;
                    }
                } else {
                    /* this line is just a piece of code. append it. */
                    all_jsons[CATEGORY][LANGUAGE]["lines"][cur_line + 1] = line;
                }
                cur_line++;
            }
        }
    }

    /* dump the JSON onto a file */
    fs.writeFileSync(DIR_WRITE, JSON.stringify(all_jsons), "utf8");
}

main();