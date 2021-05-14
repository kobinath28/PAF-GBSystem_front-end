package com.resources;

import java.util.*;
import javax.ws.rs.*;
import javax.ws.rs.client.Client;
import javax.ws.rs.client.ClientBuilder;
import javax.ws.rs.client.Entity;
import javax.ws.rs.client.Invocation;
import javax.ws.rs.client.WebTarget;

import com.controller.*;
import com.java.*;

import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

@Path("/Product")
public class resProduct {
	
cntProduct app = new cntProduct();
	
	@GET
	@Produces(MediaType.APPLICATION_JSON)
	@Path("Product")
	public List<Product> getProduct()
	{
		System.out.println("getProduct called...");
		return app.getProducts();
	}
	
	
	
	@GET
	@Path("Product/{ProductID}")
	@Produces(MediaType.APPLICATION_JSON)
	public Product getProduct(@PathParam("ProductID") int ProductID)
	{
		return app.getProduct(ProductID);
	
	}
	
	@POST
	@Path("/Product")
	@Consumes(MediaType.APPLICATION_JSON)
	public Product createPayment(Product f1)
	{
		System.out.println(f1);
		app.create(f1);
		
		return f1;
	}
	
	
	@PUT
	@Path("/Product")
	@Consumes(MediaType.APPLICATION_JSON)
	public Product updateProduct(Product f1)
	{
		System.out.println(f1);
		if(app.getProduct(f1.getFID()).getFID()==0) {
			app.create(f1);
			
		}
		else
		{
			app.update(f1);
			
		}
		
		return f1;
	}
	
	
	@DELETE
	@Path("Product/{fid}")
	public Product deletePatient(@PathParam("fid") int fid)
	{
		Product f = app.getProduct(fid);
		
		if(f.getFID()!=0)
			app.delete(fid);
		return null;
	}
	
	
}
