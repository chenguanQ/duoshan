$(function () {


    //热门商品列表
    $.ajax({
        type: "get",
        url: "../php/hotGoodsListData.json",
        dataType: "json",
        success: function (response) {
            let html = response.map(value => {
                return `   <li class="item">
              <a href="" style="color: #646464;">
                  <dl>
                      <dt class="pic"><img src="${value.src}" alt=""></dt>
                      <dd class="price">
                          <b class="sales"></b>
                          ¥${value.price} <span class="oldPrice"> 建议零售价:¥${value.oldprice} </span></dd>
                      <dd class="des">${value.des}</dd>
                      <dd class="shops"><a href="">${value.shop}</a><b class="icon"></b></dd>
                  </dl>

              </a>
          </li>`

            }).join("");
            $(".hotGoods").html(html);
        }
    });




    //获取数据库数据
    let orderType = 0;
    let getList = (page) => {
        $.ajax({
            type: "post",
            url: "../php/getDataList.php",
            data: `page=${page}&orderType=${orderType}`,
            //  dataType: "json",
            success: function (response) {
                let dat = JSON.parse(response)
                // console.log(dat);
                // [2] 根据数据渲染页面
                let res = dat.data.map(ele => {
                    return `
                    <li class="item">
                    <a href="javascript:void(0);" style="color: #646464;">
                        <dl>
                            <dt class="pic"><img src="${ele.src}" alt=""></dt>
                            <dd class="price">
                                <b class="sales"></b>
                                ¥${ele.price} <span class="oldPrice"> 建议零售价:¥${ele.oldprice} </span></dd>
                            <dd class="des">${ele.des}</dd>
                            <dd class="shops"><a href="">${ele.shop}</a><b class="icon"></b></dd>
                        </dl>

                    </a>
                </li>
                    `
                }).join("");
                $(".goods-list").html(res);

            }
        });

    }
    // 获取服务器存储商品数据
    getList(0);
    //[2] 获取总页码
    $.ajax({
        type: "post",
        url: "../php/getPageCount.php",
        dataType: "json",
        success: function (response) {
            //  console.log(response);
            let pageSize = response.data.count;
            var res = '';
            for (let i = 0; i < pageSize; i++) {
                $("#page").append(`<a href="javascript:;">${i + 1}</a>`)
            }
            $("#page").children("a").eq(0).addClass("active");
        }
    });

    $("#page").on("click", "a", function () {
        var index = $(this).index();
        /* (1) 设置当前标签的选中状态 */
        $(this).addClass("active").siblings().removeClass("active");
        /* (2) 发送网络更新页面 */
        getList(index);
        $('html,body').animate({
            scrollTop: 0
        }, 500);
    })

    $(".filtrate li").click(function () {
        orderType = $(this).index();
        //  console.log(orderType);

        getList(0);
    })

    //把要跳转详情的商品的数值值发过去给详情
    $(".goods-list").on("click", ".item", function () {   
       var mark = $(this).children("dl").children("a").children(".des").text();
       
    console.log(mark);
    window.location.href = `http://127.0.0.1/code/tempDepot1/duoshan/html/details.html?id=${mark}`;
    });
})