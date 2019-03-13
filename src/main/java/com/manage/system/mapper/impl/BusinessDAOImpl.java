package com.manage.system.mapper.impl;

import com.manage.system.bean.Page;
import com.manage.system.bean.SstSfjsYhjfxx;
import com.manage.system.exception.AppException;
import com.manage.system.mapper.IBusinessDAO;
import org.apache.ibatis.session.SqlSessionFactory;
import org.mybatis.spring.support.SqlSessionDaoSupport;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class BusinessDAOImpl extends SqlSessionDaoSupport implements IBusinessDAO<SstSfjsYhjfxx> {
	public  BusinessDAOImpl(SqlSessionFactory sqlSessionFactory) {
		super.setSqlSessionFactory(sqlSessionFactory);
	}
	@Override
	public List<SstSfjsYhjfxx> findAllByPage(Page<SstSfjsYhjfxx> up) throws AppException {
		return super.getSqlSession().selectList("com.manage.system.mapper.IBusinessDAO.findAllByPage", up);
	}

	@Override
	public Integer findTotalNum(Page<SstSfjsYhjfxx> up) throws AppException {
		return super.getSqlSession().selectOne("com.manage.system.mapper.IBusinessDAO.findTotalNum",up);
	}
	@Override
	public Boolean addBusiness(SstSfjsYhjfxx p) {
		return super.getSqlSession().insert("com.manage.system.mapper.IBusinessDAO.addBusiness", p)>0;
	}
	@Override
	public Boolean editBusiness(SstSfjsYhjfxx p) {
		return super.getSqlSession().update("BusinessNS.editBusiness", p)>0;
	}
	@Override
	public Boolean removeBusiness(List<String> ids) {
		try {
			return super.getSqlSession().delete("com.manage.system.mapper.IBusinessDAO.deletetAll", ids)>0;
		} catch (Exception e) {
			e.printStackTrace();
			throw new AppException("删除失败");
		}
	}
	@Override
	public List<SstSfjsYhjfxx> findAllByNoPage(Page<SstSfjsYhjfxx> up) throws AppException {
		return super.getSqlSession().selectList("com.manage.system.mapper.IBusinessDAO.findAllByNoPage", up);
	}
}
