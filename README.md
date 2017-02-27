## Chrome浏览器小插件开发
跟对象好了六年多，终于领证了，然而还没有求婚...
之前看知乎上有个网友说自己没有求婚，然后每次一吵架，他老婆就会拿这个没求婚的事儿出来怼他。看来，求婚的事儿真的是迫在眉睫了呀。
但是怎么求婚呢？摆一圈玫瑰、一圈蜡烛、一圈气球？还是...  
作为一个程序员，还是搞一个看上去很浪漫，又是自己写的东西出来吧。  
最开始想的是做个app，虽然自己是web前端，但是用之前工作中用过的egret或者也有其他的打包工具也可以打包成ios的app。但是这个周期可能稍微长一些，所以就想到了开发一个chrome的小插件，每当她打开新标签页的时候就能够看到一张精美的图片，一段格言锦句，可以让我一直关心她，哈哈:）  
下面就说一下这个小插件的做法吧。
<!-- more -->
## start
#### 项目结构
chrome的插件是由一个名为`manifest.json`的配置文件定义的，这个跟nodejs的`package.json`很像，另外还包含了一些html、js、css文件。
目录结构大致如下：

#### manifest.json
1.基本属性
包括插件名称`name`、版本`version`、描述`description`、图标`icon`、manifest版本`manifest_version`等等。
其中`manifest_version`必须为`2`，这个看其他的教程也是这么说的，但是自己试了一下，chrome提示这个字段必须set为2。
`version`这个字段，每次在chrome应用商店提交应用的时候，必须更新。我之前第二次上传应用商店的时候，就没有更新这个字段，结果就报错，提示是增加版本号。
`description`这个字段是指整个插件的描述，用鼠标指到插件的图标上面显示的内容。
`icon`这个字段为插件显示的图标
```
{
    、、、
    "name": "tabplus",
    "version": "0.1"，
    "description": a chrome plug-in for new tab",
    "manifest_version": 2，
    "icon": {
        "128": "./img/tabplus.png"
    }
    、、、
}
```
2.chrome工具栏提示 browser_action
`browser_action` 指定扩展的图标放在 Chrome 工具栏中，它定义了扩展图标文件位置（default_icon）、悬浮提示（default_title）和点击扩展图标所显示的页面位置（default_popup）。
```
"browser_action": {
    "default_icon": {
        "16": "./resource/img/tabplus.png",
        "48": "./resource/img/tabplus.png",
        "128": "./resource/img/tabplus.png"
    },
    "default_title": "a new chrome tab",
    "default_popup": "./page/popup.html"
},
```
我写的这个插件，点开后的效果如下：
![chrome工具栏效果](https://ooo.0o0.ooo/2017/02/27/58b39919c35da.png)

3.选项页 options_page
`options_page` 属性定义了扩展的设置页面，配置后在扩展图标点击右键可以看到 选项，点击即打开指定页面。注意这里面的‘s’。
`"options_page":"./page/options.html"`

4.权限 permissions
`permissions` 属性是一个数组，它定义了扩展需要向 Chrome 申请的权限，比如通过 XMLHttpRequest 跨域请求数据、访问浏览器选项卡（tabs）、获取当前活动选项卡（activeTab）、浏览器通知（notifications）、存储（storage）等，可以根据需要添加，如果内容涉及到了跨域等问题，都需要在此字段中添加相应的地址。
```
"permissions": [
    "tabs",
    "activeTab",
    "notifications",
    "storage",
    "declarativeContent",
    "*://www.zhangshuang.top/*",
    "*://www.baidu.com/*"
],
```

5.自定义页面替换默认页面 chrome_url_overrides
`chrome_url_overrides` 属性可以自定义的页面替换 Chrome 相应默认的页面，比如新标签页（newtab）、书签页面（bookmarks）和历史记录（history）。
```
"chrome_url_overrides": {
    "newtab": "./page/tab.html"
},
```

6.在指定网站添加文件 content_scripts
`content_scripts` 属性可以帮助我们实现给特定的站点添加特定的文件。例如去除百度搜索广告，我们就可以这么来实现：
```
"content_scripts": [{
    "matches": ["*://www.baidu.com/*"],
    "css": ["./resource/css/noad.css"]
}]
```
其中`noad.css`是自己写的文件，隐藏百度搜索的广告部分。
```
#content_left>div:not(.c-container) {
    height:0;
    overflow: hidden;
    margin-bottom: 0;
}
#content_left>div.leftBlock, .hit_top_new {
    height: auto;
}
```


#### 调试
插件开发完成之后，我们还需要进行调试。
首先打开 Chrome 设置-扩展程序（chrome://extensions/）页面，勾选 开发者模式，点击 加载正在开发的扩展程序 按钮，选择扩展所在的文件夹，就可以在浏览器工具栏中看到自己写的扩展了。
如果该扩展带有图标，右键单击图标，点击 审查弹出内容 即可。
