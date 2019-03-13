package com.manage.system.mapper.impl;

import java.sql.SQLException;
import java.util.List;
import java.util.Set;

import com.manage.system.bean.Role;
import com.manage.system.mapper.IRoleDAO;
import org.apache.ibatis.session.SqlSessionFactory;
import org.mybatis.spring.support.SqlSessionDaoSupport;
import org.springframework.stereotype.Repository;


@Repository
public class RoleDAOImpl extends SqlSessionDaoSupport implements IRoleDAO {
	
	public RoleDAOImpl(SqlSessionFactory sessionFactory){
		super.setSqlSessionFactory(sessionFactory);
	}
	
	
	@Override
	public boolean doCreate(Role vo) throws SQLException {
		return false;
	}

	@Override
	public boolean doUpdate(Role vo) throws SQLException {
		return false;
	}

	@Override
	public boolean doRemove(Set<?> ids) throws SQLException {
		return false;
	}


	@Override
	public List<Role> findAll() throws SQLException {
		return null;
	}

	@Override
	public List<Role> findAllBySplit(String column, String keyWord, Integer currentPage, Integer lineSize)
			throws SQLException {
		return null;
	}

	@Override
	public Integer getAllCount() throws SQLException {
		return null;
	}

	@Override
	public Role findById(Integer id) throws SQLException {
		return super.getSqlSession().selectOne("com.manage.system.mapper.IRoleDAO.findById",id);
	}
}
