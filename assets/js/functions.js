$( document ).ready(function() {
    //     var Scrollbar = window.Scrollbar;
    // $('body').addClass('smooth');
    //     const options = {
    //         damping: 0.1,
    //         thumbMinSize: 20,
    //         renderByPixels: true,
    //         alwaysShowTracks: false,
    //         continuousScrolling: true,
    //         wheelEventTarget: null
    //     };
    //     Scrollbar.init(document.querySelector("html:not(.no-js) body.smooth #main-scrollbar"), options);

        $('[data-id=headers-4-sidebar-toggle]').click(function (e) {
            e.preventDefault();
            $('#headers-4-sidebar').toggleClass('show');
        });
        $('[data-id=headers-4-sidebar-close]').click(function (e) {
            e.preventDefault();
            $('#headers-4-sidebar').removeClass('show');
        });

        var transEffect = Barba.BaseTransition.extend({
            start: function(){
              this.newContainerLoading.then(val => this.fadeInNewcontent($(this.newContainer)));
            },
            fadeInNewcontent: function(nc) {
              nc.hide();
              var _this = this;
              $(this.oldContainer).fadeOut(300).promise().done(() => {
                nc.css('visibility','visible');
                nc.fadeIn(300, function(){
                  _this.done();
                })
              });
            }
        });
        Barba.Pjax.getTransition = function() {
          return transEffect;
        }
        Barba.Pjax.start();
                Barba.Prefetch.init();
                Barba.Dispatcher.on('transitionCompleted', function(currentStatus, oldStatus, container) {
                    var swiper = new Swiper('.swiper-container', {
                        autoplay: {
                            delay: 5000,
                        },
                        loop: true,
                        effect: 'crossfade',
                        spaceBetween: 0,
                        slidesOffsetAfter: 100,
                        centeredSlides: true,
                        slideToClickedSlide: true,
                        loopedSlides: 0,
                        pagination: {
                            el: '.swiper-pagination',
                            clickable: true,
                        },
                        slidesPerView: 3,
                        spaceBetween: 0,
                        breakpoints: {
                          320: {
                            slidesPerView: 1,
                          },
                          480: {
                            slidesPerView: 2,
                          },
                        }
                    });

                  });
                  Barba.Dispatcher.on('newPageReady', function(currentStatus, oldStatus, container, newPageRawHTML) {
                    // html head parser borrowed from jquery pjax
                    var $newPageHead = $( '<head />' ).html(
                        $.parseHTML(
                            newPageRawHTML.match(/<head[^>]*>([\s\S.]*)<\/head>/i)[0]
                          , document
                          , true
                        )
                    );
                    var headTags = [
                        "meta[name='keywords']"
                      , "meta[name='description']"
                      , "meta[property^='og']"
                      , "meta[name^='twitter']"
                      , "meta[itemprop]"
                      , "link[itemprop]"
                      , "link[rel='prev']"
                      , "link[rel='next']"
                      , "link[rel='canonical']"
                    ].join(',');
                    $( 'head' ).find( headTags ).remove(); // Remove current head tags
                    $newPageHead.find( headTags ).appendTo( 'head' ); // Append new tags to the head
                });

        Barba.Dispatcher.on('newPageReady', function (currentStatus) {
            const link = currentStatus.url.split(window.location.origin)[1].substring(1); // get path of current page
            const navigation             = document.querySelector('.navbar-nav');
            const navigationLinks        = navigation.querySelectorAll('.nav-link');
            const navigationLinkIsActive = navigation.querySelector(("a[href='" + link + "']"));
            Array.prototype.forEach.call(navigationLinks, (navigationLink) => navigationLink.classList.remove('active')); // remove CSS class 'is-active' from all .navigation__links
            // navigationLinkIsActive.classList.add('active');
        });

        document.documentElement.className = 'js';
        AOS.init({
            once: !0,
            duration: 400,
            disable: 'mobile',
            anchorPlacement: 'top'
        });

    var swiper = new Swiper('.swiper-container', {
        autoplay: {
            delay: 5000,
        },
        loop: true,
        effect: 'crossfade',
        spaceBetween: 0,
        slidesOffsetAfter: 100,
        centeredSlides: true,
        slideToClickedSlide: true,
        loopedSlides: 0,
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
        },
        slidesPerView: 3,
        spaceBetween: 0,
        breakpoints: {
          320: {
            slidesPerView: 1,
          },
          480: {
            slidesPerView: 2,
          },
        }
    });
    $(".navbar a").on('click',function(){
        history.pushState({scrollTop:document.body.scrollTop},document.title,document.location.pathname);
    });
});
