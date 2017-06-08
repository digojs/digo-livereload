const digo = require("digo");
const livereload = require('livereload');

module.exports = (server, options = {}) => {
    options.port = options.port || 0;
    const reloader = livereload.createServer(options);
    const port = options.server.address().port;

    digo.on("fileSave", file => {
        reloader.refresh(file.srcPath);
    });

    server.handlers.push({
        matcher: /\.html?$/i,
        process: (req, res) => {
            const parts = req.url.split("?", 2);
            const url = parts[0];
            const path = server.urlToPath(url);
            if (path != null) {
                digo.readFile(path, (error, data) => {
                    if (error) {
                        server.writeError(req, res, 400, path);
                    } else {
                        data = data.toString() + `<script>
    /* This script is auto inserted by digo-livereload plugin. */
    document.write('<script src="http://' + (location.host || 'localhost').split(':')[0] +
  ':${port}/livereload.js?snipver=1"></' + 'script>')
</script>`;
                        server.writeFile(req, res, 200, path, data);
                    }
                })
            }
        }
    });

    // function initWatcher() {
    //     if (!digo.watcher) {
    //         setTimeout(initWatcher, 100);
    //         return;
    //     }
    //     digo.watcher.on("rebuild", (changes, deletes) => {
    //         console.log(changes, deletes);
    //         // digo.then(() => {
    //         console.log("refresh");
    //         for (const change of changes) {
    //             reloader.refresh(change);
    //         }
    //         for (const change of deletes) {
    //             reloader.refresh(change);
    //         }
    //         // });
    //     });
    // }
    // initWatcher();
};
