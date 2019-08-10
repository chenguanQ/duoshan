$(function () {
    //放大镜模块
    let max = document.querySelector("#max");
    let min = document.querySelectorAll(".min");
    let big = document.querySelector("#big");
    let content = document.querySelector(".content");
    let make = document.querySelector(".make");
    let magnify = document.querySelector(".magnify");
    let magnifyImg = magnify.children[0];

    min.forEach((ele, i) => {
        ele.onmouseenter = function () {
            big.src = this.children[0].src;
            magnifyImg.src = big.src;
            this.className = 'min active';

        }
        ele.onmouseleave = function () {
            this.className = 'min';
        }
    });
    max.addEventListener("mousemove", show)
    max.addEventListener("mouseout", hide);

    function show(e) {
        e = e || window.event;
        make.style.display = "block";
        magnify.style.display = "block";
        //  console.log(make.offsetWidth);

        //光标位置xy
        let x = e.pageX - content.offsetLeft - content.clientLeft - make.offsetWidth / 2;
        let y = e.pageY - content.offsetTop - content.clientTop - make.offsetHeight / 2;
        //   console.log(x, y);
        //限制蒙板
        x <= 0 ? x = 0 : x;
        x >= max.offsetWidth - make.offsetWidth ? x = max.offsetWidth - make.offsetWidth : x;
        y <= 0 ? y = 0 : y;
        y >= max.offsetHeight - make.offsetHeight ? y = max.offsetHeight - make.offsetHeight : y;
        //蒙板位置
        make.style.left = x + 'px';
        make.style.top = y + 'px';

        let bigX = x * ((magnifyImg.offsetWidth - magnify.offsetWidth) / (max.offsetWidth - make.offsetWidth));

        let bigY = y * ((magnifyImg.offsetHeight - magnify.offsetHeight) / (max.offsetHeight - make.offsetHeight));
        magnifyImg.style.marginLeft = -bigX + 'px';
        magnifyImg.style.marginTop = -bigY + 'px';
    }

    function hide() {
        make.style.display = "none";
        magnify.style.display = "none";
    }



    $(".color> ul >li").click(function () {
        $(this).addClass("active").siblings().removeClass("active");
    })

    $(".size> ul >li").click(function () {
        $(this).addClass("active").siblings().removeClass("active");

    })

    //根据列表页传过来的ID取出对应的数据渲染
    let id = window.location.search.slice(1);
    //console.log(id);
    let itemData;
    $.ajax({
        type: "post",
        url: "../php/detGetGoods.php",
        data: `${id}`,
        success: function (response) {
            let res = JSON.parse(response).data;
            itemData = res;
            // console.log(res);
            res.forEach(value => {
                $("#big").attr("src", value.src);
                $("#magnify").attr("src", value.src);
                $(".list .min:first-child").children().attr("src", value.src);
                $(".goods-name").text(value.des);
                $(".value_bot").text(`¥${value.price}`)
            })

        }
    });


    //pushcart
    function pushcart() {
        let goodid = itemData[0].gid;
        let price = itemData[0].price;
        let color = $(this).parent().siblings(".color").children(".clearfix").children(".active").text();
        let size = $(this).parent().siblings(".size").children(".clearfix").children(".active").text();
        //    console.log( color,size);
        $.ajax({
            type: "get",
            url: "../php/addCart.php",
            data: `goodid=${goodid}&price=${price}&color=${color}&size=${size}`,
            dataType: "json",
            success: function (response) {
                // console.log(response);
                var text = response["totalRow"];
                $(".cart-num").html(`(${text})`);
            }
        });
    }
    //添加购物车
    $(".add").click(pushcart)

    //跳转购物车
    $(".buy").click(function () {
        pushcart();
        window.location.href = "http://127.0.0.1/code/tempDepot1/duoshan/html/cart.html";

    })
})