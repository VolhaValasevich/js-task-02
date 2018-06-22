const notes = {
    file: "./todo.json",
    fs: require("fs"),
    add: (new_note) => {
        const all_data = notes.checkfile(notes.file);
        if (all_data.notes.findIndex((el) => { if (el.title === new_note.title) return true; }) === -1) {
            all_data.notes.push(new_note);
            notes.fs.writeFileSync(notes.file, JSON.stringify(all_data), "utf-8");
            return "Note was successfully added";
        } else return "This note already exists!";

    },
    list: () => {
        let resultstring = "";
        const all_data = notes.checkfile(notes.file);
        all_data.notes.forEach((element, index) => {
            resultstring += `Note ${index}:\n${element.title} - ${element.body}\n`;
        })
        return resultstring;
    },
    read: (title) => {
        const all_data = notes.checkfile(notes.file);
        if (all_data.notes.findIndex((el) => { if (el.title === title) return true; }) > -1) {
            return `${el.title} - ${el.body}`;
        } else return "No such note found";
    },
    remove: (title) => {
        const all_data = notes.checkfile(notes.file);
        if (all_data.notes.findIndex((el) => { if (el.title === title) return true; }) === -1) {
            all_data.notes.splice(i, 1);
            notes.fs.writeFileSync(notes.file, JSON.stringify(all_data), "utf-8");
            return "Note was successfully deleted";
        } else return "No such note found";
    },
    checkfile: (file) => {
        const default_content = '{"notes":[]}';
        try {
            const all_data = require(file);
            return all_data;
        } catch (err) {
            notes.fs.writeFileSync(file, default_content, "utf-8");
            return JSON.parse(default_content);
        }
    }
}

module.exports = notes;