class Importer {
    constructor() {
        this.dirwatcher = require("./dirwatcher.js");
    }
    
    listen(dir, delay) {
        const func = this.dirwatcher.watch(dir, delay);
        func.on("change", (path) => {console.log("Emit listened " + path)});
    }
}

module.exports = Importer;

