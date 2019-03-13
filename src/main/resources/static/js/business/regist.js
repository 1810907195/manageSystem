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
    
    $("#table_list_1").jqGrid({
    	caption: "自助终端收费明细",
    	url:"pages/business/findBusinessByPage.action",
        mtype:"POST",
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
        colNames: ['流水号','卡号','卡类型', '金额','类型','系统跟踪号','终端编号','银行卡号','银行商户号','银行终端号','状态'],
        colModel: [
            {
                name: 'jylsh0',
                index: 'jylsh0',
                editable: true,
                width: 150,
                search: true
            },{
            	name: 'cardno',
                index: 'cardno',
                editable: true,
                width: 180,
            },{
            	name: 'cardtype',
                index: 'cardtype',
                editable: true,
                width: 80,
            },{
            	name: 'jfje00',
                index: 'jfje00',
                editable: true,
                width: 80
            },{
            	name: 'jylx00',
                index: 'jylx00',
                editable: true,
                width: 80,
                search: true
            },{
            	name: 'xtgzh0',
                index: 'xtgzh0',
                editable: true,
                width: 105,
                search: true
            },{
            	name: 'zdbh00',
                index: 'zdbh00',
                editable: true,
                width: 130,
                search: true
            },{
            	name: 'yhkh00',
                index: 'yhkh00',
                editable: true,
                width: 180,
                search: true
            },{
            	name: 'yhshh0',
                index: 'yhshh0',
                editable: true,
                width: 150,
                search: true
            },{
            	name: 'yhzdh0',
                index: 'yhzdh0',
                editable: true,
                width: 105,
                search: true
            },{
            	name: 'jfztbz',
                index: 'jfztbz',
                editable: true,
                width: 80,
                search: true
            }
//            ,{
//            	name: 'sfcg00',
//                index: 'sfcg00',
//                editable: true,
//                width: 50,
//                search: true,
//                editable:true,//
//                formatter:function(value, options, rowObject){
//                	if(value=='0'||value==0){
//                		return '失败';
//                	}else if(value=='1'||value==1){
//                		return '成功';
//                	}else{
//                		return value;
//                	}
//                }
//            }
        ],
        //treeGrid:true,
        pager: "#pager_list_1",
        jsonReader : {   
            root: "data",
            total: "total",
            records: "records"
        },
        viewrecords: true,
        hidegrid: true,
        //事件
        onSelectRow:function(id){
        	console.log("点我,编辑行元素");
        	if(id && id!==lastSel){
        		 $("#table_list_1").restoreRow(lastSel);
        		 lastSel=id;
        	}
        	$("#table_list_1").editRow(id,true);
        }
    });

    // Add selection
    $("#table_list_1").setSelection(4, true);


    // Setup buttons
    $("#table_list_1").jqGrid('navGrid', '#pager_list_1', {
        edit: false,
        add: false,
        del: false,
        search: false
    }, {
        height: 200,
        reloadAfterSubmit: true
    });

    // Add responsive to jqGrid
    $(window).bind('resize', function () {
        var width = $('.jqGrid_wrapper').width();
       	// $('#table_list_1').setGridWidth(width);
        $('#table_list_1').setGridWidth(width);
    });
    //为表单设置样式
    $("#form2").validation({icon:true});
    $("#form1").validation({icon:true});
//=============按钮区功能点(模糊查询)===============================================================
    //1.模糊查询
    $(".likeSerch").on('click',likeSerch);
//============================================================================
//添加权限绑定
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
	var ids = $("#table_list_1").jqGrid("getGridParam", "selarrrow")
	 if (ids.length==0) {
		  clearModelId();
	      $.alert("请选择一条数据");
	      return;
	 }else if(ids.length>1){
		 clearModelId();
		 $.alert("只能选择一条数据");
		 return;
	 }else {
		 var id = jQuery("#table_list_1").jqGrid('getGridParam', 'selrow');
    	 var row = jQuery("#table_list_1").jqGrid('getRowData', id);
    	 console.log(row);
	     $(".permissionEdit_modal").attr('id','edit_perssion');
	     $("#edit_action_id").val(row.logid0);
	     $("#edit_group_id").val(row.group_id);
	     $("#edit_action_name").val(row.action_name);
	     $("#edit_url").val(row.url);
	     $("#edit_status").val(row.status);
	     $("#edit_update_time").val(row.update_time);
	     $("#edit_parent_id").val(row.parent_id);
	     $("#edit_menu_type").val(row.menu_type); 
	     $("#edit_menu_order").val(row.menu_order);
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
 			$("#table_list_1").trigger("reloadGrid");
 		}else{
 			$.alert(result.message);
 		}
     });
};
//批量删除权限
function deleteAll(){
	console.log("点我");
	var ids = $("#table_list_1").jqGrid("getGridParam", "selarrrow")
	var url="pages/permission/deleteAll.action";
	if(ids.length==0){
		$.alert("请选择一条数据");
		return;
	}
	var ids_str="";
	for(var i=0;i<ids.length;i++){
		//选中行的时间
		var action_id=$("#table_list_1").getCell(ids[i],"action_id");
		ids_str+=action_id+":";
	}
	console.log(ids_str+"123123");
	var param={ids:ids_str};
	$.post(url,param,function(result){
		 if(result.state==SUCCESS){
	 			$.alert("删除成功");
	 			$("#table_list_1").trigger("reloadGrid");
	 		}else{
	 			$.alert(result.message);
	 		}
	});
	
}
function exportAll(){
	 window.location.href="pages/business/outExcel.action";
}

