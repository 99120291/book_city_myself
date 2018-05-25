require(['jquery', 'render', 'renderHeader', "getReq", 'bscroll'], function($, render, renderHeader, getReq, bscroll) {
    var fiction_id = getReq().fiction_id;
    var pageNum = getReq().pageNum;
    $.ajax({
        url: "/api/charpset",
        dataType: "json",
        data: {
            fiction_id: fiction_id
        },
        success: function(res) {
            chapset(res)
        }
    });


    function chapset(res) {
        renderHeader({ title: "目录" });
        render(res.item.toc, $("#toc_item"), $('#Tag__2462'));
        var Chapset = new bscroll('.content');
        if (pageNum) {
            Chapset.scrollToElement($('.content ul li p').eq(pageNum - 1)[0]);
            $('.content ul li p').eq(pageNum - 1).addClass('active');
        } else {
            Chapset.scrollToElement($('.content li p:last')[0]);
            $('.content li p:last').addClass('active');
        }
    }
})