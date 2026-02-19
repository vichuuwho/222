let opened = false;

function openGift() {
    if (opened) return;
    opened = true;

    const box = document.getElementById("giftBox");
    const image = document.getElementById("boxImage");

    // добавляем тряску
    box.classList.add("shake");

    // через 1 секунду останавливаем тряску и открываем
    setTimeout(() => {
        box.classList.remove("shake");

        // 🔽 твоя открытая коробка
        image.src = "images/open.jpg";

        document.getElementById("message").classList.remove("hidden");

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

    let pieces = [];

    for (let i = 0; i < 120; i++) {
        pieces.push({
            x: Math.random() * canvas.width,
            y: Math.random() * -canvas.height, // старт строго сверху
            size: Math.random() * 8 + 4,
            speed: Math.random() * 3 + 2
        });
    }

    function update() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        pieces.forEach(p => {
            ctx.fillStyle = "#ffffff";
            ctx.fillRect(p.x, p.y, p.size, p.size);

            p.y += p.speed;

            // если упало вниз — запускаем снова сверху
            if (p.y > canvas.height) {
                p.y = -10;
                p.x = Math.random() * canvas.width;
            }
        });

        requestAnimationFrame(update);
    }

    update();
}
