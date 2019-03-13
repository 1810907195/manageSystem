package com.manage.system.service.impl;

import java.io.OutputStream;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletResponse;

import com.manage.system.bean.Page;
import com.manage.system.bean.SstSfjsYhjfxx;
import com.manage.system.exception.AppException;
import com.manage.system.mapper.impl.BusinessDAOImpl;
import com.manage.system.service.IBusinessService;
import com.manage.system.utils.StrUtil;
import org.springframework.stereotype.Service;



@Service
public class BusinessServiceImpl implements IBusinessService {
	@Resource
	private BusinessDAOImpl businessDAOImpl;

	@Override
	public boolean validate(SstSfjsYhjfxx vo, Integer k) throws AppException {
		// TODO Auto-generated method stub
		return false;
	}

	@Override
	public Page<SstSfjsYhjfxx> findBusinessByPage(Page<SstSfjsYhjfxx> p) throws AppException {
		List<SstSfjsYhjfxx> dataList=businessDAOImpl.findAllByPage(p);
		p.setData(dataList);
		Integer totalRecords=businessDAOImpl.findTotalNum(p);
		p.setRecords(totalRecords);
		p.setTotal(StrUtil.pageCount(totalRecords,p.getRows()));
		return p;
	}

	@Override
	public Boolean addBusiness(SstSfjsYhjfxx p) {
		return null;
	}

	@Override
	public Boolean editBusiness(SstSfjsYhjfxx p) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public Boolean deleteAll(List<String> ids) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public String outExcelXnhCard(HttpServletResponse response,Page<SstSfjsYhjfxx> p) {
		try {
			List<SstSfjsYhjfxx> dataList=businessDAOImpl.findAllByNoPage(p);
			SimpleDateFormat asd=new SimpleDateFormat("yyyyMMddHHmmss");
			String filename=asd.format(new Date())+".xlsx";
			response.setHeader("content-disposition", "attachment;filename="+filename);
			response.setHeader("connection", "close");
			OutputStream out =response.getOutputStream();
//			String[] title=ExcelEntity.Business.split(",");
//			ExportUtil.exportExcel(dataList, title,out);
			return null;
		} catch (Exception e) {
			throw new AppException("未知错误");
		}
	}
}
