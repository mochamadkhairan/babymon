/* =================================================
   BABYMON BIRTHDAY WEBSITE
   SECTION 1 - 4
================================================= */


/* =================================================
   ELEMENTS
================================================= */

const openGiftButton =
    document.getElementById("openGiftButton");

const gift =
    document.getElementById("gift");

const openingSection =
    document.getElementById("opening");

const birthdaySection =
    document.getElementById("birthday");

const storySection =
    document.getElementById("story");

const momentsSection =
    document.getElementById("moments");

const music =
    document.getElementById("backgroundMusic");

const musicButton =
    document.getElementById("musicButton");

const heartContainer =
    document.getElementById("heartContainer");

const storyButton =
    document.getElementById("storyButton");

const videoButton =
    document.getElementById("videoButton");

const birthdayPhoto =
    document.getElementById("birthdayPhoto");

const heroPhoto =
    document.querySelector(".hero-photo");


/* =================================================
   MEMORY MODAL
================================================= */

const memoryModal =
    document.getElementById("memoryModal");

const closeMemoryModal =
    document.getElementById("closeMemoryModal");

const memoryModalTitle =
    document.getElementById("memoryModalTitle");

const memoryModalText =
    document.getElementById("memoryModalText");


/* =================================================
   STATE
================================================= */

let musicPlaying = false;

let giftOpened = false;

let heartInterval = null;


/* =================================================
   MEMORY CONTENT
================================================= */

/*
    Nanti bagian ini bisa kamu ganti
    dengan cerita asli kalian.
*/

const memories = {

    memoryOne: {
        title: "That Little Moment",
        text:
            "Some moments may look ordinary, " +
            "but somehow they become the ones " +
            "I want to remember forever."
    },

    memoryTwo: {
        title: "You Looked Cute",
        text:
            "I probably don't say it enough, " +
            "but there are so many random moments " +
            "when I look at you and think, " +
            "'How can someone be this cute?'"
    },

    memoryThree: {
        title: "One Of My Favorites",
        text:
            "I don't need a big occasion to remember you. " +
            "Sometimes one tiny moment is already enough " +
            "to make me smile."
    },

    memoryFour: {
        title: "Just Us",
        text:
            "No special occasion. No perfect setup. " +
            "Just us being us. " +
            "And honestly, those are some of my favorite moments."
    }

};


/* =================================================
   IMAGE FALLBACK
================================================= */

birthdayPhoto.addEventListener("load", () => {

    heroPhoto.classList.add("has-image");

});


birthdayPhoto.addEventListener("error", () => {

    heroPhoto.classList.remove("has-image");

});


/* =================================================
   HELPER:
   IMAGE FALLBACK FOR MULTIPLE IMAGES
================================================= */

const allImages =
    document.querySelectorAll(
        ".timeline-photo img, .polaroid-image img"
    );


allImages.forEach((image) => {

    image.addEventListener("error", () => {

        image.style.display = "none";

    });

});


/* =================================================
   OPEN GIFT
================================================= */

openGiftButton.addEventListener(
    "click",
    openGift
);


gift.addEventListener("click", () => {

    if (!giftOpened) {

        openGift();

    }

});


function openGift() {

    if (giftOpened) {

        return;

    }


    giftOpened = true;


    gift.classList.add("open");


    openGiftButton.disabled = true;

    openGiftButton.style.opacity = "0.5";

    openGiftButton.style.pointerEvents = "none";


    createHearts(18);


    startMusic();


    setTimeout(() => {

        openingSection.classList.add("hide");

        birthdaySection.classList.add("show");


        setTimeout(() => {

            birthdaySection.scrollIntoView({
                behavior: "smooth",
                block: "start"
            });

        }, 100);

    }, 850);


    musicButton.classList.add("visible");

}


/* =================================================
   MUSIC
================================================= */

function startMusic() {

    music.volume = 0.35;


    const playPromise =
        music.play();


    if (playPromise !== undefined) {

        playPromise
            .then(() => {

                musicPlaying = true;

                updateMusicButton();

            })
            .catch(() => {

                musicPlaying = false;

                updateMusicButton();

            });

    }

}


