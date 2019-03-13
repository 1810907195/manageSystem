package com.manage.system.controller;

import com.manage.system.bean.JsonResult;
import com.manage.system.bean.Page;
import com.manage.system.bean.SstSfjsYhjfxx;
import com.manage.system.mapper.impl.BusinessDAOImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller
public class BusinessController {
    @Autowired
    private BusinessDAOImpl businessDAOImpl;

    @GetMapping("/asd")
    @ResponseBody
    public JsonResult<Integer> getTotalCount(){
        Page<SstSfjsYhjfxx> page=new Page<SstSfjsYhjfxx>();
        Integer total=businessDAOImpl.findTotalNum(page);
        return new JsonResult<Integer>(total);
    }
}
