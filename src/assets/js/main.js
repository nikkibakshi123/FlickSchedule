
//header sticky 

$(window).scroll(function() {
  if ($(this).scrollTop() > 0){  
    $('header').addClass("sticky  fadeInDown animated");  
    
  }
  else{
 
    $('header').removeClass("sticky fadeInDown animated");    
    
  }
 });



 
function moreLess(initiallyVisibleCharacters) {
	var visibleCharacters = initiallyVisibleCharacters;
	var paragraph = $(".hide_text")
	

	paragraph.each(function() {
		var text = $(this).text();
		var wholeText = text.slice(0, visibleCharacters) + "<span class='ellipsis'>... </span><a href='#' class='more'>MORE<i class='fa fa-arrow-circle-o-down' aria-hidden='true'></i></a>" + "<span style='display:none'>" + text.slice(visibleCharacters, text.length) + "<a href='#' class='less'> LESS<i class='fa fa-arrow-circle-o-up' aria-hidden='true'></i></a></span>"
		
		if (text.length < visibleCharacters) {
			return
		} else {
			$(this).html(wholeText)
		}
	});
	$(".more").click(function(e) {
		e.preventDefault();
		$(this).hide().prev().hide();
		$(this).next().show();
	});
	$(".less").click(function(e) {
		e.preventDefault();
		$(this).parent().hide().prev().show().prev().show();
	});
};

moreLess(200);






$('.logo_slider').slick({
  dots: true,
  infinite: false,
  speed: 300,
  slidesToShow: 4,
  slidesToScroll: 1,
  responsive: [
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 1,
        infinite: true,
        dots: true
      }
    },
    {
      breakpoint: 600,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 1
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


$('.testmonial_slider').slick({
  dots: true,
  infinite: false,
  speed: 300,
  slidesToShow: 5,
  slidesToScroll: 1,
  responsive: [
    {
      breakpoint: 1199,
      settings: {
        slidesToShow: 4,
        slidesToScroll: 1,
        infinite: true,
        dots: true
      }
    },
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 1,
        infinite: true,
        dots: true
      }
    },
    {
      breakpoint: 600,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 1
      }
    },
    {
      breakpoint: 480,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1
      }
    }
  ]
});


var a = 0;
$(window).scroll(function () {
  var oTop = $("#counter").offset().top - window.innerHeight;
  if (a == 0 && $(window).scrollTop() > oTop) {
    $(".counter-value").each(function () {
      var $this = $(this),
        countTo = $this.attr("data-count");
      $({
        countNum: $this.text()
      }).animate(
        {
          countNum: countTo
        },

        {
          duration: 2000,
          easing: "swing",
          step: function () {
            $this.text(Math.floor(this.countNum));
          },
          complete: function () {
            $this.text(this.countNum);
            //alert('finished');
          }
        }
      );
    });
    a = 1;
  }
});


AOS.init({
  once: true,
})

$('.sub_brand_content_img').slick({
  dots: false,
  infinite: true,
  autoplay:true,
  speed: 300,
  autoplaySpeed: 1000,
  slidesToShow: 7,
  slidesToScroll: 1,
  responsive: [
   {
     breakpoint: 1024,
     settings: {
       slidesToShow: 4,
       slidesToScroll: 1,
       infinite: true,
       dots: true
     }
   },
   {
     breakpoint: 600,
     settings: {
       slidesToShow: 3,
       slidesToScroll: 1
     }
   },
   {
     breakpoint: 480,
     settings: {
       slidesToShow: 2,
       slidesToScroll: 1
     }
   }
  ]
  });


  const txts=document.querySelector(".animate-text").children,
          txtsLen=txts.length;
      let index=0;
     const textInTimer=4000,
           textOutTimer=4000;

    function animateText() {
       for(let i=0; i<txtsLen; i++){
         txts[i].classList.remove("text-in","text-out");  
       }
       txts[index].classList.add("text-in");

       setTimeout(function(){
           txts[index].classList.add("text-out");              
       },textOutTimer)

       setTimeout(function(){

         if(index == txtsLen-1){
             index=0;
           }
          else{
              index++;
            }
           animateText();
       },textInTimer); 
    }
    
    window.onload=animateText;



    