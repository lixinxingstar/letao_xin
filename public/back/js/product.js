$(function(){

var picArr = [];

    var currentPage = 1;
    var pageSize = 3;
    render();
    function render(){
        $.ajax({
            type:'get',
            url:'/product/queryProductDetailList',
            data:{
                page:currentPage,
                pageSize:pageSize,
            },
            dataType:"json",
            success:function( info ){
              console.log(info);

              var htmlStr = template('productTpl',info);
              $('tbody').html(htmlStr);


              //分页

              $('#paginator').bootstrapPaginator({
                bootstrapMajorVersion:3,
                currentPage:info.page,
                totalPages:Math.ceil(info.total / info.size ),
                
                onPageClicked:function(a,b,c,page){
                    currentPage = page;
                    render();
                }
      
      
              })
            }

        })

    };

    $('#addBtn').click(function(){
        $('#addModal').modal('show');

        $.ajax({
            type:'get',
            url:'/category/querySecondCategoryPaging',
            data:{
                page:1,
                pageSize:100
            },
            dataType:'json',
            success:function(info){
                console.log(info);

                var htmlStr = template('dropdownTpl',info);

                $('.dropdown-menu').html(htmlStr);

            }

        })
    });

    $('.dropdown-menu').on('click','a',function(){
        var txt = $(this).text();
        $('#dropdownText').text(txt);
  
  
        // console.log(txt);
       var id = $(this).data('id');
  
       $('[name = "brandId"]').val( id );
  
    //   $('#form').data('bootstrapValidator').updateStatus('brandId','VALID')
  
  
      });
  

      $("#fileupload").fileupload({
        dataType:"json",
        //e：事件对象
        //data：图片上传后的对象，通过data.result.picAddr可以获取上传后的图片地址
        done:function (e, data) {
          console.log(data);
  
        var picObj = data.result;

        picArr.unshift( picObj );
  
          //获取图片地址
       var picUrl =picObj.picAddr;
       $('#imgBox').prepend('<img style="width:100px"  src="'+picUrl+'" alt="">');
       

       if( picArr.length > 3){
           picArr.pop();

           //删除页面的图片
           $('#imgBox img:last-of-type').remove();
       }
        //   $('[name = "brandLogo"]').val( picUrl );
        //   $('#form').data('bootstrapValidator').updateStatus('brandLogo','VALID')
        }
  });
})