$(document).ready( () => {

    let controller = new ScrollMagic.Controller(); 

    if ($('#index').length > 0) {
        let video_1 = document.querySelector( '#product-vid-1' )
        let video_progress = 0;
        let accelamount = 0.6;
        let delay = 0.1;

        setInterval( () => {
            delay += (video_progress - delay) * accelamount;
            console.log( video_progress, delay );

            video_1.currentTime = delay;
        }, 41.666 );
        
        document.addEventListener('scroll', (e) => {
            let pos = document.documentElement.scrollTop;
            let calcHeight = 
                document.documentElement.scrollHeight -
                document.documentElement.clientHeight;
            
            let scrollValue = ((pos * 100) / (calcHeight * 0.45))
            let duration = video_1.duration;
            video_progress = (scrollValue * ( duration / 100))
            
            if (( scrollValue * (duration / 100) ) > 8.3 ) {
                $(video_1).addClass('zoomInExit')
            } else {
                $( video_1 ).removeClass('zoomInExit')
            }
        })

        //Der blevet brugt scroll magic hver gang "new ScrollMagic.Scene" er i spil.//

        new ScrollMagic.Scene({  
            duration: "100%",
            triggerHook: "onCenter",
            triggerElement: $('.hero-section'),
            reverse: false,
            offset: $('.nav').height()
        })
            .setClassToggle( $( video_1 ), 'animate__animated animate__slideInUp' )
            .addIndicators() // add indicators (requires plugin)
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

        new ScrollMagic.Scene({
            duration: "40%",
            triggerElement: $('.section-4'),
            triggerHook: .5
        })
            .setTween(timelineForSection4)
            .addTo(controller);


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

    // create a scene for sectione 7
    let timelineForSection7 = new TimelineMax();
    timelineForSection7.from($('.info-container__blade-icon_1'), {opacity:0, x: -100})
    timelineForSection7.from($('.info-container__title_1'), {opacity:0, x: -100}, ".2")
    timelineForSection7.from($('.info-container__text_1'), {opacity:0, x: -100}, ".4")

    new ScrollMagic.Scene({
        duration: "50%",
        triggerElement: $('.info-container_1'),
        triggerHook: "onEnter",
    })

    
        .setTween(timelineForSection7)
        .addTo(controller); // assign the scene to the controller


            //make body change color when entering "Section-9"
        new ScrollMagic.Scene({
            duration: "50%",
            triggerElement: $('.section-9'),
            triggerHook: "onEnter",
        })
            .setTween( TweenMax.to( $( 'body' ), {backgroundColor: "#1C1C1C"} ))
            .addTo(controller);


        //fade in effect when entering "Section-10"
        let slideStatisticsIn = new TimelineMax();
        slideStatisticsIn.from( $( '.statistics-title' ), {opacity: 0, x: "-10%"} )
        slideStatisticsIn.from( $( '.statistics-body' ), {opacity: 0, x: "-10%"}, '0.1')
        slideStatisticsIn.from( $( '.statistics-imgs' ), {opacity: 0, x: "-10%"}, '0.2')
        slideStatisticsIn.from( $( '.statistics-bottom-text' ), {opacity: 0, x: "-10%"}, '0.3')
        slideStatisticsIn.from( $( '.scale-wrapper-1' ), {opacity: 0, scale: ".75"}, '0.4')
        slideStatisticsIn.from( $( '.scale-wrapper-2' ), {opacity: 0, scale: ".75"}, '0.5')
        slideStatisticsIn.from( $( '.scale-wrapper-3' ), {opacity: 0, scale: ".75"}, '0.6')
        new ScrollMagic.Scene( {
            duration: "100%",
            triggerElement: $( '.section-10' ),
            triggerHook: .25,
        } )
            .setTween( slideStatisticsIn )
            .setPin($('.section-10 .row'))
            .addTo( controller );
        
        

            
        //     let hurtighurtig = new TimelineMax();
        //     hurtighurtig.to($('.geInTouch'), 1, { strokeWidth: 0 })
        // new ScrollMagic.Scene( {
        //     duration: "50%",
        //     triggerElement: $( '.section-kontakt' ),
        //     triggerHook: 0.55,
        // } )
        //     .setTween( hurtighurtig )
        //     .addTo( controller );


        // // create a scene for sectione 8
    //     let section8Timeline = new TimelineMax()
    //     let array = $('.section-8 span:not(.excluded)');
    //     for (let i = 0; i < array.length; i++) {
    //         let gridCol = randomInt(1,5)
    //         let gridRow = randomInt(1,5)
    //         let rotation = randomInt( -40, 40 )
    //         let fontSize = randomInt(1.50, 6, false)
    //         $(array[i]).css('grid-area', `${gridRow} /${gridCol} / -1 / -1 `)
    //
    //         console.log($(array[i]))
    //
    //         section8Timeline.fromTo($(array[i]), i, {scale: 5}, {opacity: 1, scale: 1, rotation: rotation, fontSize: fontSize+'rem'})
    //     }
    //     section8Timeline.to($('body'), {backgroundColor: "#1C1C1C"})
    //
    //     new ScrollMagic.Scene({
    //         duration: "100%",
    //         triggerElement: $('.section-8'),
    //         triggerHook: .1,
    //     })
    //         .setTween(section8Timeline)
    //         .setPin($('.section-8'))
    //         .addTo(controller)

    }

    if ($('#ourVision').length > 0) {
        let timeline = new TimelineMax()

        timeline.to($('.illustration .dots'), 1, {strokeWidth: 0 })
        timeline.to($('.description.no1'), 1, {y: '-20%', autoAlpha: 0 }, '<')
        timeline.to($('.body .body__text__no1'), 1, {y: '-10%', autoAlpha: 0 }, '<')
        timeline.to($('.progress-2 li:nth-child(1)'), 1, {opacity: 0.3}, '<')
        timeline.to($('.no .no1 :last-child'), 1, {y: '10%', autoAlpha: 0 }, '>')

        timeline.from($('.no .no2 :last-child'), 3, {y: '-100%',autoAlpha: 0, repeat: 1, yoyo: true}, '>')
        timeline.to($('.illustration .square'), 2,  { strokeDashoffset: 0, delay: 1, repeat:1, yoyo: true}, '<')
        timeline.to($('.description.no2'), 2, {y: '-20%', autoAlpha: 1, repeat: 1, yoyo: true }, '<')
        timeline.to($('.progress-2 li:nth-child(2)'), 2, {opacity: 1, repeat: 1, yoyo: true}, '<')
        timeline.fromTo($('.body .body__text__no2'), 2, {y: '10%', autoAlpha: 0}, {y: '0', autoAlpha: 1}, '<')
        timeline.to($('.body .body__text__no2'), 2, {y: '-10%', autoAlpha: 0}, '>' )

        timeline.from($('.no .no3 :last-child'), 1, {y: '20%', opacity: 0 })
        timeline.to($('.illustration .circle'), 1, {strokeDashoffset: 0, yoyo: true, width: 0, height: 0}, '>')
        timeline.to($('.description.no3'), 1, {y: '-20%', autoAlpha: 1 }, '<')
        timeline.to($('.progress-2 li:nth-child(3)'), 1, {opacity: 1}, '<')
        timeline.fromTo($('.body .body__text__no3'), 1, {y: "10%", autoAlpha: 0 }, {y: 0, autoAlpha: 1 }, '<')

        new ScrollMagic.Scene({
            duration: "100%",
            triggerElement: $('.body-container'),
            triggerHook: "onLeave",
            offset: -$('.navbar').outerHeight()

        })
            .setPin($('.section'))
            .setTween(timeline)
            .addIndicators({
                name: "section1",
                indent: 100
            })
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
})

// fetch('testapi.com/data', () => {

// } )

