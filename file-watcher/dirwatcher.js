const EventEmitter = require("events").EventEmitter;

class DirWatcher {
    
    constructor() {
        this.chokidar = require("chokidar");
        this.emitter = new EventEmitter();
    }
    
    watch(dir, delay) {
        const dirwatch = this.chokidar.watch(dir, {
            persistent: true,
            usePolling: true,
            interval: delay
        })
        dirwatch.on("add", (path) => { this.emitter.emit("change", path); })
                .on("change", (path) => { this.emitter.emit("change", path); })
        return this.emitter;
    }
}

module.exports = DirWatcher;