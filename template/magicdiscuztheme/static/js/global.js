
// JavaScript Document

$(function(){
	$("#errmsg").ajaxError(function(request, settings){
    	$(this).append("<li>Error requesting page " + settings.url + "</li>");
	});
	
	$("a").focus(function(){this.blur();});
});

/**
 * 用户登录框
 */
function memberLogon(){
	var memberForm = $("#memberForm");
	var memberSubmit = $("#memberSubmit");
	var forgetPassword = $("#forgetPassword");
	var register = $("#register");
	
	memberForm.submit(function(){return false;});
	
	mousedownEffects(memberSubmit, "submit");
	mousedownEffects(forgetPassword, "logonButton");
	mousedownEffects(register, "logonButton2");
	
	function mousedownEffects(jq, imgName){	
		jq.focus(function(){this.blur();});
		jq.mousedown(function(){$(this).css("background-image", "url(/images/" + imgName + "Active.gif)");});
		jq.mouseup(function(){$(this).css("background-image", "url(/images/" + imgName + ".gif)");});
		jq.hover(function(){}, function(){$(this).css("background-image", "url(/images/" + imgName + ".gif)");});
	}
}

/**
 * 新闻标签处理
 */
function newsTabs(){
	var li = $(".homeMain #newsList .tabs ul li");
	var lia = $(".homeMain #newsList .tabs ul li a");
	
	lia.focus(function(){this.blur();});
	li.click(function(){
		li.removeClass("active");
		var thisLi = $(this);
		thisLi.addClass("active");
		
		newsTabsContent(thisLi.attr("id") + "_data");
	});
}

/**
 * 新闻标签的内容更换
 * @param id - 填充的数据区id
 */
function newsTabsContent(id){
	var target = document.getElementById("homeNewsListWrap");
	var source = document.getElementById(id);
	target.innerHTML = source.innerHTML;
}

/**
 * 菜单栏
 */
function menubar(){
	var lia = $(".topElement ul.menubar li a");
	lia.mouseover(function(){$(this).attr("title","")});
}

/**
 * 左部的幻灯片
 */
function slide(focus_width, focus_height, pics, links, texts, container){
	var text_height=0;
	var swf_height = focus_height+text_height;
	var html = '<object classid="clsid:d27cdb6e-ae6d-11cf-96b8-444553540000" codebase="http://fpdownload.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=8,0,0,0" width="'+ focus_width +'" height="'+ swf_height +'">';
	html += '<param name="movie" value="/images/pixviewer.swf"><param name="quality" value="high"><param name="bgcolor" value="#ffffff">';
	html += '<param name="menu" value="false"><param name=wmode value="opaque">';
	html += '<param name="FlashVars" value="pics='+pics+'&links='+links+'&texts='+texts+'&borderwidth='+focus_width+'&borderheight='+focus_height+'&textheight='+text_height+'">';
	html += '<embed src="/images/pixviewer.swf" wmode="opaque" FlashVars="pics='+pics+'&links='+links+'&texts='+texts+'&borderwidth='+focus_width+'&borderheight='+focus_height+'&textheight='+text_height+'" menu="false" bgcolor="#ffffff" quality="high" width="'+ focus_width +'" height="'+ swf_height +'" allowScriptAccess="sameDomain" type="application/x-shockwave-flash" pluginspage="http://www.macromedia.com/go/getflashplayer" />';
	html += '</object>';
	$(container).html(html);
}

/**
 * 横幅
 *	使用了swfobject
 *	见：http://code.google.com/p/swfobject/wiki/documentation
 */
function banner(src){
	var sitedir = "/";
	if(src=="" || src.length==0)
		src = "flash/banner.swf";
	src = sitedir + src;
	
	var patt = new RegExp(".{3}$");
	var extName = patt.exec(src);
	extName = extName.toString().toLowerCase();
	
	if(extName=="swf"){
		var flashvars = {};
		var params = {}//wmode:"transparent";
		var attributes = {};
		swfobject.embedSWF(src, "homeBannerFlash", 942, 272, "10.0.0", "/script/expressInstall.swf", flashvars, params, attributes);  
	} else {
		$("#homeBannerFlash").html("<img alt=\"启稚八大智能\" src=\"" + src + "\" />");
	}
}
function centerMap(){
	var flashvars = {};
	var params = {};
	var attributes = {};
	swfobject.embedSWF("/flash/map.swf", "centerMap", 627, 504, "10.0.0", "/script/expressInstall.swf", flashvars, params, attributes);  
}

