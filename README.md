# digo-livereload
[digo](https://github.com/digojs/digo) 插件：使用 [LiveReload](https://github.com/napcs/node-livereload) 实现浏览器自动刷新。

## 安装
```bash
npm install digo-livereload
```

## 用法
```js
exports.default = () => {
    digo.startServer({
        plugins: ["digo-livereload"]
    })
};
```
