define(['jquery', 'render', 'text!header', "text!searchB"], function($, render, header, searchB) {
    function renderHeader(data) {
        console.log(data)
        $("body").append(searchB);
        $("body").append(header);
        render(data, $("#header-tpl"), $(".render-header"));
        $('.icon-back').on('click', function() {
            history.go(-1);
        })
    }
    return renderHeader
});