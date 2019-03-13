package com.manage.system.mapper;

import com.manage.system.exception.AppException;

import javax.servlet.Registration;
import java.util.List;
import java.util.Map;


public interface IRegistrationDAO{
	/**
	 * 
	 * @return
	 * @throws AppException
	 */
	public List findTotalNum(Registration up)throws AppException;
}
