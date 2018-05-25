require(['jquery', 'storage'], function($, storage) {
    $('#login_btn').on('click', function() {
        var username = $('.username').val();
        var pwd = $('.pwd').val();
        var tip;
        if (!$.trim(username)) {
            tip = "账号不能为空"
        } else if (!$.trim(pwd)) {
            tip = "密码不能为空"
        }
        if (tip) {
            $('.tip').html(tip)
        } else {
            sub();
        }

        function sub() {
            $.ajax({
                url: "/login",
                dataType: "json",
                type: 'post',
                data: {
                    username: username,
                    pwd: pwd
                },
                success: function(res) {
                    console.log(res)
                    storage.set("username", username);
                    history.go(-1)
                },
                error: function(error) {
                    console.warn(error)
                }
            });
        }
    })
})