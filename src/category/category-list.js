$(document).ready(function() {
	displayCategories();
	$('.parentCategory').click(function(){
		var catCode = $(this).data('catcode');
	});
	function displayCategories(){
		var imgStr = '';
		$.ajax({
			type : "GET",
			url : "/category/parent1/list",
			statusCode : {
				200 : function(response) {
					for (var count = 0; count < response.length; count++) {
						var catObj = response[count];
						$.ajax({
							url : '/category/image/' + catObj.catCode,
							async : false,
							success : function(data) {
								imgStr += '<div class="item" ><div class="photo"><div class="img"><a href="#" class="parentCategory"  data-catCode="' + catObj.catCode + '" ><img  src="data:image/png;base64,' + data + '" alt="Gallery Image" ></a></div></div></div>';
							}
							});
						

					}
					$('#categoryDisplay').html(imgStr);
				},
			}
		});
	}
});
