$(function(){
    $.get(
            'http://data.fixer.io/api/latest',
            {'access_key': '0fdad87b2a364829a5e2e0c740eccfeb',
            'symbols': 'RUB, USD'},
            function(abc){
                $('.birj').html('Euro &#8364;: <span class="red_pr">'+abc.rates['RUB'].toFixed(2)+'</span><br><br> <span>USD&#160;&#160;$: <span class="red_pr">' + (abc.rates['RUB']/abc.rates['USD']).toFixed(2)+'</span>');
                // console.log(abc);
                // console.log(abc.rates['EUR']);
            }
        );      
        var doc_w = $(window).width();
            if(doc_w > 576){
                $('#img-2').removeClass('d-none');
            }
            else{
                $('#img-2').addClass('d-none');
            }
        function lockScroll(){
            $html = $('html'); 
            $body = $('body'); 
            var initWidth = $body.outerWidth();
            var initHeight = $body.outerHeight();
        
            var scrollPosition = [
                self.pageXOffset || document.documentElement.scrollLeft || document.body.scrollLeft,
                self.pageYOffset || document.documentElement.scrollTop  || document.body.scrollTop
            ];
            $html.data('scroll-position', scrollPosition);
            $html.data('previous-overflow', $html.css('overflow'));
            $html.css('overflow', 'hidden');
            window.scrollTo(scrollPosition[0], scrollPosition[1]);   
        
            var marginR = $body.outerWidth()-initWidth;
            var marginB = $body.outerHeight()-initHeight; 
            $body.css({'margin-right': marginR,'margin-bottom': marginB});
        } 
        
        function unlockScroll(){
            $html = $('html');
            $body = $('body');
            $html.css('overflow', $html.data('previous-overflow'));
            var scrollPosition = $html.data('scroll-position');
            window.scrollTo(scrollPosition[0], scrollPosition[1]);    
        
            $body.css({'margin-right': 0, 'margin-bottom': 0});
        }
        $('.scroll_off').click(lockScroll);
        $('.scroll_on').click(unlockScroll);
        function rotade22(){
            var doc_w = $(window).width();
            var img_a = $('#img-1').attr('src');
            // if(doc_w > 576){
            //     $('#img-2').removeClass('d-none');
            // }
            // else{
            //     $('#img-2').addClass('d-none');
            // };
            if((img_a == "img/banner-1.png") && (doc_w < 576)){
                $('#img-1').attr('src', 'img/banner-2.png');
            }
            else{
                $('#img-1').attr('src', 'img/banner-1.png');
            };
        };
        function Res (){
            var doc_w = $(window).width();
            if(doc_w > 576){
                $('#img-2').removeClass('d-none');
            }
            else{
                $('#img-2').addClass('d-none');
            }
        };
        $(window).resize(Res);
        setInterval(rotade22, 3000);
        setInterval(function(){
            console.log($(window).width());
        }, 3000);
});