var Double = {
	init : function(){
		Double.ajaxForm('[name=formContato]');
	},
	ajaxForm: function(selector,cb) {
			$('body').on('submit',selector,function(){
				var $self = $(this);
				if ($self.data('enviando')) return false;
				
				$self.data('enviando',true);

				var callback = function(resp) {
					$self.data('enviando',false);

					if (cb) return cb(resp,$self);
					if (resp.success == true) {
						swal("Bom Trabalho!", resp.msg, "success");
						$self[0].reset();
					}
					if(resp.success == false){
						swal('Ops! Algo de Errado Aconteceu', resp.msg, "error");
					}

				}
				
				$.ajax({
					url: $self.attr('action'),
					type: 'post',
					dataType: 'json',
					data: $self.serializeArray(),
					success: callback,
					error: function() {
						callback({success:false,msg:"Não foi possível enviar o formulário."});
					}
				});
				return false;
			});
		},
};
$(document).ready(function(){
	$(Double.init);
    $('.slider').slick();
    $('button.hamburger').click(function(){
            $('nav ul').toggleClass('open');
            $('.hamburger').toggleClass('is-active');
            console.log("click");
        });
    $('.galeria').slick({
        slidesToShow: 7,
        slidesToScroll: 7,
        responsive: [
           {
             breakpoint: 1025,
             settings: {
               slidesToShow: 4,
               slidesToScroll: 4,
               infinite: true,
               dots: true
             }
           },
           {
             breakpoint: 600,
             settings: {
               slidesToShow: 2,
               slidesToScroll: 2
             }
           },
           {
             breakpoint: 480,
             settings: {
               slidesToShow: 1,
               slidesToScroll: 1
             }
           }
           // You can unslick at a given breakpoint now by adding:
           // settings: "unslick"
           // instead of a settings object
         ]
    });
});