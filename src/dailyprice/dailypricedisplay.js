$(document).ready(function(){
	//$("#dailyPriceIcon").hover(function(){
		var products = localStorage.getItem('products');
		if(null != products && "" != products){
			prodArr = JSON.parse(products);
			var html = '';
			prodArr.forEach(function(product){
				html += '<li class="notification"><img src="data:image/png;base64,'+product.image+'"> Live : <span>100</span></li>';
			});
			$('#productListDP').html(html);
		}
	//});
});