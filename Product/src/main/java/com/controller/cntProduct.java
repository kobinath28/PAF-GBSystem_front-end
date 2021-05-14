package com.controller;

import java.sql.*;

import java.util.*;
import com.java.Product;

import com.config.dbconnector;

public class cntProduct {
	 
		
		Connection con = null;
		
		public cntProduct()
		{		 
			con = dbconnector.connector();
		} 
	
	public List<Product>getProducts(){
	   	 
	   	 List<Product> Products = new ArrayList<>();
	   	 String sql = "select * from product";
	   	 try 
	   	   {
				  Statement st = con.createStatement();
				  ResultSet rs = st.executeQuery(sql);
				  while(rs.next())
				  {
					  Product f = new Product();
					  f.setFID(rs.getInt(1));
					  f.setProductName(rs.getString(2));
					  f.setProductMail(rs.getString(3));
					  f.setPhoneNo(rs.getInt(4));
					  f.setAddress(rs.getString(5));
					  f.setAmount(rs.getDouble(6));				   
					 
					  Products.add(f );
				  }
				
			    } 
	   	 catch (Exception e) 
	   	  {
				
			   System.out.println(e);
			  }
	   	  
	   	 return Products;
	    }
	        
	    
	    public Product getProduct(int fid)
	    
	    {
	   	 String sql = "select * from product where FID="+fid;
	   	  Product f = new Product();
	   	 try 
	   	   {
				  Statement st = con.createStatement();
				  ResultSet rs = st.executeQuery(sql);
				  if(rs.next())
				  {
					  f.setFID(rs.getInt(1));
					  f.setProductName(rs.getString(2));
					  f.setProductMail(rs.getString(3));
					  f.setPhoneNo(rs.getInt(4));
					  f.setAddress(rs.getString(5));
					  f.setAmount(rs.getDouble(6));	
				  }
				
			    } 
	   	 catch (Exception e) 
	   	  {
				
			   System.out.println(e);
			  } 
	   	 return f;
	    }

		public void create(Product f1) 
		{
			String sql = "insert into product values(?,?,?,?,?,?)";
	  	 try 
		   {
			  PreparedStatement st = con.prepareStatement(sql);
			  st.setInt(1, f1.getFID());
			  st.setString(2, f1.getProductName());
			  st.setString(3, f1.getProductMail());
			  st.setInt(4, f1.getPhoneNo());
			  st.setString(5, f1.getAddress());
			  st.setDouble(6, f1.getAmount());
	         st.executeUpdate();
		
			
		    } 
		 catch (Exception e) 
		  {
			
		   System.out.println(e);
		  } 
			
		}
		
		
		public void update(Product f1) 
		{
			String sql = "update product set productName=?,productMail=?,phoneNo=?,address=?,amount=? where fid=?";
	  	 try 
		   {
			  PreparedStatement st = con.prepareStatement(sql);

		
			  st.setString(1, f1.getProductName());
			  st.setString(2, f1.getProductMail());
			  st.setInt(3, f1.getPhoneNo());
			  st.setString(4, f1.getAddress());
			  st.setDouble(5, f1.getAmount());
			  st.setInt(6, f1.getFID());
	         st.executeUpdate();
		
			
		    } 
		 catch (Exception e) 
		  {
			
		   System.out.println(e);
		  } 
			
		}



		public void delete(int fid) {

			String sql = "delete from product where FID=?";
	  	 try 
		   {
			  PreparedStatement st = con.prepareStatement(sql);
			  st.setInt(1, fid);
	         st.executeUpdate();
		
			
		    } 
		 catch (Exception e) 
		  {
			
		   System.out.println(e);
		  } 

		}


}
