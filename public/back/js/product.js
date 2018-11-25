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
  
       $('#form').data('bootstrapValidator').updateStatus('brandId','VALID')
  
  
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
       if( picArr.length === 3){
           $('#form').data('bootstrapValidator').updateStatus('picStatus','VALID');
       }
        //   $('[name = "brandLogo"]').val( picUrl );
        //   $('#form').data('bootstrapValidator').updateStatus('brandLogo','VALID')
        }
  });

  // 配置表单校验

  $('#form').bootstrapValidator({
    excluded:[],

    feedbackIcons: {
      valid: 'glyphicon glyphicon-ok',//校验成功
      invalid: 'glyphicon glyphicon-remove',//校验失败
      validating: 'glyphicon glyphicon-refresh'//校验中
    },
    fields:{
        brandId:{
            validators:{
                notEmpty:{
                    message:'请选择二级分类'
                }
               
            }
        },
        proName:{
            validators:{
                notEmpty:{
                    message:'请输入商品名称'
                }
               
            }
        },
        proDesc:{
            validators:{
                notEmpty:{
                    message:'请输入商品描述'
                }
               
            }
        },
       num:{
            validators:{
                notEmpty:{
                    message:'请输入商品库存'
                },
                //正则校验
                //  \d 数字
                // * 表示0次或多次
                // + 表示1次或多次
                // ? 表示0次或1次
                // {m,n}
                regexp: {
                    regexp:/^[1-9]\d*$/,
                    message: '商品库存必须是非零开头的数字'
                  }
               
            }
        },
        size:{
            validators:{
                notEmpty:{
                    message:'请输入商品尺码'
            },
            regexp: {
                regexp:/^\d{2}-\d{2}$/,
                message: '必须是xx-xx的格式,xx是两位数字,例如:36-44'
              }
         }
          
        },
        oldPrice:{
            validators:{
                notEmpty:{
                    message:'请输入商品原价'
                }
            }
        },
        price:{
            validators:{
                notEmpty:{
                    message:'请输入商品现价'
                }
            }
        },
        picStatus:{
            validators:{
                notEmpty:{
                    message:'请上传三张图片'
                }
            }
        }

    }
  });



  //注册表单校验成功事件  
  $('#form').on('success.form.bv',function( e ){
       e.preventDefault();
       var paramsStr = $('#form').serialize();
          paramsStr += "&picName1="+ picArr[0].picName +"&picAddr1="+ picArr[0].picAddr;
          paramsStr += "&picName2="+ picArr[1].picName +"&picAddr2="+ picArr[1].picAddr;
          paramsStr += "&picName3="+ picArr[2].picName +"&picAddr3="+ picArr[2].picAddr;
       $.ajax({
           type:'post',
           url:'/product/addProduct',
           data: paramsStr,
           dataType:'json',
           success:function( info ){
               console.log(info);

               if(info.success){
                   $('#addModal').modal('hide');
                   currentPage = 1;
                   render()
               }

               $('#form').data('bootstrapValidator').resetForm(true);

               $('#dropdownText').text('请选择二级分类');


               picArr = [];

               $('#imgBox img').remove();
           }
       })
  })
})