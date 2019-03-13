package com.manage.system.bean;

import java.io.Serializable;
import java.util.List;

public class Page<T> implements Serializable{
	    /**
	 * 
	 */
	private static final long serialVersionUID = -3671087241285962478L;
		private Integer page; //当前页数
	    private Integer rows;   //一页显示数量
		private Integer startRow;   //查询起始行
	    private Integer endRow;   //查询结束行
	    private Integer records;      //总记录行数
	    private Integer total;      //总页数
	    private List<T> data;       //查询结果数据
	    private T queryObj;         //查询对象
	    

		public Integer getTotal() {
			return total;
		}

		public void setTotal(Integer total) {
			this.total = total;
		}

		public Integer getEndRow() {
			if(page!=null && rows!=null){
				return page*rows;
			}else{
				return 25;
			}
			
		}

		public void setEndRow(Integer endRow) {
			this.endRow = endRow;
		}

		public void setStartRow(Integer startRow) {
			this.startRow = startRow;
		}

		public Integer getStartRow() {
	        if(page!=null && rows!=null) {
	            return (page - 1) * rows+1;
	        } else {
	            return 1;
	        }
	    }
		@Override
		public String toString() {
			return "Page [page=" + page + ", rows=" + rows + ", startRow=" + startRow + ", endRow=" + endRow
					+ ", records=" + records + ", total=" + total + ", data=" + data + ", queryObj=" + queryObj + "]";
		}

		public Integer getPage() {
			if(this.page==null||this.page==0){
				return 1;
			}else{
				return page;
			}
	    }

	    public void setPage(Integer page) {
	        this.page = page;
	    }

		public Integer getRecords() {
			return records;
		}

		public void setRecords(Integer records) {
			this.records = records;
		}

	    public Integer getRows() {
	    	if(this.rows==null||this.rows==0){
	    		return 25;
	    	}else{
	    		return rows;
	    	}
		}

		public void setRows(Integer rows) {
			this.rows = rows;
		}

		public List<T> getData() {
			return data;
		}

		public void setData(List<T> data) {
			this.data = data;
		}

		public void setQueryObj(T queryObj) {
	        this.queryObj = queryObj;
	    }

	    public T getQueryObj() {
	        return queryObj;
	    }
}