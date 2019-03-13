package com.manage.system.service;


import com.manage.system.exception.AppException;

public interface IService<T,K> {
	
	//登录状态
	public static final int LOGIN_CODE = 1;
	//注册状态
	public static final int REG_CODE = 2;
	//冻结状态
	public static final int UNUSER = 1;
	//可用状态
	public static final int ISUSER = 0;
	
	/**
	 * 校验对象是否符合业务要求
	 * @param vo
	 * @param
	 * @return
	 */
	public boolean validate(T vo, K k) throws AppException;
}
