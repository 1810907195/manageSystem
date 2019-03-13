package com.manage.system.bean;

import java.io.Serializable;

import com.manage.system.bean.Role;

public class User implements Serializable{
	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	private Integer user_id;
	private String user_name;
	private String password;
	private String status;
	private Role roles;
	private Integer role_id;
	private String email;
	private String phoneNum;
	private String create_time;
	private String update_time;
	public Integer getUser_id() {
		return user_id;
	}
	public void setUser_id(Integer user_id) {
		this.user_id = user_id;
	}
	public String getUser_name() {
		return user_name;
	}
	public void setUser_name(String user_name) {
		this.user_name = user_name;
	}
	public String getPassword() {
		return password;
	}
	public void setPassword(String password) {
		this.password = password;
	}
	public String getStatus() {
		return status;
	}
	public void setStatus(String status) {
		this.status = status;
	}
	public Role getRoles() {
		return roles;
	}
	public void setRoles(Role roles) {
		this.roles = roles;
	}
	public Integer getRole_id() {
		return role_id;
	}
	public void setRole_id(Integer role_id) {
		this.role_id = role_id;
	}
	public String getEmail() {
		return email;
	}
	public void setEmail(String email) {
		this.email = email;
	}
	public String getPhoneNum() {
		return phoneNum;
	}
	public void setPhoneNum(String phoneNum) {
		this.phoneNum = phoneNum;
	}
	public String getCreate_time() {
		return create_time;
	}
	public void setCreate_time(String create_time) {
		this.create_time = create_time;
	}
	public String getUpdate_time() {
		return update_time;
	}
	public void setUpdate_time(String update_time) {
		this.update_time = update_time;
	}
	public User(Integer user_id, String user_name, String password, String status, Role roles, Integer role_id,
			String email, String phoneNum, String create_time, String update_time) {
		super();
		this.user_id = user_id;
		this.user_name = user_name;
		this.password = password;
		this.status = status;
		this.roles = roles;
		this.role_id = role_id;
		this.email = email;
		this.phoneNum = phoneNum;
		this.create_time = create_time;
		this.update_time = update_time;
	}
	public User(){
		
	}
	@Override
	public String toString() {
		return "User [user_id=" + user_id + ", user_name=" + user_name + ", password=" + password + ", status=" + status
				+ ", roles=" + roles + ", role_id=" + role_id + ", email=" + email + ", phoneNum=" + phoneNum
				+ ", create_time=" + create_time + ", update_time=" + update_time + "]";
	}
	
}
