const fs = require("fs");
const PATH = require('path');

const PATH_TAGGED_LEVELS_JSON = PATH.join(__dirname, "levels.json");
const PATH_TO_CLEAN_NAMES = PATH.join(__dirname, "to_clean_names.json");
const PATH_TO_NONCLEAN_NAMES = PATH.join(__dirname, "to_nonclean_names.json");

const CATEGORIES = ["bubblesort", "pattern", "insertionsort", "queue", "stack", "slink", "dlink", "mergesort", "heapsort"];
const CLEAN_CATEGORIES = {
    "bubblesort": "Bubble Sort",
    "mergesort": "Merge Sort",
    "slink": "Singly Linked List",
    "dlink": "Doubly Linked List",
    "queue": "Queue",
    "insertionsort": "Insertion Sort",
    "stack": "Stack",
    "pattern": "Star Pattern",
    "heapsort": "Heap Sort"
};
const NONCLEAN_CATEGORIES = {
    "Bubble Sort": "bubblesort",
    "Merge Sort": "mergesort",
    "Singly Linked List": "slink",
    "Doubly Linked list": "dlink",
    "Queue": "queue",
    "Insertion Sort": "insertionsort",
    "Stack": "stack",
    "Star Pattern": "pattern",
    "Heap Sort": "heapsort"
};

/*                      0       1          2 */
const DIFFICULTIES = ["Easy", "Medium", "Hard"];
/*                  0       1                      2 */
const TYPES = ["Sorting", "Data Structure", "ASCII Art"];

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
    "pattern": [0, 2],
    "slink": [1,1],
    "dlink": [1,1],
    "mergesort": [2,1],
    "heapsort":[2,0]
};

function main() {
    let data_json = {};

    for (const CATEGORY of CATEGORIES) {
        data_json[CATEGORY] = {};
        data_json[CATEGORY]["difficulty"] = DIFFICULTIES[CATEGORY_EXTRAS[CATEGORY][0]];
        data_json[CATEGORY]["type"] = TYPES[CATEGORY_EXTRAS[CATEGORY][1]];
    }

    fs.writeFileSync(PATH_TAGGED_LEVELS_JSON, JSON.stringify(data_json), "utf8");
    fs.writeFileSync(PATH_TO_CLEAN_NAMES, JSON.stringify(CLEAN_CATEGORIES), "utf8");
    fs.writeFileSync(PATH_TO_NONCLEAN_NAMES, JSON.stringify(NONCLEAN_CATEGORIES), "utf8");
}

main();