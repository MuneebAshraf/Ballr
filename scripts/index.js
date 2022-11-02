$(document).ready( () => {
    let screenSizeMD = window.matchMedia( "screen and (max-width:750px)" ).matches;
    let controller = new ScrollMagic.Controller();

    if ($('#index').length > 0) {
        // let video_1 = document.querySelector( '#product-vid-1' )
        // let video_progress = 0;
        // let accelamount = 0.6;
        // let delay = 0.1;
        //
        // setInterval( () => {
        //     delay += (video_progress - delay) * accelamount;
        //     console.log( video_progress, delay );
        //
        //     video_1.currentTime = delay;
        // }, 41.666 );
        //
        // document.addEventListener('scroll', (e) => {
        //     let pos = document.documentElement.scrollTop;
        //     let calcHeight =
        //         document.documentElement.scrollHeight -
        //         document.documentElement.clientHeight;
        //
        //     let scrollValue = ((pos * 100) / (calcHeight * 0.45))
        //     let duration = video_1.duration;
        //     video_progress = (scrollValue * ( duration / 100))
        //
        //     if (( scrollValue * (duration / 100) ) > 8.3 ) {
        //         $(video_1).addClass('zoomInExit')
        //     } else {
        //         $( video_1 ).removeClass('zoomInExit')
        //     }
        // })

        //Der blevet brugt scroll magic hver gang "new ScrollMagic.Scene" er i spil.//

        new ScrollMagic.Scene({
            duration: "100%",
            triggerHook: "onCenter",
            triggerElement: $('.hero-section'),
            reverse: false,
            offset: $('.nav').height()
        })
            //.setClassToggle( $( video_1 ), 'animate__animated animate__slideInUp' )

            .addTo(controller)
        // slide slogns ind
        new ScrollMagic.Scene({
            duration: "100%",
            triggerElement: $('#slogan-1'),
            triggerHook: 0.45,
        })
            .setClassToggle($('.section-2'), 'active')
            .addTo(controller);

        // slide the sliding-logo on scroll
        let slidingTimeline = new TimelineMax();
        slidingTimeline.fromTo($('.sliding-logo'), 1, {x: `-100%`}, {x: 0})
        new ScrollMagic.Scene({
            duration: "70%",
            triggerElement: $('.sliding-logo'),
            triggerHook: "onEnter",
        })
            .setTween(slidingTimeline)
            .addTo(controller);
        //pin the sliding logo to screen
        new ScrollMagic.Scene({
            duration: "100%",
            triggerElement: $('.sliding-logo'),
            triggerHook: 0.4,
        })
            .setPin($('.sliding-logo'))
            .addTo(controller);

        //make sliding-logo fade out change color of the body
        let fadeoverTimeline = new TimelineMax();
        fadeoverTimeline.to($('.sliding-logo'), {opacity:0})
        fadeoverTimeline.to($('body'), {backgroundColor: "#C8B090"}, '<')
        fadeoverTimeline.to($('body'), {backgroundColor: "#F6F4EF"})
        new ScrollMagic.Scene({
            duration: "100%",
            triggerElement: $('.fadeover'),
            triggerHook: "onEnter",
        })
            .setTween(fadeoverTimeline)
            .addTo(controller);

        //make sliding-logo grow
        let section3Timeline = new TimelineMax()
        section3Timeline.to( $( '.sliding-logo' ), {scale: 11.8} )
        new ScrollMagic.Scene( {
            duration: "100%",
            triggerElement: $( '.sliding-logo' ),
            triggerHook: 0.4,
        } )
            .setTween( section3Timeline )
            .addTo( controller );


        // fade the circles in and then fade text with lines
        let timelineForSection4 = new TimelineMax();
        timelineForSection4.fromTo($('.product-container.ring'), {scale: 0.8, opacity: 0}, {scale: 1, opacity: 1}, ".2")
        timelineForSection4.fromTo($('.inner.ring'), {scale: 0.8, opacity: 0}, {scale: 1, opacity: 1}, ".4")
        timelineForSection4.fromTo($('.circle'), {scale: 0.8, opacity: 0}, {scale: 1, opacity: 1},".6")
        timelineForSection4.fromTo($('.product-name'), {opacity: 0, x: -300}, {opacity: 1, x: 0})
        timelineForSection4.fromTo($('#lines'), {opacity: 0, width: 0}, {opacity: 1, width: "33%"}, "<")
    if ( !screenSizeMD ) {
        new ScrollMagic.Scene({
            duration: "80%",
            triggerElement: $('.section-4'),
            triggerHook: .175
        })
            .setPin($('.section-4'))
            .setTween(timelineForSection4)
            .addTo(controller);
    } else {
        new ScrollMagic.Scene( {
            duration: "80%",
            triggerElement: $( '.section-4' ),
            triggerHook: .3
        } )
            .setPin( $( '.section-4' ) )
            .setTween( timelineForSection4 )
            .addTo( controller );
    }
        // create a scene for sectione 5
        let timelineForSection5 = new TimelineMax();
        timelineForSection5.from($('.info-container__blade-icon'), {opacity:0, x: 100})
        timelineForSection5.from($('.info-container__title'), {opacity:0, x: 100}, ".2")
        timelineForSection5.from($('.info-container__text'), {opacity:0, x: 100}, ".4")

        new ScrollMagic.Scene({
            duration: "50%",
            triggerElement: $('.info-container'),
            triggerHook: "onEnter",
        })
            .setTween(timelineForSection5)
            .addTo(controller); // assign the scene to the controller

    // create a scene for sectione 6
    let timelineForSection6 = new TimelineMax();
    timelineForSection6.from($('.info-container__blade-icon_1'), {opacity:0, x: -100})
    timelineForSection6.from($('.info-container__title_1'), {opacity:0, x: -100}, ".2")
    timelineForSection6.from($('.info-container__text_1'), {opacity:0, x: -100}, ".4")

    new ScrollMagic.Scene({
        duration: "50%",
        triggerElement: $('.info-container_1'),
        triggerHook: "onEnter",
    })

        .setTween(timelineForSection6)
        .addTo(controller); // assign the scene to the controller


        //make body change color when entering "Section-7"
        new ScrollMagic.Scene({
            duration: "50%",
            triggerElement: $('.section-7'),
            triggerHook: "onCenter",
        })
            .setTween( TweenMax.to( $( 'body' ), {backgroundColor: "black"} ))
            .addTo(controller);


        //fade in effect when entering "Section-8"
        let slideStatisticsIn = new TimelineMax();
        slideStatisticsIn.from( $( '.statistics-title' ), {opacity: 0, x: "-10%"} )
        slideStatisticsIn.from( $( '.statistics-body' ), {opacity: 0, x: "-10%"}, '0.1')
        slideStatisticsIn.from( $( '.statistics-imgs' ), {opacity: 0, x: "-10%"}, '0.2')
        slideStatisticsIn.from( $( '.statistics-bottom-text' ), {opacity: 0, x: "-10%"}, '0.3')
        slideStatisticsIn.from( $( '.scale-wrapper-1' ), {opacity: 0, scale: ".75"}, '0.4')
        slideStatisticsIn.from( $( '.scale-wrapper-2' ), {opacity: 0, scale: ".75"}, '0.5')
        slideStatisticsIn.from( $( '.scale-wrapper-3' ), {opacity: 0, scale: ".75"}, '0.6')

        if ( screenSizeMD ) {
            new ScrollMagic.Scene( {
                duration: "100%",
                triggerElement: $( '.section-8' ),
                triggerHook: .1,
            } )
                .setTween( slideStatisticsIn )
                .setPin( $( '.section-8 .row' ) )
                .addTo( controller );
        } else {
            new ScrollMagic.Scene( {
                duration: "100%",
                triggerElement: $( '.section-8' ),
                triggerHook: .2,
            } )
                .setTween( slideStatisticsIn )
                .setPin( $( '.section-8 .row' ) )
                .addTo( controller );
        }
    }

    if ($('#ourVision').length > 0) {
        let timeline = new TimelineMax()

        timeline.to($('.progress-2 li:nth-child(1)'), 1, {opacity: 0.3})
        timeline.to($('.illustration .dots'), 1, {strokeWidth: 0 }, '<')
        timeline.to($('.description.no1'), 1, {y: '-20%', autoAlpha: 0 }, '<')
        timeline.to($('.body .body__text__no1'), 1, {y: '-10%', autoAlpha: 0 }, '<')
        timeline.to($('.no .no1 :last-child'), 1, {y: '10%', autoAlpha: 0 }, '>')

        timeline.to($('.progress-2 li:nth-child(2)'), 2, {opacity: 1, repeat: 1, yoyo: true}, '>')
        timeline.from($('.no .no2 :last-child'), 3, {y: '-100%',autoAlpha: 0, repeat: 1, yoyo: true}, '<')
        timeline.to($('.illustration .square'), 2,  { strokeDashoffset: 0, delay: 1, repeat:1, yoyo: true}, '<')
        timeline.to($('.description.no2'), 2, {y: '-20%', autoAlpha: 1, repeat: 1, yoyo: true }, '<')
        timeline.fromTo($('.body .body__text__no2'), 2, {y: '10%', autoAlpha: 0}, {y: '0', autoAlpha: 1}, '<')
        timeline.to($('.body .body__text__no2'), 2, {y: '-10%', autoAlpha: 0}, '>' )

        timeline.from($('.no .no3 :last-child'), 1, {y: '20%', opacity: 0 })
        timeline.to($('.progress-2 li:nth-child(3)'), 1, {opacity: 1}, '<')
        timeline.to($('.illustration .circle'), 1, {strokeDashoffset: 0, yoyo: true, width: 0, height: 0}, '<')
        timeline.to($('.description.no3'), 1, {y: '-20%', autoAlpha: 1 }, '<')
        timeline.fromTo($('.body .body__text__no3'), 1, {y: "10%", autoAlpha: 0 }, {y: 0, autoAlpha: 1 }, '<')

        new ScrollMagic.Scene({
            duration: "100%",
            triggerElement: $('.body-container'),
            triggerHook: "onLeave",
            offset: -$('.navbar').outerHeight()

        })
            .setPin($('.section'))
            .setTween(timeline)

            .addTo(controller)

        let path = document.querySelector( '.progress__progress' )
        let pathLength = document.querySelector( '.progress__progress' ).getTotalLength();
        path.setAttribute( 'style', 'stroke-dasharray:' + pathLength + ';stroke-dashoffset:' + pathLength * 0.99 )
        let ticking = false;
        const updateProgressBar = (scrollValue) => {
            if ( 0.99 >= scrollValue ) {
                path.setAttribute( 'style', 'stroke-dasharray:' + pathLength + ';stroke-dashoffset:' + pathLength * scrollValue )
            }
        }
        document.addEventListener( 'scroll', (e) => {
            let pos = document.documentElement.scrollTop;
            let calcHeight =
                document.documentElement.scrollHeight -
                document.documentElement.clientHeight;
            let scrollValue = 1 - ((pos) / calcHeight).toFixed(2)
            if ( !ticking ) {
                window.requestAnimationFrame( () => {
                    updateProgressBar( scrollValue )
                    ticking = false;
                } );
                ticking = true;
            }
        })
    }

    if ($('#body-product').length > 0) {
       
        let primaryImg = document.querySelector('.product-image');
        $('.preview').on('mouseenter', (event) => {
            event.preventDefault();
            event.stopPropagation()
            primaryImg.src = "event.target.src";
        })
            
    }

    if ( $( '#blog-page').length > 0 ) {
        AOS.init();
    }

    if ( $( '#all-article-page' ).length > 0 ) {
        AOS.init();

        $('.article-link').on('mouseleave', (e) => {
            let imgUrl = `url("/lib/isai-ramos-YkFYP_zAT6k-unsplash.jpg")`;
            $( '.section-all-articles' )
                .css( 'background-image', imgUrl )
        })
        $('.article-link').on('mouseenter', (e) => {
            let imgUrl = `url(/lib/${$( e.target ).data( 'url' )})`
            console.log( imgUrl )
            $( '.section-all-articles' ).css( 'background-image', imgUrl )
        })


    }

})


