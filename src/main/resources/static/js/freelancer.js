// Freelancer Theme JavaScript

(function($) {
    "use strict"; // Start of use strict

    // resize logo on screen resize
    $(window).on("resize", function() {
        var windowWidth = $(window).width();
        if(windowWidth < 400){
            $('#logo').attr("width","350px");
        }
        else if(windowWidth < 600){
            $('#logo').attr('width','500px');
        } else {
            $('#logo').attr('width','600px');
        }
    });

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

})(jQuery); // End of use strict
