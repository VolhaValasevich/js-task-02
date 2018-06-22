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
            //notes.add(json)
            break;
        }
        case "list" : {
            //string = notes.list()
            console.log("list");
            break;
        }
        case "read" : {
            //string = notes.read(title)
            console.log("read");
            break;
        }
        case "delete" : {
            //notes.delete(title)
            console.log("delete");
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