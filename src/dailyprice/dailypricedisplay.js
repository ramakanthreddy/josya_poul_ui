$(document).ready(
		function() {
			$("#dailyPriceIcon").hover(
					function() {
						var products = localStorage.getItem('products');
						if (null != products && "" != products) {
							prodArr = JSON.parse(products);
							var productListDP = '';
							var productListMD = '';
							prodArr.forEach(function(product) {
								productListDP += '<li class="notification"><img src="data:image/png;base64,' + product.image + '"> <span>100</span></li>';
								productListMD += '<div class="modal-inputs"><img class="daily-price-catimg" src="data:image/png;base64,' + product.image + '"><input	type="text" id="price' + product.productCode
										+ '" name="price' + product.productCode + '"></div>';
							});
							$('#productListDP').html(productListDP);
							$('#dailyPriceInput').html(productListMD);
						}
					});
			$('#priceSubmit').click(function() {
				var prodArr = getProducts();
				var ids = [];
				prodArr.forEach(function(product) {
					var price = $('#price' + product.productCode).val();
					ids.push('#price' + product.productCode);
					var priceJSON = {
						price : price,
						productCode : product.productCode
					};
					$.ajax({
						url : '/productdailyprice',
						type : "POST",
						async : false,
						data : priceJSON,
						success : function(response) {
							ids.forEach(function(id) {
								$(id).val('');
							});
							product.price = price;
							$('#dailyPriceModalClose').click();
						}
					});
				});
			});
		});

function getProducts() {
	var products = localStorage.getItem('products');
	var prodArr = [];
	if (null != products && "" != products) {
		prodArr = JSON.parse(products);
	}

	return prodArr;
}