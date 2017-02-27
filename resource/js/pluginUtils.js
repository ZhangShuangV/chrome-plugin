var pluginUtils = {
    doAjax: function (method, url, data, success) {
        var xhr = null;//获取xhr对象
        if(window.XMLHttpRequest){//兼容
            xhr = new XMLHttpRequest();
        }else{
            xhr = new ActiveXObject("Microsoft.XMLHTTP");
        }
        if(method == "post"){//如果是send方法
            xhr.open(method,url);
            xhr.setRequestHeader("Content-Type","application/x-www-form-urlencoded");//设置请求头
            xhr.send(data);
        }else{//default：get
            if(data=="" || data==null){ // || data=={} 为{}时有还是会在url后面链接上值
                xhr.open(method,url);
            }else{
                xhr.open(method,url+"?"+data,true);
            }
            xhr.send(null);
        }
        xhr.onreadystatechange = function(){//响应成功后执行回调函数
            if(xhr.readyState===4 && xhr.status===200){
                clearTimeout(timer);//如果请求在10s内成功了，就清除定时器
                success(xhr.responseText);//给回调函数传入xhr对象
            }
        };
        var timer = setTimeout(function(){//如果响应时间超过了10s，就会中断ajax请求
            xhr.abort();
        },10000);
    }
};