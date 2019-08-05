$(function () {
    //渲染轮播图
    $.ajax({
        type: "get",
        url: "../php/bannerData.json",
        dataType: "json",
        success: function (data) {
            // console.log(data.src);
            (new BannerManager(data, 'false', 'false', 'true', 1, 1500, 0, $(".banner"))).init();

        }
    });
    //渲染tabs
    new Promise((resolve, reject) => {
        $.ajax({
            type: "get",
            url: "../php/tabsData.1.json",
            dataType: "json",
            success: function (data) {
                let html = data.map(value => {
                    //  console.log(value.type);
                    let item = value.classify.map(value => {
                        let item1 = value.list.map(value => {
                            return ` <dd><a href="">${value}</a></dd>`
                        }).join("")
                        return `<dl> <dt>${value.title} : ${item1}</dl>`
                    }).join("");
                    let item2 = value.src.map(value => {
                        return ` <a href="" class="show"><img src="${value}" alt=""></a>`

                    }).join("");
                    let item3 = value.hot.map(value => {
                        return ` <li><a href="">${value}</a></li>`
                    }).join("");
                    return `<li><a href="" class="main_son">${value.type} ></a>
                    <div class="cat-content clearfix">
                    <ul class="top ">
                    ${item3}
                        <span><a href="" class="choiceness">更多精选</a></span>
                    </ul>
                    <div class="des">
                      ${item}
                    </div>
                   ${item2}
                </div>
                    </li>`
                }).join("");
                $(".car-list >ul").html(html);
                resolve()
            }
        })
    }).then(() => {
        $(".type-list > li ").hover(function () {
            $(this).children(".cat-content").css("display", "block")
        }, function () {
            $(this).children(".cat-content").css("display", "none")
        })
    });
    //秒杀功能的倒计时
    let date = new Date(2019, 8, 4, 21, 36).getTime();
    let endDate = (date - new Date().getTime()) / 1000;

    function timer() {
        endDate -= 1;
        if (endDate <= 0) {
            clearInterval(timing);
            $(".timer").children(".h").html(0);
            $(".timer").children(".m").html(0);
            $(".timer").children(".s").html(0);
        }
        let h = bl(parseInt(endDate / 60 / 60) % 24);
        let m = bl(parseInt(endDate / 60) % 60);
        let s = bl(parseInt(endDate) % 60);
        $(".timer").children(".h").html(h);
        $(".timer").children(".m").html(m);
        $(".timer").children(".s").html(s);
    }
    timer();
    var timing = setInterval(timer, 1000);
    //倒计时补零
    function bl(num) {
        if (num < 10) {
            num = "0" + num;
        }
        return num;
    };

    // 秒杀商品列表
    class seckillGoodsListManager {
        //参数1（传入的数据）参数2（是否显示索引小图标），参数3（是否显示索引带数字小图标），参数4（是否需要手动上下点击），
        //参数5（需要显示的图片张数），参数6（自动轮播的速度），参数7（设置边距），参数8（插入哪个标签jq）
        constructor(data, nav = 'false', index = 'false', control = 'false', num, speed, margin, root = $("body")) {
            this.data = data;
            this.root = root;
            this.nav = nav;
            this.control = control;
            this.index = index;
            this.num = num;
            this.speed = speed;
            this.margin = margin;
            this.slider = null;
            this.slider_box = null;
            this.slider_control = null;
            this.slider_nav = null;
            this.timer = null;
            this.imgIndex = 0;
            this.imgLength = null;
            this.next = null;
            this.prev = null;
            this.oSpan = null;
            this.imgWidth = null;
            this.sliderWidth = null;


        }
        init() {
            this.createHTML();
            this.root.append(this.slider);
            this.renderUI();
            this.addEven();
            this.sliderAutoPlay()
        }
        createHTML() {
            this.slider = $("<div></div>");
            this.slider_box = $("<div></div>");


            this.slider.addClass("slider");
            this.slider_box.addClass("slider_box");
            this.slider.append(this.slider_box);
            if (this.control == "true") {
                this.slider_control = $("<div></div>");
                this.slider_control.addClass("slider_control");
                this.slider.append(this.slider_control);
            }
            if (this.nav == "true") {
                this.slider_nav = $("<div></div>");
                this.slider_nav.addClass("slider_nav");
                this.slider.append(this.slider_nav);
            }
        }
        renderUI() {
            let self = this;
            let html = this.data.map((value) => {
                return `  <div class="content">
                <div class="pic"><img src="${value.src}" alt=""></div>
                <div class="body">
                    <dl>
                        <dt class="des">
                           ${value.des}
                        </dt>
                        <dd class="sell">已抢${value.sell}件</dd>
                        <dd class="price">秒杀价:<span class="newPrice">¥${value.newPrice}</span><span
                                class="oldPrice">¥${value.oldPrice}</span></dd>
                    </dl>
                  
                </div>
            </div>`

            }).join("");

            this.slider_box.html(html);
            this.slider_box.append((this.slider_box).children(`.content:lt(${this.num})`).clone());

            this.imgLength = this.slider_box.children(".content").length - (this.num - 1);
            this.imgWidth = this.slider_box.children(".content").width();
            this.sliderWidth = this.slider.width();
            // console.log(this.imgLength, this.sliderWidth);

            this.slider_box.css("width", parseInt(this.sliderWidth) * this.imgLength);


            if (this.control == "true") {
                this.slider_control.html(
                    ` <a class="prev cus-text">&lt;</a><a class="next cus-text">&gt;</a>`);
                this.next = $(this.slider_control.children(".next"));
                this.prev = $(this.slider_control.children(".prev"));
            }
            //添加index小图标
            if (this.slider_nav) {
                for (let i = 0; i < this.imgLength - 1; i++) {
                    this.slider_nav.append('<span>' + `${this.index== "true"?`${i+1}`:""}` + '</span>');
                    console.log();
                }


                this.oSpan = this.slider_nav.children("span");
                this.oSpan.first().addClass("active");
                // 鼠标移入图片数字导航切换图片
                this.oSpan.mouseenter(function () {
                    this.imgIndex = $(this).index();
                    $(this).addClass("active").siblings("span").removeClass("active");
                    //计算图片移动的距离 span的索引 * 一个图片的宽度
                    let imgLeft = $(this).index() * parseInt(self.imgWidth);

                    //如果当鼠标放在小图标上面的时候，不想要图片跳转而只需要显示对应图片可以考虑css方法
                    self.slider_box.css({
                        "left": -imgLeft + "px"
                    });
                });
            }

        }
        addEven() {
            if (this.control == "true") {
                this.next.click(() => {
                    this.nextPic()
                });
                this.prev.click(() => {
                    this.prevPic()
                });
            }
            //鼠标移入、移除|停止、开始轮播
            this.slider.hover(() => {
                clearInterval(this.timer);
                if (this.control == "true") this.slider_control.css("display", "block");
            }, () => {
                this.sliderAutoPlay()
            });
        }
        nextPic() {
            //切换显示下一张图片的方法            
            this.imgIndex++;
            if (this.imgIndex >= this.imgLength) {
                //重置标签的位置和索引
                this.slider_box.css({
                    "left": "0"
                });
                this.imgIndex = 1;
            }
            //设置动画切换
            this.slider_box.stop().animate({
                "left": -(this.imgIndex * (this.imgWidth + this.margin)) + "px"
            });
            //数字导航根据图片切换自动选定
            let numIndex = this.imgIndex;
            //判断数字导航的位置
            if (numIndex == this.imgLength - 1) numIndex = 0;
            //设置选中状态
            if (this.slider_nav) {
                this.oSpan.eq(numIndex).addClass("active").siblings("span").removeClass("active");
            }

        }
        prevPic() {
            //切换显示上一张图片的方法    
            this.imgIndex--;
            if (this.imgIndex < 0) {

                this.slider_box.css({
                    "left": -((this.imgLength - 1) * (this.imgWidth + this.margin)) + "px"
                });
                this.imgIndex = this.imgLength - 2;
            }
            this.slider_box.stop().animate({
                "left": -(this.imgIndex * (this.imgWidth + this.margin)) + "px"
            });
            //数字导航根据图片切换自动选定
            if (this.slider_nav) {
                this.oSpan.eq(this.imgIndex).addClass("active").siblings("span").removeClass("active");
            }
        }
        //自动轮播
        sliderAutoPlay() {
            this.timer = setInterval(() => {
                this.nextPic()
            }, this.speed);
            if (this.control == "true") this.slider_control.css("display", "none");
        }
    }
    $.ajax({
        type: "get",
        url: "../php/seckillGoodsList.json",
        dataType: "json",
        success: function (data) {
            // console.log(data);
            (new seckillGoodsListManager(data, 'false', 'false', 'true', 3, 1200, 10, $(".seckill-list"))).init();
        }
    });
    //首页商品列表轮播
    class NewListManager {
        //参数1（传入的数据）参数2（是否显示索引小图标），参数3（是否显示索引带数字小图标），参数4（是否需要手动上下点击），
        //参数5（需要显示的图片张数），参数6（自动轮播的速度），参数7（设置边距），参数8（插入哪个标签jq）
        constructor(data, nav = 'false', index = 'false', control = 'false', num, speed, margin, root = $("body")) {
            this.data = data;
            this.root = root;
            this.nav = nav;
            this.control = control;
            this.index = index;
            this.num = num;
            this.speed = speed;
            this.margin = margin;
            this.slider = null;
            this.slider_box = null;
            this.slider_control = null;
            this.slider_nav = null;
            this.timer = null;
            this.imgIndex = 0;
            this.imgLength = null;
            this.next = null;
            this.prev = null;
            this.oSpan = null;
            this.imgWidth = null;
            this.sliderWidth = null;


        }
        init() {
            this.createHTML();
            this.root.append(this.slider);
            this.renderUI();
            this.addEven();
            this.sliderAutoPlay()
        }
        createHTML() {
            this.slider = $("<div></div>");
            this.slider_box = $("<div></div>");
            this.slider.addClass("slider");
            this.slider_box.addClass("slider_box");
            this.slider.append(this.slider_box);
            if (this.control == "true") {
                this.slider_control = $("<div></div>");
                this.slider_control.addClass("slider_control");
                this.slider.append(this.slider_control);
            }
            if (this.nav == "true") {
                this.slider_nav = $("<div></div>");
                this.slider_nav.addClass("slider_nav");
                this.slider.append(this.slider_nav);
            }
        }
        renderUI() {
            let self = this;
            let html = this.data.map((value) => {
                // console.log(value);     
                let item = value.map(value => {
                    return `
                  <li>
                      <div class="pic">
                          <a href=""> <img src="${value.src}" alt=""></a>
                      </div>
                      <div class="bottom">
                          <div class="des"><a href="">${value.des}</a></div>
                          <div class="price">¥${value.newPrice}</div>
                          <div class="sell">已售${value.sell}</div>
                      </div>
                  </li>          
             `
                }).join("");
                return `  <div class="content">
                <ul> ${item} </ul>
              
            </div>`

            }).join("");
            // console.log(html);

            this.slider_box.html(html);
            this.slider_box.append((this.slider_box).children(`.content:lt(${this.num})`).clone());

            this.imgLength = this.slider_box.children(".content").length - (this.num - 1);
            this.imgWidth = this.slider_box.children(".content").width();
            this.sliderWidth = this.slider.width();
            // console.log(this.imgLength, this.sliderWidth);

            this.slider_box.css("width", parseInt(this.sliderWidth) * this.imgLength);


            if (this.control == "true") {
                this.slider_control.html(
                    ` <a class="prev cus-text">&lt;</a><a class="next cus-text">&gt;</a>`);
                this.next = $(this.slider_control.children(".next"));
                this.prev = $(this.slider_control.children(".prev"));
            }
            //添加index小图标
            if (this.slider_nav) {
                for (let i = 0; i < this.imgLength - 1; i++) {
                    this.slider_nav.append('<span>' + `${this.index== "true"?`${i+1}`:""}` + '</span>');
                    console.log();
                }


                this.oSpan = this.slider_nav.children("span");
                this.oSpan.first().addClass("active");
                // 鼠标移入图片数字导航切换图片
                this.oSpan.mouseenter(function () {
                    this.imgIndex = $(this).index();
                    $(this).addClass("active").siblings("span").removeClass("active");
                    //计算图片移动的距离 span的索引 * 一个图片的宽度
                    let imgLeft = $(this).index() * parseInt(self.imgWidth);

                    //如果当鼠标放在小图标上面的时候，不想要图片跳转而只需要显示对应图片可以考虑css方法
                    self.slider_box.css({
                        "left": -imgLeft + "px"
                    });
                });
            }

        }
        addEven() {
            if (this.control == "true") {
                this.next.click(() => {
                    this.nextPic()
                });
                this.prev.click(() => {
                    this.prevPic()
                });
            }
            //鼠标移入、移除|停止、开始轮播
            this.slider.hover(() => {
                clearInterval(this.timer);
                if (this.control == "true") this.slider_control.css("display", "block");
            }, () => {
                this.sliderAutoPlay()
            });
        }
        nextPic() {
            //切换显示下一张图片的方法            
            this.imgIndex++;
            if (this.imgIndex >= this.imgLength) {
                //重置标签的位置和索引
                this.slider_box.css({
                    "left": "0"
                });
                this.imgIndex = 1;
            }
            //设置动画切换
            this.slider_box.stop().animate({
                "left": -(this.imgIndex * (this.imgWidth + this.margin)) + "px"
            });
            //数字导航根据图片切换自动选定
            let numIndex = this.imgIndex;
            //判断数字导航的位置
            if (numIndex == this.imgLength - 1) numIndex = 0;
            //设置选中状态
            if (this.slider_nav) {
                this.oSpan.eq(numIndex).addClass("active").siblings("span").removeClass("active");
            }

        }
        prevPic() {
            //切换显示上一张图片的方法    
            this.imgIndex--;
            if (this.imgIndex < 0) {

                this.slider_box.css({
                    "left": -((this.imgLength - 1) * (this.imgWidth + this.margin)) + "px"
                });
                this.imgIndex = this.imgLength - 2;
            }
            this.slider_box.stop().animate({
                "left": -(this.imgIndex * (this.imgWidth + this.margin)) + "px"
            });
            //数字导航根据图片切换自动选定
            if (this.slider_nav) {
                this.oSpan.eq(this.imgIndex).addClass("active").siblings("span").removeClass("active");
            }
        }
        //自动轮播
        sliderAutoPlay() {
            this.timer = setInterval(() => {
                this.nextPic()
            }, this.speed);
            if (this.control == "true") this.slider_control.css("display", "none");
        }
    }
    $.ajax({
        type: "get",
        url: "../php/indexListData.json",
        dataType: "json",
        success: function (data) {
            // console.log(data);
            renderUI(data, '0', $(".box1"))
        }
    });


    $.ajax({
        type: "get",
        url: "../php/NewList.json",
        dataType: "json",
        success: function (data) {
            // console.log(data);
            (new NewListManager(data, 'true', 'false', 'false', 1, 1800, 0, $(".box1 .newBanner"))).init();
        }
    });
    $.ajax({
        type: "get",
        url: "../php/indexListData.json",
        dataType: "json",
        success: function (data) {
            // console.log(data);
            renderUI(data, '0', $(".box2"))
        }
    });


    $.ajax({
        type: "get",
        url: "../php/NewList.json",
        dataType: "json",
        success: function (data) {
            // console.log(data);
            (new NewListManager(data, 'true', 'false', 'false', 1, 1800, 0, $(".box2 .newBanner"))).init();
        }
    });

    function renderUI(data, index, root) {
        let tempul = "";
        let html = data.map(value => {
            tempul = value.classify.map(value => {
                return ` <li><a href="" title="t恤">${value}</a></li>`
            }).join("");
            // console.log(tempul);

            let temp = value.leftsrc.map((value, i) => {
                return `<li ><a href=""><img src="${value}" alt=""></a>
                </li>`

            }).join("");
            // console.log(temp);
            return `  <div class="goods-list">
           <h2>${value.type}<a href="" class="more">更多好货</a></h2>
           <div class="goods-left">
               <ul>
                ${temp}
                   <li class="new">
                       <h3>新鲜抢批</h3>
                       <div class="newBanner"></div>               
                   </li>
               </ul>
           </div>
       </div>`
        }).join("");
        root.html(html);
        root.children(".goods-list").children(".goods-left").children("ul").children("li").eq(index).append(` <ul class="clearfix">${tempul} </ul>`);

    }
    //    ----------------------------
    //底部轮播
    $.ajax({
        type: "get",
        url: "../php/contBannerData.json",
        dataType: "json",
        success: function (data) {
            // console.log(data.src);
            (new BannerManager(data, 'true', 'false', 'true', 1, 1500, 0, $(".cont-banner"))).init();

        }
    });
    //底部新闻
    $.ajax({
        type: "get",
        url: "../php/icont-desData.json",
        dataType: "json",
        success: function (data) {
            let html = data.map(value => {
                return `   <li><a href="">${value}</a></li>`
            }).join("");
            $(".cont-des").html(html);
        }
    });


    $.ajax({
        type: "get",
        url: "../php/taleListData.json",
        dataType: "json",
        success: function (data) {
            let html = data.map(value => {
                // console.log(value);

                return `     <li>
                <div class="pic">
                    <img src="${value.src}" alt="">
                </div>
                <div class="big-news">
                    <p class="bar">
                        <a href="">${value.tit}</a>
                    </p>
                    <p>
                    ${value.des}
                        <a href="" class="look">查看全文</a>
                    </p>
                </div>
            </li>`
            }).join("");
            $(".tale-list").html(html);
        }
    });
    //footQQ动态效果
    // let status = true;
    // $(".qq").click(function () {
    //     $(this).animate({
    //         "right": -`${$(this).children("img").width()}`,
    //         "right": "0",
    //     }, 1000,function(){
    //         $(this).children("img").attr("src","../img/index/ia_100000276.png")
    //     })

    // })
})