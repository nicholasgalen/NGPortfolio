const video1 = document.getElementById('projectVideo1');
const video2 = document.getElementById('projectVideo2');
const video3 = document.getElementById('projectVideo3');

const hoverSign = document.querySelector('.hover-sign');

const videoList =[video1, video2, video3];

const projectLinks = [
  "https://github.com/Cartbutler",
  "https://github.com/nicholasgalen/to-be-finished",
  "https://brostudyToBeFinished.com"
];

videoList.forEach (function(video){
    video.addEventListener("mouseover", function(){
        video.play()
        hoverSign.classList.add("active")
    })
    video.addEventListener("mouseout", function(){
    video.pause();
    hoverSign.classList.remove("active")
})
})

document.querySelectorAll(".scroll-to-contact").forEach(button => {
  button.addEventListener("click", function () {
    document.getElementById("contact").scrollIntoView({ behavior: "smooth" });
  });
});

const buttons = document.querySelectorAll(".project-link");
  
buttons.forEach((button, index) => {
  button.addEventListener("click", () => {
    window.open(projectLinks[index], "_blank");
  });
});
