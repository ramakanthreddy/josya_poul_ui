      $(document).ready(function(){
      	//initialize the javascript
      	App.init();
      	App.formElements();
		$('form').parsley();
		
		$("#add-customer")
		.submit(
				function(e) {
					$('#success-message').html('');
					var form = $('#add-customer')[0];
					var data = new FormData(form);
					$
							.ajax({
								type : "POST",
								url : "/customer",
								enctype : 'multipart/form-data',
								data : data, // serializes the form's elements.
								processData : false,
								contentType : false,
								statusCode : {
									201 : function() {
										console.log("HERE");
										$("#add-customer").trigger("reset");
										$('#success-message')
												.html(
														'<div role="alert" class="alert alert-success alert-dismissible"><button type="button" data-dismiss="alert" aria-label="Close" class="close"><span aria-hidden="true" class="mdi mdi-close"></span></button><span class="icon mdi mdi-check"></span>Customer  added successfully...</div>');
									},
									403 : function() {
										$('#success-message')
												.html(
														'<div role="alert" class="alert alert-danger alert-dismissible"><button type="button" data-dismiss="alert" aria-label="Close" class="close"><span aria-hidden="true" class="mdi mdi-close"></span></button><span class="icon mdi mdi-check"></span>Customer Already Exist...</div>');
									},
								}
							});

					e.preventDefault(); // avoid to execute the actual submit of the form.
				});
      });