/**
 * 浮动的广告
 */
function floatAD(){	
	var container = $("#floatAD");
	
	if(getCookie("closeAD")=="true"){
		container.hide();
		return;
	}
	var interval = setInterval(function(){
				   		scall();
					}, 500);
	
	var closeAD = $(".closeAd", container);
	closeAD.click(function(){
		container.hide();
		clearInterval(interval);
		setCookie("closeAD","true");
	});
	
	function scall(){
		var scrollPos; 
		if (typeof window.pageYOffset != 'undefined') { 
			scrollPos = window.pageYOffset; 
		} else if (typeof document.compatMode != 'undefined' && document.compatMode != 'BackCompat') { 
			scrollPos = document.documentElement.scrollTop; 
		} else if (typeof document.body != 'undefined') { 
			scrollPos = document.body.scrollTop; 
		}
		container.animate({top:scrollPos + 180 + "px"}, 400);
	}
}

/**
 * datepicker 日期选取器
 * @param css - css 选择器
 */
function datepicker(css) {
	$(function(){
		$(css).datepicker({
			dateFormat: "yy-mm-dd",
			changeMonth: true,
			changeYear: true,
			yearRange: '1982:2022',
			showButtonPanel: true,
			closeText: "关闭",
			currentText: "今天"
		});
		$(css).datepicker($.datepicker.regional['zh-CN']);
	});
}

/**
 * 刷新验证码
 */
function refreshVC(){
	var timestamp = new Date().getTime();
	var html = "<img alt=\"验证码\" src=\"/shiting/verifyCode.php?";
	html += "timestamp=" + timestamp;
	html += "\" />";
	$("#verifyCode").html(html);
}

/**
 * 生日宝贝的上滑动效果
 */
function sliderUp(css) {
	$(css).easySlider({
			vertical: true,
			controlsShow: false,
			auto: true
		});
}

/**
 * 左卷动栏
 *  参数：一个布局
 */
function rollLeft(cssSelector){
	var wrap = $(cssSelector);
	
	var content = wrap.html();
	
	var innerHtml = "<table border=\"0\" cellspacing=\"0\" cellpadding=\"0\"><tr><td class=\"rollContent\"></td><td class=\"rollContentEcho\"></td></tr></table>";
	wrap.html(innerHtml);
	
	var rollContent = $(".rollContent", wrap);
	var rollContentEcho = $(".rollContentEcho", wrap);
	
	wrap.css({overflow: "hidden"});
	
	roll(content);
	
	function roll(data){
		rollContent.html(data);
		
		var speed = 25;
	
		var demo = wrap.get(0);
		var demo1 = rollContent.get(0);
		var demo2 = rollContentEcho.get(0);
		
		demo2.innerHTML = demo1.innerHTML;
		function Marquee(){
			if(demo.scrollLeft >= demo2.offsetWidth){
				demo.scrollLeft -= demo1.offsetWidth;
			}else{
				demo.scrollLeft+=1;
			}
		}
		var MyMar=setInterval(Marquee,speed);
		demo.onmouseover=function(){clearInterval(MyMar)}
		demo.onmouseout=function(){MyMar=setInterval(Marquee,speed)}
		
	}
}

/**
 * 上卷动栏
 *  参数：一个布局
 */
function rollUp(cssSelector){
    var wrap = $(cssSelector);
    
	var content = wrap.html();
	
    var innerHtml = "<table border=\"0\" cellspacing=\"0\" cellpadding=\"0\"><tr><td class=\"rollContent\"></td></tr><tr><td class=\"rollContentEcho\"></td></tr></table>";
    wrap.html(innerHtml);
    
    var rollContent = $(".rollContent", wrap);
    var rollContentEcho = $(".rollContentEcho", wrap);
    
    wrap.css({overflow: "hidden"});
    
	roll(content);
    
    function roll(data){
        rollContent.html(data);
        
        var speed = 25;
    
	    var demo = wrap.get(0);
	    var demo1 = rollContent.get(0);
	    var demo2 = rollContentEcho.get(0);
    	
	    demo2.innerHTML = demo1.innerHTML;
	    function Marquee(){
		    if(demo.scrollTop >= demo2.offsetHeight){
			    demo.scrollTop -= demo1.offsetHeight;
		    }else{
			    demo.scrollTop+=1;
		    }
	    }
	    var MyMar=setInterval(Marquee,speed);
	    demo.onmouseover=function(){clearInterval(MyMar)}
	    demo.onmouseout=function(){MyMar=setInterval(Marquee,speed)}
	    
    }
}

