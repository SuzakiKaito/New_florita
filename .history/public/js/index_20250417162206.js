const slider = document.getElementById('slider');
const slides = document.querySelectorAll('.slide');
let currentIndex = 0;
let startX = 0;
let startY = 0;
let isTouching = false;

function updateSlides() {
  slides.forEach((slide, index) => {
    slide.style.transform = `translateY(${(index - currentIndex) * 100}%)`;
  });
}

// 初期位置
updateSlides();

function handleStart(x, y) {
  startX = x;
  startY = y;
  isTouching = true;
}

function handleMove(x, y) {
  if (!isTouching) return;

  const diffX = x - startX;
  const diffY = y - startY;

  if (Math.abs(diffX) > Math.abs(diffY) && Math.abs(diffX) > 50) {
    // 横スワイプ（詳細）
    isTouching = false;
    alert(`詳細ページに遷移（画像${currentIndex + 1}）`);
  } else if (Math.abs(diffY) > Math.abs(diffX) && Math.abs(diffY) > 50) {
    // 縦スワイプ（画像切り替え）
    if (diffY > 0 && currentIndex > 0) {
      currentIndex--;
    } else if (diffY < 0 && currentIndex < slides.length - 1) {
      currentIndex++;
    }
    updateSlides();
    isTouching = false;
  }
}

// タッチイベント
slider.addEventListener('touchstart', (e) => {
  handleStart(e.touches[0].clientX, e.touches[0].clientY);
});

slider.addEventListener('touchmove', (e) => {
  handleMove(e.touches[0].clientX, e.touches[0].clientY);
});

// PC対応（マウス操作）
slider.addEventListener('mousedown', (e) => {
  handleStart(e.clientX, e.clientY);
});

slider.addEventListener('mousemove', (e) => {
  if (e.buttons !== 1) return; // 左クリックのみ
  handleMove(e.clientX, e.clientY);
});
