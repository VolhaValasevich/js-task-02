const notes = {
    file: "./todo.json",
    fs: require("fs"),
    add: (new_note) => {
        const all_data = notes.checkfile(notes.file);
        //a simple loop is used instead of forEach to be able to return from the function
        for (let i = 0; i < all_data.notes.length; i++) {
            if (all_data.notes[i].title == new_note.title) return "This note already exists!";
        }
        all_data.notes.push(new_note);
        notes.fs.writeFileSync(notes.file, JSON.stringify(all_data), "utf-8");
        return "Note was successfully added";
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
        //a simple loop is used instead of forEach to be able to return from the function
        for (let i = 0; i < all_data.notes.length; i++) {
            if (all_data.notes[i].title === title) return `${all_data.notes[i].title} - ${all_data.notes[i].body}`;
        }
        return "No such note found";
    },
    remove: (title) => { 
        const all_data = notes.checkfile(notes.file);
        //a simple loop is used instead of forEach to be able to break from it
        for (let i = 0; i < all_data.notes.length; i++) {
            if (all_data.notes[i].title === title) {
                all_data.notes.splice(i, 1);
                notes.fs.writeFileSync(notes.file, JSON.stringify(all_data), "utf-8");
                return "Note was successfully deleted";
            }
        }
        return "No such note found";
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