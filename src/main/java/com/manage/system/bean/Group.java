package com.manage.system.bean;

import java.io.Serializable;

public class Group implements Serializable{
	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	private Integer groupID;
	private String groupName;
	private String note;
	public Integer getGroupID() {
		return groupID;
	}
	public void setGroupID(Integer groupID) {
		this.groupID = groupID;
	}
	public String getGroupName() {
		return groupName;
	}
	public void setGroupName(String groupName) {
		this.groupName = groupName;
	}
	public String getNote() {
		return note;
	}
	public void setNote(String note) {
		this.note = note;
	}
	public Group(Integer groupID, String groupName, String note) {
		super();
		this.groupID = groupID;
		this.groupName = groupName;
		this.note = note;
	}
	public Group(){
		
	}
	@Override
	public String toString() {
		return "Group [groupID=" + groupID + ", groupName=" + groupName + ", note=" + note + "]";
	}
}
