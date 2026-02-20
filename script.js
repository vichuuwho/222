let opened = false;
const STAR_IMAGE = "images/star.png"; // Замени на свою картинку звёздочки

// Вылет звёздочек из точки (centerX, centerY)
function launchStars(centerX, centerY, count = 15) {
    const starCount = count;
    const stars = [];

    for (let i = 0; i < starCount; i++) {
        const img = document.createElement("img");
        img.src = STAR_IMAGE;
        img.alt = "";
        img.classList.add("star-burst");

        const angle = (Math.PI * 2 * i) / starCount + Math.random() * 0.5;
        const distance = 80 + Math.random() * 120;
        const endX = Math.cos(angle) * distance;
        const endY = Math.sin(angle) * distance;

        img.style.left = centerX + "px";
        img.style.top = centerY + "px";
        img.style.setProperty("--end-x", endX + "px");
        img.style.setProperty("--end-y", endY + "px");

        document.body.appendChild(img);
        stars.push({ el: img, endX, endY });
    }

    // Анимация через requestAnimationFrame
    requestAnimationFrame(() => {
        stars.forEach(({ el, endX, endY }) => {
            el.style.transition = "transform 1s ease-out, opacity 1s ease-out";
            el.style.transform = `translate(${endX}px, ${endY}px) scale(1.2)`;
            el.style.opacity = "0";
        });

        setTimeout(() => {
            stars.forEach(({ el }) => el.remove());
        }, 1100);
    });
}

function openGift() {
    if (opened) {
        // Уже открыта — тряска + звёзды
        const box = document.getElementById("giftBox");
        const rect = box.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;

        box.classList.remove("shake-burst");
        void box.offsetWidth; // reflow
        box.classList.add("shake-burst");
        launchStars(centerX, centerY, 10);

        setTimeout(() => box.classList.remove("shake-burst"), 500);
        return;
    }

    opened = true;

    const box = document.getElementById("giftBox");
    const image = document.getElementById("boxImage");
    const openText = document.getElementById("openText");
    const message = document.getElementById("message");

    // Тряска с усилением (2.5 сек)
    box.classList.add("shake-intensify");

    setTimeout(() => {
        box.classList.remove("shake-intensify");

        // "выпрыгивание"
        image.style.transform = "scale(1.4)";
        setTimeout(() => {
            image.src = "images/open.jpg";
            image.style.transform = "scale(1)";

            // Звёздочки вылетают из центра коробки
            const rect = box.getBoundingClientRect();
            const centerX = rect.left + rect.width / 2;
            const centerY = rect.top + rect.height / 2;
            launchStars(centerX, centerY, 18);
        }, 150);

        openText.style.opacity = 0;
        message.classList.remove("hidden");

        launchConfetti();
        animateFloatingImages();
    }, 2500); // совпадает с длительностью shake-intensify
}

// Клик / тап (без двойного срабатывания на мобильных)
const giftContainer = document.getElementById("giftContainer");

function handleOpen(e) {
    if (e.type === "touchstart") e.preventDefault();
    openGift();
}

giftContainer.addEventListener("click", handleOpen);
giftContainer.addEventListener("touchstart", handleOpen, { passive: false });

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

// Фоновые звёздочки
function animateFloatingImages() {
    const container = document.getElementById("floatingImages");
    const imgSources = [STAR_IMAGE];
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
            angle += 0.02;
            img.style.transform = `translateX(${Math.sin(angle) * amplitude}px)`;
            requestAnimationFrame(float);
        }

        float();
    }
}
