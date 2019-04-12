// AJAX 封装
var AJAX = function(method, url, data){
    /*兼容IE*/    
    var request;                     
    if(window.XMLHttpRequest){
         request = new XMLHttpRequest();
    }else{
         request = new ActiveXObject("Microsoft.XMLHTTP")
    }               
    return new Promise(function(resolve,reject){
        request.onreadystatechange=function(){
            if(request.readyState===4)
                if(request.status===200)
                    resolve(request.response);
                else reject(request.status);
        };
        var arr = [];
        for(var key in data) arr.push(key + '=' + data[key]);
        var getData = arr.join("&");
        switch(method.toUpperCase()){
            case 'GET':
                request.open("GET",url+"?"+getData,true);
                request.send(null);
                break;
            case 'POST':
                request.open("POST",url,true);
                request.responseType="json";
                request.withCredentials = true;
                //request.setRequestHeader("Allow-Credentials", "true");
                request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded;charset=utf-8');
                request.send(getData);
                break;
        }
    });
};
