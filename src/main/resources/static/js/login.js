//登录与注册

//********************************************************************
$(function(){
	//绑定登录单击事件
	$("#login").click(login_action);
	//$("#name").focus().blur(checkUserName);
	$("#username").blur(checkUserName);
	$("#password").blur(checkPassword);
	
	
	//页面加载时，隐藏输入提示框
	$("#loginname_message").hide();
	$("#loginpassword_message").hide();
});
function login_action(){
	
	//console.log("绑定成功")
	var pass=checkUserName()+checkPassword();
	if(pass!=2){
		return;
	}
	var name=$("#username").val();
	var password=$("#password").val();
	password = CryptoJS.MD5(password).toString();
	var url="/login";
	var param={user_name:name,password:password};
	$.post(url,param,function(result){
		if(result.state==0){
			console.log("登录成功");
			location.href='/index.html';
		}
		else if(result.state==1){
			//用户名异常
			alert(result.message);
		}
		else if(result.state==2){
			//用户密码异常
			alert(result.message);
		}else{
			//其它异常
			alert(result.message);
		}
	});
};
//验证用户名
function checkUserName(){
	var username=$("#username").val();
	if(username==null||username==""){
		alert("用户名不能为空");
		return false;
	}
	var reg=/^\w{3,10}$/;
	if(!reg.test(username)){
		alert("用户名格式错误");
		return false;
	}
	return true;
};
//验证密码
function checkPassword(){
	var password=$("#password").val();
	if(password==null||password==""){
		alert("用密码不能为空");
		return false;
	}
	var reg=/^\w{6}$/;
	if(!reg.test(password)){
		alert("密码为数字，字母，组成的6位数");
		return false;
	}
	return true;
};