/* =================================================
   MUSIC BUTTON
================================================= */

musicButton.addEventListener(
    "click",
    toggleMusic
);


function toggleMusic() {

    if (musicPlaying) {

        music.pause();

        musicPlaying = false;

    } else {

        const playPromise =
            music.play();


        if (
            playPromise !== undefined
        ) {

            playPromise
                .then(() => {

                    musicPlaying = true;

                    updateMusicButton();

                })
                .catch(() => {

                    musicPlaying = false;

                    updateMusicButton();

                });

        }

    }


    updateMusicButton();

}


function updateMusicButton() {

    if (musicPlaying) {

        musicButton.classList.add(
            "playing"
        );

        musicButton.textContent = "♫";

        musicButton.setAttribute(
            "aria-label",
            "Pause background music"
        );

    } else {

        musicButton.classList.remove(
            "playing"
        );

        musicButton.textContent = "♪";

        musicButton.setAttribute(
            "aria-label",
            "Play background music"
        );

    }

}


/* =================================================
   FLOATING HEARTS
================================================= */

function createHearts(amount = 10) {

    const safeAmount =
        Math.max(
            1,
            Math.min(amount, 30)
        );


    for (
        let i = 0;
        i < safeAmount;
        i++
    ) {

        const heart =
            document.createElement("span");


        heart.className =
            "floating-heart";


        heart.textContent =
            Math.random() > 0.5
                ? "♡"
                : "♥";


        heart.style.left =
            `${Math.random() * 100}%`;


        const size =
            0.7 +
            Math.random() * 0.9;


        heart.style.fontSize =
            `${size}rem`;


        const duration =
            2.5 +
            Math.random() * 2;


        heart.style.animationDuration =
            `${duration}s`;


        heart.style.animationDelay =
            `${Math.random() * 0.7}s`;


        heartContainer.appendChild(
            heart
        );


        setTimeout(() => {

            heart.remove();

        }, (duration + 1) * 1000);

    }

}


/* =================================================
   GO TO STORY
================================================= */

storyButton.addEventListener(
    "click",
    () => {

        storySection.scrollIntoView({
            behavior: "smooth",
            block: "start"
        });

    }
);


/* =================================================
   STORY SECTION OBSERVER
================================================= */

const storyObserver =
    new IntersectionObserver(
        (entries) => {

            entries.forEach((entry) => {

                if (
                    entry.isIntersecting
                ) {

                    storySection.classList.add(
                        "section-visible"
                    );

                }

            });

        },
        {
            threshold: 0.15
        }
    );


storyObserver.observe(
    storySection
);


/* =================================================
   MOMENTS SECTION
================================================= */

const momentsObserver =
    new IntersectionObserver(
        (entries) => {

            entries.forEach((entry) => {

                if (
                    entry.isIntersecting
                ) {

                    momentsSection.classList.add(
                        "section-visible"
                    );

                }

            });

        },
        {
            threshold: 0.15
        }
    );


momentsObserver.observe(
    momentsSection
);


/* =================================================
   MEMORY CARD CLICK
================================================= */

const memoryCards =
    document.querySelectorAll(
        ".memory-card"
    );


memoryCards.forEach((card) => {

    card.addEventListener(
        "click",
        () => {

            openMemory(
                card.dataset.memory
            );

        }
    );


    /*
        Keyboard support:
        Enter / Space
    */

    card.addEventListener(
        "keydown",
        (event) => {

            if (
                event.key === "Enter" ||
                event.key === " "
            ) {

                event.preventDefault();

                openMemory(
                    card.dataset.memory
                );

            }

        }
    );

});


/* =================================================
   OPEN MEMORY
================================================= */

function openMemory(memoryKey) {

    const memory =
        memories[memoryKey];


    if (!memory) {

        return;

    }


    memoryModalTitle.textContent =
        memory.title;


    memoryModalText.textContent =
        memory.text;


    memoryModal.classList.add(
        "open"
    );


    memoryModal.setAttribute(
        "aria-hidden",
        "false"
    );


    document.body.style.overflow =
        "hidden";


    closeMemoryModal.focus();

}


