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
    
})