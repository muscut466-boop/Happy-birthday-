/* =====================================
   SCREEN CHANGE
===================================== */

function nextScreen(number) {

    const screens =
        document.querySelectorAll(".screen");

    screens.forEach(screen => {
        screen.classList.remove("active");
    });

    const next =
        document.getElementById("screen" + number);

    if (next) {
        next.classList.add("active");
    }

    /* Balloon screen */
    if (number === 5) {
        createBalloons();
    }

}


/* =====================================
   BIRTHDAY DATE CHECK
===================================== */

function checkBirthday() {

    const day =
        document.getElementById("day").value;

    const month =
        document.getElementById("month").value;

    const year =
        document.getElementById("year").value;


    const error =
        document.getElementById("error");


    /*
       ONLY 09/09/2009
       WILL BE ACCEPTED
    */

    if (
        String(day) === "9" &&
        String(month) === "9" &&
        String(year) === "2009"
    ) {

        error.innerHTML =
            "🎉 ঠিক আছে তাহমিনা!<br>" +
            "এবার তোমার সারপ্রাইজ শুরু হচ্ছে... ✨";


        createConfetti(50);


        setTimeout(() => {

            nextScreen(4);

        }, 1300);


    } else {

        error.innerHTML =
            "❌ তাহমিনা, সঠিক জন্মতারিখ দাও";


        /* Shake animation */

        const inputs =
            document.querySelectorAll(
                ".date-box input"
            );


        inputs.forEach(input => {

            input.animate(

                [
                    {
                        transform:
                            "translateX(-8px)"
                    },

                    {
                        transform:
                            "translateX(8px)"
                    },

                    {
                        transform:
                            "translateX(-5px)"
                    },

                    {
                        transform:
                            "translateX(5px)"
                    },

                    {
                        transform:
                            "translateX(0)"
                    }
                ],

                {
                    duration:400
                }

            );

        });

    }

}


/* =====================================
   LETTER
===================================== */

let letterOpened = false;


function openLetter() {

    if (letterOpened) return;

    letterOpened = true;


    const envelope =
        document.querySelector(".envelope");


    envelope.style.transform =
        "scale(1.05)";


    const letter =
        document.getElementById("letter");


    const text =

`প্রিয় তাহমিনা,

আজকের এই বিশেষ দিনে
তোমাকে জানাই অনেক অনেক শুভেচ্ছা। ❤️

তোমার প্রতিটি দিন হোক
হাসি, আনন্দ আর সুন্দর মুহূর্তে ভরা।

তোমার সব সুন্দর স্বপ্ন পূরণ হোক।
তোমার জীবনের প্রতিটি নতুন বছর
নিয়ে আসুক নতুন আনন্দ,
নতুন আশা আর নতুন সম্ভাবনা। ✨

তাহমিনা,
আজকের দিনটা তোমার জন্য
অনেক সুন্দর হয়ে উঠুক। 💖

🎂 শুভ জন্মদিন তাহমিনা! 🎉`;


    letter.innerHTML = "";


    let index = 0;


    const typing =
        setInterval(() => {

            letter.innerHTML =
                text.substring(
                    0,
                    index
                );

            index++;


            if (
                index >
                text.length
            ) {

                clearInterval(typing);


                document.getElementById(
                    "letterButton"
                ).style.display =
                    "inline-block";

            }

        }, 30);

}


/* =====================================
   BALLOON GAME
===================================== */

function createBalloons() {

    const area =
        document.getElementById(
            "balloonArea"
        );


    area.innerHTML = "";


    const colors = [

        "#ff4fa3",
        "#7c3aed",
        "#06b6d4",
        "#f97316",
        "#22c55e",
        "#eab308"

    ];


    /*
       Random target balloon
    */

    const target =
        Math.floor(
            Math.random() * 15
        );


    for (
        let i = 0;
        i < 15;
        i++
    ) {

        const balloon =
            document.createElement(
                "div"
            );


        balloon.className =
            "balloon";


        balloon.style.left =
            Math.random() * 88 + "%";


        balloon.style.top =
            Math.random() * 75 + "%";


        balloon.style.background =
            colors[
                Math.floor(
                    Math.random() *
                    colors.length
                )
            ];


        balloon.style.animationDelay =
            Math.random() * 2 + "s";


        /*
           Correct balloon
        */

        if (i === target) {

            balloon.dataset.correct =
                "true";

            balloon.style.boxShadow =
                "0 0 25px #fff, " +
                "0 0 45px #ff4fa3";


        } else {

            balloon.dataset.correct =
                "false";

        }


        balloon.onclick =
            function () {

                popBalloon(
                    balloon
                );

            };


        area.appendChild(
            balloon
        );

    }

}


/* =====================================
   BALLOON POP
===================================== */

function popBalloon(balloon) {

    /*
       Wrong balloon
    */

    if (
        balloon.dataset.correct !==
        "true"
    ) {

        balloon.animate(

            [
                {
                    transform:
                        "translateX(-8px)"
                },

                {
                    transform:
                        "translateX(8px)"
                },

                {
                    transform:
                        "translateX(-5px)"
                },

                {
                    transform:
                        "translateX(0)"
                }
            ],

            {
                duration:300
            }

        );


        document.getElementById(
            "balloonMessage"
        ).innerHTML =
            "😄 না তাহমিনা! " +
            "আরেকটা Balloon চেষ্টা করো।";


        return;

    }


    /*
       Correct balloon
    */

    balloon.animate(

        [
            {
                transform:
                    "scale(1)"
            },

            {
                transform:
                    "scale(1.5)"
            },

            {
                transform:
                    "scale(0)"

            }
        ],

        {
            duration:400,
            fill:"forwards"
        }

    );


    document.getElementById(
        "balloonMessage"
    ).innerHTML =

        "🎉 দারুণ তাহমিনা!<br>" +
        "তুমি ঠিক Balloon-টা খুঁজে পেয়েছো! ❤️";


    createConfetti(60);


    document.getElementById(
        "balloonButton"
    ).style.display =
        "inline-block";

}


