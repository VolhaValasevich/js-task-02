const Importer = require("./importer.js");
const importer = new Importer();
const path = process.argv[2];
importer.importSync(path);