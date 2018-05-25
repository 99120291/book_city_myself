require(['jquery', 'render', 'renderHeader', 'getReq', 'storage'],
    function($, render, renderHeader, getReq, storage) {
        var fiction_id = getReq().fiction_id;
        console.log(fiction_id)
        $.ajax({
            url: "/api/detail",
            dataType: "json",
            data: {
                fiction_id: fiction_id
            },
            success: function(res) {
                console.log(res)
                renderDetail(res)
            }
        });

        function renderDetail(res) {
            console.log(res)
            renderHeader({ title: res.item.title });
            render(res.item, $('#detail-fir'), $('.-detail'))
            render(res.item, $('#detail-sec'), $('#detail-center'))
            render(res.item.tags, $('#detail-third'), $('#detail-cen'))
            render(res.author_books[0], $('#detail-last'), $('#detail-fource'));
            // 跳转阅读
            $(".detail-btn").on('click', function() {
                isLogin();
            })
        }

        function isLogin() {
            var username = storage.get('username') || '';
            if (!username) {
                location.href = '../tpl/login.html';
            } else {
                $.ajax({
                    url: "/isLogin",
                    dataType: "json",
                    type: "post",
                    data: {
                        username: username
                    },
                    success: function(res) {
                        console.log(res)
                        if (res.code == 1 && res.result) {
                            window.location.href = "../tpl/artical.html?fiction_id=" + fiction_id
                        } else if ((res.code === 1 && !res.result) || res.code === 2) {
                            location.href = '../tpl/login.html';
                        }
                    },
                    error: function(error) {
                        console.warn(1)
                    }
                });
            }
        }
    })