/* =================================================
   CLOSE MEMORY
================================================= */

function closeMemory() {

    memoryModal.classList.remove(
        "open"
    );


    memoryModal.setAttribute(
        "aria-hidden",
        "true"
    );


    document.body.style.overflow =
        "";

}


/* =================================================
   CLOSE BUTTON
================================================= */

closeMemoryModal.addEventListener(
    "click",
    closeMemory
);


/* =================================================
   CLICK OUTSIDE MODAL
================================================= */

memoryModal.addEventListener(
    "click",
    (event) => {

        if (
            event.target.classList.contains(
                "memory-modal-backdrop"
            )
        ) {

            closeMemory();

        }

    }
);


/* =================================================
   ESCAPE KEY
================================================= */

document.addEventListener(
    "keydown",
    (event) => {

        if (
            event.key === "Escape" &&
            memoryModal.classList.contains(
                "open"
            )
        ) {

            closeMemory();

        }

    }
);


/* =================================================
   CONTINUE TO VIDEO
================================================= */

videoButton.addEventListener(
    "click",
    () => {

        const videoSection =
            document.getElementById("video");


        videoSection.scrollIntoView({
            behavior: "smooth",
            block: "start"
        });

    }
);


/* =================================================
   SECTION 5
   CUSTOM VIDEO PLAYER
================================================= */

const birthdayVideo =
    document.getElementById("birthdayVideo");

const customVideoPlayer =
    document.getElementById("customVideoPlayer");

const videoOverlay =
    document.getElementById("videoOverlay");

const videoBigPlay =
    document.getElementById("videoBigPlay");

const videoPlayButton =
    document.getElementById("videoPlayButton");

const videoMuteButton =
    document.getElementById("videoMuteButton");

const videoFullscreenButton =
    document.getElementById(
        "videoFullscreenButton"
    );

const videoProgress =
    document.getElementById("videoProgress");

const videoCurrentTime =
    document.getElementById(
        "videoCurrentTime"
    );

const videoDuration =
    document.getElementById(
        "videoDuration"
    );


/* =================================================
   FORMAT TIME
================================================= */

function formatVideoTime(seconds) {

    if (!isFinite(seconds)) {
        return "00:00";
    }


    const minutes =
        Math.floor(seconds / 60);


    const remainingSeconds =
        Math.floor(seconds % 60);


    return (
        String(minutes).padStart(2, "0") +
        ":" +
        String(remainingSeconds).padStart(2, "0")
    );

}


/* =================================================
   PLAY VIDEO
================================================= */

function playBirthdayVideo() {

    birthdayVideo
        .play()
        .then(() => {

            videoPlayButton.textContent =
                "Ⅱ";

            videoOverlay.classList.add(
                "hidden"
            );

        })
        .catch((error) => {

            console.log(
                "Video could not be played:",
                error
            );

        });

}


/* =================================================
   PAUSE VIDEO
================================================= */

function pauseBirthdayVideo() {

    birthdayVideo.pause();

    videoPlayButton.textContent =
        "▶";

}


/* =================================================
   TOGGLE VIDEO
================================================= */

function toggleBirthdayVideo() {

    if (birthdayVideo.paused) {

        playBirthdayVideo();

    } else {

        pauseBirthdayVideo();

    }

}


/* Center play button */

videoBigPlay.addEventListener(
    "click",
    toggleBirthdayVideo
);


/* Bottom play button */

videoPlayButton.addEventListener(
    "click",
    toggleBirthdayVideo
);


/* Click video itself */

birthdayVideo.addEventListener(
    "click",
    toggleBirthdayVideo
);


/* =================================================
   VIDEO LOADED
================================================= */

birthdayVideo.addEventListener(
    "loadedmetadata",
    () => {

        videoDuration.textContent =
            formatVideoTime(
                birthdayVideo.duration
            );

    }
);


