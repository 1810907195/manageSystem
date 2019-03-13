package com.manage.system.mapper.impl;

import java.sql.SQLException;
import java.util.List;
import java.util.Map;
import java.util.Set;

import com.manage.system.bean.Page;
import com.manage.system.bean.User;
import com.manage.system.exception.AppException;
import com.manage.system.mapper.IUserDAO;
import org.apache.ibatis.session.SqlSessionFactory;
import org.mybatis.spring.support.SqlSessionDaoSupport;
import org.springframework.stereotype.Repository;


@Repository
public class UserDAOImpl extends SqlSessionDaoSupport implements IUserDAO {
	
	public  UserDAOImpl(SqlSessionFactory sqlSessionFactory) {
		super.setSqlSessionFactory(sqlSessionFactory);
	}
	
	@Override
	public boolean doCreate(User vo) throws SQLException {
		return super.getSqlSession().insert("com.manage.system.mapper.IUserDAO.doCreate", vo)>0;
	}

	@Override
	public boolean doUpdate(User vo) throws SQLException {
		return super.getSqlSession().update("com.manage.system.mapper.IUserDAO.doUpdate",vo)>0;
	}

	@Override
	public boolean doRemove(Set<?> ids) throws SQLException {
		return false;
	}

	@Override
	public User findById(Integer id) throws SQLException {
		return super.getSqlSession().selectOne("com.manage.system.mapper.IUserDAO.findById",id);
	}

	@Override
	public List<User> findAll() throws SQLException {
		return null;
	}
	//分页查询
	@Override
	public List<User> findAllBySplit(String column, String keyWord, Integer currentPage, Integer lineSize)
			throws SQLException {
		return null;
	}

	@Override
	public Integer getAllCount() throws SQLException {
		return null;
	}
	
	@Override
	public User findByName(String name) throws AppException {
		try {
			return super.getSqlSession().selectOne("com.manage.system.mapper.IUserDAO.findByName", name);
		} catch (Exception e) {
			e.printStackTrace();
			throw new AppException("系统异常，稍后再试");
		}
	}
	@Override
	public boolean removeOnePhById(Integer userid) throws AppException {
		return super.getSqlSession().delete("com.manage.system.mapper.IUserDAO.removeOnePhById", userid)>0;
	}
	//分页查询
	@Override
	public List<User> findAllByPage(Page<User> up) throws AppException {
		return super.getSqlSession().selectList("com.manage.system.mapper.IUserDAO.findAllByPage", up);
	}

	@Override
	public Integer findTotalNum(Page<User> up) throws AppException {
		return super.getSqlSession().selectOne("com.manage.system.mapper.IUserDAO.findTotalNum",up);
	}
	//批量删除用户
	@Override
	public Boolean deletetAll(List<String> names) throws AppException {
		try {
			return super.getSqlSession().delete("com.manage.system.mapper.IUserDAO.deletetAll", names)>0;
		} catch (Exception e) {
			e.printStackTrace();
			throw new AppException("删除失败");
		}
	}
}
