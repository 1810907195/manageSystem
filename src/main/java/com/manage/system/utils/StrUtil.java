package com.manage.system.utils;

import java.util.regex.Pattern;


/**
 * 字符串工具类
 * @author Jwenk
 *
 */
public class StrUtil {
	/**
	 * 判断一个字符串是全部为数字
	 * @param str
	 * @return
	 */
	  public static boolean isInteger(String str) {  
	        Pattern pattern = Pattern.compile("^[-\\+]?[\\d]*$");  
	        return pattern.matcher(str).matches();  
	  }
	  public static Integer pageCount(Integer t,Integer p){
		  if(t%p!=0){
			  return (t/p)+1;
		  }else{
			  return t/p;
		  }
	  }
	  public static void main(String[] args) {
		  //System.out.println(pageCount(15,10));
	}
}
