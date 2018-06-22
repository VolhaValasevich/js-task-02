const notes = {
    file: "./todo.json",
    fs: require("fs"),
    add: (new_note) => {
        const all_data = require(notes.file);
        all_data.notes.push(new_note);
        notes.fs.writeFileSync(notes.file, JSON.stringify(all_data), "utf-8");
        return all_data;
    },
    list: () => { console.log("not done"); },
    read: (title) => { console.log("not done"); },
    remove: (title) => { console.log("not done"); },
}

module.exports = notes;