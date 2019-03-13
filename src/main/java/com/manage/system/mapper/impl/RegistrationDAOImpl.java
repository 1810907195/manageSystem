package com.manage.system.mapper.impl;

import java.util.List;

import com.manage.system.exception.AppException;
import com.manage.system.mapper.IRegistrationDAO;
import org.apache.ibatis.session.SqlSessionFactory;
import org.mybatis.spring.support.SqlSessionDaoSupport;
import org.springframework.stereotype.Repository;

import javax.servlet.Registration;


@Repository
public class RegistrationDAOImpl extends SqlSessionDaoSupport implements IRegistrationDAO {
	
	public RegistrationDAOImpl(SqlSessionFactory sessionFactory){
		super.setSqlSessionFactory(sessionFactory);
	}

	@Override
	public List findTotalNum(Registration up) throws AppException {
		
		return super.getSqlSession().selectList("com.manage.system.mapper.IBusinessDAO.findTotalNum", up);
	}
	
}
