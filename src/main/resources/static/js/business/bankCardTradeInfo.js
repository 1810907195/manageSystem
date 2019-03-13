//权限管理js
var model={};
//成功状态常量
var SUCCESS=0;
//
var lastSel; 
$(function(){
	//加载表格
	clearModelId();
    $.jgrid.defaults.styleUI = 'Bootstrap';
    //=======================获取查询条件
    var search_kh=$("#search_kh").val();
    //=======================
    var page = $('#table_list_archives').getGridParam('page');
    var rows = $('#table_list_archives').getGridParam('rows'); // rows  
    var param={  
        	page: $('#table_list_archives').getGridParam('page'),  
        	rows: $('#table_list_archives').getGridParam('rows'),
        	cardno:$('#search_kh').val()
       }
    $("#table_list_archives").jqGrid({
    	caption: "缴费明细",
    	url:"pages/Archives/findBankCardTradeInfoByPage.action",
        mtype:"POST",
        postData:param,
        datatype: "json",
        height: "100%",
        autowidth: true,
        shrinkToFit: true,
        rowNum: 25,
        rowList: [25,50, 100, 150,200],
        rownumbers: true, //添加左侧行号 
        rownumWidth: 40,
        autowidth: true,
        multiselect: true,
        colNames: ['卡号','缴费金额','交易类型', '系统跟踪号','终端编号','交易状态','银行流水号','银行卡号','交易日期','交易时间','医院机构'],
        colModel: [
            {
                name: 'cardno',
                index: 'cardno',
                editable: false,
                width: 80,
                search: true
            },{
            	name: 'jfje00',
                index: 'jfje00',
                editable: false,
                width: 50,
            },{
            	name: 'jylx00',
                index: 'jylx00',
                editable: true,
                width: 110,
                search: true,
                editable:false,
                formatter:function(value, options, rowObject){
	                if(value=='3'||value==1){
	              		return '预约取号';
	              	}else if(value=='4'||value==1){
	              		return '现场挂号 ';
	              	}else if(value=='5'||value==1){
	              		return '门诊结算';
	              	}else if(value=='6'||value==1){
	              		return '发卡';
	              	}else if(value=='7'||value==1){
	              		return '住院预交金';
	              	}else{
	              		return value;
	              	}
	            }
            },{
            	name: 'xtgzh0',
                index: 'xtgzh0',
                editable: false,
                width: 90,
            },{
            	name: 'zdbh00',
                index: 'zdbh00',
                editable: false,
                width: 100
            },{
            	name: 'jfztbz',
                index: 'jfztbz',
                editable: true,
                width: 110,
                search: true,
                editable:false,
                formatter:function(value, options, rowObject){
	              	if(value=='0'||value==0){
	              		return '初始化';
	              	}else if(value=='1'||value==1){
	              		return '缴费失败';
	              	}else if(value=='2'||value==1){
	              		return '缴费成功';
	              	}else if(value=='3'||value==1){
	              		return 'HIS失败';
	              	}else if(value=='4'||value==1){
	              		return '被冲销';
	              	}else if(value=='5'||value==1){
	              		return '冲销失败';
	              	}else if(value=='6'||value==1){
	              		return 'HIS初始化';
	              	}else if(value=='7'||value==1){
	              		return '主动冲销';
	              	}else{
	              		return value;
	              	}
	            }
            },{
            	name: 'yhlsh0',
                index: 'yhlsh0',
                editable: false,
                width: 70,
                search: true
            },{
            	name: 'yhkh00',
                index: 'yhkh00',
                editable: false,
                width: 150,
                search: true
            },{
            	name: 'jyrq00',
                index: 'jyrq00',
                editable: false,
                width: 80,
                search: true
            },{
            	name: 'jysj00',
                index: 'jysj00',
                editable: false,
                width: 80,
                search: true
            },{
            	name: 'yyjgdm',
                index: 'yyjgdm',
                editable: false,
                width: 80,
                search: true
            }
        ],
        //treeGrid:true,
        pager: "#pager_list_archives",
        jsonReader : {   
            root: "data",
            total: "total",
            records: "records"
        },
        loadComplete: function(result){ //加载完成（初始加载），回调函数  
            if(result.state==2){
         	   $.alert(result.message);
            }
        	if(result.data.length<=0){
        		$.alert("对不起，未查询到数据！");
        	}
            
         },
        viewrecords: true,
        hidegrid: true
    });
    $("#table_list_archives").jqGrid('navGrid', '#pager_list_archives', {edit : false,add : false,del : false});

    // Add responsive to jqGrid
    $(window).bind('resize', function () {
        var width = $('.jqGrid_wrapper').width();
       	// $('#table_list_1').setGridWidth(width);
        $('#table_list_archives').setGridWidth(width);
    });
    //为表单设置样式
    $("#form2").validation({icon:true});
    $("#form1").validation({icon:true});
//=============按钮区功能点(模糊查询)===============================================================
    //1.模糊查询
    $(".likeSerch").on('click',likeSerch);
//============================================================================
//添加权限绑定
    $(".permission_add").on('click',add_perssion);
    $(".alert_add_perssion").on('click',add_perssion_action); 
//编辑权限绑定
    $(".user_btn").on('click',edit_perssion_action); 
    $(".edit_perssion").on('click',edit_perssion);
//删除权限绑定
    $(".permission_delete").on('click',deleteAll);
//导出当前查询条件下的所有数据为Excel绑定
    $(".importCurrent").on('click',exportCurrent);
//导出全部数据为Excel绑定
    $(".importAll").on('click',exportAll);
});


