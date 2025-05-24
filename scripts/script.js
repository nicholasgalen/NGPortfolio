const video1 = document.getElementById('projectVideo1');
const video2 = document.getElementById('projectVideo2');
const video3 = document.getElementById('projectVideo3');

const videoList = [video1, video2, video3];

function handleVideoInteraction(video) {
    const isMobile = window.matchMedia("(max-width: 480px)").matches;

    if (!isMobile) {
        video.addEventListener("mouseover", function() {
            video.play();
            if (hoverSign) hoverSign.classList.add("active");
        });

        video.addEventListener("mouseout", function() {
            video.pause();
            if (hoverSign) hoverSign.classList.remove("active");
        });
    } else {
        let isPlaying = false;

        video.addEventListener("click", function () {
            if (isPlaying) {
                video.pause();
            } else {
                video.play();
            }
            isPlaying = !isPlaying;
        });
    }
}

videoList.forEach(handleVideoInteraction);