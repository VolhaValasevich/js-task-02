const DirWatcher = {
    chokidar: require("chokidar"),
    watch: (path, delay) => {
        const dirwatch = DirWatcher.chokidar.watch(path, {
            persistent: true,
            interval: delay
        })
        dirwatch
            .on('add', path => console.log(`File ${path} has been added`))
            .on('change', path => console.log(`File ${path} has been changed`))
            .on('unlink', path => console.log(`File ${path} has been removed`));
    }
}

module.exports = DirWatcher;