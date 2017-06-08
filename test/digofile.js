exports.default = () => {
    digo.startServer({
        port: 8199,
        plugins: ["../"],
        root: "fixtures",
        task: () => {
            digo.src("./fixtures").dest("./_build");
        }
    })
};