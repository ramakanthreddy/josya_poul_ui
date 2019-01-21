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
										+ '" data-price="' + response[count].price + '" data-productcode="' + response[count].productCode + '" data-birdCountRequired="' + response[count].birdCountRequired
										+ '"><img  src="data:image/png;base64,' + data + '" alt="Gallery Image" ></a></div></div></div>';
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
							sessionStorage.setItem('billing', 'true');
							sessionStorage.setItem('price', $(this).data('price'));
							sessionStorage.setItem('productCode', $(this).data('productcode'));
							sessionStorage.setItem('birdCountRequired', $(this).data('birdcountrequired'));
							clearBillingValues();
							registerBillingFunctions();
						} else {

							$('#expenditureThreeSec').modal('toggle');
							$('.selectedImg').attr('src', 'data:image/png;base64, ' + $(this).data('imgsrc'));
							sessionStorage.setItem('billing', 'true');
							sessionStorage.setItem('price', $(this).data('price'));
							sessionStorage.setItem('productCode', $(this).data('productcode'));
							sessionStorage.setItem('birdCountRequired', $(this).data('birdcountrequired'));
							clearBillingValues();
							registerBillingFunctions();
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
	product.price = obj.price;
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
	localStorage.setItem('products', JSON.stringify(prodArr));
}

function registerBillingFunctions() {
	$('.submitPrint').keypress(function(event) {
		if (event.keyCode == 10 || event.keyCode == 13) {
			var birdCountRequired = sessionStorage.getItem('birdCountRequired');
			var price = $('#priceTxtFld' + (birdCountRequired == 'Y' ? "_3" : "")).val();
			var quantity = $('#QtyTxtFld' + (birdCountRequired == 'Y' ? "_3" : "")).val();
			var birdCount = $('#brdTxtFld' + (birdCountRequired == 'Y' ? "_3" : "")).val();
			if(birdCount == undefined){
				birdCount = 0;
			} else if(birdCount == ""){
				birdCount = 1;
			}
			if(quantity == undefined || quantity == ''){
				quantity = 0;
			}
			var productCode = sessionStorage.getItem('productCode');
			submitBilling(price, quantity, birdCount, productCode);
		}
	});
	$('#QtyTxtFld').change(function() {
		var price = sessionStorage.getItem('price');
		var qtyTxtFld = $('#QtyTxtFld').val();
		$('#priceTxtFld').val(qtyTxtFld * price);
	});
	$('#priceTxtFld').change(function() {
		var price = sessionStorage.getItem('price');
		var priceTxtFld = $('#priceTxtFld').val();
		$('#QtyTxtFld').val(priceTxtFld / price);
	});
	$('#QtyTxtFld_3').change(function() {
		var price = sessionStorage.getItem('price');
		var qtyTxtFld = $('#QtyTxtFld_3').val();
		$('#priceTxtFld_3').val(qtyTxtFld * price);
	});
	$('#priceTxtFld_3').change(function() {
		var price = sessionStorage.getItem('price');
		var priceTxtFld = $('#priceTxtFld_3').val();
		$('#QtyTxtFld_3').val(priceTxtFld / price);
	});

}

function clearBillingValues() {
	$('#priceTxtFld').val("");
	$('#QtyTxtFld').val("");
	$('#priceTxtFld_3').val("");
	$('#QtyTxtFld_3').val("");
	$('#brdTxtFld_3').val("");
}

function submitBilling(price, quantity, birdCount, productCode) {

	$.ajax({
		url : '/customer/transaction',
		type : "POST",
		async : false,
		data : {
			price : price,
			quantity : quantity,
			birdCount : birdCount,
			productCode : productCode
		},
		success : function(response) {
			clearBillingValues();
		}
	});

}
