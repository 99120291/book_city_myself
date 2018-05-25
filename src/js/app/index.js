require(["jquery", "swiper", "bscroll", "render", "text!bookTb", "text!bookLr", "GetSlideDirection"], function($, swiper, bscroll, render, bookTb, bookLr, GetSlideDirection) {


    // 滑动
    var indexLeftScroll = new bscroll(".indexLeft", {
            probeType: 2,
            click: true
        })
        // 左右切换
    var indexSwiper = new swiper(".indexSwiper", {
        on: {
            slideChangeTransitionStart: function() {
                var index = this.activeIndex
                if (index == 1) {
                    $(".line").addClass("move")
                } else {
                    $(".line").removeClass("move")
                }
                $(".tab-item").eq(index).addClass("active").siblings().removeClass("active");
            },
        }
    });
    //滑动处理  
    var startX, startY;
    document.addEventListener('touchstart', function(ev) {
        startX = ev.touches[0].pageX;
        startY = ev.touches[0].pageY;
    }, false);
    document.addEventListener('touchend', function(ev) {
        var endX, endY;
        endX = ev.changedTouches[0].pageX;
        endY = ev.changedTouches[0].pageY;
        var direction = GetSlideDirection(startX, startY, endX, endY);
        switch (direction) {
            case 3:
                console.log("向左");
                console.log("!");
                indexSwiper.slideTo(1)
                break;
            case 4:
                console.log("向右");
                indexSwiper.slideTo(0)
                break;
            default:
        }
    }, false);
    // 下划线
    $(".tab-item").on("click", function() {
        var index = $(this).index();

        indexSwiper.slideTo(index)

        if (index == 1) {
            $(".line").addClass("move")
        } else {
            $(".line").removeClass("move")
        }
        $(this).addClass("active").siblings().removeClass("active");
    })

    var htmlFz = $("html").css("fontSize");

    var realSize = parseFloat(htmlFz) * 44 / 37.5;

    // 加载
    var _parent = $(".indexLeft>div");
    var pageNum = 1, //默认加载第一页
        total, //总页数
        count = 10; //每页数据的条数

    indexLeftScroll.on("scroll", function() {
        if (this.y < this.maxScrollY - realSize) {
            if (pageNum > total) {
                _parent.attr("up", "我是有底线的");
            } else {
                _parent.attr("up", "释放加载更多")
            }

        } else if (this.y < this.maxScrollY - realSize / 2) {
            if (pageNum > total) {
                _parent.attr("up", "我是有底线的");
            } else {
                _parent.attr("up", "上拉加载")
            }
        } else if (this.y > realSize) {
            _parent.attr("down", "释放刷新")
        } else if (this.y > realSize / 2 && this.y < realSize) {
            _parent.attr("down", "下拉刷新")
        }
    })

    indexLeftScroll.on("scrollEnd", function() {
        if (pageNum > total) {
            _parent.attr("up", "我是有底线的");
        } else {
            _parent.attr("up", "上拉加载");
        }

        _parent.attr("down", "下拉刷新");
    })

    indexLeftScroll.on("touchEnd", function() {
        if (_parent.attr("up") === "释放加载更多") {
            console.log("上拉加载");
            if (pageNum > total) {
                return false
            } else {
                loadMore();
                pageNum++;
            }
        }
        if (_parent.attr("down") === "释放刷新") {
            console.log("下拉刷新")
            window.location.reload();
        }
    })

    // 开始加载数据
    function loadMore() {
        $.ajax({
            url: "/api/recommend",
            data: {
                pageNum: pageNum,
                count: count
            },
            dataType: "json",
            success: function(res) {
                total = res.total / count;
                render(res.items, $("#l-r-tpl"), $("#index_load"));
                indexLeftScroll.refresh()
            },
            error: function(error) {
                console.warn(error)
            }
        });
    }

    // 初始化页面
    function bannerSwiper() {
        $("body").append(bookTb);
        $("body").append(bookLr);
        // 请求数据
        $.ajax({
            url: "/api/index",
            dataType: "json",
            success: function(res) {
                // 轮播图数据
                var bannerData = res.items[0].data;
                render(bannerData, $("#slide-tpl"), $(".banner"));
                // 本周最火数据
                var hotData = res.items[1].data;
                render(hotData, $("#t-b-tpl"), $("#hot"));
                // 重磅推荐
                var recommendData = res.items[2].data.data;
                recommendData[0].isShowNum = true;
                var firstData = [recommendData[0]];
                render(firstData, $("#l-r-tpl"), $("#first-item"));
                render(recommendData.slice(1), $("#commened-list-tpl"), $("#not-first"));
                var bannerSwiper = new swiper(".banner-swiper", {
                    autoplay: {
                        delay: 1000
                    },
                    loop: true
                })
            }
        });
    }

    bannerSwiper()

    $(".swiper-shelf").on("click", function() {
        $(".shelf-list li").toggleClass("shelf-item");
        $(this).toggleClass('bg');
    })

})