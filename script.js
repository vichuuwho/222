let opened = false;

function openGift() {
    if (opened) return;
    opened = true;

    const box = document.getElementById("giftBox");
    const image = document.getElementById("boxImage");
    const openText = document.querySelector(".open-text");

    // добавляем тряску
    box.classList.add("shake");

    // через 1 секунду останавливаем тряску и открываем
    setTimeout(() => {
        box.classList.remove("shake");

        // 🔽 твоя открытая коробка
        image.src = "images/box-open.png";

        document.getElementById("message").classList.remove("hidden");

        // надпись "Открой!" постепенно исчезает
        openText.style.transition = "opacity 1.5s ease";
        openText.style.opacity = 0;

        launchConfetti();
    }, 1000);
}

function launchConfetti() {
    const canvas = document.getElementById("confetti");
    const ctx = canvas.getContext("2d");

    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    const colors = ["#ffffff", "#b7d8b7", "#6b1e2f", "#f9d5d3", "#ffe2b3"]; // белый, пастельно-зелёный, бордовый, светлый розовый, светлый оранжевый

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
