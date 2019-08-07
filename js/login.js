$(function () {
    //密码模块变量
    let user = $("#username");
    let password = $("#password");
    let imgCode = $("#imgCode");
    let imgCodeText = "";
    let userText = "";
    let passwordText = "";
    let text = "";

    //手机模块变量
    let user1 = $("#phoneusername");
    let phoneCode = $("#phonecode");
    let imgCode1 = $("#phoneimgCode");
    let imgCodeText1 = "";
    let userText1 = "";
    let phoneCodeText = "";
    let text1 = "";
    let num ="";
    let status = false;
    let sendMsgBtn = $(".code-sms");

    let phonemsg = "8888";
    let regPhone = /^1[3-9]\d{9}$/;

    //密码登录模块图像验证码
    (new Captcha({
        fontSize: 18
    })).draw(document.querySelector('#captcha'), r => {
        // console.log(r);
        imgCodeText = r;
        //当点击切换图形验证码时自动触发标签失去焦点的事件 
        imgCode.trigger("blur");
    });

    //手机登录模块图形验证码****
    (new Captcha({
        fontSize: 18
    })).draw(document.querySelector('#captcha1'), r => {
        console.log(r);
        imgCodeText1 = r;
        //当点击切换图形验证码时自动触发标签失去焦点的事件 
        imgCode1.trigger("blur");
    });
    //登录方式切换
    $(".type >span").click(function () {
        $(".login-submit").eq($(this).index()).css("display", "block").siblings(".login-submit").css("display", "none");
        $(this).css("border-bottom", "2px #00b03a solid").siblings("span").css("border-bottom", "none");
        $("form >div").eq($(this).index()).css("display", "block").siblings().css("display", "none");
    })
    //密码登录模块
    user.blur(function () {
        userText = $.trim($(this).val());
        if (userText.length != 0) {
            $(this).next().html("").removeClass("active");
        } else {
            $(this).next().html("用户名/手机号码不能为空！").addClass("active")
        }
    })
    password.blur(function () {
        passwordText = $.trim($(this).val());
        if (passwordText.length != 0) {
            $(this).next().html("").removeClass("active");
        } else {
            $(this).next().html("密码不能为空！").addClass("active")
        }
    })
    imgCode.blur(function () {
        text = $.trim($(this).val());
        if (text.length != 0) {
            if (text.toLowerCase() != imgCodeText.toLowerCase()) {
                $(this).nextAll("span").html("验证码错误！").addClass("active");
                return;
            }
            $(this).nextAll("span").html("").removeClass("active");
        } else {
            $(this).nextAll("span").html("验证码不能为空！").addClass("active")
        }
    })

    //登录1
    $("#loginBtn").click(() => {
        if (userText.length != 0 && passwordText.length != 0 && text.length != 0 && $(".active")
            .length == 0) {
            $.ajax({
                type: "post",
                url: "../php/login.php",
                data: `user=${userText}&password=${passwordText}`,
                //    dataType:"json",
                success: function (response) {
                    let o = JSON.parse(response);
                    let isCheck = $("#Check").is(':checked');
                    // console.log(o);     
                    if (o.status == "success") {
                        if (isCheck) {
                            localStorage.setItem("username", o.data);
                        }
                        sessionStorage.setItem("username", o.data);
                        window.location.href = "http://127.0.0.1/code/tempDepot1/duoshan/html/duoShan.html";
                    } else {
                        $(".login-error").html(o.msg).css("display", "block")
                    }
                }
            });
        } else {
            $(".login-error").html("请填写信息!").css("display", "block")
        }
    })

    //登录2
    user1.blur(function () {
        userText1 = $.trim($(this).val());
        if (userText1.length == 0) {
            $(this).next().html("手机号码信息错误").addClass("active")
        } else if (userText1.length != 0 && regPhone.test(userText1)) {
            $(this).next().html("").removeClass("active");
        }
    })
    phoneCode.blur(function () {
        phoneCodeText = $.trim($(this).val());
        if (phoneCodeText.length != 0) {
            if (num != phoneCodeText) {
                $(this).nextAll("span").html("验证码错误！").addClass("active");
                return;
            }
            $(this).next("span").html("").removeClass("active");
        } else {
            $(this).next("span").html("验证码不能为空！").addClass("active")
        }
    })
    imgCode1.blur(function () {
        text1 = $.trim($(this).val());
        if (text1.length != 0) {
            if (text1.toLowerCase() != imgCodeText1.toLowerCase()) {
                $(this).nextAll("span").html("验证码错误！").addClass("active");
                return;
            }
            $(this).nextAll("span").html("").removeClass("active");
        } else {
            $(this).nextAll("span").html("验证码不能为空！").addClass("active")
        }
    })

    //获取手机验证码
   
   
    $("#gain").click(function () {
       // console.log(1);
        num =Math.floor((Math.random() +1) *100000);
        if (!status) {
            status = true;
            $(this).css("display", "none").siblings("b").css("display", "block");

            //发送短信验证码等待时间
            let count = 60;
            let timer = setInterval(() => {
                count--;
                if (count <= 0) {
                    sendMsgBtn.html("发送短信验证码");
                    clearInterval(timer);
                    status = false;
                    return
                }
                sendMsgBtn.html("重试 " + count + "s");
            }, 1000)
        }
        $.ajax({
            type: 'post',
            url: 'http://route.showapi.com/28-1',
            dataType: 'json',
            data: {
                "showapi_timestamp": formatterDateTime(),
                "showapi_appid": '97272', //这里需要改成自己的appid
                "showapi_sign": '2dd7eb7c7bd74aa9805603b5e9b904c6', //这里需要改成自己的应用的密钥secret
                "mobile": `${userText1}`,
                "content": `{\"name\":\"牛二\",\"code\":\"${num}\",\"minute\":\"1\",\"comName\":\"小钦养猪厂\"}`,
                "tNum": "T150606060601",
                "big_msg": ""
            },
            error: function (XmlHttpRequest, textStatus, errorThrown) {
               
            },
            success: function (result) {
                console.log(result) //console变量在ie低版本下不能用
               // alert(result.showapi_res_code)
            }
        });
    })
    //获取手机验证码
    function formatterDateTime() {
        var date = new Date()
        var month = date.getMonth() + 1
        var datetime = date.getFullYear() +
            "" // "年"
            +
            (month >= 10 ? month : "0" + month) +
            "" // "月"
            +
            (date.getDate() < 10 ? "0" + date.getDate() : date
                .getDate()) +
            "" +
            (date.getHours() < 10 ? "0" + date.getHours() : date
                .getHours()) +
            "" +
            (date.getMinutes() < 10 ? "0" + date.getMinutes() : date
                .getMinutes()) +
            "" +
            (date.getSeconds() < 10 ? "0" + date.getSeconds() : date
                .getSeconds());
        return datetime;
    }
      
      
    $("#loginBtn1").click(() => {
        if (userText1.length != 0 && phoneCodeText.length != 0 && text1.length != 0 && $(".active")
            .length == 0) {
                $.ajax({
                    type: "post",
                    url: "../php/login.1.php",
                    data: `phone=${userText1}`,
                    //    dataType:"json",
                    success: function (response) {
                        let o = JSON.parse(response);
                        console.log(o);
                        
                        let isCheck = $("#Check").is(':checked');
                        // console.log(o);     
                        if (o.status == "success") {
                            if (isCheck) {
                                localStorage.setItem("phone", o.data);
                            }
                            sessionStorage.setItem("phone", o.data);
                        window.location.href = "http://127.0.0.1/code/tempDepot1/duoshan/html/duoShan.html";
                        } else {
                            $(".login-error").html(o.msg).css("display", "block")
                        }
                    }
                });
            } else {
                $(".login-error").html("请填写信息!").css("display", "block")
            }
                
            })
      
   
})