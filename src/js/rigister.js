jQuery(function(){
	//将foot.html页面内容加载到尾部
	$('.foot').load('foot.html');
	//设置变量用于验证注册是否成功
	var a = b = c = false,d = true;
	//切换邮箱/手机号注册页面（更换文本）
	$('#email').click(function(){
		//清空输入框、隐藏提示和清空按钮
		$('input').val('');
		$('.hint').hide();
		$('div','.contain').hide();
		if($(this).html() == '手机注册'){
			$(this).html('邮箱注册')
			$('input').eq(0).attr('placeholder','请输入手机号');
			
		}else{
			$(this).html('手机注册')
			$('input').eq(0).attr('placeholder','请输入邮箱');
			
		}
		return false;    //阻止页面跳转
	});
	//给手机号/邮箱输入框添加失去焦点事件
	$('input').eq(0).blur(function(){
		if($('#email').html() == '手机注册'){   //邮箱验证
			if(/^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/.test($(this).val())){   //判断手机号是否合法
				a = true;
				$('.hint').eq(0).hide();  //隐藏提示
			}else{
				$('.hint').eq(0).html('邮箱不合法').show();   //显示提示
			}
		}else{   //手机号验证
			if(/^1\d{10}$/.test($(this).val())){   //判断手机号是否合法
				a = true;
				$('.hint').eq(0).hide();
			}else{
				$('.hint').eq(0).html('手机号不合法').show();
			}
		}
		
	});
	$('.txt').each(function(idx,ele){   //当输入框内容不为空时显示删除全部按钮，否则隐藏按钮
		ele.oninput = function(){
			if($(this).val()){
				$(this).siblings('div').show();
			}else{
				$(this).siblings('div').hide();
			}
			
		}
		
	})
	$('div','.contain').click(function(){   //点击清空按钮清空对应输入框
		$(this).siblings('input').val("");
	})
	
	//给密码框添加失去焦点事件
	$('input').eq(1).blur(function(){
		if(/^\D\w{7,16}$/.test($(this).val())){   //判断密码是否合法
			b = true;
			$('.hint').eq(1).hide();
		}else{
			$('.hint').eq(1).show();
		}
	});
	//给密码框添加失去焦点事件
	$('input').eq(2).blur(function(){
		if($(this).val() == $('input').eq(1).val()){   //判断两次输入密码是否一致
			c = true;
			$('.hint').eq(2).hide();
		}else{
			$('.hint').eq(2).show();
		}
	});
	//添加多选框焦点事件
	$('input').eq(3).blur(function(){
		if(this.checked){   
			$('.hint').eq(3).hide();
		}else{    // 若未选中，则显示提示信息
				d = false;
			$('.hint').eq(3).show();
		}
	});
	//给获取登录按钮添加点击事件
	var nameArr,nameObj = {};  //设置全局变量；
	$('button').eq(0).click(function(){
		if(a && b && c && d){  // 当以上事件都为真时，提示注册成功，否则失败
			//判断cookie是否存在
			if(getCookie('username')){   //如果cookie存在
				
				nameArr = JSON.parse(getCookie('username'));   //解析cookie
				console.log(nameArr);
				for(var i=0;i<nameArr.length;i++){   //遍历数组
					if(nameArr[i].username == $('input').eq(0).val()){   //如果用户名在数组对象中存在则显示提示、退出循环
						$('.tip').show();
						alert('用户名已注册！');
						break;
						return false;
					}
				}
				if(i >= nameArr.length){   //当用户名不存在对应对象 隐藏提示、对新对象添加属性并追加到数组中
					$('.tip').hide();
					nameObj = {'username':$('input').eq(0).val(),'psw':$('input').eq(1).val()}
					nameArr.push(nameObj);
					alert('注册成功！');
				}
			}
			else{  //如果cookie不存在，隐藏提示，令数组等于空，对新对象添加属性并追加到数组中
				$('.tip').hide();
				nameArr = [];
				nameObj = {'username':$('input').eq(0).val(),'psw':$('input').eq(1).val()}
				nameArr.push(nameObj);
				alert('注册成功！');
			}
			nameArr = JSON.stringify(nameArr);
			var s = new Date('2017-11-1')  //设置cookie过期日期
			var username = setCookie('username',nameArr,s,'/');   //设置用户名cookie
		}else{
			alert("注册失败！")
			return false;   //注册失败阻止跳转
		}
	});	
});
