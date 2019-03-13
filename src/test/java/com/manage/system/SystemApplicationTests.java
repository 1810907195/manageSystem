package com.manage.system;

import com.manage.system.bean.Page;
import com.manage.system.bean.Role;
import com.manage.system.bean.User;
import com.manage.system.mapper.impl.RoleDAOImpl;
import com.manage.system.mapper.impl.UserDAOImpl;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;

import javax.annotation.Resource;
import java.sql.SQLException;
import java.util.List;

@RunWith(SpringRunner.class)
@SpringBootTest
public class SystemApplicationTests {

    @Resource
    private UserDAOImpl userDAOImpl;
    @Resource
    private RoleDAOImpl roleDAOImpl;
    @Test
    public void contextLoads() {
        System.out.println("配置文件加载成功");
    }
    @Test
    public void testRole() throws SQLException {
        Role role=roleDAOImpl.findById(1);
        System.out.println("角色："+role);
    }
    //根据用户名查询用户
    @Test
    public void testLogin(){
        User user= userDAOImpl.findByName("Jack");
        System.out.println("查询用户为："+user);
    }
    @Test
    public void testselect1(){
        User user=new User();
        user.setStatus("1");
        Page<User> p=new Page<User>();
        p.setQueryObj(user);
        int integer=userDAOImpl.findTotalNum(p);
        System.out.println("共"+integer+"条");
    }
    @Test
    public void testselect2(){
        User user=new User();
        user.setStatus("1");
        Page<User> p=new Page<User>();
        p.setQueryObj(user);
        p.setPage(2);
        p.setRows(2);
        System.out.println("开始行："+p.getStartRow());
        System.out.println("截止行："+p.getEndRow());
        List<User> list=userDAOImpl.findAllByPage(p);
        System.out.println("结果集："+list);
    }
}

