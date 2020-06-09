$(function() {
    $('a').on('click', function(event) {
        event.preventDefault();
        let href = $(this).attr('href');
        $('body, html').animate({
            scrollTop: $(href).offset().top,
        }, 700);
    });

    $('.navbar__link').click(function() {
        $('.burger-checkbox').click();
    });

});