package com.manage.system.mapper;

import com.manage.system.bean.Page;
import com.manage.system.bean.User;
import com.manage.system.exception.AppException;

import java.sql.SQLException;
import java.util.List;
import java.util.Map;


public interface IUserDAO extends IDAO<Integer, User>{
	
	/**
	 * 通过名字查找该用户是否存在
	 * @param name
	 * @return
	 * @throws SQLException
	 */
	public User findByName(String name) throws AppException;
	/**
	 * 根据id单条删除用户
	 * @param
	 * @return
	 * @throws AppException
	 */
	public boolean removeOnePhById(Integer userid) throws AppException;
	/**
	 * 分页查询
	 * @return
	 * @throws AppException
	 */
	public List<User> findAllByPage(Page<User> p)throws AppException;
	/**
	 * 批量删除
	 * @param names
	 * @return
	 * @throws AppException
	 */
	public Boolean deletetAll(List<String> names)throws AppException;
	/**
	 * 
	 * @return
	 * @throws AppException
	 */
	public Integer findTotalNum(Page<User> p)throws AppException;
}
