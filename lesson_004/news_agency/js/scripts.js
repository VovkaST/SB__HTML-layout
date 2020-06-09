const FIXER_API_KEY = 'ea7f5d9b33e8b3b0d242b9b773e60ccb';
const FIXER_URL = 'http://data.fixer.io/api/latest';
const ANIMATION_SPEED = 300;

var supportsPassive = false;
try {
    window.addEventListener("test", null, Object.defineProperty({}, 'passive', {
        get: function () { supportsPassive = true; } 
    }));
} catch(e) {}
var wheelOpt = supportsPassive ? { passive: false } : false;
var wheelEvent = 'onwheel' in document.createElement('div') ? 'wheel' : 'mousewheel';
// left: 37, up: 38, right: 39, down: 40
var keys = {37: 1, 38: 1, 39: 1, 40: 1};

// function disableScroll() {
//     $('body').css('overflow-y', 'hidden');
// }

// function enableScroll() {
//     $('body').css('overflow-y', 'scroll');
// }


function preventDefault(e) {
  e.preventDefault();
}

function preventDefaultForScrollKeys(e) {
    if (keys[e.keyCode]) {
        preventDefault(e);
        return false;
    }
}


function disableScroll() {
    window.addEventListener('DOMMouseScroll', preventDefault, false); // older FF
    window.addEventListener(wheelEvent, preventDefault, wheelOpt); // modern desktop
    window.addEventListener('touchmove', preventDefault, wheelOpt); // mobile
    window.addEventListener('keydown', preventDefaultForScrollKeys, false);
}

function enableScroll() {
    window.removeEventListener('DOMMouseScroll', preventDefault, false);
    window.removeEventListener(wheelEvent, preventDefault, wheelOpt); 
    window.removeEventListener('touchmove', preventDefault, wheelOpt);
    window.removeEventListener('keydown', preventDefaultForScrollKeys, false);
}


function collectRates() {
    let rates = $('.rates')
    let euro = rates.find('.rate.euro')
    let dollar = rates.find('.rate.dollar')
    $.ajax({
        url: FIXER_URL,
        data: {'access_key': FIXER_API_KEY},
        method: 'GET',
        success: function(resp) {
            if (resp.success) {
                let _date = resp.date.split('-');
                _date = _date[2] + '.' + _date[1] + '.' + _date[0];
                let _e = resp.rates.RUB.toFixed(2)
                let _d = resp.rates.USD.toFixed(2)
                euro.attr('title', 'Курс Рубля к Евро на ' + _date)
                    .children('.cost').text(_e);
                dollar.attr('title', 'Курс Рубля к Доллару США на ' + _date)
                      .children('.cost').text((_e / _d).toFixed(2));
            } else {
                console.log('FIXER ERROR (' + resp.error.code + '): ' + resp.error.info);
            }
        },
        error: function(error) {
            euro.children('.cost').html('&mdash;');
            dollar.children('.cost').html('&mdash;');
            console.log(error);
        }
    });
}

function createDialog() {
    let bg = $('<div></div>').addClass('dialog-background')
                             .css('display', 'none')
                             .click(function(event){ closeDialog(event); });
    let dialog = $('<div></div>').addClass('dialog-container');
    bg.append(dialog)
      .appendTo($('body'))
      .fadeIn(ANIMATION_SPEED)
      .slideDown(ANIMATION_SPEED);
    disableScroll();
    return dialog
}

function closeDialog(event=NaN) {
    let bg = $('.dialog-background');
    if ($(event.target).is(bg) || (isNaN(event))) {
        bg.fadeOut(ANIMATION_SPEED, function() { $(this).remove(); });
    }
    enableScroll();
}

function createCitiesDialog() {
    const CITIES = ['Москва', 'Санкт-Петербург', 'Калининград', 'Казань', 'Нижний Новгород', 'Самара',
                    'Красноярск', 'Ростов-на-Дону', 'Петропавловск Камчатский', 'Севастополь', ]
    let dialog = createDialog();
    let header = $('<h4></h4>').addClass('container-header')
                               .text('Выберите город:');
    let cities_list = $('<ul></ul>').addClass('cities-list');
    CITIES.forEach(function(city) {
        $('<li></li>').addClass('cities-list-item')
                      .append($('<a href="#"></a>').text(city)
                                                   .click(function(){ changeCity(this); }))
                      .appendTo(cities_list);
    });
    dialog.append(header)
          .append(cities_list);
}

function changeCity(city_element) {
    let city = $(city_element).text();
    $('.info-block .city a').text(city);
    closeDialog();
    return false;
}

$(function(){
    $('.header-item.city a').click(function(){
        createCitiesDialog();
        return false;
    });
    $('button#disable-scroll').click(function(){
        $(this).addClass('pressed');
        $('button#enable-scroll').removeClass('pressed');
        disableScroll();
    });
    $('button#enable-scroll').click(function(){
        $(this).addClass('pressed');
        $('button#disable-scroll').removeClass('pressed');
        enableScroll();
    });
    collectRates();
});