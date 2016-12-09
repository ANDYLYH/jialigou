jQuery(function($){
	//加载页面头部
	$('.head').load('html/head.html',function(){
		//更改头部属性
		$('#logo').attr('href','index.html').find('img').attr('src','img/ladygood.png');
		$('#login').find('a').attr('href','html/login.html');
		$('#rigister').find('a').attr('href','html/rigister.html');
		$('form').attr('action','html/goods.html');
		$('.cart').find('a').attr('href','html/Cart.html');
		if(getCookie('usName')){  //判断用户是否登录
			$('#login').html('Hi'+ getCookie('usName') + '欢迎回嘉！')
			$('a','#rigister').attr('href','html/login.html').html('[退出]').click(function(){
				var d = new Date('2017-11-1');
				$('#login').attr('href','html/login.html').html('[登录]')
				$('a','#rigister').attr('href','html/rigister.html').html('[欢迎注册]');
				setCookie('usName','',new Date('2017-11-1'),'/');
			});
		}
		if(getCookie('$count')){   //读取购物车数量
			$('.cart_num').html(getCookie('$count'));
		}
	});
	//加载页面尾部
	$('.foot').load('html/foot.html',function(){
		//更改尾部属性
		$('.foot_info').find('img').attr('src','css/img/foot_info.jpg');
		$('.help_2d').find('img').attr('src','css/img/jlg_2d.jpg');
		$('.call').find('img').attr('src','css/img/call_rz.jpg');
		$('.txt').find('img').attr('src','css/img/pic.gif');
		$('.rz').find('img').eq(0).attr('src','css/img/kx.jpg');
		$('.rz').find('img').eq(1).attr('src','css/img/360.jpg');
		$('.rz').find('img').eq(2).attr('src','css/img/alipay_s.gif');
		$('.rz').find('img').eq(3).attr('src','css/img/hn110_s.gif');
	});
	//banner调用轮播图插件
	$('.banner').pcarousel();
	//商品目录效果
	$(".list_content").on('mouseenter',function(){  //鼠标移入时更改对应字体颜色，显示对应二级菜单
		$(this).find('a').not('.title').addClass("phover");
		$(this).find('.list_content_list2').show();
	}).on('mouseleave',function(){   //鼠标移出时更改字体颜色，隐藏对应二级菜单
		$(this).find('a').not('.title').removeClass();
		$(this).find('.list_content_list2').hide();
	});
	//切换昨日/今日列表
	$('.days').on('click','li',function(){
		$(this).addClass('active').siblings('li').removeClass();
		var index = $(this).index();
		$('.hot_show').eq(index).show().siblings('.hot_show').hide();
	})
	//鼠标移入ul时显示向左向右按钮
	$('.hot_list').on('mouseenter',function(){
		$(this).find('.prev').show();
		$(this).find('.next').show();
	}).on('mouseleave',function(){   //鼠标移出时隐藏按钮
		$(this).find('.prev').hide();
		$(this).find('.next').hide();
	});
	//向左切换列表
	$('.prev').each(function(){
		$(this).click(function(){
			$(this).pClick('prev');
		});
	});
	//向右切换按钮
	$('.next').each(function(){
		$(this).click(function(){
			$(this).pClick('prev');
		});
	});
	//固定条二维码
	$('span',"#qr").click(function(){
		$('#qr').hide();
	});
});


