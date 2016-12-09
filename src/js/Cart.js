jQuery(function($){
	//加载头部
	$('.head_nav').load('head.html div.head_nav_content',function(){
		if(getCookie('usName')){   //判断是否已登录
			$('#login').html('Hi'+ getCookie('usName') + '欢迎回嘉！')
			$('a','#rigister').attr('href','login.html').html('[退出]').click(function(){
				var d = new Date('2017-11-1');
				$('#login').attr('href','login.html').html('[登录]')
				$('a','#rigister').attr('href','rigister.html').html('[欢迎注册]');
				setCookie('usName','',new Date('2017-11-1'),'/');
			});
		}
	});
	$('.foot').load('foot.html');   //加载尾部
	//设置cookie过期日期
	var d = new Date('2016-11-1');
	//cookiede 读取
	var str;
	if(getCookie('goods')){
		str = JSON.parse(getCookie('goods'));
		for(var i in str){
			createLi(str[i]);
		}
	}
	
	//创建li存放商品
	function createLi(obj){
		//添加相同商品时，删除前一个相同商品列表
		$('li','.goods_list').each(function(){
			if($(this).find('.goods_title i').html() == obj.id){
				$(this).remove();
			}
		});
		var $li = $('<li/>')   //创建li
		var $p1 = $('<p/>').addClass('btn');   //创建p标签并添加class名（全选）
		$('<input type="checkbox" class="check_item" />').appendTo($p1);   //创建多选框并追加到$p1中
		$('<span/>').appendTo($p1);   //创建span标签并追加到$p1中
		$p1.appendTo($li);   //将$p1追加到$li中（多选框）
		var $a = $('<a/>').attr('href','detail.html').addClass('_img');   //创建a标签并添加class名
		$('<img/>').attr('src',obj.img).appendTo($a);   //创建img标签并追加到$a中（商品图片）
		$a.appendTo($li);   //将$a追加到$li中（商品图片）
		var $p2 = $('<p/>').addClass('goods_title');  //创建p标签并追加到$a中
		$('<a/>').attr('href','detail.html').html(obj.title).appendTo($p2);//创建a标签并追加到$p2中（商品标题）
		$('<span/>').html('<i>'+obj.id+'</i>').appendTo($p2);//创建span标签并追加到$p2中（供货号）
		$('<span/>').html('颜色/尺码 ：').appendTo($p2);//创建span标签并追加到$p2中（颜色尺码）
		$('<span/>').html(obj.title).appendTo($p2);//创建span标签并追加到$p2中（商品标题）
		$p2.appendTo($li);//将$p2追加到$li中（商品类型/标题）
		$('<span/>').addClass('price').html('&yen;<i>'+obj.price+'</i>').appendTo($li);//创建span标签追加到$li中(商品价格) 
		var $p3 = $('<p/>').addClass('count');//创建p标签并添加class名（数量增减）
		$('<i/>').html('-').addClass('cut').appendTo($p3);  //创建i标签并追加到$p3中（减号）
		$('<span/>').html(obj.count).appendTo($p3);   //创建span标签并追加到$p3中（商品数量）
		$('<i/>').html('+').addClass('add').appendTo($p3); //创建i标签并追加到$p3中（加号）
		$p3.appendTo($li);   //将$p3追加到$li中（商品数量）
		$('<span/>').addClass('jljia').html('&yen;<i>'+obj.price+'</i>').appendTo($li); //创建span标签追加到$li中(商品价格) 
		var $p4 = $('<p/>').addClass('operate'); //创建p标签并添加class名
		$('<span/>').html('加入收藏夹').appendTo($p4);  //创建span标签并追加到$p4中(加入收藏夹)
		$('<span/>').html('删除').addClass('del').appendTo($p4); //创建span标签并追加到$p4中（删除）
		$p4.appendTo($li);  //将$p4追加到$li中（操作）
		
		$li.appendTo('.goods_list');   //将$li追加到页面的ul中
		//当购物车不为空时隐藏.emp
		tips();
		total();
	}
	//显示隐藏.emp(购物车为空提示)
	function tips(){
		if($('li','.goods_list').length > 0){
			$('.emp').hide();
		}else{
			$('.emp').show();
		}
	}
	
	//复选框的选取
	$('.goods_list').on('click','.check_item',function(){
		if(this.checked){
			$(this).siblings('span').addClass('active');
		}else{
			$(this).siblings('span').removeClass('active');
		}
		
	});
	//商品数量加减 改变cookie
	$('.goods_list').on('click','.cut',function(){
		var $count = $(this).siblings('span').html();  //保存商品数量
		if($count == 0){  //控制数量不能小于0
			$(this).siblings('span').html(0);
		}else{   //数量减一
			$(this).siblings('span').html(--$count);
		}
		str = JSON.parse(getCookie('goods'));
		for(var i in str){  //遍历cookie数组更改商品数量
			if(str[i].id == $(this).closest('li').find('.goods_title i').html()){
				var num = parseInt(getCookie('$count')) - str[i].count;
				str[i].count = $count;
				num += $count;
				setCookie('$count',num,d,'/');
				
				setCookie('goods',JSON.stringify(str),d,'/')
			}
		}
		total();
	});
	$('.goods_list').on('click','.add',function(){
		var $count = $(this).siblings('span').html();  //保存商品数量
		$(this).siblings('span').html(++$count);  //数量加1
		str = JSON.parse(getCookie('goods'));
		for(var i in str){//遍历cookie数组更改商品数量
			if(str[i].id == $(this).closest('li').find('.goods_title i').html()){
				var num = parseInt(getCookie('$count')) - str[i].count;
				str[i].count = $count;
				num += $count;
				setCookie('$count',num,d,'/');
				setCookie('goods',JSON.stringify(str),d,'/')
			}
		}
		total();
	});
	//删除商品	
	$('.goods_list').on('click','.del',function(){
		$(this).closest('li').remove();
		str = JSON.parse(getCookie('goods'));
		for(var i in str){
			if(str[i].id == $(this).closest('li').find('.goods_title i').html()){
				str.splice(i,1);
				setCookie('goods',JSON.stringify(str),d,'/');
			}
		}
		var cha = parseInt(getCookie('$count')) - $(this).parents('li').find('.count span').html();
		setCookie('$count',cha,d,'/');
		tips();
		total();
	});
	
	//全选
	$('.all').on('click',function(){
		$(":checkbox").each(function(){
			this.checked = true;
			$('span','.btn').addClass('active');
		});

	});
	//删除选中商品
	$('span','.account').eq(0).click(function(){
		$(":checkbox",'.btn').each(function(){
			if(this.checked == true){
				$(this).closest('li').remove();
				str = JSON.parse(getCookie('goods'));
				for(var i in str){
					if(str[i].id == $(this).closest('li').find('.goods_title i').html()){
						str.splice(i,1);
						setCookie('goods',JSON.stringify(str),d,'/');
						console.log(getCookie('goods'));
					}
				}
				var cha = parseInt(getCookie('$count')) - $(this).parents('li').find('.count span').html();
				setCookie('$count',cha,d,'/');
			}
		});
		tips();
		total();
	});
	//清空购物车
	$('span','.account').eq(1).click(function(){
		$(":checkbox",'.btn').each(function(){
			$(this).closest('li').remove();
			str = JSON.parse(getCookie('goods'));
			str = '';
			setCookie('goods',str,d,'/');
			setCookie('$count',0,d,'/');
		});
		tips();
		total();
	});
	total();
	//计算总价
	function total(){
		var $total=0,$_total=0;
		$('.price').each(function(){
			$total += $(this).find('i').html()*$(this).siblings('.count').find('span').html();
		});
		$('.jljia').each(function(){
			$_total += $(this).find('i').html()*$(this).siblings('.count').find('span').html();
		});
		
		$('i','.total').html($total.toFixed(2))
		$('i','._total').html($_total.toFixed(2));
	}
	//声明一个空对象、一个数组
	var $pro ={},proString;
	//猜你喜欢
	$('button','.like_list').on('click',function(){
		var name = $(this).siblings('p').attr('class');
		//3.设置cookie
		if(getCookie('goods')){ //判断cookie是否存在
			proString = JSON.parse(getCookie('goods'));   //将cookie字符串转换成数组
			for(var i=0;i<proString.length;i++){   //遍历数组
				if(proString[i].id == name){   //如果存在对应的商品对象
					proString[i].count = proString[i].count + 1;  //商品数量加1
					break; //退出循环
				}
			}
			if(i > proString.length-1){   //当数组不存在对应的对象时，创建一个对象并追加到数组的最后
				$pro ={'id':name,'title':$(this).siblings('p').html(),'img':$(this).siblings('a').find('img').attr('src'),'price':$(this).siblings('span').find('i').html(),'count':1};
				proString.push($pro);
			}
		}else{  //如果cookie不存在则设置一个空数组追加对象
			proString = [];
			$pro ={'id':name,'title':$(this).siblings('p').html(),'img':$(this).siblings('a').find('img').attr('src'),'price':$(this).siblings('span').find('i').html(),'count':1};
			proString.push($pro);
		}
		proString = JSON.stringify(proString);  //将数组转换为字符串
		var cookieText = setCookie('goods',proString,d,'/');   //设置cookie
		var $count = 0;   //  初始化数值
		if(getCookie('$count')){   //判断保存购物车数量的cookie是否存在
			$count = parseInt(getCookie('$count'));
		}
		var total = setCookie('$count',++$count,d,'/');   //设置购物车cookie
		var str1 = JSON.parse(getCookie('goods'));   //解析cookie
		for(var i in str1){   //循环创建li
			createLi(str1[i]);
		}
	});
	
});