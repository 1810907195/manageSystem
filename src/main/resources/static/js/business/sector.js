//扇形管理js
var model={};
//成功状态常量
var SUCCESS=0;

$(function(){
	//加载挂号数
	var url="pages/registration/findRegistrationToTalCount.action";
	var param={};
	$.post(url,param,function(result){
		if(result.state==SUCCESS){
			//$.alert("添加成功");
			//赋值
			$("#total_gh").val(result.data.total);
			$("#total_sfz_gh").val(result.data.total_sfz);
			$("#total_yb_gh").val(result.data.total_yb);
			$("#total_xnh_gh").val(result.data.total_xnh);
		}else{
			$.alert(result.message);
		}
	});
});