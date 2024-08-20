const {render} = require("./server/entry-server");
const express = require('express');
const app = express();
const fs = require('fs');
const path = require('path');
const templatePath = path.resolve(__dirname, './server/index.html');// 读取模板 HTML 文件
let templateHtml = fs.readFileSync(templatePath, 'utf-8');
const routes = __uniRoutes.reduce((acc, item) => {
    acc[item.path] = item;
    if (item['alias']) {
        acc[item.alias] = item;
    }
    return acc;
}, {});

app.use(async (req, res, next) => {

    if (!routes[req.path]) return next()
    try {
        console.log('req=>', req.path)
        // 调用 render 函数
        const {title, headMeta, preloadLinks, appHtml, appContext} = await render(req, {});
        // 替换模板中的占位符
        let finalHtml = templateHtml
            .replace('<!--preload-links-->', preloadLinks)
            .replace('<!--app-context-->', appContext)
            .replace('<!--app-html-->', `${appHtml}`);
        // 设置标题
        finalHtml = finalHtml.replace(/<title>(.*?)<\/title>/, `<title>${title}</title>`);
        finalHtml = finalHtml.replace(/鼠标右键查看源码 如果源码存在此文字则成功/, `
        鼠标右键查看源码 如果源码存在此文字则成功
        `);
        // 返回最终的 HTML
        return res.send(finalHtml);
    } catch (err) {
        console.error(err)
        res.status(500).send('Internal Server Error');
    }

})
app.use(express.static('client'));
process.on('uncaughtException', (err) => {
    console.error('未捕获的异常:', err);
});
process.on('unhandledRejection', (reason, promise) => {
    console.error('未处理的 Promise 异常:', reason);
});

// 监听端口
app.listen(8080, () => {
    console.log('Server is running at http://localhost:8080');
});
