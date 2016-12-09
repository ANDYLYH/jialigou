jQuery(function(){
	//加载页面头部
	$('.head').load('head.html',function(){
		//判断是否已经登录
		if(getCookie('usName')){
			$('#login').html('Hi'+ getCookie('usName') + '欢迎回嘉！')
			$('a','#rigister').attr('href','login.html').html('[退出]').click(function(){
				var d = new Date('2017-11-1');
				$('#login').attr('href','login.html').html('[登录]')
				$('a','#rigister').attr('href','rigister.html').html('[欢迎注册]');
				setCookie('usName','',new Date('2017-11-1'),'/');
			});
		}
		//判断购物车是否有商品
		if(getCookie('$count')){
			$('.cart_num').html(getCookie('$count'));
		}
		//保存购物车里的数量
		var $count = parseInt($('.cart_num').html());
		
		//给按钮绑定点击事件
		$(".cart_buys").click(function(){
			
			var $li = $(this).closest('li');
			var $cruttenli = $('li','.bigimg').eq(0);
			var $copyli = $cruttenli.clone();   //复制li
			
			var startPos = $cruttenli.offset();   //获取li坐标
			var startWidth = $cruttenli.width();  //获取li宽度
			
			//给复制图片添加一个样式
			$copyli.css({
				position: "absolute",
				left:startPos.left,
				top:startPos.top,
				width:startWidth
			});
			
			//把复制的图片放到body中来
			$copyli.appendTo("body");
			
			var cartPos = $(".cart").offset();
			//动画图片飞入购物车
			$copyli.animate({left:cartPos.left,top:cartPos.top,width:0,height:0,opacity:0},1000,function(){
				
				//1.删除复图片
				$copyli.remove();
				//2.弹出对话框
				$('.tips').show().find('span').click(function(){
					$(this).closest('.tips').hide();
				});
				//3秒后关闭对话框
				setTimeout(function(){
					$('.tips').hide();
				},3000)
				//3.更改购物车数量
				$count += parseInt($('.count_num').find('input').val());
				$('.cart_num').html($count);
				//3.设置cookie
				//声明一个空对象、一个数组
				var $pro ={},proString;
				if(getCookie('goods')){ //判断cookie是否存在
				proString = JSON.parse(getCookie('goods'));   //将cookie字符串转换成数组
					for(var i=0;i<proString.length;i++){   //遍历数组
						if(proString[i].id == $('.G01').attr('class')){   //如果存在对应的商品对象
							proString[i].count = proString[i].count + parseInt($('.count_num').find('input').val());  //商品数量增加
							break;//退出循环
						}
					}
					if(i > proString.length-1){ //当数组不存在对应的对象时，创建一个对象并追加到数组的最后
						$pro ={'id':$('.G01').attr('class'),'title':$('span','.alt').html(),'img':$cruttenli.find('img').attr('src'),'price':$('em','.price').html(),'count':parseInt($('input','.count_num').val())};
						proString.push($pro);
					}
				}else{ //如果cookie不存在则设置一个空数组追加对象
					proString = [];
					$pro ={'id':$('.G01').attr('class'),'title':$('span','.alt').html(),'img':$cruttenli.find('img').attr('src'),'price':$('em','.price').html(),'count':parseInt($('input','.count_num').val())};
					proString.push($pro);
				}
				var d = new Date('2017-11-1');   //设置cookie过期时间
				proString = JSON.stringify(proString);    //将数组转换为字符串
				var cookieText = setCookie('goods',proString,d,'/');  //设置商品cookie
				var total = setCookie('$count',$count,d,'/');   //设置购物车数量cookie
		 	});
	 
		});
	});
	//加载页面尾部
	$('.foot').load('foot.html');
	//加载页面导航
	$('.content1_nav').load('nav.html',function(){
		$('.nav').find('h2').click(function(){
			$('.nav_list').toggle();
		});
	});
	//鼠标移到小图片切换对应大图片
	$('.smallimg').find('img').on('mouseenter',function(){
		var index = $(this).index();
		$('li','.bigimg').hide().eq(index).show();
	});
	//保存商品数量
	var $num = $('.count_num').find('input').val();
	//商品数量减少
	$('.count_num').find('i:first').click(function(){
		if($num == 0){
			$('.count_num').find('input').val(0);
		}else{
			$('.count_num').find('input').val($num--);
		}
		
	});
	//商品数量增加
	$('.count_num').find('i:last').click(function(){
		$('.count_num').find('input').val($num++);
	});
	//切换商品介绍
	$('li','.info_nav').click(function(){
		$(this).addClass('hover').siblings('li').removeClass();
		var index = $(this).index();
		$('li','.change').hide().eq(index).show();
	});
	//添加放大镜
	$('li','.bigimg').each(function(){
			$(this).pzoom();
	});
	//吸顶菜单
	var navTop = $('.content1_nav').offset().top;
	//滚动事件
	$(window).on('scroll',function(){
		var scrollTop = $(window).scrollTop();   //滚动条距离顶部的距离
		//当页面滚动高度大于等于导航栏的高度时触发吸顶
		if(scrollTop >= navTop){
			$('.content1_nav').addClass('scroll');
		}else{
			$('.content1_nav').removeClass('scroll');
		}
	});
});
