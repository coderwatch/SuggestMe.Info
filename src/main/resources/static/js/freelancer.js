// Freelancer Theme JavaScript

(function($) {
    "use strict"; // Start of use strict

    // jQuery for page scrolling feature - requires jQuery Easing plugin
    // $('.page-scroll a').bind('click', function(event) {
    //     var $anchor = $(this);
    //     $('html, body').stop().animate({
    //         scrollTop: ($($anchor.attr('href')).offset().top - 50)
    //     }, 1250, 'easeInOutExpo');
    //     event.preventDefault();
    // });

    // Alternative
    // var $root = $('html, body');
    // $('a').click(function() {
    //     var href = $.attr(this, 'href');
    //     $root.animate({
    //         scrollTop: $(href).offset().top
    //     }, 500, function () {
    //         window.location.hash = href;
    //     });
    //     return false;
    // });

    // Highlight the top nav as scrolling occurs
    // $('body').scrollspy({
    //     target: '.navbar-fixed-top',
    //     offset: 51
    // });

    // Closes the Responsive Menu on Menu Item Click
    $('.navbar-collapse ul li a:not(.dropdown-toggle)').click(function() {
        $('.navbar-toggle:visible').click();
    });

    // Offset for Main Navigation
    $('#mainNav').affix({
        offset: {
            top: 100
        }
    })

    // Floating label headings for the contact form
    // $(function() {
    //     $("body").on("input propertychange", ".floating-label-form-group", function(e) {
    //         $(this).toggleClass("floating-label-form-group-with-value", !!$(e.target).val());
    //     }).on("focus", ".floating-label-form-group", function() {
    //         $(this).addClass("floating-label-form-group-with-focus");
    //     }).on("blur", ".floating-label-form-group", function() {
    //         $(this).removeClass("floating-label-form-group-with-focus");
    //     });
    // });

    // for return to top button (no longer used)
    // $(".nav > li > a").click(function(){
    //     // $(".top-btn").removeClass("hidden");
    //     var current = $(this);
    //     var name = current.attr('href');

    //     //Remove from current, add hidden to all others
    //     $(".top-btn").addClass('hidden');
    //     $(name + " > div > a").removeClass("hidden");

    // });

    // $('.top-btn').click(function(){
    //     $('.top-btn').addClass('hidden');
    // });

})(jQuery); // End of use strict