/**
 * 检测留言输入
 */
function checkInput(obj){
	var country1 = $("#country1");
	var country1Sellected = $("#country1 option[value='" + country1.val() + "']");
	var country = $(obj.country);
	var state1 = $("#state1");
	var state1Sellected = $("#state1 option[value='" + state1.val() + "']");
	var state = $(obj.state);
	var city1 = $("#city1");
	var city1Sellected = $("#city1 option[value='" + city1.val() + "']");
	var city = $(obj.city);
	var name = obj.name;
	var email = obj.email;
	var subject = obj.subject;
	
	country.val(country1Sellected.text());
	state.val(state1Sellected.text());
	city.val(city1Sellected.text());
	
	if(name.value.length<2){
		alert("需要姓名");
		name.focus();
		return false;
	}

	if(email.value.length<6){
		alert("需要电子邮件");
		email.focus();
		return false;
	}
	if(/^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+$/.test(email.value) == false){
		alert("邮件地址错误");
		email.focus();
		return false;
	}

	if(subject.value.length<2){
		alert("需要标题");
		subject.focus();
		return false;
	}
	obj.action = "submit.php";
	return true;
}

/**
 * 修改地址栏地址，对于不存在的建则添加它
 *  参数：一个键值对，指定的分隔符（可选）
 *  注意：本函数调用了request 函数
 */
function setLocation(map,delimiter){
	if(typeof delimiter == "undefined")delimiter = "#";
    var loc = location.hash || location.search;
    for(var key in map){
        var value = map[key];
        
        if(!loc){
            loc = delimiter + key + "=" + value;
        }else if(!request(key,loc)){
            loc += "&" + key + "=" + value;
        }else{
            loc = setLocation_one(key,value,loc);
        }
    }
    location.href = loc;
    
    function setLocation_one(key, value, urlParam){
        var url = urlParam || location.hash || location.search;
        if(url==null)return null;
        
        var startIndex, stopIndex;
        startIndex = url.search(key) + key.length;
        if(startIndex==key.length-1)return null;
        startIndex = url.indexOf("=",startIndex) + 1;
        if(startIndex==0)return null;
        stopIndex = url.indexOf("&",startIndex);
        stopIndex = stopIndex==-1?url.length:stopIndex;
        
        var head = url.substr(0,startIndex);
        var body = value;
        var rear = url.substr(stopIndex);
        
        return head + body + rear;
    }
}

/**
 * 等同于ASP 的Request.QueryString 函数
 *  参数urlParam 可选，去指定的字符串中分析Key
 */
function request(key, urlParam){
    if(key==null)return null;
    var url = urlParam || location.hash || location.search;
    if(url==null)return null;
    
    var startIndex, stopIndex;
    startIndex = url.search(key) + key.length;
    if(startIndex==key.length-1)return null;
    startIndex = url.indexOf("=",startIndex) + 1;
    if(startIndex==0)return null;
    stopIndex = url.indexOf("&",startIndex);
    stopIndex = stopIndex==-1?url.length:stopIndex;
    
    return url.substring(startIndex,stopIndex);
}

/**
 * 添加当前地址和到收藏夹
 */
function addFav(){
	var url = location.href;
	var title = document.title;

	try{
		window.external.addFavorite(url, title);
    }catch (e){
    	try{
			window.sidebar.addPanel(title, url, "");
        }catch (e){
			alert("加入收藏失败，有劳您手动添加。");
        }
	}
}

/**
 * 设为首页
 * @param obj - 一个dom元素，可能是这样 onclick="javascript:setHome(this, http://*.*)"
 * @param vrl - 想要设为主页的地址
 */
