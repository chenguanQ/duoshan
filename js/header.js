$(function () {
  // 如果获取到用户存储的资料 ，渲染ui为登陆状态
  let Susername = sessionStorage.getItem("username");
  let Lusername = localStorage.getItem("username");
  let sPusername = sessionStorage.getItem("phone");
  let LPusername = localStorage.getItem("phone");
  if (Susername) {
    let html = ` <span><a href="http://127.0.0.1/code/tempDepot1/duoshan/html/duoShan.html">多商网首页</a></span>
      <span style="color: #fff">" ${Susername} " 欢迎您回来！</span>
      <span><a href="http://127.0.0.1/code/tempDepot1/duoshan/html/login.html" class = "exit">退出</a></span>`;
    $(".h-left").html(html);
  } else if (Lusername) {
    let html = ` <span><a href="http://127.0.0.1/code/tempDepot1/duoshan/html/duoShan.html">多商网首页</a></span>
    <span style="color: #fff">" ${Lusername} " 欢迎您回来！</span>
    <span><a href="http://127.0.0.1/code/tempDepot1/duoshan/html/login.html" class = "exit">退出</a></span>`;
    $(".h-left").html(html);
  }

  //手机模块登录
  if (sPusername) {
    let html = ` <span><a href="http://127.0.0.1/code/tempDepot1/duoshan/html/duoShan.html">多商网首页</a></span>
    <span style="color: #fff">" ${sPusername} " 欢迎您回来！</span>
    <span><a href="http://127.0.0.1/code/tempDepot1/duoshan/html/login.html" class = "exit">退出</a></span>`;
    $(".h-left").html(html);
  } else if (LPusername) {
    let html = ` <span><a href="http://127.0.0.1/code/tempDepot1/duoshan/html/duoShan.html">多商网首页</a></span>
  <span style="color: #fff">" ${LPusername} " 欢迎您回来！</span>
  <span><a href="http://127.0.0.1/code/tempDepot1/duoshan/html/login.html" class = "exit">退出</a></span>`;
    $(".h-left").html(html);
  }
  //点击退出,清除用户资料
  $(".h-left").on("click", ".exit", function () {
    localStorage.removeItem("username");
    localStorage.removeItem("phone");
    sessionStorage.removeItem("username");
    sessionStorage.removeItem("phone");
  })

  //导入
 

})
// import {
//   text
// } from '../js/details.js';

// console.log(text);

