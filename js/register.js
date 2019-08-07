$(function () {
    let username = $("#usernameID");
    let phone = $("#phoneID");
    let password = $("#passwordID");
    let imgCode = $('#imgCode');
    let msgCode = $("#msgCode");
    let imgCodeText = '';
    let passwordText = '';
    let usernameText = '';
    let phoneText = '';
    //图形验证码
    function yz() {
        (new Captcha({
            fontSize: 18
        })).draw(document.querySelector('#captcha'), r => {
            //   console.log(r);
            imgCodeText = r;
            //当点击切换图形验证码时自动触发标签失去焦点的事件 
            imgCode.trigger("blur");
        });
    }
    yz();
    //切换验证码
    $(".reset").click(() => {
        yz();
        imgCode.trigger("blur");
    })
    //正则
    let regUsername = /^[A-Za-z]{6,8}$/;
    let regPhone = /^1[3-9]\d{9}$/;
    let regPassword = /^[a-zA-Z0-9]{6,16}$/;

    //用户名验证
    username.blur(function () {
        let text = $.trim($(this).val()); 
        let msg = $(this).nextAll(".form-group-message");      
        if (text.length == 0) {
            msg.html("用户名不能为空").addClass("active");
        } else if (!regUsername.test(text)) {
            msg.html("用户名不正确").addClass("active");
        } else {
            msg.html("").removeClass("active");
            usernameText = text;
        }
    })
       //手机号验证
       phone.blur(function () {
        let text = phone.val();
        let msg = $(this).nextAll(".form-group-message");
        if (text.length == 0) {
            msg.html("手机号不能为空").addClass("active");
        } else if (!regPhone.test(text)) {
            msg.html("手机号不正确").addClass("active");
        } else {
            msg.html("").removeClass("active");
            phoneText = text;
        }
    })
 //密码验证
 password.blur(function () {
    let text = password.val();
    let msg = $(this).nextAll(".form-group-message");
    if (text.length == 0) {
        msg.html("密码不能为空").addClass("active");
    } else if (!regPassword.test(text)) {
        msg.html("密码不正确").addClass("active");
    } else {
        msg.html("").removeClass("active");
        passwordText = text;
    }
})
 //图形验证码
 imgCode.blur(function () {
    // console.log(1);
    let text = imgCode.val();
    let msg  = $(this).nextAll(".form-group-message");
    // console.log(msg);
    if (text.length == 0) {
        msg.html("请输入图形验证码").addClass("active");
    } else if (text.toLowerCase() !== imgCodeText.toLowerCase()) {
        msg.html("图形验证码不正确").addClass("active");
    } else {
        msg.html("").removeClass("active");
        imgCodeText = text;
    }
})
//注册
$("#regist").click(function () {        
    let isCheck = $("#protocol").is(':checked');
   // console.log(isCheck);  
    if (!isCheck) {
        $(".errorDes").html("请勾选用户使用条款").css("display","block");
        return;
    } else {
        $(".errorDes").html("").css("display","none");
    }
    if (imgCodeText.length != 0 && passwordText.length != 0 &&
        usernameText.length != 0 &&
        phoneText.length != 0 && $(".active").length ==0) {
            // console.log(1111);         
        $.ajax({
            type: "post",
            url: "../php/register.php",
            dataType: "json",
            data: `username=${usernameText}&password=${passwordText}&phone=${phoneText}`,
            success: function (response) {
                console.log(response);
                /* 先检查请求的结果，然后做出对应的处理 */
                if (response.status == "success") {                 
                    $(".skip").css("display","block");
                //  Cookie.setItem("username",response.data);
                  sessionStorage.setItem("username",response.data);
                    /* 跳转到登录页面 */
                    setTimeout(() => {
                     window.location.href = "http://127.0.0.1/code/tempDepot1/duoshan/html/duoShan.html#";
                    }, 2000);
                } else {
                    alert(response.msg);
                }
            }
        });

    }

})
})