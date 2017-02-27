## README

#### 插件配置
`manifest.json`为chrome插件的配置文件，类似于node项目的`package.json`。


#### 屏蔽百度广告

```
/* 屏蔽百度的广告 */
// manifest.json
"content_scripts": [{
    "matches": ["*://www.baidu.com/*"],
    "css": ["./resource/css/noad.css"]
}]
// noad.css
#content_left>div:not(.c-container) {
    height:0;
    overflow: hidden;
    margin-bottom: 0;
}
#content_left>div.leftBlock, .hit_top_new {
    height: auto;
}
```