/* =================================================
   VIDEO TIME UPDATE
================================================= */

birthdayVideo.addEventListener(
    "timeupdate",
    () => {

        videoCurrentTime.textContent =
            formatVideoTime(
                birthdayVideo.currentTime
            );


        if (birthdayVideo.duration) {

            const progress =
                (
                    birthdayVideo.currentTime /
                    birthdayVideo.duration
                ) * 100;


            videoProgress.value =
                progress;

        }

    }
);


/* =================================================
   VIDEO PLAY
================================================= */

birthdayVideo.addEventListener(
    "play",
    () => {

        videoPlayButton.textContent =
            "Ⅱ";

        videoOverlay.classList.add(
            "hidden"
        );

    }
);


/* =================================================
   VIDEO PAUSE
================================================= */

birthdayVideo.addEventListener(
    "pause",
    () => {

        videoPlayButton.textContent =
            "▶";

    }
);


/* =================================================
   VIDEO ENDED
================================================= */

birthdayVideo.addEventListener(
    "ended",
    () => {

        videoPlayButton.textContent =
            "↻";

        videoOverlay.classList.remove(
            "hidden"
        );

    }
);


/* =================================================
   PROGRESS BAR
================================================= */

videoProgress.addEventListener(
    "input",
    () => {

        if (!birthdayVideo.duration) {
            return;
        }


        const newTime =
            (
                videoProgress.value / 100
            ) *
            birthdayVideo.duration;


        birthdayVideo.currentTime =
            newTime;

    }
);


/* =================================================
   MUTE
================================================= */

videoMuteButton.addEventListener(
    "click",
    () => {

        birthdayVideo.muted =
            !birthdayVideo.muted;


        videoMuteButton.textContent =
            birthdayVideo.muted
                ? "×"
                : "♫";

    }
);


/* =================================================
   FULLSCREEN
================================================= */

videoFullscreenButton.addEventListener(
    "click",
    async () => {

        try {

            if (
                !document.fullscreenElement
            ) {

                await customVideoPlayer
                    .requestFullscreen();

            } else {

                await document.exitFullscreen();

            }

        } catch (error) {

            console.log(
                "Fullscreen error:",
                error
            );

        }

    }
);


/* =================================================
   SECTION 5 → SECTION 6
================================================= */

const letterButton =
    document.getElementById(
        "letterButton"
    );


letterButton.addEventListener(
    "click",
    () => {

        document
            .getElementById("letter")
            .scrollIntoView({
                behavior: "smooth",
                block: "start"
            });

    }
);


/* =================================================
   SECTION 6
   OPEN LETTER
================================================= */

const letterWrapper =
    document.getElementById(
        "letterWrapper"
    );

const openLetterButton =
    document.getElementById(
        "openLetterButton"
    );

const loveLetter =
    document.getElementById(
        "loveLetter"
    );


let letterOpened = false;


openLetterButton.addEventListener(
    "click",
    () => {

        if (letterOpened) {
            return;
        }


        letterOpened = true;


        letterWrapper.classList.add(
            "open"
        );


        openLetterButton.textContent =
            "Opening... ♡";


        createHearts(10);


        setTimeout(() => {

            loveLetter.classList.add(
                "visible"
            );


            openLetterButton.style.display =
                "none";


            setTimeout(() => {

                loveLetter.scrollIntoView({
                    behavior: "smooth",
                    block: "center"
                });

            }, 400);

        }, 850);

    }
);


/* =================================================
   AMBIENT HEARTS
================================================= */

function startAmbientHearts() {

    if (
        heartInterval !== null
    ) {

        return;

    }


    heartInterval =
        setInterval(() => {

            createHearts(1);

        }, 4000);

}


const birthdayObserver =
    new IntersectionObserver(
        (entries) => {

            entries.forEach((entry) => {

                if (
                    entry.isIntersecting
                ) {

                    startAmbientHearts();

                }

            });

        },
        {
            threshold: 0.25
        }
    );


birthdayObserver.observe(
    birthdaySection
);