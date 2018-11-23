$(function(){


var currentPage = 1;//当前页
var pageSize = 5; //当前条数
    //发送ajax请求,请求一级分类的数据,进行页面渲染
render();
  function render(){
    $.ajax({
        type:'get',
        url:'/category/queryTopCategoryPaging',
        data:{
            page:currentPage,
            pageSize:pageSize,
        },
        dataType:'json',
        success:function( info ){
            console.log(info);
            var htmlStr = template('firstTpl',info);

            $('tbody').html(htmlStr);


            //当数据回来后,进行分页初始化
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
  }
})