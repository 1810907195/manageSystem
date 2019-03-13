package com.manage.system.bean;

import java.io.Serializable;

public class RoleGroup implements Serializable{
	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	private Integer roleID;
	private Integer groupID;
	public Integer getRoleID() {
		return roleID;
	}
	public void setRoleID(Integer roleID) {
		this.roleID = roleID;
	}
	public Integer getGroupID() {
		return groupID;
	}
	public void setGroupID(Integer groupID) {
		this.groupID = groupID;
	}
	public RoleGroup(Integer roleID, Integer groupID) {
		super();
		this.roleID = roleID;
		this.groupID = groupID;
	}
	public RoleGroup(){
		
	}
	@Override
	public String toString() {
		return "RoleGroup [roleID=" + roleID + ", groupID=" + groupID + "]";
	}
	
}
