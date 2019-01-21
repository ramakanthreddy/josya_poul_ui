$(document).ready(function(){
	var imgStr = '';
	var catCode = sessionStorage.getItem('selectedSecondCatCode');
	$.ajax({
		type : "GET",
		url : "/category/list?catCode="+catCode,
		statusCode : {
			200 : function(response) {
				for (var count = 0; count < response.length; count++) {
					var catObj = response[count];
					$.ajax({
						url : '/category/image/' + catObj.catCode,
						async : false,
						success : function(data) {
							imgStr += '<div class="item item item-menu-img" ><div class="photo"><div class="img"><a href="#" class="openModal"  data-catCode="' + catObj.catCode + '" ><img  src="data:image/png;base64,' + data + '" alt="Gallery Image" ></a></div></div></div>';
						}
						});
					

				}
				$('#subCategory').html(imgStr);
				$('a.openModal').click(function(){
					var catCode = $(this).data('catcode');
					sessionStorage.setItem('selectedThirdCatCode',catCode);
					$('#expenditureData').modal('toggle');
				});
			},
		}
	});
	
	$('#expenditureSubmit').click(function(){
		var amount = $('#amount').val();
		var description = $('#description').val();
		var catCode = sessionStorage.getItem('selectedThirdCatCode');
		$
		.ajax({
			type : "POST",
			url : "/category/transaction",
			data : {amount:amount,description:description,catCode:catCode},
			statusCode : {
				201 : function(response) {
					$('#amount').val("");
					$('#description').val("");
					$('#dailyPriceModalClose').click();
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
	});
});