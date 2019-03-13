//用户管理js
function check_active(){
	clearModelId();
	var user_active_row=$('input[name="usercheckbox"]:checked');
	if(user_active_row.length<1){
		$.alert("请选择一条记录");
		return false;
	}
	if(user_active_row.length>=2){
		$.alert("只能选择一条数据");
		return false;
	}
	//动态指定modal id
	$(".userEdit_modal").attr('id','edit_User');
	return true;
}
function loadUserInfo_action(){
	clearModelId();
	var username=$("#search_username").val();
	var status=$("#search_state").val();
	jsCommonLs= parseInt($('#splitSelect').val());
	$("#editable_length select").val();
	//
	var url="pages/user/findUsersByPage.action";
	var param={username:username,status:status,currentPage:jsCommonCp,lineSize:jsCommonLs};
	$.post(url,param,function(result){
		if(result.state==SUCCESS){
			//console.log("user列表加载成功");
			var list=result.data.userlist;
			allRecorders=result.data.totalUserNum;
			model.updateUser(list);
		}else if(result.state==2){
			location.href='unauthorized.jsp';
		}
	});
};
function fanCheck(obj){
	var li=$(obj).parent().find('input');
	if(li[0].checked==true){
		li[0].checked=false;
	}else{
		li[0].checked=true;
	}
};
model.updateUser=function(list){
	var template='<tr class="gradeA">'+
		'<td class="user_checkbox"><input type="checkbox" class="i-checks" name="usercheckbox"></td>'+
		'<td onclick="fanCheck(this)" class="xh">[user.xh]</td>'+
		'<td onclick="fanCheck(this)" class="id">[user.id]</td>'+
        '<td onclick="fanCheck(this)" class="username">[user.name]</td>'+
        '<td onclick="fanCheck(this)" class="role_id">[user.role_id]</td>'+
        '<td onclick="fanCheck(this)" class="role"><span class="pie">[user.role]</span></td>'+
        '<td onclick="fanCheck(this)" class="phoneNum">[user.phoneNum]</td>'+
        '<td onclick="fanCheck(this)" class="userstate"><span class="pie">[user.state]</span></td>'+
        '<td onclick="fanCheck(this)" class="create_time">[user.create_time]</td>'+
        '<td onclick="fanCheck(this)" class="update_time">[user.update_time]</td>'
    '</tr>';
	if(list){
		this.Users=list;
	}
	var ul=$('#user_list').empty();
	var start_id=0;
	var end_id=0;
	for(var i=0;i<this.Users.length;i++){
		if(i==0){
			start_id=i+1+(jsCommonLs*(jsCommonCp-1));
		}
		if(i==(this.Users.length)-1){
			end_id=i+1+(jsCommonLs*(jsCommonCp-1));
		}
		var li=template.replace('[user.xh]',start_id+i);
		li=li.replace('[user.id]',this.Users[i].user_id);
		li=li.replace('[user.name]',this.Users[i].user_name);
		li=li.replace('[user.role_id]',this.Users[i].roles.role_id);
		li=li.replace('[user.role]',this.Users[i].roles.role_note);
		li=li.replace('[user.phoneNum]',this.Users[i].phoneNum==null||this.Users[i].phoneNum=="null"?"":this.Users[i].phoneNum);
		li=li.replace('[user.state]',this.Users[i].status);
		li=li.replace('[user.create_time]',this.Users[i].create_time);
		li=li.replace('[user.update_time]',this.Users[i].update_time);
		li = $(li).data('index',i);
		ul.append(li);
	}
	//统计显示的数据
	//显示1到10项,共57项
	$("#DataTables_Table_0_info").text("显示"+start_id+"到"+end_id+"项,"+""+allRecorders+"项");
	
	createSplitBar(allRecorders);
};
//用户名检测
function checkUserName(){
	var user_name=$("#alert_username").val();
	if(user_name==null||user_name==""){
		$.alert('用户名不能为空');
		return false;
	}
	var regx = /^[0-9a-zA-Z]{3,15}$/;
	if(!regx.test(user_name)){
		$.alert('用户名不符合标准,建议长度在3-15');
		return false;
	}
//	var url="pages/user/findUsersByName.action";
//	var param={user_name:user_name};
//	$.post(url,param,function(result){
//		if(result.state==SUCCESS){
//			$.alert("用户名已经存在");
//			return false;
//		}else{
//			return true;
//		}
//	});
	return true;
};
function checkpassword(){
	var password=$("#alert_password").val();
	if(password==null||password==""){
		$.alert('密码不能为空');
		return false;
	}
	var regx = /^[0-9a-zA-Z]{6,15}$/;
	if(!regx.test(password)){
		$.alert('密码不符合标准,建议长度在6-15');
		return false;
	}
	return true;
}
//确认密码验证
function checkcomfirm_password(){
	var password=$("#alert_password").val();
	var comfirm_password=$("#alert_comfirm_password").val();
	if(comfirm_password==null||comfirm_password==""){
		$.alert('两次密码不正确');
		return false;
	}
	if(password!=comfirm_password){
		$.alert('两次密码不正确');
		return false;
	}
	return true;
}
//添加用户
function add_user_action(){
//	var code=checkUserName()+checkpassword()+checkcomfirm_password();
//	if(code!=3){
//		return;
//	}
	var username=$("#alert_username").val();
	var password=$("#alert_password").val();
	var comfirm_password=$("#alert_comfirm_password").val();
	var role_id=$("#alert_role_id").val();
	password = CryptoJS.MD5(password).toString();
	var state=$("#alert_state").val();
	var url="pages/user/insert.action";
	var param={user_name:username,password:password,status:state,role_id:role_id};
	$.post(url,param,function(result){
		if(result.state==SUCCESS){
			$("#alert_username").empty();
			$("#alert_password").empty();
			$("#alert_comfirm_password").empty();
			$("#alert_state").empty();
			$.alert("添加用户成功");
			loadUserInfo_action();
		}else{
			$.alert(result.message);
		}
	});
};
//批量删除用户
function delete_user_action(){
	if(!check_active()){
		return;
	}
	var userList_str="";
	$(':checked').each(function(){
		var remove_username=$(this).parent().parent().find(".username").text()+",";
		userList_str+=remove_username;
	});
	if(userList_str==null||userList_str==''){
		$.alert("请选择一条数据");
		return;
	}
	var url="pages/user/removeUserList.action";
	var param={userList_str:userList_str};
	$.post(url,param,function(result){
		if(result.state==SUCCESS){
			$.alert("删除用户成功");
			loadUserInfo_action();
		}else{
			$.alert(result.message);
		}
	});
}
//
//
function show_editInfo_action(){
	check_active();
	//
	var checked_row=$('input[name="usercheckbox"]:checked').parent().parent();

	var id=$(checked_row).find(".xh").text();
	var user_id=$(checked_row).find(".id").text();
	var username=$(checked_row).find(".username").text();
	var userstate=$(checked_row).find(".userstate").text();
	var role_id=$(checked_row).find(".role_id").text();
	//添加到add_user弹框
	$(".alert_id").val(id);
	$(".alert_edit_user_id").val(user_id);
	$(".alert_username").val(username);
	$(".alert_state").val(userstate);
	$(".alert_role").val(role_id);
	//添加到edit_user弹框
};
//编辑用户
function edit_user_action(){
	var checked_row=$('input[name="usercheckbox"]:checked').parent().parent();
	//获取修改前的属性值
	var pre_state=$(checked_row).find(".userstate").text();//$(".active").find(".userstate").text();
	var pre_role=$(checked_row).find(".role_id").text();
	var user_id=$(checked_row).find(".id").text();
	//获取修改后的属性值
	var state=$(".alert_state").val();
	var role=$(".alert_role").val();
	
	
	
	var url="pages/user/editUser.action";
	var param;
	if((pre_state==state)&&(pre_role==role)){
		$.alert("用户修改无变化");
		return;
	}else{
		param={user_id:user_id,status:state,role_id:role};
		$.post(url,param,function(result){
			if(result.state==SUCCESS){
				$.alert("编辑用户成功");
				loadUserInfo_action();
			}else{
				$.alert(result.message);
			}
		});
	}
}
function clearModelId(){
	$(".userEdit_modal").attr('id','');
}