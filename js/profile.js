$(function() {
  window.scrollTo(0,0);
  var effect = false;
  var curSec = ".about-me";
  var newSec = ".about-me";
  var about_me = $('#about-me').offset().top;
  var skills = $('#skills').offset().top;
  var education = $('#education').offset().top;
  var intern = $('#intern').offset().top;
  var contact = $('#contact').offset().top;
  if (window.innerWidth > 850){
    function scrollView(init){
      var scrollTop = $(window).scrollTop();
      scrollOffset = - (window.innerHeight-400) * scrollTop/totalHeight;
      updateObj(200);

      if(Math.abs(about_me - scrollTop)<400) newSec = ".about-me";
      else if(Math.abs(skills - scrollTop)<400) newSec = ".skills";
      else if(Math.abs(education - scrollTop)<400) newSec = ".education";
      else if(Math.abs(intern - scrollTop)<400) newSec = ".intern";
      else if(Math.abs(contact - scrollTop)<400) newSec = ".contact";
      
      if (init) {curSec = newSec; toggle();}
      if ((!avoidChange) && (newSec != curSec)) {
        toggle();
      }
    }
    function updateObj(duration){
      $obj.velocity({top: initTop+scrollOffset+topOffset, left: initLeft+leftOffset}, {duration: duration, easing: [.58,.83,.53,.84], queue:false});
      $pageNav.velocity({left: initNavLeft-0.7*leftOffset}, {duration: duration, easing: [.58,.83,.53,.84], queue:false});
      if (!avoidChange) moveBar(newSec);
      // $obj.css('top', initTop + scrollOffset + topOffset);
      // $obj.css('left', initLeft + leftOffset);
    }
    function toggle(){
      $(curSec).velocity({opacity: 0.65}, 200);
      $(newSec).velocity({opacity: 1}, 200);
      changeSVG(newSec, curSec);
      moveBar(newSec);
      curSec = newSec;
    }

    function changeSVG(newSec, curSec){
      var localCurSec = curSec;
      var localNewSec = newSec;
      if(newSec != localCurSec){
        switch(newSec) {
          case '.about-me':
            aboutMeSVG.play(-4); break;
          case '.skills':
            skillsSVG.play(-4); break;
          case '.education':
            educationSVG.play(-4); break;
          case '.intern':
            internSVG.play(-4); break;
          case '.contact':
            contactSVG.play(-4); break;
        }
        switch(localCurSec) {
          case '.about-me':
            aboutMeSVG.play(-4); break;
          case '.skills':
            skillsSVG.play(-4); break;
          case '.education':
            educationSVG.play(-4); break;
          case '.intern':
            internSVG.play(-4); break;
          case '.contact':
            contactSVG.play(-4); break;
        }
      }
      window.setTimeout(changeSVG2(localNewSec, localCurSec),800);
    }

    function changeSVG2(localNewSec, localCurSec){
      return function(){
        $('#'+localCurSec.slice(1)+'-svg').css('display','none');
        if (newSec == localNewSec) {
          $('#'+newSec.slice(1)+'-svg').css('display','block');
          switch(newSec) {
            case '.about-me':
              aboutMeSVG.play(4); break;
            case '.skills':
              skillsSVG.play(4); break;
            case '.education':
              educationSVG.play(4); break;
            case '.intern':
              internSVG.play(4); break;
            case '.contact':
              contactSVG.play(4); break;
          }
        }
      }
    }

    function moveBar(curSec, ease){
      $curSec = $(curSec);
      var top = $curSec.position().top - 3 - 0.3 * topOffset;
      var width = initNavLeft + 1*$curSec.width()+ 230 - 0.7*leftOffset;
      $('#page-nav-block').velocity({top: top, width:width}, {duration: 150, easing: [.58,.83,.53,.84], queue:false});
    }

    effect = true;
    var $obj = $('#float-obj');
    var totalHeight = $('body').height();
    var initTop = $obj.position().top;
    var initLeft = $obj.position().left;
    var $pageNav = $("#page-nav");
    var initNavLeft = $pageNav.position().left;
    var scrollOffset = 0;
    var leftOffset = 0;
    var topOffset = 0;
    var avoidChange = false;
    $('#page-nav-block').css('left', - initNavLeft - 200);
    var aboutMeSVG = new Vivus('about-me-svg', {
      type: 'delayed',
      duration: 240,
      animTimingFunction: Vivus.EASE
    });
    var skillsSVG = new Vivus('skills-svg', {
      type: 'delayed',
      duration: 240,
      animTimingFunction: Vivus.EASE
    });
    var educationSVG = new Vivus('education-svg', {
      type: 'delayed',
      duration: 240,
      animTimingFunction: Vivus.EASE
    });
    var internSVG = new Vivus('intern-svg', {
      type: 'delayed',
      duration: 240,
      animTimingFunction: Vivus.EASE
    });
    var contactSVG = new Vivus('contact-svg', {
      type: 'delayed',
      duration: 240,
      animTimingFunction: Vivus.EASE
    });
    $('svg').hide();
    scrollView(true); //initial scroll

    $(window).scroll(function() {scrollView(false)});

    $(document).mousemove(function( event ) {
      leftOffset = -((2*event.pageX/window.innerWidth)-1)*30;
      topOffset = ((2*event.clientY/window.innerHeight)-1)*13;
      updateObj(400);
    })

    
    $( window ).resize(function() {
      about_me = $('#about-me').offset().top;
      skills = $('#skills').offset().top;
      education = $('#education').offset().top;
      intern = $('#intern').offset().top;
      contact = $('#contact').offset().top;
      toggle();
    });
  } else {
    $(curSec).velocity({opacity: 1}, 200);
    $(window).scroll(function() {
      var scrollTop = $(window).scrollTop();

      if(Math.abs(about_me - scrollTop)<400) newSec = ".about-me";
      else if(Math.abs(skills - scrollTop)<400) newSec = ".skills";
      else if(Math.abs(education - scrollTop)<400) newSec = ".education";
      else if(Math.abs(intern - scrollTop)<400) newSec = ".intern";
      else if(Math.abs(contact - scrollTop)<400) newSec = ".contact";

      if (newSec != curSec) {
        toggleSimple();
      }
    });
  }

  $('a[href*="#"]:not([href="#"])').click(function() {
    if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
      newSec = "."+$(this).attr("class");
      var target = $(this.hash);
      target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
      if (target.length) {
        $('html, body').velocity("scroll",{
          easing: [0.23,0.03,0,1.03],
          offset: target.offset().top,
          duration: 750,
          begin: function(elements) {
            if (effect) {
              toggle();
              avoidChange = true;
            } else {
              toggleSimple();
            }
          },
          complete: function(elements) { avoidChange = false;}
        });
        return false;
      }
    }
  });
  function toggleSimple(){
    $(curSec).velocity({opacity: 0.65}, 200);
    $(newSec).velocity({opacity: 1}, 200);
    curSec = newSec;
  }
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