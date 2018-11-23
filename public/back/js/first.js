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


  //点击添加按钮,显示添加模态框

  $('#addBtn').click(function(){
      $('#addModal').modal('show');
  });


  //表单校验功能
  $('#form').bootstrapValidator({
    feedbackIcons: {
        valid: 'glyphicon glyphicon-ok',//校验成功
        invalid: 'glyphicon glyphicon-remove',//校验失败
        validating: 'glyphicon glyphicon-refresh'//校验中
      },
      fields:{
        categoryName:{
            validators:{
                notEmpty:{
                    message:"请输入一级分类名称",
                },
             }
        },
    }

  })

  //添加
  $('#form').on("success.form.bv",function( e ){
     e.preventDefault();

     $.ajax({
         type:'post',
         url:'/category/addTopCategory',
         data:$('#form').serialize(),
         success:function( info ){
             console.log(info);
             if(info.success){
                 //添加成功
                 //关闭模态框
                 $('#addModal').modal('hide');
                currentPage = 1;
                 render();


                 //内容和状态全重置
                 $("#form").data('bootstrapvalidator').resetForm(true);
             }
         }
     })
  })
})