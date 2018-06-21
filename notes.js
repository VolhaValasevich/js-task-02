const notes = {
    file: "./todo.txt",
    fs: require("fs"),
    add: (text) => {
        notes.fs.writeFileSync(notes.file, text, "utf-8");
    },
    list: () => { console.log("not done"); },
    read: (title) => { console.log("not done"); },
    remove: (title) => { console.log("not done"); },
}

module.exports = notes;