let opened = false;
const STAR_IMAGE = "images/star.png";

// Звёздочки вылетают из точки (centerX, centerY)
function launchStars(centerX, centerY, count) {
    count = count || 12;
    for (var i = 0; i < count; i++) {
        var img = document.createElement("img");
        img.src = STAR_IMAGE;
        img.alt = "";
        img.className = "star-burst";

        var angle = (Math.PI * 2 * i) / count + Math.random() * 0.5;
        var distance = 80 + Math.random() * 100;
        var ex = Math.cos(angle) * distance;
        var ey = Math.sin(angle) * distance;

        img.style.left = centerX + "px";
        img.style.top = centerY + "px";

        document.body.appendChild(img);

        (function(elm, x, y) {
            requestAnimationFrame(function() {
                elm.style.transition = "transform 1s ease-out, opacity 1s ease-out";
                elm.style.transform = "translate(" + x + "px, " + y + "px) scale(1.2)";
                elm.style.opacity = "0";
            });
            setTimeout(function() { elm.remove(); }, 1100);
        })(img, ex, ey);
    }
}

function openGift() {
    var box = document.getElementById("giftBox");
    var rect = box.getBoundingClientRect();
    var centerX = rect.left + rect.width / 2;
    var centerY = rect.top + rect.height / 2;

    if (opened) {
        box.classList.remove("shake-burst");
        box.offsetWidth;
        box.classList.add("shake-burst");
        launchStars(centerX, centerY, 10);
        setTimeout(function() { box.classList.remove("shake-burst"); }, 500);
        return;
    }

    opened = true;

    var image = document.getElementById("boxImage");
    var openText = document.getElementById("openText");
    var message = document.getElementById("message");

    box.classList.add("shake-intensify");

    launchStars(centerX, centerY, 4);
    setTimeout(function() { launchStars(centerX, centerY, 5); }, 600);
    setTimeout(function() { launchStars(centerX, centerY, 6); }, 1200);
    setTimeout(function() { launchStars(centerX, centerY, 8); }, 1800);
    setTimeout(function() { launchStars(centerX, centerY, 10); }, 2200);

    setTimeout(function() {
        box.classList.remove("shake-intensify");

        image.style.transform = "scale(1.4)";
        setTimeout(function() {
            image.src = "images/open.jpg";
            image.style.transform = "scale(1)";

            rect = box.getBoundingClientRect();
            centerX = rect.left + rect.width / 2;
            centerY = rect.top + rect.height / 2;
            launchStars(centerX, centerY, 15);
        }, 150);

        openText.style.opacity = "0";

        setTimeout(function() {
            document.getElementById("tapText").classList.add("visible");
        }, 1100);

        message.classList.remove("hidden");

        launchConfetti();
        animateFloatingImages();
    }, 2500);
}

var giftContainer = document.getElementById("giftContainer");
giftContainer.addEventListener("touchstart", openGift, { passive: true });
giftContainer.addEventListener("click", openGift);

function launchConfetti() {
    var canvas = document.getElementById("confetti");
    var ctx = canvas.getContext("2d");

    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    var colors = ["#ffffff", "#b7d8b7", "#6b1e2f", "#f9d5d3", "#ffe2b3"];
    var pieces = [];

    for (var i = 0; i < 120; i++) {
        pieces.push({
            x: Math.random() * canvas.width,
            y: Math.random() * -canvas.height,
            size: Math.random() * 8 + 4,
            speed: Math.random() * 2 + 2,
            color: colors[Math.floor(Math.random() * colors.length)]
        });
    }

    function update() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        pieces.forEach(function(p) {
            ctx.fillStyle = p.color;
            ctx.fillRect(p.x, p.y, p.size, p.size);
            p.y += p.speed;
            if (p.y > canvas.height) {
                p.y = -10;
                p.x = Math.random() * canvas.width;
            }
        });
        requestAnimationFrame(update);
    }

    update();
}

function animateFloatingImages() {
    var container = document.getElementById("floatingImages");
    var count = 25;

    for (var i = 0; i < count; i++) {
        var img = document.createElement("img");
        img.src = STAR_IMAGE;
        img.className = "float-img";

        img.style.left = Math.random() * window.innerWidth + "px";
        img.style.top = Math.random() * window.innerHeight + "px";
        img.style.setProperty("--sway-x", (2 + Math.random() * 3) + "px");
        img.style.setProperty("--sway-y", (1 + Math.random() * 2) + "px");
        img.style.animationDelay = (Math.random() * 2) + "s";

        container.appendChild(img);
    }
}
