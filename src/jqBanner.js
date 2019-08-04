class BannerManager {
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
            return ` <div class = "wrapper"><img src="${value.src}" alt=""></div>`
        }).join("");
        this.slider_box.html(html);
        this.slider_box.append((this.slider_box).children(`.wrapper:lt(${this.num})`).clone());

        this.imgLength = this.slider_box.children(".wrapper").length - (this.num - 1);
        this.imgWidth = this.slider_box.children(".wrapper").width();
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