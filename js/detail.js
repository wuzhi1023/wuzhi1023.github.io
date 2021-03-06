$(function() {
	window.scrollTo(0,0);
	$('#hero-block').height($('#hero-block').width()*0.35);
	var fixnavPos = $('#hero-block').height() - 60;
	var fixnav = false;
	$('#fix-navbar').css('display','none');
	if ($(window).scrollTop()>fixnavPos && window.innerWidth>490) {
		fixnav = true;
		$('#fix-navbar').css('display','block');
		$('#fix-navbar').velocity({opacity: 0.9}, 300);
	}

	$('#hero-image').css('top',1000);
	$('#hero-block').velocity({top: 0}, 600);
	$('#content-block').velocity({top: $('#hero-block').height()}, {easing: 'easeOut', duration: 600,delay:100});
	$('#hero-image').velocity({top: 0, opacity: 1}, {duration: 1000,delay:200, easing: [.3,1.03,.74,1.13],complete: function(){$('#hero-image').css('position','relative');$('body').css('background-color','#ECCEB4');}});
	$('#shadow').velocity({top: 0}, {duration: 600, delay:200});

	$('#button-bar a').click(function(event) {
		event.preventDefault();
        href = $(this).attr("href");
        console.log(href);
        $('#transition-block').height($(window).height()*2);
        $('#transition-block').velocity({top:0},{
        	queue: false,
        	duration: 400,
        	easing: 'ease-in',
        	complete: function(){window.location=href;}});
    });

	$(window).scroll(function() {
		var scrollTop = $(window).scrollTop();
		$('#hero-image').css('top', scrollTop/3);
		if (window.innerWidth>490){
			if (scrollTop>fixnavPos && fixnav==false){
				fixnav = true;
				$('#fix-navbar').css('display','block');
				$('#fix-navbar').velocity({opacity: 0.9}, 300);
			} else if (scrollTop<=fixnavPos && fixnav==true){
				fixnav = false;
				$('#fix-navbar').velocity({opacity: 0}, {duration: 300, complete: function (){$('#fix-navbar').css('display','none');}});
			}
		}
		
	});

	$(window).resize(function() {
		$('#hero-block').height($('#hero-block').width()*0.35);
		$('#content-block').css({top: $('#hero-block').height()});
	});
	if(navigator.userAgent.match(/Trident\/7\./)) { // if IE
	$('body').on("mousewheel", function () {
		// remove default behavior
		event.preventDefault(); 

		//scroll without smoothing
		var wheelDelta = event.wheelDelta;
		var currentScrollPosition = window.pageYOffset;
		window.scrollTo(0, currentScrollPosition - wheelDelta);
		});
	}
});