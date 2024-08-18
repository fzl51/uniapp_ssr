# uniapp_ssr_demo for  <a href="https://uniapp.dcloud.net.cn">uniapp</a>
### 用途：实现搜索引擎seo优化提高排名。将项目转为静态内容。<br><br>这是一个演示uniapp如何实现ssr服务器渲染<br><br>不使用uniapp官方指定的云函数来实现

`uniapp_ssr_demo` 是解决 [uniapp](https://uniapp.dcloud.net.cn) 项目ssr(服务器端渲染),实现seo的解决方案。
<br>官方提供了[ssr解决方案](https://doc.dcloud.net.cn/uni-app-x/web/ssr.html) 截止发稿前必须要使用uniCloud 云函数。
<br>这是实现uniCloud不需要云函数解决方案。



## 安装

```sh
npm install
```

**Note:** 关键是需要安装最新的 @dcloudio/uni-app 及 @dcloudio/uni-h5。 <br>
以后出现版本不兼容的情况 [这里查询](https://github.com/dcloudio/uni-app/tags) 最新版本号
在package.json修改版本号 执行安装




## 设置

### 1.在uniapp设置路由mode   **history**
<img src="./img/1724013127179.jpg">

### 2.发布的时候设置ssr发行 (vue3才支持)
<img src="./img/1724012956765.jpg">

## 复制生成好的client跟server目录到该项目根目录运行

```sh
npm start
```
## 注意事项
1. 不能有环境代码。详情可以看官方的[说明](https://doc.dcloud.net.cn/uni-app-x/web/ssr.html) 比如 window document 
2. 还有很多api不支持 比如 uni.getSystemInfoSync
3. App.vue不会调用 需要在main.js挂载钩子
4. 如果有npm包 需要在服务器上的项目安装一遍
5. 为每个页面实现不同的meta信息需要自己实现 这个项目只提供uniapp的ssr解决办法。
6. 注意链接 都是onclik事件 
7. 如果有不兼容的代码 会node报错 不会服务器渲染 但不影响网页运行
8. ssr很多代码不兼容 多到让你怀疑人生 做好心里准备。
