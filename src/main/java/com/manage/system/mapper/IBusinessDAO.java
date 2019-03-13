package com.manage.system.mapper;

import com.manage.system.bean.Page;
import com.manage.system.exception.AppException;

import java.util.List;


public interface IBusinessDAO<SstSfjsYhjfxx>{
	public List<SstSfjsYhjfxx> findAllByPage(Page<SstSfjsYhjfxx> up)throws AppException;
	
	public List<SstSfjsYhjfxx> findAllByNoPage(Page<SstSfjsYhjfxx> up)throws AppException;
	
	public Integer findTotalNum(Page<SstSfjsYhjfxx> up)throws AppException;
	
	public Boolean addBusiness(SstSfjsYhjfxx p);
	
	public Boolean editBusiness(SstSfjsYhjfxx p);
	
	public Boolean removeBusiness(List<String> ids);
}
