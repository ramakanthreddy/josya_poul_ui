$(document).ready(
		function() {
			localStorage.removeItem('products');
			var imgStr = '';
			$.ajax({
				url : '/product',
				async : false,
				success : function(response) {
					for (var count = 0; count < response.length; count++) {
						$.ajax({
							url : '/product/image/' + response[count].productCode,
							async : false,
							success : function(data) {
								response[count].image = data;
								imgStr += '<div class="item" ><div class="photo"><div class="img"><a href="#" class="openModal" data-modal="' + response[count].birdCountRequired + '" data-imgsrc="' + data
										+ '" ><img  src="data:image/png;base64,' + data + '" alt="Gallery Image"    ></a></div></div></div>';
							}
						});
						var product = createProduct(response[count]);
						addProductToStorage(product);
					}
					$('#productDisplay').html(imgStr);
					$("a.openModal").click(function(e) {
						var modalType = $(this).data('modal');
						e.preventDefault();
						if (modalType == undefined || 'n' == modalType.toLowerCase()) {
							$('#expenditureSec').modal('toggle');
							$('.selectedImg').attr('src', 'data:image/png;base64, ' + $(this).data('imgsrc'));
						} else {

							$('#expenditureThreeSec').modal('toggle');
							$('.selectedImg').attr('src', 'data:image/png;base64, ' + $(this).data('imgsrc'));
						}

					});

				}
			});
			App.pageGallery();
			App.init();
			App.dashboard();
		});

function createProduct(obj) {
	var product = new Object();
	product.birdCountRequired = obj.birdCountRequired;
	product.productId = obj.productId;
	product.productCode = obj.productCode;
	product.name = obj.name;
	product.image = obj.image;
	return product;
}

function createProductsList() {
	return new Array();
}

function addProductToStorage(product) {
	var products = localStorage.getItem('products');
	var prodArr = [];
	if (null != products && "" != products) {
		prodArr = JSON.parse(products);
	}
	prodArr.push(product);
	localStorage.setItem('products',JSON.stringify(prodArr));
}