function setHome(obj, vrl) {
	try {
		obj.style.behavior='url(#default#homepage)';
		obj.setHomePage(vrl);
	} catch(e) {
		if(window.netscape) {
			try {
				netscape.security.PrivilegeManager.enablePrivilege("UniversalXPConnect");  
			} catch (e) { 
				alert("抱歉！您的浏览器不支持直接设为首页。请在浏览器地址栏输入“about:config”并回车然后将[signed.applets.codebase_principal_support]设置为“true”，点击“加入收藏”后忽略安全提示，即可设置成功。");  
			}
			var prefs = Components.classes['@mozilla.org/preferences-service;1'].getService(Components.interfaces.nsIPrefBranch);
			prefs.setCharPref('browser.startup.homepage', vrl);
		}
	}
}

/**
 * 设置Cookie
 */
function setCookie(c_name,value,expiredays){
    var exdate=new Date()
    exdate.setDate(exdate.getDate()+expiredays)
    document.cookie=c_name+ "=" +escape(value)+((expiredays==null) ? "" : ";expires="+exdate.toGMTString())
}

/**
 * 读取Cookie
 */
function getCookie(c_name){
    if(document.cookie.length>0){
        c_start=document.cookie.indexOf(c_name + "=");
        if (c_start!=-1){ 
            c_start=c_start + c_name.length+1 ;
            c_end=document.cookie.indexOf(";",c_start);
            if (c_end==-1) c_end=document.cookie.length
                return unescape(document.cookie.substring(c_start,c_end));
        }
    }
    return null;
}

/**
 * 比例限制图片
 *
 * @param   imgObject (Object): 要限制的图片
 *          width (Number): (可选) 要限制的宽度(不可与height 同时为空)
 *          height (Number): (可选) 要限制的高度(不可与width 同时为空)
 *          full (Boolean): (可选) 是否装满在高和宽限定的区域内，
 *          不失真（丧失溢出的右边部分的宽度），默认为true 
 *                              高度或宽度中的任何一个为空，她的值即为false
 */
function scalePic(imgObject, width, height, full){
	if(typeof imgObject == "number")imgObject = $("img").get(imgObject);
	if(typeof imgObject != "object")return;
	if(typeof width == "undefined")width = 0;
	if(typeof height == "undefined")height = 0;
    if(!width && !height)return;
    if(typeof full == "undefined")full = true;
    if(!width || !height)full = false;
	
	//是否正确获得图片，IE中有img 的onload 事件过早触发而不能获得正确的图片的BUG
	if(!$(imgObject).width() || !$(imgObject).height()){
	    var param = "scalePic("
	    param += $("img").index($(imgObject))
	    if(!width){
	        param += ",0";
	    }else{
	        param += "," + width;
	    }
	    if(!height){
	        param += ",0";
	    }else{
	        param += "," + height;
	    }
	    if(!full)param += ",false";
	    param += ")"
	    setTimeout(param, 10);
	    return;
	}
	
    scaleW();
    scaleH();
    
    //将图片装满限定区域，并且不再调整
    if(full){
        var imgWrap = "<div style=\"";
            imgWrap += "margin:0px; padding:0px;"
            imgWrap += "width:" + width + "px;";
            imgWrap += "height:" + height + "px;";
            imgWrap += "overflow:hidden; float:left;";
        imgWrap = "\"></div>";
        $(imgObject).wrap(imgWrap);
        return;
    }
	
    if($(imgObject).width()>width)scaleW();
    if($(imgObject).height()>height)scaleH();
	
	//进行宽度适应
    function scaleW(){
        if(!width || width==$(imgObject).width())return;
	    
        var scale = $(imgObject).width() / $(imgObject).height();
        var x = $(imgObject).width() - width;
        var oldH = $(imgObject).height();

        $(imgObject).width(width);
        
        if(!height || isNaN(scale) || !scale)return;
        $(imgObject).height(oldH - x / scale);
    }
	
	//进行高度适应
    function scaleH(){
        if(!height || height==$(imgObject).height())return;
	    
        var scale = $(imgObject).width() / $(imgObject).height();
        y = $(imgObject).height() - height;
	    var oldW = $(imgObject).width();
	    
        $(imgObject).height(height);
	    
        if(!width || isNaN(scale) || !scale)return;
        $(imgObject).width(oldW - y * scale);
    }
}

/**
 * 限制文字
 *	参数：jQuery:要限制的文字的区域对象，number:限制字数
 */
function limitr_onlyText(css, number){
	var jq = $(css);
	jq.each(function(){
		if($(this).text().length>number){
			$(this).html($(this).text().substr(0,number) + "...");
		}
	});
}
