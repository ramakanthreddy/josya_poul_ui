$(document).ready(function(){
	$('#sendEmail').click(function(){
		$.ajax({
			url : '/customer/transaction/email',
			async : false,
			success : function(data) {
				alert('Email sent successfully');
			}
		});
		
	});
});
