package com.manage.system.bean;

import java.io.Serializable;

/**
 * 对应7001中的SST_SFJS_YHJFXX表
 * @author wangz
 *
 */
public class SstSfjsYhjfxx implements Serializable{
	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
//	
//	public static long getSerialversionuid() {
//		return serialVersionUID;
//	}
	private String jylsh0;//交易流水号
	private String cardno;//卡号
	private String cardtype;//卡类型
	private String jfje00;//缴费金额
	private String jylx00;//交易类型 3 预约取号4 现场挂号  5 门诊结算 6 发卡 7 住院预交金
	private String xtgzh0;//系统跟踪号
	private String zdbh00;//终端编号
	private String yyjgdm;//医院机构代码
	private String jfztbz;//缴费状态标志-> 0初始化 1 银行失败 2银行缴费成功,HIS确认成功 3HIS确认失败 4HIS确认失败，被冲销 5HIS确认失败，冲销失败 6HIS确认初始化 7用户主动冲销
	private String yhlsh0;//银行流水号
	private String fkhdm0;//发卡行代码
	private String yhkh00;//银行卡号
	private String jyje00;//交易金额
	private String yhshh0;//银行商户号
	private String yhzdh0;//银行终端号
	private String jyrq00;//交易日期
	private String jysj00;//交易时间
	private String jyckh0;//交易参考号
	private String yhsqh0;//银行授权号
	private String qsrq00;//清算日期
	private String yhpch0;//银行批次号
	private String cgjysj;//成功交易时间
	private String errmsg;//错误说明
	private String cshsj0;//初始化时间
	
