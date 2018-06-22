class Importer {
    constructor() {
        this.dirwatcher = require("./dirwatcher.js");
        this.fs = require("fs");
        this.csvtojson = require("csvtojson");
        this.csvregexp = /.+\.csv$/
    }

    import(path) {

    }

    importSync(path) {
        const func = this.dirwatcher.watch(path, 100);
        let data = [];
        func.on("change", (file) => {
            if (file.match(this.csvregexp)) {
                this.csvtojson()
                    .fromFile(file)
                    .then((jsonarray) => { return jsonarray})
                    .then((jsonarray) => console.log(jsonarray))
            }
        });
        return data;
    }
}

module.exports = Importer;

