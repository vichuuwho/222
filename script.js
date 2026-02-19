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

// фикс для мобильных устройств
const giftBox = document.getElementById("giftBox");
giftBox.addEventListener("touchstart", openGift, {passive: true});


// после конфетти
animateFloatingImages();

function animateFloatingImages() {
    const container = document.getElementById("floatingImages");

    const imgSources = [
        "images/star1.png",
        "images/star2.png",
        "images/star3.png",
        "images/star4.png"
    ];

    const count = 25; // количество маленьких картинок

    for (let i = 0; i < count; i++) {
        const img = document.createElement("img");
        img.src = imgSources[Math.floor(Math.random() * imgSources.length)];
        img.classList.add("float-img");

        // случайное начальное положение
        img.style.left = Math.random() * window.innerWidth + "px";
        img.style.top = Math.random() * window.innerHeight + "px";

        container.appendChild(img);

        // анимация движения туда-сюда
        let angle = Math.random() * Math.PI * 2;
        let amplitude = 10 + Math.random() * 10; // 10–20 пикселей

        function float() {
            angle += 0.02 + Math.random() * 0.01; // разная скорость
            img.style.transform = `translateX(${Math.sin(angle) * amplitude}px)`;
            requestAnimationFrame(float);
        }

        float();
    }
}
