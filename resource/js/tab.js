// daily
var dailyImg = document.getElementById('dailyImg'),
    dailyMotto = document.getElementById('dailyMottoCnt'),
    dailyImgSrc = "http://www.zhangshuang.top/lib/tabplusbg/" + (new Date().getMonth() + 1) + "/" + new Date().getDate() + ".jpg",
    dailyMottoSrc = "http://www.zhangshuang.top/lib/tabplusmotto/" + (new Date().getMonth() + 1) + ".json";
dailyImg.style.background = 'url('+dailyImgSrc+')';
dailyImg.style.backgroundSize = 'cover';
var render = {
    renderMotto: function (data) {
        var data = JSON.parse(data),
            mottoData = data.data[new Date().getDate()].motto;
        dailyMotto.innerHTML = mottoData;
    },
    getMotto: function () {
        pluginUtils.doAjax("get",dailyMottoSrc, null, this.renderMotto);
    }
};
render.getMotto();

// swiper-area
window.onload = function () {
    var mySwiper = new Swiper('.swiper-area',{
        loop: true,
        pagination: ".swiper-pagination"
    });
};

// search
var searchBaidu = document.getElementById('searchBaidu'),
    inputBaidu = document.getElementById('inputBaidu'),
    valueBaidu = null,
    searchGoogle = document.getElementById('searchGoogle'),
    inputGoogle = document.getElementById('inputGoogle'),
    valueGoogle = null;

inputBaidu.onfocus = function () {
    document.onkeydown = function (event) {
        var e = event || window.event;
        if(e.keyCode == 13) {
            goSearch('baidu');
            searchBaidu.click();
        }
    }
};
inputBaidu.onblur = function () {
    goSearch('baidu');
};

inputGoogle.onfocus = function () {
    document.onkeydown = function (event) {
        var e = event || window.event;
        if(e.keyCode == 13) {
            goSearch('google');
            searchGoogle.click();
        }
    }
};
inputGoogle.onblur = function () {
    goSearch('google');
};

function goSearch(type) {
    if(type == 'baidu') {
        valueBaidu = inputBaidu.value;
        searchBaidu.href = 'https://www.baidu.com/s?wd=' + valueBaidu;
    }else if(type == 'google') {
        valueGoogle = inputGoogle.value;
        searchGoogle.href = 'https://www.google.com/#q=' + valueGoogle;
    }
}