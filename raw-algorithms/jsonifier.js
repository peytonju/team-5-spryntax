let fs = require("fs");


const LEVELS = {
    "bubblesort": {
        "title": null,
        "desc": null,
        "levels": {}
    },
    "mergesort": {
        "title": null,
        "desc": null,
        "levels": {}
    },
    "slinklist": {
        "title": null,
        "desc": null,
        "levels": {}
    },
    "dlinklist": {
        "title": null,
        "desc": null,
        "levels": {}
    },
    "insertionsort": {
        "title": null,
        "desc": null,
        "levels": {}
    }
};

const FILES_TO_COMPILE = [
    {
        "name": "./algs-c/bubblesort.c",
        "written_line": "//",
        "level": "bubblesort",
        "language": "c",
    },
];

function jsonify_line(line_content, line_number, cur_file) {
    let new_line = {
        "line_number": line_number,
        "line_content": line_content,
        "should_user_type": false
    };

    if (line_content.includes(cur_file["written_line"])) {
        new_line["line_content"] = line_content.replace(cur_file["written_line"], "");
        new_line["should_user_type"] = true;
    }

    return new_line;
}

function jsonify_lines(json_file) {
    let jsonified_lines = [];
    let content = fs.readFileSync(json_file["name"]);
    let all_lines = content.toString().split("\n");

    let cur_line = 0;
    for (const line of all_lines) {
        jsonified_lines.push(jsonify_line(line, cur_line, json_file));
        cur_line++;
    }

    return jsonified_lines;
}

function compile_files(files_to_compile) {
    let compiled_files = LEVELS;
    for (let json_file of files_to_compile) {
        json_file["line_data"] = jsonify_lines(json_file);
        json_file["name"] = json_file["name"].split("/").at(-1);

        compiled_files[json_file["level"]]["levels"][json_file["language"]] = json_file;
    }

    console.log(compiled_files);
    fs.writeFileSync("all_algorithm_data.json", JSON.stringify(compiled_files), function (err) {
        console.log("An error occurred during the JSON creation process: " + err);
    });
}

compile_files(FILES_TO_COMPILE);