function add_perssion(){
	 $(".permissionAdd_modal").attr('id','add_perssion');
}
function add_perssion_action(){
	if ($("#form2").valid()==false){
		$.alert('填写信息不完整');
		return;
    }
	var group_id=$("#group_id").val();
	var action_name=$("#action_name").val();
	var p_url=$("#url").val();
	var status=$("#status").val();
	var parent_id=$("#parent_id").val();
	var menu_type=$("#menu_type").val();
	var menu_order=$("#menu_order").val();
	
	var url="pages/permission/addPermission.action";
	var param={group_id:group_id,
			  action_name:action_name,
			  url:p_url,status:status,
			  parent_id:parent_id,
			  menu_type:menu_type,
			  menu_order:menu_order};
	$.post(url,param,function(result){
		if(result.state==SUCCESS){
			//$.alert("添加成功");
			loadUserInfo_action();
		}else{
			$.alert(result.message);
		}
	});
	
};
function edit_perssion_action(){
	
	var ids = $("#table_list_archives").jqGrid("getGridParam", "selarrrow")
	if (ids.length==0) {
		  clearModelId();
		  $.alert("请选择一条数据");
	      return;
	 }else if(ids.length>1){
		 clearModelId();
		 $.alert("只能选择一条数据");
		 return;
	 }else {
		 var id = jQuery("#table_list_archives").jqGrid('getGridParam', 'selrow');
    	 var row = jQuery("#table_list_archives").jqGrid('getRowData', id);
    	 console.log(row);
	     $(".permissionEdit_modal").attr('id','edit_perssion');
	     $("#edit_xh").val(id);
	     $("#edit_kh").val(row.cardno);
	     $("#edit_yhkh").val(row.yhkh00);
	 }
};
function edit_perssion(){
	if($("#form1").valid()==false){
		$.alert('填写信息不完整。');
	    return;
	}
	 var action_id=$("#edit_action_id").val();
     var group_id=$("#edit_group_id").val();
     if(group_id=='管理员'){
    	 group_id=1;
     }else if(group_id=='研发部'){
    	 group_id=2;
     }
     else if(group_id=='财务部'){
    	 group_id=3;
     }else{
    	 group_id=4;
     }
     var action_name=$("#edit_action_name").val();
     var url=$("#edit_url").val();
     var status=$("#edit_status").val();
     if(status=='激活'){
    	 status=1
     }else{
    	 status=0;
     }
     var parent_id=$("#edit_parent_id").val();
     var menu_type=$("#edit_menu_type").val(); 
     var menu_order=$("#edit_menu_order").val();
     var url='pages/permission/editPermission.action';
     var param={action_id:action_id,group_id:group_id,
    		    action_name:action_name,   
    		    url:url,status:status,
    		    parent_id:parent_id,
    		    menu_type:menu_type,
    		    menu_order:menu_order}
     $.post(url,param,function(result){
    	 if(result.state==SUCCESS){
 			$.alert("修改成功");
 			$("#table_list_archives").trigger("reloadGrid");
 		}else{
 			$.alert(result.message);
 		}
     });
};
//批量删除权限
function deleteAll(){
	console.log("点我");
	var ids = $("#table_list_archives").jqGrid("getGridParam", "selarrrow")
	var url="pages/permission/deleteAll.action";
	if(ids.length==0){
		$.alert("请选择一条数据");
		return;
	}
	var ids_str="";
	for(var i=0;i<ids.length;i++){
		//选中行的时间
		var action_id=$("#table_list_archives").getCell(ids[i],"action_id");
		ids_str+=action_id+":";
	}
	console.log(ids_str+"123123");
	var param={ids:ids_str};
	$.post(url,param,function(result){
		 if(result.state==SUCCESS){
	 			$.alert("删除成功");
	 			$("#table_list_archives").trigger("reloadGrid");
	 		}else{
	 			$.alert(result.message);
	 		}
	});
	
}
function exportAll(){
	 window.location.href="pages/business/outExcel.action";
}

