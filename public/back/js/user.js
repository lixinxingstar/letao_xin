$(function(){

var currentPage = 1;//当前页
var pageSize = 5;//每页条数

var currentId;

var isDelete;
render();


function render(){
    $.ajax({
        type:'get',
        url:'/user/queryUser',
        data:{
            page:currentPage,
            pageSize:pageSize,
        },
        dataType:'json',
        success:function( info ){
           console.log(info);
    
           var htmlStr = template('tmp',info);
           $('tbody').html(htmlStr);
    
           //根据后台返回的数据进行分页初始化
           $('#paginator').bootstrapPaginator({
            bootstrapMajorVersion:3,
            currentPage:info.page,//当前页
            totalPages:Math.ceil( info.total / info.size),//总页数
            onPageClicked:function(a,b,c,page){
                  console.log(page);

                  currentPage = page;
                   render();
            }
           })
    
        }
    })
}

// 分页测试
// $('#paginator').bootstrapPaginator({
    
//   bootstrapMajorVersion:3,//指定版本号
//   currentPage:1,//当前页
//   totalPages:3,//总页数
//   onPageClicked:function(a,b,c,page){
//      console.log(page);
//   }
// });

$('tbody').on('click','.btn',function(){
    // console.log("哈哈");
    $('#userModal').modal('show');
    currentId = $(this).parent().data('id');

    //禁用按钮
    isDelete = $(this).hasClass('btn-danger') ? 0 : 1;
})



//点击模态框的确认按钮,完成用户的启用禁用
$('#sumbitBtn').click(function(){
    $.ajax({
         type:'post',
         url:'/user/updateUser',
         data:{
             id:currentId,//用户id
             isDelete:isDelete,
         },
         dataType:'json',
         success:function( info ){
            console.log(info);
            if(info.success){
                $('#userModal').modal('hide');
                render();
            }
         }
    })
})

})