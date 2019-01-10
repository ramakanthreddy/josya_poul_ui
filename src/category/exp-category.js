$(document).ready(function(){
	var imgStr = '';
	var catCode = sessionStorage.getItem('selectedCatCode');
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
							imgStr += '<div class="item item item-menu-img" ><div class="photo"><div class="img"><a href="sub-category.html" class="expCategory openModal"  data-catCode="' + catObj.catCode + '" ><img  src="data:image/png;base64,' + data + '" alt="Gallery Image" ></a></div></div></div>';
						}
						});
					

				}
				$('#expCategory').html(imgStr);
				$('.expCategory').click(function(){
					var catCode = $(this).data('catcode');
					sessionStorage.setItem('selectedSecondCatCode',catCode);
				});
			},
		}
	});
});