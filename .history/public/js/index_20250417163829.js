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
function handleTouchEnd(event) {
  const endY = event.changedTouches ? event.changedTouches[0].clientY : event.clientY;
  const endX = event.changedTouches ? event.changedTouches[0].clientX : event.clientX;

  const diffY = endY - startY;
  const diffX = endX - startX;

  if (Math.abs(diffY) > Math.abs(diffX) && Math.abs(diffY) > threshold) {
    if (diffY < 0) {
      // 上にスワイプ → 次の画像
      currentIndex = (currentIndex + 1) % slides.length;
    } else {
      // 下にスワイプ → 前の画像
      currentIndex = (currentIndex - 1 + slides.length) % slides.length;
    }
    updateSlides();
  } else if (Math.abs(diffX) > threshold) {
    // 横スワイプはそのままアラート（詳細ページ遷移）
    alert("詳細ページに遷移します（仮）");
  }
}

function shuffleSlides() {
  const container = document.getElementById('slider');
  const slideArray = Array.from(container.children);
  const shuffled = slideArray.sort(() => Math.random() - 0.5);

  shuffled.forEach(slide => container.appendChild(slide));
}

shuffleSlides();
updateSlides(); // 初期化


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
