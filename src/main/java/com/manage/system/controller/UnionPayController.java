package com.manage.system.controller;

import com.manage.system.bean.JsonResult;
import com.manage.system.bean.Page;
import com.manage.system.bean.SstSfjsYhjfxx;
import com.manage.system.service.IBusinessService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

/**
 * 银联交易相关
 */
@Controller
@RequestMapping("/Union")
public class UnionPayController {

    @Autowired
    private IBusinessService iBusinessService;
    //模糊+分页
    @RequestMapping(value="findBankCardTradeInfoByPage")
    @ResponseBody
    public Page<SstSfjsYhjfxx> likeFindBusinessByPage(Page<SstSfjsYhjfxx> page, SstSfjsYhjfxx s){
        page.setQueryObj(s);
        page=iBusinessService.findBusinessByPage(page);
        return page;
    }
    /**
     * Excel数据导出
     * @param page
     * @param queryObj
     * @return
     * @throws IOException
     */
    @GetMapping(value="outExcel")
    @ResponseBody
    public JsonResult<String> outExcel(HttpServletResponse response, Page<SstSfjsYhjfxx> page, SstSfjsYhjfxx queryObj) throws IOException {
        page.setQueryObj(queryObj);
        iBusinessService.outExcelXnhCard(response,page);
        return new JsonResult<String>("导出成功");
    }
}
