require(['jquery', 'renderHeader', 'storage', 'render', 'lazy'], function($, renderHeader, storage, render, lazy) {
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
    });
    // 请求热门数据
    var arr = [];
    $.ajax({
        url: "/api/bookhot",
        dataType: "json",
        success: function(res) {
            res.ads.forEach(function(item) {
                arr.push(item.ad_name)
            })
            var concatArr = searchHistory.concat(arr);
            var targerArr = unique3(concatArr)
            render(targerArr, $('#tag-tpl'), $('#type-tags'))
        },
        error: function(error) {
            console.warn(error)
        }
    });

    function unique3(target) {
        var res = [];
        var json = {};
        for (var i = 0; i < target.length; i++) {
            if (!json[target[i]]) {
                res.push(target[i]);
                json[target[i]] = 1;
            }

            // !json['诛仙']
            // res.push('诛仙')
            // json['诛仙'] = 1

            // json = { '诛仙':1}
        }
        return res;
    }

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
                    render(res.items, $("#search-b-tpl"), $(".search-tags"));
                    $("img[data-original]").lazyload({
                        effect: "fadeIn",
                        threshold: 200,
                        container: $(".search-list")
                    });
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
            var concatArr = searchHistory.concat(arr);
            var targerArr = unique3(concatArr)
            render(targerArr, $("#tag-tpl"), $("#type-tags"), true)
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