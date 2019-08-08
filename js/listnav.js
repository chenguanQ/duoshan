$(function () {
    $(".list-nav >ul >li").hover(function () {
        $(this).children(".option").css({
            'background': '#f3210a',
            'color': '#fff'
        }).siblings(".item").stop().slideDown(100);

    }, function () {
        $(this).children(".option").css({
            'background': '#fff',
            'color': '#000'
        }).siblings(".item").stop().slideUp(100);

    })
})