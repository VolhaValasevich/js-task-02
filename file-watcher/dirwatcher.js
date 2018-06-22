const EventEmitter = require("events").EventEmitter;

const DirWatcher = {
    chokidar: require("chokidar"),
    emitter: new EventEmitter(),
    watch: (dir, delay) => {
        const dirwatch = DirWatcher.chokidar.watch(dir, {
            persistent: true,
            usePolling: true,
            interval: delay
        })
        dirwatch.on("add", (path) => { DirWatcher.emitter.emit("change", path); })
                .on("change", (path) => { DirWatcher.emitter.emit("change", path); })
        return DirWatcher.emitter;
    }
}

module.exports = DirWatcher;