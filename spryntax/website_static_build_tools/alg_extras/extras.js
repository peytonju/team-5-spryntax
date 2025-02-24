const fs = require("fs");
const PATH = require('path');

const PATH_TAGGED_LEVELS_JSON = PATH.join(__dirname, "levels.json");

const CATEGORIES = ["bubblesort", "mergesort", "slink", "dlink", "queue", "insertionsort", "stack"];

/*                      0       1          2 */
const DIFFICULTIES = ["easy", "medium", "hard"];
/*                  0       1 */
const TYPES = ["sorting", "data structure"];

/* 
 * current order: 
 *      difficulty
 *      type 
 */
const CATEGORY_EXTRAS = {
    "bubblesort": [0,0],
    "insertionsort": [0,0],
    "queue": [0,1],
    "stack": [0,1],
    "slink": [1,1],
    "dlink": [1,1],
    "mergesort": [2,1]
};

function main() {
    let data_json = {};

    for (const CATEGORY of CATEGORIES) {
        data_json[CATEGORY] = {};
        data_json[CATEGORY]["difficulty"] = DIFFICULTIES[CATEGORY_EXTRAS[CATEGORY][0]];
        data_json[CATEGORY]["type"] = TYPES[CATEGORY_EXTRAS[CATEGORY][1]];
    }

    fs.writeFileSync(PATH_TAGGED_LEVELS_JSON, JSON.stringify(data_json), "utf8");
}

main();