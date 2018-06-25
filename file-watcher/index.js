const Importer = require("./importer.js");
const importer = new Importer();
const path = process.argv[2];
importer.import(path).then((data) => {
    console.log(data);
}, (err) => {
    console.log(err)
});