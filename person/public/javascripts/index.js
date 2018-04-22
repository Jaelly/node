$(function () {
    let message = JSON.parse(window.localStorage.message);
    console.log(message);
    $("legend").html(message.account+' 欢迎你');
})