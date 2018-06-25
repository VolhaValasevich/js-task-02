const DirWatcher = require("./dirwatcher.js");

class Importer {
    constructor() {
        this.dirwatcher = new DirWatcher();
        this.fs = require("fs");
        this.csvtojson = require("csvtojson");
        this.csvregexp = /.+\.csv$/
    }

    import(path) {
        return new Promise((resolve, reject) => {                   //method returns a promise with imported data
            const func = this.dirwatcher.watch(path, 100);          //staring watching a given path
            func.on("change", (file) => {                           //listening to a "change" event emitted by dirwatcher
                if (file.match(this.csvregexp)) {                   //checking if a new file is a .csv file
                    console.log("Changed: " + file);
                    try {
                        this.csvtojson()                            //converting .csv to .json
                            .fromFile(file)
                            .then((jsonarray) => {
                                this.fs.writeFile(file.replace("csv", "json"), JSON.stringify(jsonarray), "utf-8", (err) => { //writing in a .json file
                                    if (err) reject(err);
                                    console.log(file + " imported.");
                                    resolve(jsonarray);             
                                });
                            })
                    } catch (err) { reject(err) }
                }
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
}

module.exports = Importer;

