require(['jquery', 'render', 'renderHeader'], function($, render, renderHeader) {
    $.ajax({
        url: "/api/index",
        dataType: "json",
        success: function(res) {
            console.log(res.items[1].data.data)
            bookHot(res);
        }
    });

    function bookHot(res) {
        renderHeader({ title: res.items[1].ad_name });
        render(res.items[1].data.data, $('#l-r-tpl'), $('.book-l-r-list'))
    }
})