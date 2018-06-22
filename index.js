const notes = require("./notes.js");
const yargs = require("yargs");

function main() {
    const args = yargs.argv;
    const command = args._[0];
    const title = args.title;
    const body = args.body;
    switch (command) {
        case "add" : {
            const new_note = {
                title: title,
                body: body
            };
            console.log(notes.add(new_note));
            break;
        }
        case "list" : {
            console.log(notes.list());
            break;
        }
        case "read" : {
            console.log(notes.read(title));
            break;
        }
        case "remove" : {
            console.log(notes.remove(title));
            break;
        }
        case undefined: {
            console.log("You didn't enter a command!");
            break;
        }
        default: {
            console.log(`Unknown command "${command}"`);
        }
    }
}

main();