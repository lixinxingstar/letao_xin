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
    // console.log(44444);
    $('.lt_aside').toggleClass('hidemenu');
    $('.lt_topbar').toggleClass('hidemenu');
    $('.lt_main').toggleClass('hidemenu');
    
})


// 退出

$('.lt_topbar .icon-right').click(function(){
    //显示退出模态框

    $('#logoutModal').modal('show');


})

$('#logoutBtn').click(function(){
    $.ajax({
        type:"get",
        url:"/employee/employeeLogout",
        dataType:"json",
        success:function( info ){
            console.log(info);
            if(info.success){
                location.href = "login.html";
            }
        }
    })
})
})