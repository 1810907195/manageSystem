package com.manage.system.bean;

import java.io.Serializable;

public class Action implements Serializable{
	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	private Integer actionID;
	private Integer GroupID;
	private String actionName;
	private String url;
	public Integer getActionID() {
		return actionID;
	}
	public void setActionID(Integer actionID) {
		this.actionID = actionID;
	}
	public Integer getGroupID() {
		return GroupID;
	}
	public void setGroupID(Integer groupID) {
		GroupID = groupID;
	}
	public String getActionName() {
		return actionName;
	}
	public void setActionName(String actionName) {
		this.actionName = actionName;
	}
	public String getUrl() {
		return url;
	}
	public void setUrl(String url) {
		this.url = url;
	}
	public Action(Integer actionID, Integer groupID, String actionName, String url) {
		super();
		this.actionID = actionID;
		GroupID = groupID;
		this.actionName = actionName;
		this.url = url;
	}
	public Action(){
		
	}
	@Override
	public String toString() {
		return "Action [actionID=" + actionID + ", GroupID=" + GroupID + ", actionName=" + actionName + ", url=" + url
				+ "]";
	}
}
