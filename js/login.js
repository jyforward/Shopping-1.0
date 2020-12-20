let that;
class Forms {
    constructor() {
        this.init();
        this.rul();
        that = this;
    }
    // 初始化
    init() {
        $(".forms_ul li").on("click", function () {
            that.tab(this)
        })
    }
    // tab切换效果
    tab(ele) {
        $(".forms_ul li").css("background", "#5AA5F0");
        $(ele).css("background", "#ffffff")
        let num = $(ele).index();
        let sect = $(".fors section").css("display", "none").eq(num).css("display", "block")
        console.log(sect);
    }
    // 表单验证
    rul() {
        $("#login").validate({
            rules: {
                username: {
                    required: true,
                    maxlength: 12,
                    minlength: 2
                },
                paw: {
                    required: true,
                    minlength: 4,
                    maxlength: 18
                }
            },
            messages: {
                username: {
                    required: '用户名是必须填写的',
                    maxlength: '用户名不能大于12字符',
                    minlength: '用户名必须大于3个字符'
                },
                paw: {
                    required: '密码不能为空',
                    maxlength: '用户名不能大于18字符',
                    minlength: '用户名必须大于4个字符'
                }
            },
            submitHandler: function () {
                $.ajax({
                    type: "get",
                    url: "http://shop/api/login.php",
                    data: {
                        username: function () {
                            return $("#username").val();
                        },
                        paws: function () {
                            return $("#paw").val();
                        }
                    },
                    dataType: "json",
                    success: function (response) {
                        console.log(response);
                        setCookie("login",response.detali.usename,86400);
                        location.href = 'http://shop/html/';
                    },
                    error:function(){
                        alert("用户名或密码错误，请重新登录");
                    }
                });
                // console.log(1);
            },
            // remote: {
            //     url: "http://shop/api/login.php",  //后台处理程序
            //     type: "get",               //数据发送方式
            //     dataType: "json",           //接受数据格式   
            //     data: {                     //要传递的数据
            //         username: function() {
            //             return $("#username").val();
            //         },
            //         paws:function(){
            //             return $("#paw").val();
            //         }
            //     }
            // }
        })
    }
    // 按钮执行事件
    login() { }

}
// $.ajax({
//     type: "get",
//     url: "http://shop/api/login.php",
//     data: {
//         username: function () {
//             return $("#username").val();
//         },
//         paws: function () {
//             return $("#paw").val();
//         }
//     },
//     dataType: "json",
//     success: function (response) {
//         console.log(response);
//         console.log(1);
//     },
//     error:function(){
//         console.log(2);
//     }
// });
new Forms();