require(['jquery', 'render', 'bscroll', 'getReq', 'storage', 'base64', 'jsonp'], function($, render, bscroll, getReq, storage, base64, jsonp) {

    var fiction_id = getReq().fiction_id;

    var _wrap = $('.wrap'),
        pageNum = storage.get('pageNum') || 1;
    var islight = true,
        isnight = "#0f1410";

    $('.page_start').html(pageNum);

    var chooseBg = storage.get('bg') || '#f7eee5';
    if (storage.get('tag') != '夜间' && storage.get('tag')) {
        islight = false;
        _wrap.css('background', isnight);
    }

    if (islight) {
        _wrap.css('background', chooseBg);
    }
    getArtical()

    // 请求章节数
    $.ajax({
        url: "/api/charpset",
        dataType: "json",
        data: {
            fiction_id: fiction_id
        },
        success: function(res) {
            $('.page_end').html(res.item.toc.length)
        }
    });

    // 点击上一章
    $("#prev-btn").on('click', function() {
        if (pageNum > 1) {
            pageNum -= 1;
            $('.page_start').html(pageNum)
            getArtical();
            storage.set('pageNum', pageNum)

        } else {
            $('.mark').removeClass('dis');
            $('.mark').on('click', function() {
                $('.mark').addClass('dis');
            })
        }
    });
    // 点击下一章
    $("#next-btn").on('click', function() {
        if (pageNum < 3) {
            pageNum += 1;
            $('.page_start').html(pageNum)
            getArtical()
            storage.set('pageNum', pageNum)
        } else {
            $('.mark1').removeClass('dis');
            $('.mark1').on('click', function() {
                $('.mark1').addClass('dis');
            })
        }
    });
    // 点击目录
    $('.icon-swicth-list').on('click', function() {
        storage.get('pageNum', pageNum)
        window.location.href = "../tpl/charpset.html?fiction_id=" + fiction_id + "&pageNum=" + pageNum
    });

    // 请求当前章节内容
    function getArtical() {
        $.ajax({
            url: "/api/artical",
            dataType: "json",
            data: {
                fiction_id: fiction_id,
                pageNum: pageNum
            },
            success: function(res) {
                jsonp({
                    url: res.url,
                    callback: "duokan_fiction_chapter",
                    cache: true,
                    success: function(data) {
                        console.log(JSON.parse($.base64.atob(data, true)))
                        render(JSON.parse($.base64.atob(data, true)), $('#artical_content'), $('.content'), true)
                    }
                })
            }
        });
    }

    // 点击显示头和底部
    $('.center_artical').on('click', function() {
        $(".top_artical").toggleClass('dis');
        $(".bottom_artical").toggleClass('dis');
        $(".icon-font-btn").addClass('dis');
        if ($(".bottom_artical").hasClass('dis') && $(".top_artical").hasClass('dis')) {
            $(this).css('overflow', 'scroll')
        } else {
            $(this).css('overflow', 'hidden')
        }
    });
    // 点击返回
    $('.icon-back').on('click', function() {
        history.go(-1);
    });

    // 点击字体切换
    $(".icon-font").on('click', function() {
        $('.icon-font-btn').toggleClass('dis');
        $(this).toggleClass('active');
    });
    $(".icon-font-color").on('click', function() {
        $(".icon-font").toggleClass('dis');
        $('.icon-font-color').toggleClass('dis');
        // 点击 字号 背景显示 隐藏
        $(".icon-font-btn").toggleClass('dis');
    });

    // 点击白天夜间切换
    $(".icon-light").on('click', function() {
        $(this).toggleClass('activelight')
        if (islight) {
            $(this).find('dd').text('白天');
            _wrap.css('background', isnight)
        } else {
            $(this).find('dd').text('夜间');

            _wrap.css('background', chooseBg)
        }
        islight = !islight;
        var tag = islight ? '夜间' : '白天';
        storage.set('tag', tag)
    });

    // 点击切换字体大小
    var initSize = storage.get('fz') || 17,
        maxSize = 24,
        minSize = 14;
    $('.center_artical p').css("font-size", initSize / 37.5 + 'rem')
        // 大按钮
    $('.big-btn').on('click', function() {
        if (initSize < maxSize) {
            initSize += 2;
            storage.set('fz', initSize);
        }
        $('.center_artical p').css("font-size", initSize / 37.5 + 'rem')
    });
    // 小按钮
    $('.small-btn').on('click', function() {
        if (initSize > minSize) {
            initSize -= 2;
            storage.set('fz', initSize);
        }
        $('.center_artical p').css("font-size", initSize / 37.5 + 'rem')
    });

    // var center_artical = new bscroll('.center_artical', {
    //     scrollY: true,
    //     click: true,
    //     probeType: 2
    // })
    // 点击切换背景 (只有晚上才可以切换背景色)
    $('.color-btns').on('click', 'li', function() {
        chooseBg = $(this).attr('bg-color');
        $(this).addClass('active-border').siblings().removeClass('active-border');
        _wrap.css('background', chooseBg)
    })
    $('.color-btns').on('click', 'li', function() {
        $(this).addClass('active-border').siblings().removeClass('active-border');
        chooseBg = $(this).attr('bg-color');
        storage.set('bg', chooseBg);
        _wrap.css('background', chooseBg)
        if (!islight) {
            _wrap.css('background', isnight)
        }
    })

})