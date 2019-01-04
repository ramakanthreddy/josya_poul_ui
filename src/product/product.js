     $(document).ready(function () {
      	var imgStr = '';

      	$.ajax({
      		url: '/product',
      		async: false,
      		success: function (response) {
      			for (var count = 0; count < response.length; count++) {
      				$.ajax({
      					url: '/product/image/' + response[count].productCode,
      					async: false,
      					success: function (data) {
      						imgStr += '<div class="item" ><div class="photo"><div class="img"><a href="#" class="openModal" data-modal="'+ response[count].birdCountRequired+'" data-imgsrc="'+data+'" ><img  src="data:image/png;base64,' + data + '" alt="Gallery Image"    ></a></div></div></div>';
      					}
      				});
      			}
      			$('#productDisplay').html(imgStr);
      			$("a.openModal").click(function (e) {
					var modalType = $(this).data('modal');
      				e.preventDefault();
					if(modalType == undefined || 'n' == modalType.toLowerCase()){
						$('#expenditureSec').modal('toggle');
						$('.selectedImg').attr('src', 'data:image/png;base64, '+$(this).data('imgsrc'));
					} else {
						
						$('#expenditureThreeSec').modal('toggle');
						$('.selectedImg').attr('src', 'data:image/png;base64, '+$(this).data('imgsrc'));
					}
      				
      			});

      		}
      	});
		App.pageGallery();
      	App.init();
      	App.dashboard();
      });