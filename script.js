let opened = false;

function openGift() {
    if (opened) return;
    opened = true;

    const box = document.getElementById("giftBox");
    const image = document.getElementById("boxImage");
    const openText = document.getElementById("openText");

    // тряска коробки
    box.classList.add("shake");

    setTimeout(() => {
        box.classList.remove("shake");

        // плавное «выпрыгивание» коробки
        image.style.transform = "scale(1.4)";
        setTimeout(() => {
            image.src = "images/open.jpg"; // открытая коробка
            image.style.transform = "scale(1)"; // обратно к нормальному размеру
        }, 150);

        // надпись исчезает
        openText.style.opacity = 0;

        // показываем поздравления
        document.getElementById("message").classList.remove("hidden");

        launchConfetti();
        animateFloatingImages();
    }, 1000);
}

// фикс для мобильных
const giftContainer = document.getElementById("giftContainer");
giftContainer.addEventListener("touchstart", openGift, {passive: true});

// Конфетти
function launchConfetti() {
    const canvas = document.getElementById("confetti");
    const ctx = canvas.getContext("2d");

    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    const colors = ["#ffffff", "#b7d8b7", "#6b1e2f", "#f9d5d3", "#ffe2b3"];
    let pieces = [];

    for (let i = 0; i < 120; i++) {
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
        pieces.forEach(p => {
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

// Фоновые маленькие картинки
function animateFloatingImages() {
    const container = document.getElementById("floatingImages");
    const imgSources = ["images/star.png"];
    const count = 25;

    for (let i = 0; i < count; i++) {
        const img = document.createElement("img");
        img.src = imgSources[0];
        img.classList.add("float-img");

        img.style.left = Math.random() * window.innerWidth + "px";
        img.style.top = Math.random() * window.innerHeight + "px";

        container.appendChild(img);

        let angle = Math.random() * Math.PI * 2;
        let amplitude = 5 + Math.random() * 5;

        function float() {
            angle += 0.03; // скорость качания
            img.style.transform = `translateX(${Math.sin(angle) * amplitude}px)`;
            requestAnimationFrame(float);
        }

        float();
    }
}
