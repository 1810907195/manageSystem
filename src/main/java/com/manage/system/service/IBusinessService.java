package com.manage.system.service;


import com.manage.system.bean.Page;
import com.manage.system.bean.SstSfjsYhjfxx;

import java.io.IOException;
import java.util.List;

import javax.servlet.http.HttpServletResponse;


public interface IBusinessService extends IService<SstSfjsYhjfxx,Integer>{
	
	/**
	 * 分页查询
	 * @return
	 */
	public Page<SstSfjsYhjfxx> findBusinessByPage(Page<SstSfjsYhjfxx> p);
	/**
	 * 添加权限
	 */
	public Boolean addBusiness(SstSfjsYhjfxx p);
	/**
	 * 修改权限
	 */
	public Boolean editBusiness(SstSfjsYhjfxx p);
	/**
	 * 批量删除权限
	 */
	public Boolean deleteAll(List<String> ids);
	
	public String outExcelXnhCard(HttpServletResponse response, Page<SstSfjsYhjfxx> p) throws IOException;
	
}
