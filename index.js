let balloon = document.getElementById("balloon");
let pump = document.getElementById("pump");
let balloonImages = [
    "Graphics/Symbol100003.png",
    "Graphics/Symbol100005.png",
    "Graphics/Symbol100004.png",
    "Graphics/Symbol100007.png",
    "Graphics/Symbol100001.png"
];
let maxInflation = 150; // Maximum width and height before flying
let isFlying = false;
let currentBalloonIndex = 0; // let keep it 0 at initial

function initBalloon() {
    if (currentBalloonIndex >= balloonImages.length) {
        currentBalloonIndex = 0; // Reset to first image if all images are used
    }

    balloon.style.backgroundImage = `url(${balloonImages[currentBalloonIndex]})`;
    balloon.style.width = "50px";
    balloon.style.height = "80px";
    balloon.style.display = "block";
    balloon.style.left = "75.5%";  // Reset to initial left position
    balloon.style.bottom = "200px"; // Reset to initial bottom position

    isFlying = false;//false stopping the balloon from flying
    balloon.classList.remove("burst"); // Ensure burst class is removed for the next balloon
    balloon.style.transition = "none";  // 
    balloon.style.top = ""; // Clear any random position set previously
}

function startFlying(element) {
    isFlying = true;
    moveBalloonRandomly(element);
}

function moveBalloonRandomly(element) {
    if (!isFlying) return;

    let gameContainer = document.getElementById("gameContainer");
    let containerWidth = gameContainer.clientWidth;
    let containerHeight = gameContainer.clientHeight;

    let randomX = Math.random() * (containerWidth - element.clientWidth);
    let randomY = Math.random() * (containerHeight - element.clientHeight);

    element.style.left = randomX + "px";
    element.style.top = randomY + "px";

    setTimeout(() => moveBalloonRandomly(element), 1000);
}

function burstBalloon(element) {
    element.classList.add("burst");
    isFlying = false;
    setTimeout(() => {
        element.style.display = "none";
        currentBalloonIndex++;
        initBalloon(); // Initialize the next balloon after bursting
    }, 500); // Duration of the burst animation
}

pump.addEventListener("click", () => {
    if (!isFlying) {
        let currentWidth = parseInt(window.getComputedStyle(balloon).width);
        let currentHeight = parseInt(window.getComputedStyle(balloon).height);

        if (currentWidth < maxInflation && currentHeight < maxInflation) {
            balloon.style.width = currentWidth + 10 + "px";
            balloon.style.height = currentHeight + 10 + "px";
        } else {
            startFlying(balloon);
        }
    }
});

balloon.addEventListener("click", () => {
    if (isFlying) {
        burstBalloon(balloon);
    }
});

// Initialize the first balloon
initBalloon();
