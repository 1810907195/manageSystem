package com.manage.system.utils;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.Date;
import java.util.List;

/**
 * 时间相关工具类
 * @author Jwenk
 *
 */
public class DateUtils {
	
	public static final String JS_DATEFORMAT = "yyyy/MM/dd,HH:mm:ss";
	
	public static final String STANDARD_DATEFORMT = "yyyy-MM-dd,HH:mm:ss";
	
	public static final String USELLY_DATEFORMT = "yyyy-MM-dd HH:mm:ss";
	
	public static final String CHIESE_DATEFORMAT = "yyyy年MM月dd日 HH:mm:ss";
	
	public static final String ONLY_YMD = "yyyy-MM-dd";
	
	public static final String ONLY_YMD_Z = "yyyyMMdd";
	
	public static final String HHMMSS = "HH:mm:ss";
	
	public static final String CHINESE_DATEFORMAT_NOHOUR = "yyyy年MM月dd日";
	
	/**
	 * 通过指定的日期格式初始化SimpleDateFormat并返回
	 * @param format
	 * @return
	 */
	public static SimpleDateFormat initSimpleDateFormat(String format){
		return new SimpleDateFormat(format);
	}
	
	/**
	 * 得到一个Calendar对象
	 * @param date
	 * @return
	 * @throws ParseException 
	 */
	@SuppressWarnings("unused")
	public static Calendar initCalendar(Date date) throws ParseException{
		Calendar cal = Calendar.getInstance();
		cal.setTime(date);
		return cal;
	}
	@SuppressWarnings("unused")
	public static String getDate(Long time,String format) throws ParseException{
		return initSimpleDateFormat(format).format(time);
	}
	
	/**
	 * 时间格式转换(通过Date获取指定格式的String时间字符串)
	 * @param format
	 * @param date
	 * @return
	 */
	public static String dateFormatTransform(String format,Date date){
		format = formatIsNull(format);
		return initSimpleDateFormat(format).format(date);
	}
	
	/**
	 * 时间格式转换(通过String日期获取指定格式的String时间字符串)
	 * @param
	 * @param date
	 * @return
	 * @throws ParseException 
	 */
	public static String dateFormatTransform(String toFormat,String date,String nowFormat) throws ParseException{
		Date time = getDateByString(date,nowFormat);
		return initSimpleDateFormat(toFormat).format(time);
	}
	
	/**
	 * 通过阿拉伯数字获得对应的中文数字(简体)
	 * @param number
	 * @return
	 * @throws NumberFormatException
	 */
	public static String ArabicToChinese(String number)throws NumberFormatException{
		try {
			int nums = Integer.parseInt(number);
			//char[] nums = number.toCharArray();
			String value = "";
			switch (nums) {
			case 1:
				value = "一";
				break;
			case 2:
				value = "二";
				break;
			case 3:
				value = "三";
				break;
			case 4:
				value = "四";
				break;
			case 5:
				value = "五";
				break;
			case 6:
				value = "六";
				break;
			case 7:
				value = "七";
				break;
			case 8:
				value = "八";
				break;
			case 9:
				value = "九";
				break;
			case 10:
				value = "十";
				break;
			default:
				break;
			}
			return value;
		} catch (NumberFormatException e) {
			throw new NumberFormatException(number+"不是数字");
		}
	}
	
	/**
	 * 将美式星期编号转换为对应的中文星期
	 * @param weekNum
	 * @return
	 */
	@SuppressWarnings("unused")
	private static String WeekTransform(int weekNum){
		String week = null;
		switch (weekNum) {
		case 1:
			week = "星期天";
			break;
		case 2:
			week = "星期一";
			break;
		case 3:
			week = "星期二";
			break;
		case 4:
			week = "星期三";
			break;
		case 5:
			week = "星期四";
			break;
		case 6:
			week = "星期五";
			break;
		case 7:
			week = "星期六";
			break;
		}
		return week;
	}
	
	/**
	 * 通过阿拉伯数字获取中文周几
	 * @param number
	 * @return
	 * @throws NumberFormatException
	 */
	public static String getWeekByArabic(String number)throws NumberFormatException{
		try {
			int nums = Integer.parseInt(number);
			//char[] nums = number.toCharArray();
			String value = "";
			switch (nums) {
			case 1:
				value = "一";
				break;
			case 2:
				value = "二";
				break;
			case 3:
				value = "三";
				break;
			case 4:
				value = "四";
				break;
			case 5:
				value = "五";
				break;
			case 6:
				value = "六";
				break;
			case 7:
				value = "天";
				break;
			default:
				break;
			}
			return value;
		} catch (NumberFormatException e) {
			throw new NumberFormatException(number+"不是数字");
		}
	}
	
	/**
	 * 通过String字符串日期和指定的格式获取一个Date对象
	 * @param date
	 * @param format
	 * @return
	 * @throws ParseException
	 */
	public static Date getDateByString(String date,String format) throws ParseException{
		format = formatIsNull(format);
		return initSimpleDateFormat(format).parse(date);
	}
	
	/**
	 * 根据Date获取对应的String字符串,需要选择一个时间格式，如果传入的位null则为默认的
	 * @param date
	 * @param format
	 * @return <p>String，日期字符串</p>
	 */
	public static String getStringByDate(Date date,String format){
		format = formatIsNull(format);
		return initSimpleDateFormat(format).format(date);
	}
	
