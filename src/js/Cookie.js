
//instanceof: 判断是否属于某个类型
//name=value;[expires=date];[path=路径];[domain=域名];[secure]
//设置cookie
function setCookie(name,value,expires,path,domain,secure){
	//name=value
	var cookieText = name +"="+ value;
	//失效时间expires=date
	if(expires instanceof Date){
		cookieText += ";expires="+expires;
	}
	//path=路径
	if(path){
		cookieText += ";path="+path;
	}
	//domain=域名
	if(domain){
		cookieText += ";domain="+domain;
	}
	//secure
	if(secure){
		cookieText += ";secure";
	}
	
	document.cookie = cookieText;
	return document.cookie;
 	
}

//获取cookie
function getCookie(name){
	var cookie = decodeURIComponent(document.cookie);//name=1;name2=2;name3=3
	
	var arr = cookie.split("; ");
	//[name=1,name2=2,name3=3]
	for(var i=0; i<arr.length; i++){
		//name=1
		var arr2 = arr[i].split("=");
		//[name,1]
		if(arr2.length >=2){
			if(arr2[0] == name){
				return arr2[1];
			}
		}	
	}
	return "";
	
}


//删除cookie
function removeCookie(name){
	var d = new Date(); 
	document.cookie = encodeURIComponent(name) +"=;expires="+d;
	return document.cookie;
	
}