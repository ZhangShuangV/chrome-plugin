window.onload =function(){
    var currentUrl,
        currentTitle,
        qrcodeTitleCnt = document.getElementById('qrcodeTitleCnt');
    chrome.tabs.getSelected(function(w){
        currentUrl = w.url;
        currentTitle = w.title;
    });
    var qrcode = new QRCode(document.getElementById("qrcode"), {
        width : 96,//设置宽高
        height : 96
    });
    setTimeout(function () {
        qrcode.makeCode(currentUrl);
        qrcodeTitleCnt.innerHTML = currentTitle;
    },0);
};


