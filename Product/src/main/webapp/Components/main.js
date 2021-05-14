$(document).ready(function()
{
	 $("#alertSuccess").hide();
	 $("#alertError").hide();
}); 


$(function (){
	var $apps = $('#apps');
	var $ProductName = $('#ProductName');
	var $ProductMail = $('#ProductMail');
	var $PhoneNo = $('#PhoneNo');
	var $Address = $('#Address');
	var $Amount = $('#Amount');
	

	$.ajax({
		type: 'GET',
		url: 'http://localhost:8080/Product/webapi/Product/product',
		success: function(apps){
			//console.log('success',data);
			$.each(apps, function(i, app){
				$apps.append('<li><div class="card shadow-lg p-3 mb-5 bg-white rounded bg-light m-2\" style=\"width: 12rem;float: left;">'
							+'Product Name:<span class="noedit ProductName">' + app.ProductName +'</span><input class="edit ProductName"/>'+'<br>'
							+'Product Mail:<span class="noedit ProductMail">'+ app.ProductMail +'</span><input class="edit ProductMail"/> '+'<br>'
							+'Phone Number:<span class="noedit PhoneNo">'+ app.PhoneNo +'</span><input class="edit PhoneNo"/> '+'<br>'
							+'Address:<span class="noedit Address">'+ app.Address +'</span><input class="edit Address"/> '+'<br>'
							+'Amount:<span class="noedit Amount">'+ app.Amount +'</span><input class="edit Amount"/>'+' <br>'
							+'<input type="button" id="'+ app.FID +'" value="Remove" class="btn btn-outline-danger remove">'+'<br>'
							+'<input type="button" " value="Edit" class="editapp btn btn-outline-primary noedit">'+'<br>'
							+'<input type="button" " value="Save" class="saveedit btn btn-outline-success edit">'+'<br>'
							+'<input type="button" " value="Cancel" class="canceledit btn btn-outline-danger edit"></li>');

			});
		},
		error: function() {
			alert('Product loading error...');
		}
	});
	
	
	$('#btnSave').on('click', function(){
		
		//clear status messages
		$("#alertSuccess").text("");
		$("#alertSuccess").hide();
		$("#alertError").text("");
		$("#alertError").hide();
		
		//Form validation
		var status = validateProductForm(); 
		

		
		//Check not valid
		if (status != true)
		 {
			 $("#alertError").text(status);
			 $("#alertError").show();
			 return;
		 } 
		
		
        //IF valid		
		var app = {
				ProductName: $ProductName.val(),
				ProductMail: $ProductMail.val(),
				PhoneNo: $PhoneNo.val(),
				Address: $Address.val(),
				Amount: $Amount.val(),

		};
		

		
		$.ajax({
			headers: { 
		        'Accept': 'application/json',
		        'Content-Type': 'application/json' 
		    },
			type: 'POST',
			url: 'http://localhost:8080/Product/webapi/Product/product/',
			data: JSON.stringify(app),
			dataType: 'json',
			success: function(newProduct){
				console.log("Inserted");
				$apps.append('<li><div class="card shadow-lg p-3 mb-5 bg-white rounded bg-light m-2\" style=\"width: 12rem;float: left;">'
						+'ProductName:<span class="noedit ProductName">' + newProduct.ProductName +'</span><input class="edit ProductName"/>'+'<br>'
						+'ProductMail:<span class="noedit nic">'+ newProduct.ProductMail +'</span><input class="edit ProductMail"/> '+'<br>'
						+'PhoneNo:<span class="noedit PhoneNo">'+ newProduct.PhoneNo +'</span><input class="edit PhoneNo"/> '+'<br>'
						+'Address:<span class="noedit Address">'+ newProduct.Address +'</span><input class="edit Address"/>'+'<br>'
						+'Amount:<span class="noedit Amount">'+ newProduct.Amount +'</span><input class="edit Amount"/> '+'<br>'
						+'<input type="button" id="'+ newProduct.FID +'" value="Remove" class="btn btn-outline-danger remove">'+'<br>'
						+'<input type="button" " value="Edit" class="editapp btn btn-outline-primary noedit">'+'<br>'
						+'<input type="button" " value="Save" class="saveedit btn btn-outline-success edit">'+'<br>'
						+'<input type="button" " value="Cancel" class="canceledit btn btn-outline-danger edit"></li>');
				
				//Show Success Message
				$("#alertSuccess").text("Your Product Details Saved Successfully");
				$("#alertSuccess").show();

				$("#formProduct")[0].reset(); 
				
			},
			
			error: function() {
				alert('Product Saving Error');
			}
		});
		
		function validateProductForm()
		{
			// ProductName
			if ($("#ProductName").val().trim() == "")
			 {
			 return "Insert Product Name.";
			 }

			//ProductMail
			if ($("#ProductMail").val().trim() == "")
			 {
			 return "Insert Product Mail.";
			 }

			//PhoneNo
			if ($("#PhoneNo").val().trim() == "")
			 {
			 return "Insert PhoneNo.";
			 }

			//Address
			if ($("#Address").val().trim() == "")
			 {
			 return "Insert Address.";
			 }

			//Amount
			if ($("#Amount").val().trim() == "")
			 {
			 return "Insert Amount.";
			 }

			return true;
		}
		

		
	});
	
	
	$apps.delegate('.remove','click',function(){
		var $li=$(this).closest('li');
		var self = this;
		$.ajax({
			type:'DELETE',
			url:'http://localhost:8080/Product/webapi/Product/product/'+$(this).attr('id'),
			success: function(){
				console.log("Deleted");
				$(self);
				$li.fadeOut(300,function(){
					$(this).remove();
					
					
					
				})
				
			},
		
			error: function() {
				alert('Product Delete Error');
			}
		});
	});
	
	
$apps.delegate('.editapp','click',function(){
		
		var $li=$(this).closest('li');
		
		$li.find('input.fid').val($li.find('span.fid').html());
		$li.find('input.ProductName').val($li.find('span.ProductName').html());
		$li.find('input.ProductMail').val($li.find('span.ProductMail').html());
		$li.find('input.PhoneNo').val($li.find('span.PhoneNo').html());
		$li.find('input.Address').val($li.find('span.Address').html());
		$li.find('input.Amount').val($li.find('span.Amount').html());
		$li.addClass('edit');
	});
	
	$apps.delegate('.canceledit','click',function(){
		$(this).closest('li').removeClass('edit');
		
	});
	
	$apps.delegate('.saveedit','click',function(){
		var $li=$(this).closest('li');
		var app={
				
				ProductName: $li.find('input.ProductName').val(),
				ProductMail: $li.find('input.ProductMail').val(),
				PhoneNo: $li.find('input.PhoneNo').val(),
				Address: $li.find('input.Address').val(),
				Amount: $li.find('input.Amount').val()
				
		};
		
		$.ajax({
			headers:{
				'Accept':'application/json',
				'Content-Type':'application/json'
					
					
			},
			type: 'PUT',
			url: 'http://localhost:8080/Product/webapi/Product/product',
			data: JSON.stringify(app),
			dataType: 'json',
			
			success: function(){

				$li.find('span.ProductName').html(app.ProductName);
				$li.find('span.ProductMail').html(app.ProductMail);
				$li.find('span.PhoneNo').html(app.PhoneNo);
				$li.find('span.Address').html(app.Address);
				$li.find('span.Amount').html(app.Amount);
				$li.removeClass('edit');
				
				$("#alertSuccess").text("Your Product Details Updated Successfully");
				$("#alertSuccess").show();
				},
		
				error: function(){
				alert('Product Update Error');
			}
			
		});
	});
	
	
	
	
	
	
});