$(document).ready( () => {
//
//     var frameNumber = 0, // start video at frame 0
//         // lower numbers = faster playback
//         playbackConst = 1000, // Set to 1000 to make the playback slower
//         // get page height from video duration
//         setHeight = document.getElementById("index"),
//         // select video element         
//         vid = document.querySelector('.video')
//
// // dynamically set the page height according to video length
//     vid.addEventListener('loadedmetadata', function () {
//         setHeight.style.height = Math.floor(vid.duration) * playbackConst + "px";
//     });
//
// // Use requestAnimationFrame for smooth playback
//     function scrollPlay() {
//         var frameNumber = window.pageYOffset / playbackConst;
//         vid.currentTime = frameNumber;
//         window.requestAnimationFrame(scrollPlay);
//     }
//
//     window.requestAnimationFrame(scrollPlay);

    document.querySelector('.video').playbackRate = .50;
    
    let controller = new ScrollMagic.Controller();

    if ($('#index').length > 0) {
        new ScrollMagic.Scene({
            triggerHook: "onLeave",
            triggerElement: $('#index'),
            offset: $('.header').height()
        })
            .addTo(controller)
            //.setPin($('.product-vid'))
            .addIndicators() // add indicators (requires plugin)
            .on("progress", function (e) {
                console.log(e.progress.toFixed(2))
                if(window.scrollTop > 50){
                    if (!$('header').hasClass('grow'))
                        $('header').addClass('grow')
                } else {
                    if ($('header').hasClass('grow'))
                        $('header').removeClass('grow')
                }
            })
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
        section3Timeline.to($('.sliding-logo'), {scale:11.8})
        new ScrollMagic.Scene({
            duration: "100%",
            triggerElement: $('.sliding-logo'),
            triggerHook: 0.4,
        })
            .setTween(section3Timeline)
            .addTo(controller);

        // fade the circles in and then fade text with lines
        let timelineForSection4 = new TimelineMax();
        timelineForSection4.fromTo($('.container.ring'), {scale: 0.8, opacity: 0}, {scale: 1, opacity: 1}, ".2")
        timelineForSection4.fromTo($('.inner.ring'), {scale: 0.8, opacity: 0}, {scale: 1, opacity: 1}, ".4")
        timelineForSection4.fromTo($('.circle'), {scale: 0.8, opacity: 0}, {scale: 1, opacity: 1},".6")
        timelineForSection4.fromTo($('.product-name'), {opacity: 0, x: -300}, {opacity: 1, x: 100}, "<")
        timelineForSection4.fromTo($('#lines'), {opacity: 0, width: 0}, {opacity: 1, width: "33%"}, "<")

        new ScrollMagic.Scene({
            duration: "45%",
            triggerElement: $('.section-4'),
            triggerHook: .55
        })
            .setTween(timelineForSection4)
            .addTo(controller);


        // create a scene for sectione 5
        let timelineForSection5 = new TimelineMax();
        timelineForSection5.from($('.info-container__blade-icon'), {opacity:0, x: -100})
        timelineForSection5.from($('.info-container__title'), {opacity:0, x: -100}, ".2")
        timelineForSection5.from($('.info-container__text'), {opacity:0, x: -100}, ".4")

        new ScrollMagic.Scene({
            duration: "50%",
            triggerElement: $('.info-container'),
            triggerHook: "onEnter",
        })
            .setTween(timelineForSection5)
            .addTo(controller); // assign the scene to the controller

    // create a scene for sectione 7
        new ScrollMagic.Scene({
            duration: "100%",
            triggerElement: $('.section-7'),
            triggerHook: "onCenter",
            offset: -100
        })
            .setTween(TweenMax.from($('.water__title'), 1, {backgroundPositionY: 300} ))
            .addTo(controller)

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
        let path = document.querySelector('.progress__progress')
        let pathLength = document.querySelector('.progress__progress').getTotalLength();
        path.setAttribute('style', 'stroke-dashoffset:'+pathLength * .99 +';stroke-dasharray:'+pathLength)

        new ScrollMagic.Scene({
            duration: $('.container').height(),
            triggerElement: $('.container'),
            triggerHook: "onLeave",
        })
            .addIndicators(
                {name: 'container', colorTrigger: 'red', indent: 100}
            )
            .addTo(controller)

        let timeline1 = new TimelineMax()
        //let timeline2 = new TimelineMax()
        //let timeline3 = new TimelineMax()

        timeline1.to($('.illustration .dots'), 1, {strokeWidth: 0 })
        timeline1.to($('.no .no1 :last-child'), 1, {y: '10%', autoAlpha: 0 }, '<')
        timeline1.to($('.description.no1'), 1, {y: '-20%', autoAlpha: 0 }, '<')
        timeline1.to($('.body .body__text__no1'), 1, {y: '-10%', autoAlpha: 0 }, '<')
        timeline1.to($('.progress-2 li:nth-child(1)'), 1, {opacity: 0.3}, '<')
        //timeline1.to($('.section-1'), 1, {y: '-20%' })
        //timeline1.to($('.section *:not(.bg)'), {autoAlpha: 0, y: "-20%"})


        timeline1.from($('.no .no2 :last-child'), 3, {y: '-100%',autoAlpha: 0, repeat: 1, yoyo: true}, '>')
        timeline1.to($('.illustration .square'), 2,  { strokeDashoffset: 0, delay: 1, repeat:1, yoyo: true}, '<')
        timeline1.to($('.description.no2'), 2, {y: '-20%', autoAlpha: 1, repeat: 1, yoyo: true }, '<')
        timeline1.to($('.progress-2 li:nth-child(2)'), 2, {opacity: 1, repeat: 1, yoyo: true}, '<')
        timeline1.fromTo($('.body .body__text__no2'), 2, {y: '10%', autoAlpha: 0}, {y: '0', autoAlpha: 1}, '<')
        timeline1.to($('.body .body__text__no2'), 2, {y: '-10%', autoAlpha: 0}, '>' )

        //timeline1.to($('.section-2 .no *'), .2, {autoAlpha: 1, y: 0}, )
        //timeline1.fromTo($('.section-2 > *:not(.bg, .no)'), {autoAlpha: 0, y: "-20%"}, {autoAlpha: 1, y: 0}, '<')


        timeline1.from($('.no .no3 :last-child'), 1, {y: '20%', opacity: 0 })
        timeline1.to($('.illustration .circle'), 1, {strokeDashoffset: 0, yoyo: true, width: 0, height: 0}, '<')
        timeline1.to($('.description.no3'), 1, {y: '-20%', autoAlpha: 1 }, '<')
        timeline1.to($('.progress-2 li:nth-child(3)'), 1, {opacity: 1}, '<')
        timeline1.fromTo($('.body .body__text__no3'), 1, {y: "10%", autoAlpha: 0 }, {y: 0, autoAlpha: 1 }, '<')
        //timeline3.fromTo($('.section-3  > *:not(.bg, .no)'), 1, {autoAlpha: 0, y: "-20%"}, {autoAlpha: 1, y: 0})
        //timeline3.fromTo($('.section-3 .no *'), {autoAlpha: 0, y: "-5%"}, {autoAlpha: 1, y: 0}, '<')

        let sect1 = new ScrollMagic.Scene({
            duration: $('.container').height(),
            triggerElement: $('.section'),
            triggerHook: "onLeave",
            offset: -$('.header').height()

        })
            .setPin($('.section'))
            .setClassToggle($('.progress-2 li:nth-child(1)'), 'active')
            .setTween(timeline1)
            .addIndicators({
                name: "section1",
                indent: 200
            })
            .on("progress", function (e) {
                let path = document.querySelector('.progress__progress')
                let pathLength = document.querySelector('.progress__progress').getTotalLength();

                let percentage = 1- (e.progress.toFixed(2));
                console.log(percentage)
                console.log(e.progress);


                if (0.01 <= percentage && percentage <= 0.99)
                    path.setAttribute('style', 'stroke-dasharray:'+pathLength+';stroke-dashoffset:'+pathLength * percentage)
                //path.attr('y2', percentage+'%');
            })
            .addTo(controller)

    }


    const randomInt = (min, max, rounded = true) => {
        if (rounded)
            return Math.round(Math.random() * (max - min) + min);
        else
            return Math.random() * (max - min) + min;
}
})
