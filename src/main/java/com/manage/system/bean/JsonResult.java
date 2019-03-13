package com.manage.system.bean;

public class JsonResult<T> {
	public static final int SECCUSS = 0;
	public static final int ERROR = 1;
	
	private int state;
	private T data;
	private String message;
	
	public JsonResult(){
		
	}
	
	public JsonResult(int state ,Throwable e){
		this.state = state;
		this.message = e.getMessage();
		this.data = null;
	}
	
	public JsonResult(T t){
		state = SECCUSS;
		if(t instanceof Boolean){
			if((Boolean)t==false){
				state = ERROR;
			}
		}
		data= t;
		message="";
	}
	
	public JsonResult(Throwable e){
		state = ERROR;
		data = null;
		message = e.getMessage();
	}
	
	public JsonResult(Throwable e,int state){
		this.state = state;
		data = null;
		this.message = e.getMessage();
	}
	public JsonResult(Throwable e,int state,String message){
		this.state = state;
		data = null;
		this.message = message;
	}
	
	public JsonResult(int state, T data, String message) {
		super();
		this.state = state;
		this.data = data;
		this.message = message;
	}
	public int getState() {
		return state;
	}
	public void setState(int state) {
		this.state = state;
	}
	public T getData() {
		return data;
	}
	public void setData(T data) {
		this.data = data;
	}
	public String getMessage() {
		return message;
	}
	public void setMessage(String message) {
		this.message = message;
	}
	public static int getSuccess() {
		return SECCUSS;
	}
	public static int getError() {
		return ERROR;
	}
	@Override
	public String toString() {
		return "JsonResult [state=" + state + ", data=" + data + ", message=" + message + "]";
	}
	
	
}
