class Importer {
    constructor() {
        this.dirwatcher = require("./dirwatcher.js");
        this.fs = require("fs");
        this.csvregexp = /.+\.csv$/
    }

    import(path) {

    }

    importSync(path) {
        const func = this.dirwatcher.watch(path, 100);
        func.on("change", (file) => {
            if (file.match(this.csvregexp)) {
                const file_content = this.fs.readFileSync(file, "utf-8");
                console.log(file_content);
            }
        });
    }
}

module.exports = Importer;

