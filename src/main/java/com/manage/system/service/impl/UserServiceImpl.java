package com.manage.system.service.impl;

import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;


import com.manage.system.bean.Page;
import com.manage.system.bean.User;
import com.manage.system.exception.AppException;
import com.manage.system.mapper.impl.UserDAOImpl;
import com.manage.system.service.IService;
import com.manage.system.service.IUserService;
import com.manage.system.utils.MD5Util;
import com.manage.system.utils.StrUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;



@Service
public class UserServiceImpl implements IUserService {
	@Autowired
	private UserDAOImpl userDAOImpl;

	@Override
	public boolean validate(User vo, Integer code) throws AppException {
		//判断用户名是否为空
		if(vo.getUser_name()==null || vo.getUser_name().trim().isEmpty()){
			throw new AppException("用户名不能为空");
		}
		
		//判断密码是否为空
		if(vo.getPassword()==null || vo.getPassword().trim().isEmpty()){
			throw new AppException("密码不能为空");
		}
		//正则表达式检查
		String reg = "^[0-9a-zA-Z]{3,15}$";
		String pwdReg = "^[0-9a-zA-Z]{32}$";
		
		//String pwdReg = "^[0-9a-zA-Z\\-_]{4,15}$";
		//检查用户名是否符合规范
		if(!vo.getUser_name().matches(reg)){
			throw new AppException("用户名不符合规范");
		}
		if(!vo.getPassword().matches(pwdReg)){
			throw new AppException("密码不符合规范");
		}
		return true;
	}

	@Override
	public User login(User vo) throws AppException {
		//检验数据
		validate(vo, IService.LOGIN_CODE);
		//获取一个Subject对象
//		Subject loginUser = SecurityUtils.getSubject();
//		UsernamePasswordToken token=null;
		User user=null;
		user=userDAOImpl.findByName(vo.getUser_name());
		if(user==null){
			throw new AppException("未找到该用户");
		}
		try {
			String MD5Password=MD5Util.md5_32bit(vo.getUser_name()+vo.getPassword());
			if(!user.getPassword().equals(MD5Password)){
				throw new AppException("密码不正确");
			}
			//单点登录
//			vo.setPassword(MD5Password);
//			if(!loginUser.isAuthenticated()){
//				token = new UsernamePasswordToken(vo.getUser_name(),vo.getPassword());
//				token.setRememberMe(true);
				//单点登录
				return user;
//			}
		} catch (Exception e) {
			e.printStackTrace();
		}
		return null;
	}
	
	@Override
	public boolean insert(User vo) throws AppException {
		validate(vo, IService.REG_CODE);
		try {
			vo.setPassword(MD5Util.md5_32bit(vo.getUser_name()+vo.getPassword()));
			return userDAOImpl.doCreate(vo);
		} catch (SQLException e) {
			e.printStackTrace();
			throw new AppException(e.getMessage());
		}catch(Exception e){
			e.printStackTrace();
			throw new AppException(e.getMessage());
		}
	}

	@Override
	public User findByName(String name) throws AppException {
		if(name.equals("")||name==null){
			throw new AppException("用户名为空");
		}
		return userDAOImpl.findByName(name);
	}

	@Override
	public boolean update(User vo) throws AppException {
		try {
			User user=userDAOImpl.findById(vo.getUser_id());
			if(user==null){
				throw new AppException("查无此人");
			}
			return userDAOImpl.doUpdate(vo);
		} catch (SQLException e) {
			e.printStackTrace();
		}
		return false;
	}

	@Override
	public Page<User> findUserByPage(Page<User> p) throws AppException {
        List<User> dataList=userDAOImpl.findAllByPage(p);
        p.setData(dataList);
        Integer totalRecords=userDAOImpl.findTotalNum(p);
        p.setRecords(totalRecords);
        p.setTotal(StrUtil.pageCount(totalRecords,p.getRows()));
        return p;
	}

	@Override
	public Boolean delAll(String userids) throws AppException {
		List<String> names=new ArrayList<String>();
		String[] idss=userids.split(",");
		for(int i=0;i<idss.length;i++){
			if(idss[i]==null||idss[i].trim().isEmpty()){
				continue;
			}
			names.add("'"+idss[i]+"'");
		}
		return userDAOImpl.deletetAll(names);
	}
}