function exportCurrent(){
	 console.log("点我：exportCurrent");
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
	 
//	 window.location.href = encodeURI(WEBAPP.PATH+'/kg/xnhCard!outExcelXnhCard.action?funId='+exportType);
	 window.location.href="pages/business/outExcel.action?"
	 			+'jfztbz='+ search_state
			    +'&cardno='+ search_kh
			    +'&cardtype='+ search_klx000
				+'&zdbh00=' +search_zdbh00
				+'&jylx00='+ search_jylx00
				+'&xtgzh0='+ search_xtgzh0
				+'&yhkh00=' +search_yhkh00
				+'&yhshh0=' +search_yhshh0
	            +'&jylsh0='+ search_jylsh0
		        +'&starttime=' +search_starttime
		        +'&endtime=' +search_endtime
//	 // 使用outerHTML属性获取整个table元素的HTML代码（包括<table>标签），然后包装成一个完整的HTML文档，设置charset为urf-8以防止中文乱码
//     var html = "<html><head><meta charset='utf-8' /></head><body>" + document.getElementsByTagName("table")[0].outerHTML + "</body></html>";
//     // 实例化一个Blob对象，其构造函数的第一个参数是包含文件内容的数组，第二个参数是包含文件类型属性的对象
//     var blob = new Blob([html], { type: "application/vnd.ms-excel" });
//     var a = $(".importAll");
//     // 利用URL.createObjectURL()方法为a元素生成blob URL
//     a.href = URL.createObjectURL(blob);
//     // 设置文件名
//     a.download = "学生成绩表.xls";
}
//**************************************
//*作者:王政
//*功能区域:按钮区
//*
//**************************************
function likeSerch(){
	//console.log("点我：status_search");
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
	var url="pages/business/findBusinessByPage.action";
	
//	var param={"page":1,
//			   "rows":25,
//			   "queryObj":{
//					"jfztbz":search_state,
//					"cardno":search_kh,
//					"cardtype":search_klx000,
//					"zdbh00":search_zdbh00,
//					"jylx00":search_jylx00,
//					"xtgzh0":search_xtgzh0,
//					"yhkh00":search_yhkh00,
//					"yhshh0":search_yhshh0,
//					"jylsh0":search_jylsh0,
//			    },
//			  "starttime":search_starttime,
//			  "endtime":search_endtime,
//		      };
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
	
			$("#table_list_1").jqGrid('setGridParam',{
					url:url,
					datatype:'json',
					postData:param,
					pager: "#pager_list_1",
					page:1//哪一页的值
					}).trigger("reloadGrid");
				$("#table_list_1").jqGrid('navGrid', '#pager_list_1', {
			        edit: false,
			        add: false,
			        del: false,
			        search: false
			    }, {
			        height: 200,
			        reloadAfterSubmit: true
			    });
				
				
//	$.ajax({
//				type : "POST",
//				url : url,
//				data : JSON.stringify(param),
//				contentType : "application/json",
//				dataType : "json",
//				 success:function(result) {
//					 if(result.data==null){
//				 			$.alert("没有找到相关数据");
//				 		}else{
//				 			$("#table_list_1").jqGrid('setGridParam',{
//				 				datatype:'local',
//				 				data:result.data,//newData是符合格式要求的重新加载的数据
//				 				pager: "#pager_list_1",
//				 				page:1//哪一页的值
//				 				}).trigger("reloadGrid");
//				 			$("#table_list_1").jqGrid('navGrid', '#pager_list_1', {
//				 		        edit: false,
//				 		        add: false,
//				 		        del: false,
//				 		        search: false
//				 		    }, {
//				 		        height: 200,
//				 		        reloadAfterSubmit: true
//				 		    });
//				 		}
//					}
//			});
	
	
}
function clearModelId(){
	$(".permissionEdit_modal").attr('id','');
}