/* =====================================
   GIFT BOX
===================================== */

let giftOpened = false;


function openGift() {

    if (giftOpened) return;

    giftOpened = true;


    const gift =
        document.querySelector(".gift");


    gift.style.transform =
        "scale(1.1) rotate(-2deg)";


    gift.style.filter =
        "drop-shadow(0 0 30px #ff4fa3)";


    /*
       Gift celebration
    */

    createConfetti(70);


    setTimeout(() => {

        document.getElementById(
            "giftButton"
        ).style.display =
            "inline-block";

    }, 900);

}


/* =====================================
   CANDLE
===================================== */

let candleBlown = false;


function blowCandle() {

    if (candleBlown) return;

    candleBlown = true;


    const candle =
        document.querySelector(
            ".big-candle"
        );


    /*
       Flame disappear
    */

    candle.innerHTML =
        "💨";


    candle.style.animation =
        "none";


    document.getElementById(
        "wish"
    ).innerHTML =

        "✨ তাহমিনা, তোমার ইচ্ছেটা পূরণ হোক। ❤️";


    createConfetti(70);


    createHearts(20);


    document.getElementById(
        "wishButton"
    ).style.display =
        "inline-block";

}


/* =====================================
   COUNTDOWN
===================================== */

function startCountdown() {

    nextScreen(9);


    let number = 3;


    const countdown =
        document.getElementById(
            "countdown"
        );


    countdown.innerHTML =
        number;


    const timer =
        setInterval(() => {

            number--;


            if (number <= 0) {

                clearInterval(timer);


                countdown.innerHTML =
                    "🎉";


                setTimeout(() => {

                    nextScreen(10);

                    grandCelebration();

                }, 700);


            } else {

                countdown.innerHTML =
                    number;

            }

        }, 1000);

}


/* =====================================
   CONFETTI
===================================== */

function createConfetti(amount) {

    for (
        let i = 0;
        i < amount;
        i++
    ) {

        const confetti =
            document.createElement(
                "div"
            );


        confetti.style.position =
            "fixed";


        confetti.style.left =
            Math.random() * 100 +
            "vw";


        confetti.style.top =
            "-20px";


        confetti.style.width =
            "9px";


        confetti.style.height =
            "14px";


        confetti.style.zIndex =
            "9999";


        confetti.style.background =
            `hsl(
                ${Math.random() * 360},
                100%,
                65%
            )`;


        confetti.style.borderRadius =
            "3px";


        const duration =
            2 +
            Math.random() * 2;


        confetti.animate(

            [
                {
                    transform:
                        "translateY(0) rotate(0deg)",
                    opacity:1
                },

                {
                    transform:
                        `translateY(110vh)
                         rotate(720deg)`,

                    opacity:0
                }
            ],

            {
                duration:
                    duration * 1000,

                delay:
                    Math.random() * 800,

                easing:
                    "linear"
            }

        );


        document.body.appendChild(
            confetti
        );


        setTimeout(() => {

            confetti.remove();

        }, 4500);

    }

}


/* =====================================
   FLOATING HEARTS
===================================== */

function createHearts(amount) {

    const hearts = [
        "❤️",
        "💖",
        "💗",
        "💓",
        "✨"
    ];


    for (
        let i = 0;
        i < amount;
        i++
    ) {

        const heart =
            document.createElement(
                "div"
            );


        heart.innerHTML =
            hearts[
                Math.floor(
                    Math.random() *
                    hearts.length
                )
            ];


        heart.style.position =
            "fixed";


        heart.style.left =
            Math.random() * 100 +
            "vw";


        heart.style.bottom =
            "-30px";


        heart.style.fontSize =
            20 +
            Math.random() * 20 +
            "px";


        heart.style.zIndex =
            "9999";


        heart.animate(

            [
                {
                    transform:
                        "translateY(0)",
                    opacity:1
                },

                {
                    transform:
                        `translateY(-110vh)
                         rotate(20deg)`,

                    opacity:0
                }
            ],

            {
                duration:
                    2500 +
                    Math.random() * 1500,

                easing:
                    "ease-out"
            }

        );


        document.body.appendChild(
            heart
        );


        setTimeout(() => {

            heart.remove();

        }, 4500);

    }

}


/* =====================================
   GRAND CELEBRATION
===================================== */

function grandCelebration() {

    /*
       Huge confetti
    */

    createConfetti(150);


    /*
       Floating hearts
    */

    createHearts(40);


    /*
       Repeat celebration
    */

    setTimeout(() => {

        createConfetti(100);

    }, 1800);


    setTimeout(() => {

        createHearts(30);

    }, 3000);

}


/* =====================================
   ENTER KEY SUPPORT
===================================== */

document.addEventListener(
    "keydown",
    function(event) {

        if (
            event.key ===
            "Enter"
        ) {

            const active =
                document.querySelector(
                    ".screen.active"
                );


            if (
                active &&
                active.id ===
                "screen3"
            ) {

                checkBirthday();

            }

        }

    }
);
