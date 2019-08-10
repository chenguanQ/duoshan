$(function () {
    let targetData;
    getCatInfo();

    function getCatInfo() {
        $.ajax({
            type: "get",
            url: "../php/getCatData.php",
            dataType: "json",
            success: function (data) {
                console.log(data);
              console.log( data.length);
              
                targetData = data;
                /* 根据数据来渲染页面 */
                let html = data.map(function (ele) {
                    return `     <li class="cart-item" data-index=${ele.cartid} >
                   <input type="checkbox" class="check" ${ele.isActive==1 ? "checked" : "" }>
                   <div class="goods">
                      <div class="pic">
                       <img src="${ele.src}" alt="">
                      </div>
                       <div class="des">
                           <dl>
                               <dt><a href=""> ${ele.des}</a></dt>
                                    
                           </dl>
                       </div>
                   </div>
                   <div class="type">
                       <div class="t-left">${ele.color}</div>
                       <div class="t-right">
                           <span class="size">${ele.size}</span>
                           <div class="add-del">
                               <span class="add"> </span> 
                               <input type="text" class="num" value="${ele.num}">
                               <span class="del"></span>
                           </div>
                       </div>
                   </div>
                   <div class="tit">
                       <span class="price">¥${ele.price}</span>
                       <span class="amount">${ele.num}</span>
                       <span class=" subtotal">¥${ele.total}</span>
                       <i class="remove"></i>
                   </div>
               </li>`
                }).join("");
                $(".cart-list").html(html);
                $(".piece").html(data.length);
                // console.log(targetData);
                computedTotalPrice();
            }
        });
    }
    //计算总价
    function computedTotalPrice() {
        var res = 0;
        targetData.forEach(element => {
            if (element.isActive == 1) {
                res += element.total * 1;
            }
        });
        // console.log(res);
        $(".total").html(`¥${res}`);

    }

    //删除事件
    $(".cart-list").on("click", ".remove", function () {
        let index = $(this).parents(".cart-item").attr("data-index");
        // console.log(index);
        $.ajax({
            type: "get",
            url: "../php/removeCart.php",
            data: `cartid=${index}`,
            success: function (response) {
                getCatInfo()
            }
        });
    });

    //添加商品数量
    $('.cart-list').on('click', '.add', function () {
        let num = $(this).next().val();
        num++;
        $(this).next().val(num);
        let index = $(this).parents(".cart-item").attr("data-index");

        let price = $(this).parents().siblings(".tit").children(".price").text().slice(2)
        $.ajax({
            type: "get",
            url: "../php/updataCart.php",
            data: `cartid=${index}&num=${num}&price=${price}`,
            success: function (response) {
                getCatInfo()
            }
        });

    });
    //减少商品数量
    $('.cart-list').on('click', '.del', function () {
        let num = $(this).prev().val();
        num--;
        if (num <= 0) {
            num = 1
        }
        $(this).prev().val(num);
        let index = $(this).parents(".cart-item").attr("data-index");
        let price = $(this).parents().siblings(".tit").children(".price").text().slice(2);
        $.ajax({
            type: "get",
            url: "../php/updataCart.php",
            data: `cartid=${index}&num=${num}&price=${price}`,
            success: function (response) {
                getCatInfo()
            }
        });
    });
    //单个勾选

    $('.cart-list').on('click', '.check', function () {
        let status = Number($(this).is(":checked"));
        let index = $(this).parents(".cart-item").attr("data-index");
        //   console.log(index);
        $.ajax({
            type: "get",
            url: "../php/updataCart1.php",
            data: `cartid=${index}&status=${status}`,
            success: function (response) {
                getCatInfo()
            }
        });
    })

    //全选/反选
    let all = 1;
    $(".allCheckbox").click(function () {
        //prop 取反的意思
        $(".check").prop("checked", $(this).is(":checked"));
        let status = Number($(this).is(":checked"));
        $.ajax({
            type: "get",
            url: "../php/updataCart1.php",
            data: `status=${status}&all=${all}`,
            success: function (response) {
                getCatInfo()

            }
        });
    })

    $(".b-del").click(function () {
        //   console.log( $(".allCheckbox").is(":checked"));
        if ($(".allCheckbox").is(":checked")) {
            $.ajax({
                type: "get",
                url: "../php/updataCart1.php",
                data: `complete=2`,
                success: function (response) {
                    getCatInfo()
                  //  console.log(response);

                }
            });
        }

    })
    //输入框失去焦点改变数量


})