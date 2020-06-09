const ANIMATION_SPEED = 300;

function hideDescription(element) {
    let item = $(element).closest('.cases-list-item')
    item.toggleClass('short')
        .children('.description').slideToggle(ANIMATION_SPEED);
}

function removeCase(element) {
    $(element).closest('.cases-list-item').slideUp(ANIMATION_SPEED, function(){
        $(this).remove();
        if ($('.cases-list-item').length == 0) {
            $('.cases-list').before('<span class="empty-case-list">Список пуст...</span>');
        }
    });
}

function addCase(caseTitle, caseDescription) {
    let list_item = $('<li></li>').addClass('cases-list-item');
    let header = $('<div></div>').addClass('header');
    let title = $('<h3></h3>').text(caseTitle)
                              .click(function(){ removeCase(this) });
    let hideButton = $('<button>&nbsp;</button>').addClass('hide-button')
                                                 .click(function(){ hideDescription(this) });
    let description =  $('<div></div>').addClass('description')
                                       .text(caseDescription);
    header.append(title)
          .append(hideButton);
    list_item.append(header)
             .append(description)
             .css('display', 'none');
    $('.empty-case-list').remove();
    list_item.appendTo('.cases-list')
             .fadeIn(ANIMATION_SPEED);
}

$(function(){
    $('.hide-button').click(function(){ hideDescription(this) });

    $('.cases-list-item .header h3').click(function(){ removeCase(this) });

    $('form.new-case').submit(function(){
        let form = $(this)
        let caseTitle = form.find('input[name="header"]').val()
        let caseDescription = form.find('textarea[name="description"]').val()
        addCase(caseTitle, caseDescription)
        form.trigger('reset');
        return false;
    });
})