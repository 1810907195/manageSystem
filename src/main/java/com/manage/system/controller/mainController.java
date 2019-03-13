package com.manage.system.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class mainController {
    @GetMapping("/user/userManage}")
    public String gotoUserManagePage(){
        return "pages/user/userList";
    }
}