	public String getJylsh0() {
		return jylsh0;
	}
	//无参构造
	public SstSfjsYhjfxx(){}
	//全参构造
	public SstSfjsYhjfxx(String jylsh0, String cardno, String cardtype, String jfje00, String jylx00, String xtgzh0,
			String zdbh00, String yyjgdm, String jfztbz, String yhlsh0, String fkhdm0, String yhkh00, String jyje00,
			String yhshh0, String yhzdh0, String jyrq00, String jysj00, String jyckh0, String yhsqh0, String qsrq00,
			String yhpch0, String cgjysj, String errmsg, String cshsj0) {
		super();
		this.jylsh0 = jylsh0;
		this.cardno = cardno;
		this.cardtype = cardtype;
		this.jfje00 = jfje00;
		this.jylx00 = jylx00;
		this.xtgzh0 = xtgzh0;
		this.zdbh00 = zdbh00;
		this.yyjgdm = yyjgdm;
		this.jfztbz = jfztbz;
		this.yhlsh0 = yhlsh0;
		this.fkhdm0 = fkhdm0;
		this.yhkh00 = yhkh00;
		this.jyje00 = jyje00;
		this.yhshh0 = yhshh0;
		this.yhzdh0 = yhzdh0;
		this.jyrq00 = jyrq00;
		this.jysj00 = jysj00;
		this.jyckh0 = jyckh0;
		this.yhsqh0 = yhsqh0;
		this.qsrq00 = qsrq00;
		this.yhpch0 = yhpch0;
		this.cgjysj = cgjysj;
		this.errmsg = errmsg;
		this.cshsj0 = cshsj0;
	}
	public void setJylsh0(String jylsh0) {
		this.jylsh0 = jylsh0;
	}
	public String getCardno() {
		return cardno;
	}
	public void setCardno(String cardno) {
		this.cardno = cardno;
	}
	public String getCardtype() {
		return cardtype;
	}
	public void setCardtype(String cardtype) {
		this.cardtype = cardtype;
	}
	public String getJfje00() {
		return jfje00;
	}
	public void setJfje00(String jfje00) {
		this.jfje00 = jfje00;
	}
	public String getJylx00() {
		return jylx00;
	}
	public void setJylx00(String jylx00) {
		this.jylx00 = jylx00;
	}
	public String getXtgzh0() {
		return xtgzh0;
	}
	public void setXtgzh0(String xtgzh0) {
		this.xtgzh0 = xtgzh0;
	}
	public String getZdbh00() {
		return zdbh00;
	}
	public void setZdbh00(String zdbh00) {
		this.zdbh00 = zdbh00;
	}
	public String getYyjgdm() {
		return yyjgdm;
	}
	public void setYyjgdm(String yyjgdm) {
		this.yyjgdm = yyjgdm;
	}
	public String getJfztbz() {
		return jfztbz;
	}
	public void setJfztbz(String jfztbz) {
		this.jfztbz = jfztbz;
	}
	public String getYhlsh0() {
		return yhlsh0;
	}
	public void setYhlsh0(String yhlsh0) {
		this.yhlsh0 = yhlsh0;
	}
	public String getFkhdm0() {
		return fkhdm0;
	}
	public void setFkhdm0(String fkhdm0) {
		this.fkhdm0 = fkhdm0;
	}
	public String getYhkh00() {
		return yhkh00;
	}
	public void setYhkh00(String yhkh00) {
		this.yhkh00 = yhkh00;
	}
	public String getJyje00() {
		return jyje00;
	}
	public void setJyje00(String jyje00) {
		this.jyje00 = jyje00;
	}
	public String getYhshh0() {
		return yhshh0;
	}
	public void setYhshh0(String yhshh0) {
		this.yhshh0 = yhshh0;
	}
	public String getYhzdh0() {
		return yhzdh0;
	}
	public void setYhzdh0(String yhzdh0) {
		this.yhzdh0 = yhzdh0;
	}
	public String getJyrq00() {
		return jyrq00;
	}
	public void setJyrq00(String jyrq00) {
		this.jyrq00 = jyrq00;
	}
	public String getJysj00() {
		return jysj00;
	}
	public void setJysj00(String jysj00) {
		this.jysj00 = jysj00;
	}
	public String getJyckh0() {
		return jyckh0;
	}
	public void setJyckh0(String jyckh0) {
		this.jyckh0 = jyckh0;
	}
	public String getYhsqh0() {
		return yhsqh0;
	}
	public void setYhsqh0(String yhsqh0) {
		this.yhsqh0 = yhsqh0;
	}
	public String getQsrq00() {
		return qsrq00;
	}
	public void setQsrq00(String qsrq00) {
		this.qsrq00 = qsrq00;
	}
	public String getYhpch0() {
		return yhpch0;
	}
	public void setYhpch0(String yhpch0) {
		this.yhpch0 = yhpch0;
	}
	public String getCgjysj() {
		return cgjysj;
	}
	public void setCgjysj(String cgjysj) {
		this.cgjysj = cgjysj;
	}
	public String getErrmsg() {
		return errmsg;
	}
	public void setErrmsg(String errmsg) {
		this.errmsg = errmsg;
	}
	public String getCshsj0() {
		return cshsj0;
	}
	public void setCshsj0(String cshsj0) {
		this.cshsj0 = cshsj0;
	}
	@Override
	public String toString() {
		return "SstSfjsYhjfxx [jylsh0=" + jylsh0 + ", cardno=" + cardno + ", cardtype=" + cardtype + ", jfje00="
				+ jfje00 + ", jylx00=" + jylx00 + ", xtgzh0=" + xtgzh0 + ", zdbh00=" + zdbh00 + ", yyjgdm=" + yyjgdm
				+ ", jfztbz=" + jfztbz + ", yhlsh0=" + yhlsh0 + ", fkhdm0=" + fkhdm0 + ", yhkh00=" + yhkh00
				+ ", jyje00=" + jyje00 + ", yhshh0=" + yhshh0 + ", yhzdh0=" + yhzdh0 + ", jyrq00=" + jyrq00
				+ ", jysj00=" + jysj00 + ", jyckh0=" + jyckh0 + ", yhsqh0=" + yhsqh0 + ", qsrq00=" + qsrq00
				+ ", yhpch0=" + yhpch0 + ", cgjysj=" + cgjysj + ", errmsg=" + errmsg + ", cshsj0=" + cshsj0 + "]";
	}
}
