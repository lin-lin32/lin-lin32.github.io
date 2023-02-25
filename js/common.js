let $document = $(document);
(function () {
    "use strict";
    let isMobile = false,
        browserYou,
        _winWidth = $(window).outerWidth();
    let genFunc = {
        initialized: false,
        initialize: function () {
            if (this.initialized) return;
            this.initialized = true;
            this.build();
        },
        build: function () {
            // browser
            browserYou = this.getBrowser();
            if (browserYou.platform == 'mobile') {
                isMobile = true;
                document.documentElement.classList.add('mobile');
            } else {
                document.documentElement.classList.add('desktop');
            }
            if ((browserYou.browser == 'ie')) {
                document.documentElement.classList.add('ie');
            }
            if (navigator.userAgent.indexOf("Edge") > -1) {
                document.documentElement.classList.add('edge');
            }
            if (navigator.userAgent.search(/Macintosh/) > -1) {
                document.documentElement.classList.add('macintosh');
            }
            if ((browserYou.browser == 'ie' && browserYou.versionShort < 9) || ((browserYou.browser == 'opera' || browserYou.browser == 'operaWebkit') && browserYou.versionShort < 18) || (browserYou.browser == 'firefox' && browserYou.versionShort < 30)) {
                alert('Обновите браузер');
            }
            $(document).on('mouseover', '.js_navbar', function () {
                $(this).find('.js_dropdown').removeClass('visible');
                $(this).find('.js_dropdown').addClass('visible');
            });
            $(document).on('mouseout', '.js_navbar', function () {
                $(this).find('.js_dropdown').removeClass('visible');
            });
            if (_winWidth > 1080) {
                $( ".js_button-anim" ).mouseenter(function(e) {
                    let parentOffset = $(this).offset(); 
                
                    let relX = e.pageX - parentOffset.left;
                    let relY = e.pageY - parentOffset.top;
                    $(this).prev(".btn__circle").css({"left": relX, "top": relY });
                    $(this).prev(".btn__circle").removeClass("desplode-circle");
                    $(this).prev(".btn__circle").addClass("explode-circle");
                });
                $( ".js_button-anim" ).mouseleave(function(e) {
                    let parentOffset = $(this).offset(); 
                    let relX = e.pageX - parentOffset.left;
                    let relY = e.pageY - parentOffset.top;
                    $(this).prev(".btn__circle").css({"left": relX, "top": relY });
                    $(this).prev(".btn__circle").removeClass("explode-circle");
                    $(this).prev(".btn__circle").addClass("desplode-circle");
                });
            }
            $(document).on('click', '.js_open-main-menu', function (e) {
                e.preventDefault();
                $('.main-navigation-menu').toggleClass('is-active');
                $('html').toggleClass('main-navigation-menu-is-open');
            });
            $('.js_close-menu, .page-overlay').on('click', function () {
                $('.main-navigation-menu').removeClass('is-active');
                $('html').removeClass('main-navigation-menu-is-open');
            });
        },
        getBrowser: function () {
            let ua = navigator.userAgent;
            let bName = function () {
                if (ua.search(/Edge/) > -1) return "edge";
                if (ua.search(/MSIE/) > -1) return "ie";
                if (ua.search(/Trident/) > -1) return "ie11";
                if (ua.search(/Firefox/) > -1) return "firefox";
                if (ua.search(/Opera/) > -1) return "opera";
                if (ua.search(/OPR/) > -1) return "operaWebkit";
                if (ua.search(/YaBrowser/) > -1) return "yabrowser";
                if (ua.search(/Chrome/) > -1) return "chrome";
                if (ua.search(/Safari/) > -1) return "safari";
                if (ua.search(/maxHhon/) > -1) return "maxHhon";
            }();
            let version;
            switch (bName) {
                case "edge":
                    version = (ua.split("Edge")[1]).split("/")[1];
                    break;
                case "ie":
                    version = (ua.split("MSIE ")[1]).split(";")[0];
                    break;
                case "ie11":
                    bName = "ie";
                    version = (ua.split("; rv:")[1]).split(")")[0];
                    break;
                case "firefox":
                    version = ua.split("Firefox/")[1];
                    break;
                case "opera":
                    version = ua.split("Version/")[1];
                    break;
                case "operaWebkit":
                    bName = "opera";
                    version = ua.split("OPR/")[1];
                    break;
                case "yabrowser":
                    version = (ua.split("YaBrowser/")[1]).split(" ")[0];
                    break;
                case "chrome":
                    version = (ua.split("Chrome/")[1]).split(" ")[0];
                    break;
                case "safari":
                    version = ua.split("Safari/")[1].split("")[0];
                    console.log('stafari')
                    break;
                case "maxHhon":
                    version = ua.split("maxHhon/")[1];
                    break;
            }
            let platform = 'desktop';
            let browsrObj;
            if (/iphone|ipad|ipod|android|blackberry|mini|windows\sce|palm/i.test(navigator.userAgent.toLowerCase())) platform = 'mobile';
            if ( /^((?!chrome|android).)*safari/i.test(navigator.userAgent)) {$('html').addClass('safari')}
            try {
                browsrObj = {
                    platform: platform,
                    browser: bName,
                    versionFull: version,
                    versionShort: version.split(".")[0]
                };
            } catch (err) {
                browsrObj = {
                    platform: platform,
                    browser: 'unknown',
                    versionFull: 'unknown',
                    versionShort: 'unknown'
                };
            }
            return browsrObj;
        },
    };
    genFunc.initialize();

    /*Function for go to top*/
    $(window).on('scroll', function () {
        let top = $(document).scrollTop();
        if (top < 100) {
            $(".go-to-top").removeClass('act');
        } else {
            $(".go-to-top").addClass('act');
        }
    });
    $('.go-to-top').on('click', function () {
        $("html, body").animate({
            scrollTop: 0
        }, 600);
        return false;
    });
    /*Function for go to top end*/

    $('.js_modal-btn').on('click', function() {
        if($('input[type="tel"]').length) {
            intlTel();
            setTimeout(function() {
                $('input[type="tel"]').each(function(t, i) {
                    let n = $(i).attr("placeholder").replace(/[0-9]/g, "9");
                    $(i).mask(n)
                });
            }, 300);
        }
    });
    function intlTel() {
        let t = document.querySelectorAll('input[type="tel"]');
        $(t).each(function(t, i) {
            let n;
            n = window.intlTelInput(i, {
                separateDialCode: !0,
                initialCountry: "ua",
                onlyCountries: ["ua"],
                utilsScript: "https://cdnjs.cloudflare.com/ajax/libs/intl-tel-input/11.0.14/js/utils.js"
            }),
            i.addEventListener("countrychange", function() {
                setTimeout(function() {
                    let t = $(i)
                      , n = t.attr("placeholder").replace(/[0-9]/g, "9");
                    t.mask(n)
                }, 500);
            })
        })
    }

    $('input[type="tel"]').on('keypress', function (e) {
        e = e || event;
        if (e.ctrlKey || e.altKey || e.metaKey) return;
        let chr = getChar(e);
        if (chr == null) return;
        if (chr < '0' || chr > '9') {
            return false;
        }
    });
    function getChar(event) {
        if (event.which == null) {
            if (event.keyCode < 32) return null;
            return String.fromCharCode(event.keyCode)
        }
        if (event.which != 0 && event.charCode != 0) {
            if (event.which < 32) return null;
            return String.fromCharCode(event.which)
        }
        return null;
    };

    let mySwiperFeat;
    mySwiperFeat = new Swiper('.features__slider .swiper', {
        loop: false,
        speed: 500,
        autoplay: false,
        spaceBetween: 0,
        slidesPerView: 1,
        effect: 'fade',
        fadeEffect: {
          crossFade: true
        },
        navigation: {
            nextEl: '.features__slider .swiper-next',
            prevEl: '.features__slider .swiper-prev',
        },
        on : {
            slideChange: function (mySwiperFeat) {
                let SlideInd = mySwiperFeat.activeIndex;
                $('.js_features-item').removeClass('active-features');
                $('.js_features-item').each(function (i, e) {
                    let eIn = $(e).index();
                    if (eIn == SlideInd) {
                        $(this).addClass('active-features');
                    }
                });
            }
        },
        breakpoints: {
            320: {
                pagination: {
                    el: '.features__slider .swiper-pagination',
                    type: 'bullets',
                    clickable: true
                },
            },
            769: {
                pagination: false,
            }
        }

    });

    $document.on('click', '.js_features-item', function () {
        let $this = $(this);
        $('.js_features-item').removeClass('active-features');
        let $thisI = $this.index();
        mySwiperFeat.slideTo($thisI);
    });

    $document.on('click', '.js_faq-btn', function() {
        let thisWrap = $(this).closest(".faq-item");
        thisWrap.hasClass("faq-item--open") ? (thisWrap.removeClass("faq-item--open"),
        thisWrap.find(".js_faq-collapse").slideUp()) : ($(".faq-item").find(".js_faq-collapse").slideUp(),
        $(".faq-item").removeClass("faq-item--open"),
        thisWrap.addClass("faq-item--open"),
        thisWrap.find(".js_faq-collapse").slideDown());
    });
    
    let mySwiperTop= new Swiper('.top__slider .swiper', {
        loop: true,
        speed: 2000,
        autoplay: true,
        spaceBetween: 0,
        slidesPerView: 1,
        updateTranslate: true,
        watchOverflow: true,
        navigation: false,
        pagination: {
            el: '.top__slider .swiper-pagination',
            type: 'bullets',
            clickable: true
        }
    });

    if (_winWidth > 768) {
        let mySwiperTeam = new Swiper('.team__slider .swiper', {
            loop: false,
            speed: 1000,
            autoplay: false,
            paginationClickable: true,
            spaceBetween: 30,
            slidesPerView: 3,
            updateTranslate: true,
            watchOverflow: true,
            navigation: {
                nextEl: '.team .swiper-next',
                prevEl: '.team .swiper-prev'
            },
            breakpoints: {
                320: {
                    pagination: {
                        el: '.team__slider .swiper-pagination',
                        type: 'bullets',
                        clickable: true
                    },
                },
                769: {
                    pagination: false
                }
            }
        });
    }
    let $page = $('html, body');
    $('a[href*="#"]').on("click", function() {
        $page.animate({
            scrollTop: $($.attr(this, 'href')).offset().top - $(".header").innerHeight()
        }, 400);
        return false;
    });
})();

