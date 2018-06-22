const notes = {
    file: "./todo.json",
    fs: require("fs"),
    add: (new_note) => {
        const all_data = require(notes.file);
        //a simple loop is used instead of forEach to be able to return from the function
        for (let i = 0; i < all_data.notes.length; i++) {
            if (all_data.notes[i].title == new_note.title) return "This note already exists!";
        }
        all_data.notes.push(new_note);
        notes.fs.writeFileSync(notes.file, JSON.stringify(all_data), "utf-8");
        return "Note was successfully added";
    },
    list: () => {
        let all_data, resultstring = "";
        try {
            all_data = require(notes.file);
        } catch (err) {
            return "File is empty or cannot be read";
        }
        all_data.notes.forEach((element, index) => {
            resultstring += `Note ${index}:\n${element.title} - ${element.body}\n`;
        })
        return resultstring;
    },
    read: (title) => { console.log("not done"); },
    remove: (title) => { console.log("not done"); },
}

module.exports = notes;