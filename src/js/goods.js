jQuery(function($){
	//加载头部
	$('.head').load('head.html',function(){
		if(getCookie('usName')){   //判断用户是否登录
			$('#login').html('Hi'+ getCookie('usName') + '欢迎回嘉！')
			$('a','#rigister').attr('href','login.html').html('[退出]').click(function(){
				var d = new Date('2017-11-1');
				$('#login').attr('href','login.html').html('[登录]')
				$('a','#rigister').attr('href','rigister.html').html('[欢迎注册]');
				setCookie('usName','',new Date('2017-11-1'),'/');
			});
		}
		if(getCookie('$count')){   //判断cookie是否存在，获取购物车数量
			$('.cart_num').html(getCookie('$count'));
		}
	});
	//加载尾部
	$('.foot').load('foot.html');
	$('.content1_nav').load('nav.html',function(){
		$('.nav').find('h2').click(function(){
			$('.nav_list').toggle();
		});
	});
	//懒加载效果
	var $goodslist = $('.goods');   //保存对象
	var $ul = $('<ul/>').addClass('list');  //创建ul
	//设置全局ajax
	$.ajaxSetup({
		url:"../../data/goodslist.json",   //获取json地址
		success:function(res){   //请求成功后执行
			$.each(res,function(idx,item){   //遍历获取的对象
				var $li = $('<li/>');   //创建li
				var $a =$('<a/>').attr('href',item.url);   //创建a标签，添加商品的url
				$('<img/>').attr('src',item.imgurl).appendTo($a);  //创建img标签，存放商品图片
				$a.appendTo($li);   //追加到li中
				$('<p/>').addClass('title').html('<a href='+ item.url +'>'+ item.title +'</a>').appendTo($li);   //创建p标签，保存商品标题
				var $cost = $('<p/>').addClass('cost');   //创建p标签
				$('<em/>').html("&yen;"+item.price).appendTo($cost);    //创建em标签，保存商品的价格
				$('<i/>').html('参考价：'+item.cost).appendTo($cost);     //创建i标签保存商品的原价
				$('<button/>').html('<a href="detail.html">立即购买</a>').appendTo($cost);    //创建按钮并追加到li中
				$cost.appendTo($li);   //追加到li中
				//将li添加到ul中
				$ul.append($li);  
			});
			$ul.appendTo($goodslist);  //将ul追加到页面中
		}
	});
	//让页面加载完马上触发ajax加载数据
	$.ajax();
	var n = 0;  //初始化懒加载的次数
	//滚动事件触动懒加载
	var navTop = $('.content1_nav').offset().top;
	$(window).on('scroll',function(){
		var scrollTop = $(window).scrollTop();   //滚动条距离顶部的距离
		if(scrollTop >= $(document).height()-$(window).height()-100){  //当滚动条快到底部时
			n++;
			if(n < 10){  //懒加载十次
				$.ajax();
			}
			
		}
		if(scrollTop >= navTop){
			$('.content1_nav').addClass('scroll');
		}else{
			$('.content1_nav').removeClass('scroll');
		}
	});
});