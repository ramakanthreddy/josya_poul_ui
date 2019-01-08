$(document)
		.ready(
				function() {
					App.init();
					App.formElements();
					$('form').parsley();
					$("#add-category")
							.submit(
									function(e) {
										$('#success-message').html('');
										var form = $('#add-category')[0];
										var data = new FormData(form);
										var displayAsParent = data.get('displayAsParent');
										if ('on' == displayAsParent) {
											data.set('displayAsParent','Y');
										} else {
											data.set('displayAsParent','N');
										}
										$
												.ajax({
													type : "POST",
													url : "/category",
													enctype : 'multipart/form-data',
													data : data, // serializes
																	// the
																	// form's
																	// elements.
													processData : false,
													contentType : false,
													statusCode : {
														201 : function(response) {
															$("#add-category").trigger("reset");
															var html = $('#list-category').html();
															html += '<option value="' + data.get('catCode') + '">' + data.get('name') + '</option>';
															$('#list-category').html(html);
															$('#success-message')
																	.html(
																			'<div role="alert" class="alert alert-success alert-dismissible"><button type="button" data-dismiss="alert" aria-label="Close" class="close"><span aria-hidden="true" class="mdi mdi-close"></span></button><span class="icon mdi mdi-check"></span>Category  added successfully...</div>');
														},
														403 : function() {
															$('#success-message')
																	.html(
																			'<div role="alert" class="alert alert-danger alert-dismissible"><button type="button" data-dismiss="alert" aria-label="Close" class="close"><span aria-hidden="true" class="mdi mdi-close"></span></button><span class="icon mdi mdi-check"></span>Category Already Exist..</div>');
														},
														500 : function() {
															$('#success-message')
																	.html(
																			'<div role="alert" class="alert alert-danger alert-dismissible"><button type="button" data-dismiss="alert" aria-label="Close" class="close"><span aria-hidden="true" class="mdi mdi-close"></span></button><span class="icon mdi mdi-check"></span>Internal server Error please contact system Admin.</div>');
														},
													}
												});

										e.preventDefault(); // avoid to execute the actual submit of the form.
									});
					$.ajax({
						type : "GET",
						url : "/category/list?catCode=",
						statusCode : {
							200 : function(response) {
								var html = '<option value="select">SELECT CATEGORY</option>';
								for (var count = 0; count < response.length; count++) {
									var catObj = response[count];
									html += '<option value="' + catObj.catCode + '">' + catObj.name + '</option>';

								}
								$('#list-category').html(html);
							},
						}
					});
				});