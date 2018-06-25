class Importer {
    constructor() {
        this.dirwatcher = require("./dirwatcher.js");
        this.fs = require("fs");
        this.csvtojson = require("csvtojson");
        this.util = require("util");
    }

    import(path) {
        return new Promise((resolve, reject) => {                   //method returns a promise with imported data
            const func = this.dirwatcher.watch(path, 100);          //staring watching a given path
            func.on("change", (file) => {                           //listening to a "change" event emitted by dirwatcher
                const read = this.util.promisify(this.fs.readdir);
                read(path).then((files, err) => {                   //reading all files in a directory
                    let data = [];
                    if (err) reject(err);
                    for (let i = 0; i < files.length; i++) {
                        if (files[i].match(/.+\.csv$/)) {
                            console.log("Changed: " + files[i]);
                            try {
                                this.csvtojson()                            //converting .csv to .json
                                    .fromFile(path + "/" + files[i])
                                    .then((jsonarray) => {
                                        data.push(jsonarray);
                                    })
                                    .catch((err) => { console.log(err) })
                            } catch (err) { return (err) }
                        }
                    }
                    return data;
                }).then((data) => {
                    console.log("DATAAAAAAAAAAAAAAAAAAA" + data + "adaw");
                    this.fs.writeFile(path + "/imported.json", JSON.stringify(data), "utf-8", (err) => {
                        if (err) reject(err);
                    })
                    resolve(data);
                })
            });
        })
    }

    importSync(path) {
        const func = this.dirwatcher.watch(path, 100);          //staring watching a given path
        func.on("change", (file) => {                           //listening to a "change" event emitted by dirwatcher
            if (file.match(this.csvregexp)) {                   //checking if a new file is a .csv file
                console.log("Changed: " + file);
                this.csvtojson()                                //converting .csv to .json
                    .fromFile(file)
                    .then((jsonarray) => {
                        try {
                            this.fs.writeFileSync(file.replace("csv", "json"), JSON.stringify(jsonarray), "utf-8");        //writing in a .json file
                            console.log(file + " imported.");
                            return jsonarray;                   //method returns an object with imported data
                        } catch (err) { return err }
                    })
            }
        });
    }

    readfile(path) {

    }
}

module.exports = Importer;

