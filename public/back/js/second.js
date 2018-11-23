$(function(){

var currentPage = 1;
var pageSize = 5;
render();

       

   function render(){
       $.ajax({
        type:'get',
        url:'/category/querySecondCategoryPaging',
        data:{
            page:currentPage,
            pageSize:pageSize,
        },
        dataType:'json',
        success:function(info){
            console.log(info);
             var htmlStr = template('secondTpl',info);
             $('tbody').html(htmlStr);

             $('#paginator').bootstrapPaginator({
                bootstrapMajorVersion:3,
                currentPage:info.page,
                totalPages: Math.ceil(info.total / info.size),
                onPageClicked:function(a,b,c,page){
        
                    // console.log(page);
        
                    currentPage = page;
                     render();
        
                }
            })
        }

      
       })
   };

   $('#addBtn').click(function() {
    $('#addModal').modal("show");

    // 发送 ajax 请求, 请求所有的一级分类列表, 进行渲染
    // 通过传参 page=1 pageSize=100 模拟请求所有一级分类列表的接口
    $.ajax({
      type: "get",
      url: "/category/queryTopCategoryPaging",
      data: {
        page: 1,
        pageSize: 100
      },
      dataType: "json",
      success: function( info ) {
        console.log( info );
        var htmlStr = template( "dropdownTpl", info );
        $('.dropdown-menu').html( htmlStr );
      }
    })
  });
    
   
})

