require(['jquery', 'renderHeader', 'storage', 'render'], function($, renderHeader, storage, render) {
    renderHeader({ isSearch: true });
    var searchHistory = storage.get("history") || [];

    render(searchHistory, $("#tag-tpl"), $(".type-tags"), true)
    $('.search').on("click", function() {
        var val = $(".ipt").val();
        $(".type-tags").hide();
        $(".search-tags").show();
        if (!val) {
            $(".search-tags").html("<p>输入内容为空</p>")
        } else {
            search(val);
            var searchHistory = storage.get("history") || [];
            if (searchHistory && searchHistory.indexOf(val) != -1) {

            } else {
                searchHistory.push(val);
                storage.set("history", searchHistory);
            }
        }
    })

    function search(val) {
        $.ajax({
            url: "/api/search",
            dataType: "json",
            data: {
                key: val
            },
            success: function(res) {
                if (!res) {
                    $(".search-tags").html('<p>暂无内容</p>')
                } else {
                    $('.search-tags').html(' ');
                    render(res.items, $("#search-b-tpl"), $(".search-tags"))
                }
            },
            error: function(error) {
                console.log(error)
            }
        });
    }
    // input事件
    $('.ipt').on("input", function() {
        var val = $(this).val();
        if (!val) {
            $(".type-tags").show();
            $(".search-tags").hide();
            $(".search-tags").html(" ");
            var searchHistory = storage.get("history");
            console.log(searchHistory)
            render(searchHistory, $("#tag-tpl"), $("#type-tags"), true)
        }
    });
    // 点击tags
    $('.type-tags').on("click", 'li', function() {
        var key = $(this).text();
        search(key);
        $('.ipt').val(key);
        $(".type-tags").hide();
        $(".search-tags").show();
    })
})