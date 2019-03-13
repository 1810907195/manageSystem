package com.manage.system.controller;

import com.manage.system.bean.JsonResult;
import com.manage.system.bean.Page;
import com.manage.system.bean.User;
import com.manage.system.service.IUserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.servlet.http.HttpServletRequest;
import java.util.List;

@Controller
public class UserControler {
    @Autowired
    private IUserService iUserService;

    @GetMapping({"/","login","/login.html"})
    public String goToLogin(){
        return "login";
    }
    @GetMapping("/logout")
    public String logout(HttpServletRequest request){
        request.getSession().removeAttribute("user");
        request.getSession().removeAttribute("username");
        request.getSession().removeAttribute("per");
        return "login";
    }
    @GetMapping({"/regist","/regist.html"})
    public String goToRegist(){
        return "regist";
    }

    @PostMapping("/login")
    @ResponseBody
    public JsonResult<User> login(HttpServletRequest request, User user){
        //
        user = this.iUserService.login(user);
        //
        request.getSession().setAttribute("user",user);
        request.getSession().setAttribute("username",user.getUser_name());
        request.getSession().setAttribute("per",user.getRoles().getRole_note());
        JsonResult<User> a=new JsonResult<User>(user);
        return a;
    }
    //获取全部用户
    @PostMapping("/user/userList")
    @ResponseBody
    public Page<User> Userlist(Page<User> page,User user){
        page.setQueryObj(user);
        page=this.iUserService.findUserByPage(page);
        return page;
    }
}
