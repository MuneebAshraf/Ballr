$(document).ready( () => {
    // screen is smaller than 750px
    let isSmallerThanMD = window.matchMedia( "screen and (max-width:750px)" ).matches;
    let controller = new ScrollMagic.Controller();
    let triggerHook = null;
    
    if ($('#index').length > 0) {
        // Preloading images to drastically improve performance
        const currentFrame = (path, index, fileType) => (`/lib/${path}/${path}-${index.toString().padStart( 5, '0' )}.${fileType}`);
        // const frameCount = 178; // There 148 images for that animation-sequence to load

        const preloadImages = (path, frameCount, fileType) => {
            let images = [];
            for ( let i = 1; i < frameCount; i++ ) {
                images[ i ] = new Image(); // This is functionally equivalent to document.createElement('img').
                images[ i ].src = currentFrame( path, i, fileType);
            }
            return images;
        };
        const setupCanvas = (canvas, frameCount, path, fileType = "jpg") => {// Canvas settings
            
            const context = canvas.getContext( "2d" );
            const images = preloadImages( path , frameCount, fileType);

            // Draw the first image
            const img = new Image();
            img.src = currentFrame( path, 1 , fileType);
            img.onload = function () {
                canvas.width = this.width;
                canvas.height = this.height;
                context.drawImage( img, 0, 0 ); // destination rectangle
            }
            
         return {
             frameCount: frameCount,
             images: images,
             context: context
         }   
        }

        const updateCanvasFrame = (event, canvas) => {
            // const scrollFraction = event.progress;
            const scrollFraction = (event.scrollPos - event.startPos) / (event.endPos - event.startPos);
            const frameIndex = Math.min(
                canvas.frameCount - 1,
                Math.floor( scrollFraction * canvas.frameCount )
            );
            requestAnimationFrame( () => {
                let frame = canvas.images[ frameIndex + 1 ] ;
                 canvas.frameCount -1 > frameIndex && canvas.context.clearRect( 0, 0, window.innerWidth, window.innerHeight );
                frame && canvas.context.drawImage( frame, 0, 0 )
            } );
        }
        
        
        // // Scroll interactions
        // const html = document.getElementsByTagName( 'html' );
        //
        // window.addEventListener( 'scroll', () => {
        //     const scrollTop = html[ 0 ].scrollTop;
        //     // console.log('scrollTop: ', scrollTop);
        //     // console.log('html.scrollHeight: ', html[0].scrollHeight);
        //     // console.log('window.innerHeight: ', window.innerHeight);
        //     const maxScrollTop = (html[ 0 ].scrollHeight - window.innerHeight) * 0.8;
        //     // console.log('maxScrollTop: ', maxScrollTop);
        //     const scrollFraction = (scrollTop) / maxScrollTop;
        //     // console.log('scrollFraction: ', scrollFraction);
        //     const frameIndex = Math.min(
        //         canvas.frameCount - 1,
        //         Math.floor( scrollFraction * canvas.frameCount )
        //     );
        //     // console.log('FrameIndex', frameIndex);
        //
        //     if ( frameIndex > 0) {
        //         $( ".product-vid" ).addClass( 'fadeIn' )
        //         requestAnimationFrame( () => {
        //             let frameindex = canvas.images[ frameIndex + 1 ];
        //             frameindex && canvas.context.drawImage( frameindex, 0, 0 )
        //         } );
        //     } else {
        //         $( ".product-vid" ).removeClass( 'fadeIn' )
        //     }
        // } );
      
       
        //Der blevet brugt scroll magic hver gang "new ScrollMagic.Scene" er i spil.//

        // document.querySelector('.hero-section__video').addEventListener( "timeupdate", function () {
        //     if ( this.currentTime >= 2  ) {
        //         $( '.section-2' ).addClass('active')
        //     }
        //     if ( this.currentTime >= 4 ) {
        //         this.pause();
        //     }
        // } );


        const canvas = setupCanvas( document.querySelector( ".canvas" ), 1374, "trimmer-sequence", 'png' )
        new ScrollMagic.Scene({
            duration: $("#index").height() - ($( '.statistics' ).height() + $( '.footer' ).height() ),
            triggerHook: .9,
            triggerElement: $('.reveal'),
            offset: $( '.sliding-logo' ).height() + 500
        })
            .on( 'update', (event) => {
                updateCanvasFrame(event, canvas)
            } )
            .setClassToggle( $('.product-vid') ,'fadeIn')
            .addTo( controller )

        let heroTimeline = new TimelineMax();
        // heroTimeline.fromTo( $('#slogan-1'), {autoAlpha: 0, y: "35%"}, {autoAlpha: 1, y: "10%"} )
        heroTimeline.to( $( '#slogan-1' ), {y: "-10%"} )
        heroTimeline.to( $('#slogan-1'), {y: "-10%"})
        heroTimeline.to( $('#slogan-1'), {y: "-35%", autoAlpha: 0 })
        heroTimeline.to( $( '.lottie-player' ), {autoAlpha: 0}, '<' )
        heroTimeline.fromTo( $('#slogan-2'), {autoAlpha: 0, y: "35%"}, {autoAlpha: 1, y: "10%"} )
        heroTimeline.to( $('#slogan-2'), {y: "-10%"})
        heroTimeline.to( $('#slogan-2'), {y: "-35%", autoAlpha: 0 })
        heroTimeline.fromTo( $('#slogan-3'), {autoAlpha: 0, y: "35%"}, {autoAlpha: 1, y: "10%"} )
        heroTimeline.to( $('#slogan-3'), {y: "-10%"})
        heroTimeline.to( $('#slogan-3'), {y: "-35%", autoAlpha: 0 })
        heroTimeline.fromTo( $('#slogan-4'), {autoAlpha: 0, y: "35%"}, {autoAlpha: 1, y: "10%"} )
        heroTimeline.to( $('#slogan-4'), {y: "-10%"})
        heroTimeline.to( $('#slogan-4'), {y: "-35%", autoAlpha: 0 })
         const heroCanvas = setupCanvas(document.querySelector('.hero-section__canvas'), 103, 'trimmer-hero', 'png')
         new ScrollMagic.Scene({
            duration: "200%",
            triggerHook: 0.1,
            triggerElement: $('.hero-section'),
         })
             .setTween( heroTimeline )
             .on('update', (event) => {
                updateCanvasFrame(event, heroCanvas)
            })
             .setClassToggle($('.section-2') ,'active')
             .on('end', (event) => {
                 if (event.scrollDirection === 'FORWARD') {
                     $('.hero-section__canvas').addClass('animate__fadeOut')
                     $('.hero-section__canvas').removeClass(    'animate__fadeIn')
                 }
                 if (event.scrollDirection === 'REVERSE') {
                     $( '.hero-section__canvas' ).removeClass( 'animate__fadeOut' )
                     $( '.hero-section__canvas' ).addClass( 'animate__fadeIn')
                 }
             })
            //.setClassToggle( $( video_1 ), 'animate__animated animate__slideInUp' )
            .addTo(controller)

        // slide the sliding-logo on scroll
        let scaleUpTimeline = new TimelineMax();
        const slidingLogo = document.querySelector('.sliding-logo')
        scaleUpTimeline.from( slidingLogo, {x: '-150%'} )
        scaleUpTimeline.to( $('.sliding-logo .hollow') , {opacity: 0}, '>' )
        scaleUpTimeline.to( slidingLogo, {opacity: 0, transform: 'matrix3d(5,-0.3,0.00,0.00,0.3,5,0.00,-40,0,0,1,0,0,0,0,1)'}, '<')
        scaleUpTimeline.to( $( 'body' ), {backgroundColor: "#C8B090"}, '<' )
        scaleUpTimeline.to( $( 'body' ), {backgroundColor: "#F6F4EF"}, '>' )
        
        new ScrollMagic.Scene({
            duration: "300%",
            triggerElement: '.section-3 .row',
            triggerHook: .35 ,
        })
            .setPin($('.section-3 .row'))
            .setTween( scaleUpTimeline)
            .addTo(controller);
        
        //make sliding-logo fade out change color of the body
        let fadeoverTimeline = new TimelineMax();
        // fadeoverTimeline.to($('.sliding-logo'), 2, {opacity:0})
        
        new ScrollMagic.Scene({
            duration: "50%",
            triggerElement: $('.section-4'),
            triggerHook: "onEnter",
        })
            .setTween(fadeoverTimeline)
            .addTo(controller);

        // fade the circles in and then fade text with lines
        let timelineForSection4 = new TimelineMax();
        timelineForSection4.fromTo($('.product-container.ring'), {scale: 0.8, autoAlpha: 0}, {scale: 1, autoAlpha: 1}, ".2")
        timelineForSection4.to( $( '.canvas' ), {height: "-=50%"}, "<" )
        timelineForSection4.fromTo($('.inner.ring'), {scale: 0.8, autoAlpha: 0}, {scale: 1, autoAlpha: 1}, ".4")
        timelineForSection4.fromTo($('.circle'), {scale: 0.8, autoAlpha: 0}, {scale: 1, autoAlpha: 1},".6")
        timelineForSection4.fromTo($('.product-name'), {autoAlpha: 0, x: -300}, {autoAlpha: 1, x: 0})
        timelineForSection4.fromTo($('#lines'), {autoAlpha: 0, width: 0}, {autoAlpha: 1, width: "33%"}, "<")
        
        triggerHook = !isSmallerThanMD ? .175 : .3;
        new ScrollMagic.Scene({
            duration: "150%",
            triggerElement: $('.section-4'),
            triggerHook: triggerHook
        })
            .setPin($('.section-4'), {pushFollowers: false})
            .setTween(timelineForSection4)
            .addTo(controller);

        // create a scene for sectione 5
        let timelineForSection5 = new TimelineMax();
        timelineForSection5.to( $( '.canvas' ), {x: "-=50%"}, ".1" )
        timelineForSection5.from($('.section-5 .info-container-right__blade-icon'), {autoAlpha:0, x: 100})
        timelineForSection5.from($('.section-5 .info-container-right__title'), {autoAlpha:0, x: 100}, ".2")
        timelineForSection5.from($('.section-5 .info-container-right__text'), {autoAlpha:0, x: 100}, ".4")
        timelineForSection5.to( $( '.section-5' ), {autoAlpha: 0, y: "-10%"});
        timelineForSection5.to( $( '.canvas' ), {x: "+=50%"})

        triggerHook = !isSmallerThanMD ? 0. : .1;
        
        new ScrollMagic.Scene({
            duration: "200%",
            triggerElement: $( '.section-5' ),
            triggerHook: triggerHook,
        })
            .setPin( $( '.section-5' ), {pushFollowers: false})
            .setTween(timelineForSection5)
            .addTo(controller); // assign the scene to the controller

    // create a scene for sectione 6
    let timelineForSection6 = new TimelineMax();
    timelineForSection6.to( $( '.canvas' ), {x: "+=50%"}, "<")
    timelineForSection6.from($('.section-6 .info-container-left__blade-icon'), {autoAlpha:0, x: -100})
    timelineForSection6.from($('.section-6 .info-container-left__title'), {autoAlpha:0, x: -100}, ".2")
    timelineForSection6.from($('.section-6 .info-container-left__text'), {autoAlpha:0, x: -100}, ".4");
    timelineForSection6.to($('.section-6'), {autoAlpha:0, y: "-10%"});
    timelineForSection6.to( $( '.canvas' ), {x: "-=50%"})
    // timelineForSection6.to( $( '.canvas' ), {x: "-=25%", height: "100%"} )
    
    new ScrollMagic.Scene({
        duration: "200%",
        triggerElement: $('.section-6'),
        triggerHook: triggerHook,
    })
        .setPin( $( '.section-6' ))
        .setTween(timelineForSection6)
        .addTo(controller); // assign the scene to the controller

    // create a scene for sectione 7
    let timelineForSection7 = new TimelineMax();
    timelineForSection7.to( $( '.canvas' ), {x: "-=50%"}, ".1" )
    timelineForSection7.from( $( '.section-7 .info-container-right__blade-icon' ), {autoAlpha: 0, x: 100} )
    timelineForSection7.from( $( '.section-7 .info-container-right__title' ), {autoAlpha: 0, x: 100}, ".2" )
    timelineForSection7.from( $( '.section-7 .info-container-right__text' ), {autoAlpha: 0, x: 100}, ".4" )
    timelineForSection7.to( $( '.section-7' ), {autoAlpha: 0, y: "-10%"} );
    timelineForSection7.to( $( '.canvas' ), {x: "+=50%"} )

    triggerHook = !isSmallerThanMD ? 0. : .1;

    new ScrollMagic.Scene( {
        duration: "200%",
        triggerElement: $( '.section-7' ),
        triggerHook: triggerHook,
    } )
        .setPin( $( '.section-7' ), {pushFollowers: false} )
        .setTween( timelineForSection7 )
        .addTo( controller ); // assign the scene to the controller


    // create a scene for sectione 8
    let timelineForSection8 = new TimelineMax();
    timelineForSection8.to( $( '.canvas' ), {x: "+=50%"}, '.1' )
    timelineForSection8.from( $( '.section-8 .info-container-left__blade-icon' ), {autoAlpha: 0, x: -100} )
    timelineForSection8.from( $( '.section-8 .info-container-left__title' ), {autoAlpha: 0, x: -100}, ".2" )
    timelineForSection8.from( $( '.section-8 .info-container-left__text' ), {autoAlpha: 0, x: -100}, ".4" );
    timelineForSection8.to( $( '.section-8' ), {autoAlpha: 0, y: "-10%"} );
    timelineForSection8.to( $( '.canvas' ), {x: "-=50%"} )

    new ScrollMagic.Scene( {
        duration: "200%",
        triggerElement: $( '.section-8' ),
        triggerHook: triggerHook,
    } )
        .setPin( $( '.section-8' ), {pushFollowers: false} )
        .setTween( timelineForSection8 )
        .addTo( controller ); // assign the scene to the controller

    // create a scene for sectione 9
    let timelineForSection9 = new TimelineMax();
    timelineForSection9.to( $( '.canvas' ), {x: "-=50%"}, ".1" )
    timelineForSection9.from( $( '.section-9 .info-container-right__blade-icon' ), {autoAlpha: 0, x: 100} )
    timelineForSection9.from( $( '.section-9 .info-container-right__title' ), {autoAlpha: 0, x: 100}, ".2" )
    timelineForSection9.from( $( '.section-9 .info-container-right__text' ), {autoAlpha: 0, x: 100}, ".4" )
    timelineForSection9.to( $( '.section-9' ), {autoAlpha: 0, y: "-10%"} );
    timelineForSection9.to( $( '.canvas' ), {x: "+=50%"})

    triggerHook = !isSmallerThanMD ? 0. : .1;

    new ScrollMagic.Scene( {
        duration: "200%",
        triggerElement: $( '.section-9' ),
        triggerHook: triggerHook,
    } )
        .setPin( $( '.section-9' ), {pushFollowers: false} )
        .setTween( timelineForSection9 )
        .addTo( controller ); // assign the scene to the controller

    // create a scene for sectione 10
    let timelineForSection10 = new TimelineMax();
    timelineForSection10.to( $( '.canvas' ), {x: "+=50%"}, "0.1" )
    timelineForSection10.from( $( '.section-10 .info-container-left__blade-icon' ), {autoAlpha: 0, x: -100} )
    timelineForSection10.from( $( '.section-10 .info-container-left__title' ), {autoAlpha: 0, x: -100}, ".2" )
    timelineForSection10.from( $( '.section-10 .info-container-left__text' ), {autoAlpha: 0, x: -100}, ".4" );
    timelineForSection10.to( $( '.section-10' ), {autoAlpha: 0, y: "-10%"} );
    timelineForSection10.to( $( '.canvas' ), {x: "-=50%", height: "+=50%"} )

    new ScrollMagic.Scene( {
        duration: "200%",
        triggerElement: $( '.section-10' ),
        triggerHook: triggerHook,
    } )
        .setPin( $( '.section-10' ), {pushFollowers: false} )
        .setTween( timelineForSection10 )
        .addTo( controller ); // assign the scene to the controller
    
        new ScrollMagic.Scene({
            duration: "50%",
            triggerElement: $('.section-11'),
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

        triggerHook = !isSmallerThanMD ? .2 : .05;
        new ScrollMagic.Scene( {
            duration: "200%",
            triggerElement: $( '.statistics' ),
            triggerHook: triggerHook,
        } )
            .setTween( slideStatisticsIn )
            .setPin( $( '.statistics .row' ) )
            .addTo( controller );
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
            duration: "200%",
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