	/**
	 * 设置指定周期的下一个时间，并返回。
	 * @param date
	 * @return
	 * @throws ParseException 
	 */
	public static String setNextDate(int day,String date,String format) throws ParseException{
		format = formatIsNull(format);
		Calendar cal = Calendar.getInstance();
		cal.setTime(getDateByString(date, format));
		cal.add(Calendar.DATE,day);
		return initSimpleDateFormat(format).format(cal.getTime());
	}
	
	/**
	 * 得到指定日期前N天日期，并返回String字符串
	 * @param day
	 * @param date
	 * @param format
	 * @return
	 * @throws ParseException
	 */
	public static String setPriorDate(int day,String date,String format) throws ParseException{
		format = formatIsNull(format);
		Calendar cal = Calendar.getInstance();
		cal.setTime(getDateByString(date, format));
		cal.add(Calendar.DATE,-(day));
		return initSimpleDateFormat(format).format(cal.getTime());
	}
	
//	public static Date getDateByStringD(String parm){
//		return new Date(parm);
//	}
	
	/**
	 * 计算两个日期之间的天数
	 * @param dateOne
	 * @param dateTwo
	 * @return
	 * @throws ParseException 
	 */
	public static int getDvalueByTwoDate(String dateOne,String dateTwo) throws ParseException{
		//int value = initCalendar(dateOne).get(Calendar.DAY_OF_MONTH) - initCalendar(dateTwo).get(Calendar.DAY_OF_MONTH);
		long time = getDateByString(dateOne, ONLY_YMD).getTime() - getDateByString(dateTwo, ONLY_YMD).getTime();
		int value = (int) (time/3600/24/1000);
		return value>0?value:(-value);
	}
	
	/**
	 * 检查日期格式时候为null，如果为null则返回默认格式，如果为null的话则不变
	 * @param format
	 * @return
	 */
	public static String formatIsNull(String format){
		if(format==null){
			format=ONLY_YMD_Z;
		}
		return format;
	}
	/**
	 * 获取当前月份的所有天数，并以集合的形式返回
	 * @return
	 * @throws ParseException 
	 */
	public static List<String> getDaysPerMonth(Calendar cal) throws ParseException{
		//cal=Calendar.getInstance();
		//获取当前年份
		int year = cal.get(Calendar.YEAR);
		//获取当前月份
		int m=cal.get(Calendar.MONTH )+1;
		//获取当前月份最后一天
		int Maxd=cal.getActualMaximum(Calendar.DAY_OF_MONTH);
		List<String> list=new ArrayList<String>();
		for(int i=1;i<=Maxd;i++){
			String dateStr="";
			dateStr=year+"-"+m+"-"+i;
			SimpleDateFormat asd=new SimpleDateFormat("yyyy-MM-dd");
			Date date=asd.parse(dateStr);
			dateStr=asd.format(date);
			list.add(dateStr);
		}
		return list;
	}
	public static List<Integer> getDaysPerMonth2(Calendar cal) throws ParseException{
		//获取当前月份最后一天
		int Maxd=cal.getActualMaximum(Calendar.DAY_OF_MONTH);
		List<Integer> list=new ArrayList<Integer>();
		for(int i=1;i<=Maxd;i++){
			list.add(i);
		}
		return list;
	}
	/**
	 * 获取前月的第一天 日期
	 * @return
	 */
	public static String getFirstDayOnMonth(){
		// 获取当月第一天
        SimpleDateFormat format = new SimpleDateFormat("yyyy-MM-dd");  
        String firstday;  
        // 获取前月的第一天 日期
        Calendar cale = null;
        cale = Calendar.getInstance();  
        cale.add(Calendar.MONTH, 0);  
        cale.set(Calendar.DAY_OF_MONTH, 1);  
        firstday = format.format(cale.getTime());  
        return firstday;
	}
	/**
	 * 获取前月的最后一天日期
	 * @return
	 */
	public static String getLastDayOnMonth(){
		SimpleDateFormat format = new SimpleDateFormat("yyyy-MM-dd");  
        String lastday;  
        // 获取前月的最后一天日期
        Calendar cale = null;
		cale = Calendar.getInstance();  
        cale.add(Calendar.MONTH, 1);  
        cale.set(Calendar.DAY_OF_MONTH, 0);  
        lastday = format.format(cale.getTime());  
        return lastday;
	}
	
	public static String getDateByDay(String str)throws NumberFormatException{
		Calendar cal = Calendar.getInstance();  
		int year = cal.get(Calendar.YEAR);
		String value = "";
		int nums=Integer.valueOf(str);
		int n=cal.get(Calendar.MONTH )+1;
		String m="";
		if(n<10){
			m="0"+n;
		}else{
			m=String.valueOf(n);
		}
		switch (nums) {
		case 1:
			value = year+"-"+m+"-01";
			break;
		case 2:
			value = year+"-"+m+"-02";
			break;
		case 3:
			value = year+"-"+m+"-03";
			break;
		case 4:
			value = year+"-"+m+"-04";
			break;
		case 5:
			value = year+"-"+m+"-05";
			break;
		case 6:
			value = year+"-"+m+"-06";
			break;
		case 7:
			value = year+"-"+m+"-07";
			break;
		case 8:
			value = year+"-"+m+"-08";
			break;
		case 9:
			value = year+"-"+m+"-09";
			break;
		default:
			value = year+"-"+m+"-"+nums;
			break;
		}
		System.out.println("value:"+value);
		return value;
		
	}
	public static void main(String[] args) {
		getDateByDay("10");
	}
}
