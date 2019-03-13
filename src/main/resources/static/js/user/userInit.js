//我的用户管理初始化
//
var model={};
//成功状态常量
var SUCCESS=0;
$(function(){
	//直接开始加载user列表
	loadUserInfo_action();
	//模糊分页查询
	$(".search_btn").on('click',loadUserInfo_action);
	//给每行数据绑定点击显示active事件
	//添加新用户
	$(".alert_add_user").on('click',add_user_action);
	//编辑用户alert_edit_user
	$(".alert_edit_user").on('click',edit_user_action);
	//批量删除用户
	$(".user_delete").on('click',delete_user_action);
	//给每行数据绑定点击显示active事件
	$("tbody").on('click','tr',show_active);
	//动态加载功能弹框数据
	$("#user_edit").on('click',show_editInfo_action);
	//给add用户添加鼠标变化事件
	$("#alert_username").blur(checkUserName);
	//给add用户添加鼠标变化事件
	$("#alert_password").blur(checkpassword);
	$("#alert_comfirm_password").blur(checkcomfirm_password);
});
function show_active(){
	 var tr=$(this);
	 tr.parent().find('tr')
		.removeClass('success').removeClass('active');
	 tr.addClass('success').addClass('active');
	 
};