function exportCurrent(){
	 var search_state=$("#search_state").val();
	 var search_kh=$("#search_kh").val();
	 var search_klx000=$("#search_klx000").val();
	 var search_xtgzh0=$("#search_xtgzh0").val();
	 var search_yhkh00=$("#search_yhkh00").val();
	
	 var search_starttime=$("#search_starttime").val();
	 var search_endtime=$("#search_endtime").val();
	 
	 window.location.href="pages/Archives/outExcel.action?"
	 			+'jfztbz='+ search_state
			    +'&cardno='+ search_kh
			    +'&cardtype='+ search_klx000
				+'&xtgzh0='+ search_xtgzh0
				+'&yhkh00=' +search_yhkh00
		        +'&starttime=' +search_starttime
		        +'&endtime=' +search_endtime
}
//**************************************
//*作者:王政
//*功能区域:按钮区
//*
//**************************************
function likeSerch(){
	var search_state=$("#search_state").val();
	var search_kh=$("#search_kh").val();
	var search_zdbh00=$("#search_zdbh00").val();
	var search_klx000=$("#search_klx000").val();
	var search_jylx00=$("#search_jylx00").val();
	var search_xtgzh0=$("#search_xtgzh0").val();
	var search_yhkh00=$("#search_yhkh00").val();
	var search_yhshh0=$("#search_yhshh0").val();
	var search_jylsh0=$("#search_jylsh0").val();
	
	var search_starttime=$("#search_starttime").val();
	var search_endtime=$("#search_endtime").val();
	var url="pages/Archives/findBankCardTradeInfoByPage.action";
	
	var param={
			   "jfztbz":search_state,
				"cardno":search_kh,
				"cardtype":search_klx000,
				"zdbh00":search_zdbh00,
				"jylx00":search_jylx00,
				"xtgzh0":search_xtgzh0,
				"yhkh00":search_yhkh00,
				"yhshh0":search_yhshh0,
				"jylsh0":search_jylsh0,
			    "starttime":search_starttime,
			    "endtime":search_endtime,
		      };
	
	$("#table_list_archives").jqGrid('setGridParam',{
			url:url,
			datatype:'json',
			postData:param,
			pager: "#pager_list_archives",
			page:1//哪一页的值
			}).trigger("reloadGrid");
   $("#table_list_archives").jqGrid('navGrid', '#pager_list_archives', {edit : false,add : false,del : false});

}
function clearModelId(){
	$(".permissionEdit_modal").attr('id','');
}