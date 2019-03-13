package com.manage.system.service;

import com.manage.system.bean.Page;
import com.manage.system.bean.User;
import com.manage.system.exception.AppException;

import java.util.Map;


public interface IUserService extends IService<User,Integer>{
	
	/**
	 * 用户登录操作
	 * @param vo
	 * @return
	 * @throws AppException
	 */
	public User login(User vo) throws AppException;
	
	/**
	 * 添加用户
	 * @param vo
	 * @return
	 * @throws AppException
	 */
	public boolean insert(User vo) throws AppException;
	
	/**
	 * 通过用户名查找该用户是否存在，如果存在返回true，不存在则反会false
	 * @param name
	 * @return
	 * @throws AppException
	 */
	public User findByName(String name) throws AppException;
	
	/**
	 * 更新用户信息操作
	 * @param vo
	 * @return
	 * @throws AppException
	 */
	public boolean update(User vo) throws AppException;
	
	/**
	 * 分页查询
	 * @param page
	 * @return
	 * @throws AppException
	 */
	public Page<User> findUserByPage(Page<User> page) throws AppException;
	/**
	 * 批量删除
	 */
	public Boolean delAll(String userids)throws AppException;
	
}
