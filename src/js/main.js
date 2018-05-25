require.config({
    baseUrl: "/js/",
    paths: {
        // 库文件
        "jquery": "./libs/jquery-2.1.1.min",
        "swiper": "./libs/swiper",
        "bscroll": "./libs/bscroll",
        "handlebars": "./libs/handlebars-v4.0.11",
        "text": "./libs/text",
        "base64": './libs/jquery.base64',
        'jsonp': './libs/jquery.jsonp',
        // common
        "render": "./common/render",
        "GetSlideDirection": "./common/slider-common",
        "renderHeader": "./common/header",
        "storage": "./common/storage",
        "getReq": "./common/getRequest",
        // app
        "index": "./app/index",
        "search": './app/search',
        "bookDetail": "./app/book-detail",
        'book_hot': './app/book-hot',
        'Charpset': './app/charpset',
        'Article': './app/article',
        // 模板
        "bookTb": "./page/tpl/book-t-b-list.html",
        "bookLr": "./page/tpl/book-l-r-list.html",
        "header": './page/tpl/header.html',
        "searchB": "./page/tpl/search_b_list.html"
    },
    shim: {
        "base64": {
            deps: ['jquery']
        }
    }
})