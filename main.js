const webPath = './' //设置server跟client文件所在路径
const {render} = require(`${webPath}server/entry-server`);
const express = require('express');
const app = express();
const fs = require('fs');
const path = require('path');
const templatePath = path.resolve(__dirname, `${webPath}server/index.html`);// 读取模板 HTML 文件
const ssrMainFest = require(`${webPath}server/ssr-manifest.json`);
let templateHtml = fs.readFileSync(templatePath, 'utf-8');

//获取路由
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
        const {title, headMeta, preloadLinks, appHtml, appContext} = await render(req, ssrMainFest);
        // 替换模板中的占位符
        let finalHtml = templateHtml
            .replace('<!--preload-links-->', preloadLinks)
            .replace('<!--app-context-->', appContext)
            .replace('<!--app-html-->', `${appHtml}`)
            .replace(/(<head[^>]*>)(?!.*<head[^>]*>)/i, `$1\n${headMeta}\n`);

        // 设置标题
        finalHtml = finalHtml.replace(/<title>(.*?)<\/title>/g, `<title>${title}</title>`);


        // finalHtml = finalHtml.replaceAll('uni-view', `div`);
        // finalHtml = finalHtml.replaceAll('uni-text', `span`);
        // finalHtml = finalHtml.replaceAll('uni-app', `div`);
        // finalHtml = finalHtml.replaceAll('uni-page-wrapper', `div`);
        // finalHtml = finalHtml.replaceAll('uni-page-body', `div`);
        // finalHtml = finalHtml.replaceAll('uni-page', `div`);


        //替换注释
        finalHtml = finalHtml.replace(/<!--[\s\S]*?-->|\/\*[\s\S]*?\*\//g, '');
        // 返回最终的 HTML
        return res.send(finalHtml);
    } catch (err) {
        console.error(err)
        res.status(500).send('Internal Server Error');
    }

})
app.use(express.static(`${webPath}client`));
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
