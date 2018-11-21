$(function(){


    $('#form').bootstrapValidator({
        feedbackIcons: {
            valid: 'glyphicon glyphicon-ok',//校验成功
            invalid: 'glyphicon glyphicon-remove',//校验失败
            validating: 'glyphicon glyphicon-refresh'//校验中
          },
        fields:{
            username:{
                validators:{
                    notEmpty:{
                        message:"用户名不能为空",
                    },
                    stringLength:{
                        min:2,
                        max:6,
                        message:"用户名长度必须2-6位",
                    }
                }

            },

            password:{
                validators:{
                    notEmpty:{
                        message:"密码不能为空",
                    },
                    stringLength:{
                        min:6,
                        max:12,
                        message:"密码长度必须是6-12位",
                    }
                }

            }
        }
    })



    $('#form').on('success.form.bv',function( e ){
        e.preventDefault();
        $.ajax({
            type:'post',
            url:'/employee/employeeLogin',
            data:$('#form').serialize(),
            dataType:'json',
            success:function(info){
                console.log(info);

                if(info.success){
                    location.href = 'index.html';
                }
                if(info.error === 1000){
                    alert(info.message);
                }
                if(info.error === 1001){
                    alert(info.message);
                }
            }

        })
    })

     $('[type="reset"]').click(function(){

        $('#form').data("bootstrapValidator").resetForm();



     })


   
})