/*Function in-view */
let $window = $(window);
let $animation_elements = $(".js-animate");

$window.on("resize scroll", check_if_in_view), $window.trigger("scroll"); 

function check_if_in_view() {
    let e = $window.height(),
    t = $window.scrollTop(),
    n = t + e;
$.each($animation_elements, function() {
    let e = $(this),
        i = e.outerHeight(),
        o = e.offset().top;
    o + i >= t && o <= n && setTimeout(function() {
        e.addClass("in-view")
    }, 50)
})
}
/*Function in-view end*/

/*Function validate*/
$(document).on("click", ".js_validate button[type=submit], .js_validate input[type=submit]", function () {
    let valid = validate($(this).parents(".js_validate"));
    if (valid == false) {
        return false;
    }
});
function validate(form) {
    let error_class = "error";
    let norma_class = "pass";
    let item = form.find("[required]");
    let e = 0;
    let reg = undefined;
    let email = false;
    let phone = false;
    function mark(object, expression) {
        if (expression) {
            object.parents('.input-field').addClass(error_class).removeClass(norma_class);
            if (email && (object.val().length > 0)) {
                console.log('scsac')
                object.parents('.input-field').attr('data-error', 'Некорректный email');
            }
            if (phone && (object.val().length > 0)) {
                object.parents('.input-field').attr('data-error', 'Некорректный формат телефона');
            }
            e++;
        } else
            object.parents('.input-field').addClass(norma_class).removeClass(error_class);
    }
    form.find("[required]").each(function () {
        switch ($(this).attr("data-validate")) {
            case undefined:
                mark($(this), $.trim($(this).val()).length == 0);
                break;
            case "email":
                reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
                mark($(this), !reg.test($.trim($(this).val())));
                break;
            case "phone":
                reg = /[0-9 -()+]{10}$/;
                mark($(this), !reg.test($.trim($(this).val())));
                break;
            default:
                reg = new RegExp($(this).attr("data-validate"), "g");
                mark($(this), !reg.test($.trim($(this).val())));
                break;
        }
    });
    e += form.find("." + error_class).length;
    if (e == 0)
        return true;
        let n = form.serialize();
    if (form.hasClass("callback")) {
        let d = form.find('input[type="tel"]').val()
            , o = form.find(".iti__selected-dial-code").text();
        n = form.serialize() + "&" + t.param({
            full_phone: o + d
        })
    }
    else {
        $('.js_alert_error').show();
        setTimeout(function () {
            $('.js_alert_error').hide();
        }, 4000);
        form.find('.error input:first').focus();
        return false;
    }
}
/*Function validate end*/