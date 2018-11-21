$(function(){
    // 开启进度条

//     NProgress.start();
    
//     // 结束进度条
// setInterval(function(){
//     NProgress.done();
// },1000)

$(document).ajaxStart(function(){
    NProgress.start();
})
$(document).ajaxStop(function(){
    NProgress.done();
})

$('#category').click(function(){
    $(this).next().stop().slideToggle();
})
    

$('.lt_topbar .icon-left').click(function(){
    console.log(44444);
    $('.lt_aside').toggleClass('hidemenu');
    $('.lt_topbar').toggleClass('hidemenu');
    $('.lt_main').toggleClass('hidemenu');
    
})
})