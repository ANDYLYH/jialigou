$.prototype.pcarousel = function(){
	var $self = this;
	
	//初始化
	var $ul = $('ul',$self);
	var $li = $('li',$ul);
	var len = $li.length;
	var timer;
	var index = 0;

	// 鼠标移入移出
	$self.on('mouseenter',function(){
		clearInterval(timer);
	}).on('mouseleave',function(){
		timer = setInterval(function(){
			index++;
			showPic();
		},3000);
	})

	// 模拟事件（手动触发一个事件）
	.trigger('mouseleave');
	
	//添加按钮
	$page = $('<div/>').addClass('page');
	for(var i=1;i<=len;i++){
		var $span = $('<span/>');
		if(i==1){
			$span.addClass('active');
		}
		$span.text(i).appendTo($page);
	}
	$page.appendTo($self);

	// 点击页码切换
	$page.on('click','span',function(){
		index = $(this).index();
		showPic();
	});
	
	
	function showPic(){
		
		if(index >= len){
			index = 0;
		}
			$ul.children().eq(index).animate({opacity:1}).siblings('li').animate({opacity:0});

		// 页码高亮效果
			$page.children().removeClass().eq(index).addClass('active');
	}
}
var index = 0;
//前后翻页
$.prototype.pClick = function(type){
	//初始化
	var $div =this.closest('div.hot_show');
	var $ul = $('ul',$div);
	var len = $ul.length;
	//判断前后翻页
	if(type == 'prev'){
		if(index == 0){
			index = len - 1;
		}else{
			index--;
		}
	}else if(type == 'next'){
		if(index == len - 1){
			index = 0;
		}else{
			index ++;
		}
	}
	 //设置高亮
	$ul.removeClass('active').eq(index).addClass('active');
	
	
}
