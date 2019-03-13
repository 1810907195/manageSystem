//权限管理js
var model={};
//成功状态常量
var SUCCESS=0;
$(function(){
	//加载表格
	clearModelId();
    $.jgrid.defaults.styleUI = 'Bootstrap';
    
    $("#table_list_1").jqGrid({
    	caption: "我是杨先喜，我怕谁",
    	url:"pages/permission/findPerssionByPage.action",
        mtype:"POST",
        datatype: "json",
        height: "100%",
        autowidth: true,
        shrinkToFit: true,
        rowNum: 10,
        rowList: [10, 20, 50],
        rownumbers: true, //添加左侧行号 
        rownumWidth: 25,
        autowidth: true,
        multiselect: true,
        colNames: ['id', '角色', '权限名', 'url','状态', '更新时间','父节点','菜单类型','菜单顺序'],
        colModel: [
            {
                name: 'action_id',
                index: 'action_id',
                editable: true,
                width: 30,
                sorttype: "int",
                search: true
            },
            {
            	name: 'group_id',
                index: 'group_id',
                editable: true,
                width: 50,
                formatter:function(value, options, rowObject){
                	if(value=='1'||value==1){
      				  return '管理员';
      			  }else if(value=='2'||value==2){
      				  return '研发部';
      			  }else if(value=='3'||value==3){
      				  return '财务部';
      			  }else if(value=='4'||value==4){
      				  return '市场部';
      			  }else{
      				  return value;
      			  }
                }
            },
            {
            	name: 'action_name',
                index: 'action_name',
                editable: true,
                width: 50,
            },{
            	name: 'url',
                index: 'url',
                editable: true,
                width: 180,
                search: true
            },
            {
            	name: 'status',
                index: 'status',
                editable: true,
                width: 50,
                sorttype: "int",
                search: true,
                formatter:function(value, options, rowObject){
                	if(value=='0'||value==0){
                		return '未激活';
                	}else if(value=='1'||value==1){
                		return '激活';
                	}else{
                		return value;
                	}
                }
            },
            {
            	name: 'update_time',
                index: 'update_time',
                editable: true,
                width: 100
            },{
            	name: 'parent_id',
                index: 'parent_id',
                editable: true,
                width: 50,
                sorttype: "int",
                search: true
            },{
            	name: 'menu_type',
                index: 'menu_type',
                editable: true,
                width: 50,
                search: true
            },{
            	name: 'menu_order',
                index: 'menu_order',
                editable: true,
                width: 50,
                search: true
            }
        ],
        pager: "#pager_list_1",
        jsonReader : {   
            root: "data",
            total: "total",
            records: "records"
        },
        viewrecords: true,
        hidegrid: true
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
    
    $("#form2").validation({icon:true});
    $("#form1").validation({icon:true});
//添加权限绑定
    $(".alert_add_perssion").on('click',add_perssion_action); 
//编辑权限绑定
    $(".user_btn").on('click',edit_perssion_action); 
    $(".edit_perssion").on('click',edit_perssion);
//删除权限绑定
    $(".permission_delete").on('click',deleteAll);
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
			$.alert("添加成功");
			loadUserInfo_action();
		}else{
			$.alert(result.message);
		}
	});
	
};
function edit_perssion_action(){
	var ids = $("#table_list_1").jqGrid("getGridParam", "selarrrow")
	 if (ids.length==0) {
	      $.alert("请选择一条数据");
	      return;
	 }else if(ids.length>1){
		 $.alert("只能选择一条数据");
		 return;
	 }else {
		 var id = jQuery("#table_list_1").jqGrid('getGridParam', 'selrow');
    	 var row = jQuery("#table_list_1").jqGrid('getRowData', id);
	     $(".permissionEdit_modal").attr('id','edit_perssion');
	     $("#edit_action_id").val(row.action_id);
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
function clearModelId(){
	$(".permissionEdit_modal").attr('id','');
}