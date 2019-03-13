//登录与注册

//********************************************************************
$(function(){
	//绑定登录单击事件
	$("#regist_login").click(login_action);
	$("#regist_username").blur(checkUserName);
	$("#regist_password").blur(checkPassword);
	$("#regist_comfirm_password").blur(checkComfirm_Password);
	
	
	//页面加载时，隐藏输入提示框
	$("#nameS").hide();
	$("#nameP").hide();
	$("#nameCP").hide();
});
function login_action(){
	//console.log("绑定成功")
	var pass=checkHttp()+checkUserName()+checkPassword()+checkComfirm_Password();
	if(pass!=4){
		return;
	}
	var name=$("#regist_username").val();
	var password=$("#regist_password").val();
	password = CryptoJS.MD5(password).toString();
	var url="pages/user/insert.action";
	var param={user_name:name,password:password};
	$.post(url,param,function(result){
		if(result.state==0){
			alert("注册成功");
			location.href='login2.jsp';
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
	var username=$("#regist_username").val();
	if(username==null||username==""){
		//alert("用户名不能为空");
		$("#nameS").show();
		$("#nameS").html("用户名不能为空")
		return false;
	}
	var reg=/^\w{3,10}$/;
	if(!reg.test(username)){
		$("#nameS").show();
		$("#nameS").html("用户名为3-10位数字或英文字母组成");
		return false;
	}
	$("#nameS").hide();
	return true;
};
//验证密码
function checkPassword(){
	var password=$("#regist_password").val();
	if(password==null||password==""){
		$("#nameP").show();
		$("#nameP").html("用户密码不能为空");
		return false;
	}
	var reg=/^\w{6}$/;
	if(!reg.test(password)){
		$("#nameP").show();
		$("#nameP").html("密码为数字，字母，组成的6位数");
		return false;
	}
	$("#nameP").hide();
	return true;
};
//验证确认密码
function checkComfirm_Password(){
	var password=$("#regist_password").val();
	var comfirm_password=$("#regist_comfirm_password").val();
	if(comfirm_password==null||comfirm_password==""){
		$("#nameCP").show();
		$("#nameCP").html("确认密码不能为空");
		return false;
	}
	if(password==null||password==""){
		$("#nameCP").show();
		$("#nameCP").html("用户密码不能为空");
		return false;
	}
	var reg=/^\w{6}$/;
	if(!reg.test(password)){
		$("#nameCP").show();
		$("#nameCP").html("密码为数字，字母，组成的6位数");
		return false;
	}
	if(!password==comfirm_password){
		$("#nameCP").show();
		$("#nameCP").html("两次输入的密码不一致");
		return false;
	}
	$("#nameCP").hide();
	return true;
}
//检查是否同意协议
function checkHttp(){
	if($("input[type='checkbox']").is(':checked')){
		return true;
	}
	alert("必须同意注册协议才能注册");
	return false;
	
}