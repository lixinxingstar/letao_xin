$.ajax({
    type:"get",
    url:"/employee/checkRootLogin",
    dataType:"json",
    success:function( info ){
        console.log(info);
        if(info.success){
          console.log("可以");
        }
        if(info.error === 400 ){
            location.href = "login.html";
          console.log("错误");
        }
}
    })