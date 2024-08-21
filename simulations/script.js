// DOM manipulation functions
function createDiv(name, img_url, iframe_link) {
  const containerDiv = document.createElement('div');
  containerDiv.className = 'list-item';
  containerDiv.dataset.iframeLink = iframe_link;

  const itemDiv = document.createElement('div');
  itemDiv.className = 'item';
  itemDiv.style.backgroundImage = `url('${img_url}')`;
  containerDiv.appendChild(itemDiv);
  
  const span = document.createElement('span');
  span.textContent = name;
  
  const returningDiv = document.createElement('div');
  returningDiv.appendChild(containerDiv);
  returningDiv.appendChild(span);
  returningDiv.className = 'returningDiv';

  containerDiv.addEventListener('click', function(event) {
    showIframe(this.dataset.iframeLink);
  });

  return returningDiv;
}

function showIframe(iframeLink) {
  const iframe = document.querySelector('.rezizable-iframe');
  iframe.src = iframeLink;
  const container = document.querySelector('.container-iframe');
  const overlay = document.querySelector('.overlay');
  
  // Show the container and overlay
  container.style.display = 'flex';
  overlay.style.display = 'block';
  
  document.body.style.overflow = 'hidden';
}

function hideIframe() {
  const container = document.querySelector('.container-iframe');
  const overlay = document.querySelector('.overlay');
  container.style.display = 'none';
  overlay.style.display = 'none';
  document.body.style.overflow = 'auto';
}

// Main functionality
function start(options) {
  const iframe = document.querySelector('.rezizable-iframe');
  const fullscreenBtn = document.getElementById('fullscreenBtn');
  const escButton = document.getElementById('Esc');
  
  fullscreenBtn.addEventListener('click', function() {
    if (iframe.requestFullscreen) {
      iframe.requestFullscreen();
    } else if (iframe.mozRequestFullScreen) {
      iframe.mozRequestFullScreen();
    } else if (iframe.webkitRequestFullscreen) {
      iframe.webkitRequestFullscreen();
    } else if (iframe.msRequestFullscreen) {
      iframe.msRequestFullscreen();
    }
  });

  escButton.addEventListener('click', hideIframe);
  
  const overlay = document.querySelector('.overlay');
  overlay.addEventListener('click', hideIframe);

  displaySimulations();
}

function displaySimulations(){
  const container = document.getElementById('main');
  const allOptionsEnabled = Object.values(options).every(val => val === true);
  phetSimulationsData.forEach(item => {
    if (allOptionsEnabled || options[item.lesson_type]) {
      const div = createDiv(item.name, item.img_url, item.iframe_url);
      container.appendChild(div);
    }
  });
}

// Filter and restart functions
function updateOptionsAndRestart(filterName, isChecked) {
  options[filterName] = isChecked;
  document.getElementById('main').innerHTML = '';
  start(options);
}

function initializeApp() {
  const checkboxes = document.querySelectorAll('.checkbox-container input[type="checkbox"]');
  checkboxes.forEach(checkbox => {
    const filterName = checkbox.id.replace('-checkbox', '').toLowerCase();
    checkbox.checked = true;
    
    checkbox.addEventListener('change', function() {
      updateOptionsAndRestart(filterName, this.checked);
    });
  });
  const container = document.querySelector('.container-iframe');
  container.style.display = 'none';

  start(options);
}

// Initialize the application
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initializeApp);
} else {
  initializeApp();
}

// Global variables
let options = {
  physics: true,
  chemistry: true,
  math: true,
  biology: true
};

let phetSimulationsData = [
  {
      "index": 0,
      "name": "Хувьсагчийн төв",
      "img_url": "https://phet.colorado.edu/sims/html/center-and-variability/latest/center-and-variability-420.png",
      "iframe_url": "https://phet.colorado.edu/sims/html/center-and-variability/latest/center-and-variability_mn.html",
      "lesson_type": "math"
  },
  {
      "index": 1,
      "name": "Цөмийг байгуул",
      "img_url": "https://phet.colorado.edu/sims/html/build-a-nucleus/latest/build-a-nucleus-420.png",
      "iframe_url": "https://phet.colorado.edu/sims/html/build-a-nucleus/latest/build-a-nucleus_mn.html",
      "lesson_type": "chemistry"
  },
  {
      "index": 2,
      "name": "Миний Нарын Систем",
      "img_url": "https://phet.colorado.edu/sims/html/my-solar-system/latest/my-solar-system-420.png",
      "iframe_url": "https://phet.colorado.edu/sims/html/my-solar-system/latest/my-solar-system_mn.html",
      "lesson_type": "physics"
  },
  {
      "index": 3,
      "name": "Графикын Тооцоолол",
      "img_url": "https://phet.colorado.edu/sims/html/calculus-grapher/latest/calculus-grapher-420.png",
      "iframe_url": "https://phet.colorado.edu/sims/html/calculus-grapher/latest/calculus-grapher_mn.html",
      "lesson_type": "math"
  },
  {
      "index": 4,
      "name": "Number Compare",
      "img_url": "https://phet.colorado.edu/sims/html/number-compare/latest/number-compare-420.png",
      "iframe_url": "https://phet.colorado.edu/sims/html/number-compare/latest/number-compare_mn.html",
      "lesson_type": "math"
  },
  {
      "index": 5,
      "name": "Тоогоор Тогло",
      "img_url": "https://phet.colorado.edu/sims/html/number-play/latest/number-play-420.png",
      "iframe_url": "https://phet.colorado.edu/sims/html/number-play/latest/number-play_mn.html",
      "lesson_type": "math"
  },
  {
      "index": 6,
      "name": "Хүлэмжийн хийн нөлөө",
      "img_url": "https://phet.colorado.edu/sims/html/greenhouse-effect/latest/greenhouse-effect-420.png",
      "iframe_url": "https://phet.colorado.edu/sims/html/greenhouse-effect/latest/greenhouse-effect_mn.html",
      "lesson_type": "biology"
  },
  {
      "index": 7,
      "name": "Геометр Оптик: Үндсэн",
      "img_url": "https://phet.colorado.edu/sims/html/geometric-optics-basics/latest/geometric-optics-basics-420.png",
      "iframe_url": "https://phet.colorado.edu/sims/html/geometric-optics-basics/latest/geometric-optics-basics_mn.html",
      "lesson_type": "physics"
  },
  {
      "index": 8,
      "name": "Дундаж: Харилцах савны Тэнцвэр",
      "img_url": "https://phet.colorado.edu/sims/html/mean-share-and-balance/latest/mean-share-and-balance-420.png",
      "iframe_url": "https://phet.colorado.edu/sims/html/mean-share-and-balance/latest/mean-share-and-balance_mn.html",
      "lesson_type": "physics"
  },
  {
      "index": 9,
      "name": "Геометр Оптик",
      "img_url": "https://phet.colorado.edu/sims/html/geometric-optics/latest/geometric-optics-420.png",
      "iframe_url": "https://phet.colorado.edu/sims/html/geometric-optics/latest/geometric-optics_mn.html",
      "lesson_type": "physics"
  },
  {
      "index": 10,
      "name": "Нягт",
      "img_url": "https://phet.colorado.edu/sims/html/density/latest/density-420.png",
      "iframe_url": "https://phet.colorado.edu/sims/html/density/latest/density_mn.html",
      "lesson_type": "physics"
  },
  {
      "index": 11,
      "name": "ХГ-ийн хэлээ угсрах бүрдэл",
      "img_url": "https://phet.colorado.edu/sims/html/circuit-construction-kit-ac/latest/circuit-construction-kit-ac-420.png",
      "iframe_url": "https://phet.colorado.edu/sims/html/circuit-construction-kit-ac/latest/circuit-construction-kit-ac_mn.html",
      "lesson_type": "physics"
  },
  {
      "index": 12,
      "name": "ХГ-ийн хэлхээ угсрах бүрдэл - ВирЛаб",
      "img_url": "https://phet.colorado.edu/sims/html/circuit-construction-kit-ac-virtual-lab/latest/circuit-construction-kit-ac-virtual-lab-420.png",
      "iframe_url": "https://phet.colorado.edu/sims/html/circuit-construction-kit-ac-virtual-lab/latest/circuit-construction-kit-ac-virtual-lab_mn.html",
      "lesson_type": "physics"
  },
  {
      "index": 13,
      "name": "Хэлбэлзэх горим",
      "img_url": "https://phet.colorado.edu/sims/html/normal-modes/latest/normal-modes-420.png",
      "iframe_url": "https://phet.colorado.edu/sims/html/normal-modes/latest/normal-modes_mn.html",
      "lesson_type": "physics"
  },
  {
      "index": 14,
      "name": "Фурье: Долгион бүтээх",
      "img_url": "https://phet.colorado.edu/sims/html/fourier-making-waves/latest/fourier-making-waves-420.png",
      "iframe_url": "https://phet.colorado.edu/sims/html/fourier-making-waves/latest/fourier-making-waves_mn.html",
      "lesson_type": "math"
  },
  {
      "index": 15,
      "name": "Тоон шулуун: Зай",
      "img_url": "https://phet.colorado.edu/sims/html/number-line-distance/latest/number-line-distance-420.png",
      "iframe_url": "https://phet.colorado.edu/sims/html/number-line-distance/latest/number-line-distance_mn.html",
      "lesson_type": "math"
  },
  {
      "index": 16,
      "name": "Харьцаа ба Пропорц",
      "img_url": "https://phet.colorado.edu/sims/html/ratio-and-proportion/latest/ratio-and-proportion-420.png",
      "iframe_url": "https://phet.colorado.edu/sims/html/ratio-and-proportion/latest/ratio-and-proportion_mn.html",
      "lesson_type": "math"
  },
  {
      "index": 17,
      "name": "Мөргөлдөөний Лаб",
      "img_url": "https://phet.colorado.edu/sims/html/collision-lab/latest/collision-lab-420.png",
      "iframe_url": "https://phet.colorado.edu/sims/html/collision-lab/latest/collision-lab_mn.html",
      "lesson_type": "physics"
  },
  {
      "index": 18,
      "name": "Тоон шулуун: Үйлдэл",
      "img_url": "https://phet.colorado.edu/sims/html/number-line-operations/latest/number-line-operations-420.png",
      "iframe_url": "https://phet.colorado.edu/sims/html/number-line-operations/latest/number-line-operations_mn.html",
      "lesson_type": "math"
  },
  {
      "index": 19,
      "name": "Тэшүүрчний Энергийн Парк",
      "img_url": "https://phet.colorado.edu/sims/html/energy-skate-park/latest/energy-skate-park-420.png",
      "iframe_url": "https://phet.colorado.edu/sims/html/energy-skate-park/latest/energy-skate-park_mn.html",
      "lesson_type": "physics"
  },
  {
      "index": 20,
      "name": "Молекул бүтээх",
      "img_url": "https://phet.colorado.edu/sims/html/build-a-molecule/latest/build-a-molecule-420.png",
      "iframe_url": "https://phet.colorado.edu/sims/html/build-a-molecule/latest/build-a-molecule_mn.html",
      "lesson_type": "chemistry"
  },
  {
      "index": 21,
      "name": "Байгалийн Селекц",
      "img_url": "https://phet.colorado.edu/sims/html/natural-selection/latest/natural-selection-420.png",
      "iframe_url": "https://phet.colorado.edu/sims/html/natural-selection/latest/natural-selection_mn.html",
      "lesson_type": "biology"
  },
  {
      "index": 22,
      "name": "Тоон шулуун: Бүхэл",
      "img_url": "https://phet.colorado.edu/sims/html/number-line-integers/latest/number-line-integers-420.png",
      "iframe_url": "https://phet.colorado.edu/sims/html/number-line-integers/latest/number-line-integers_mn.html",
      "lesson_type": "math"
  },
  {
      "index": 23,
      "name": "Векторын Нийлбэр: Томъёо",
      "img_url": "https://phet.colorado.edu/sims/html/vector-addition-equations/latest/vector-addition-equations-420.png",
      "iframe_url": "https://phet.colorado.edu/sims/html/vector-addition-equations/latest/vector-addition-equations_mn.html",
      "lesson_type": "math"
  },
  {
      "index": 24,
      "name": "Векторын Нийлбэр",
      "img_url": "https://phet.colorado.edu/sims/html/vector-addition/latest/vector-addition-420.png",
      "iframe_url": "https://phet.colorado.edu/sims/html/vector-addition/latest/vector-addition_mn.html",
      "lesson_type": "math"
  },
  {
      "index": 25,
      "name": "Муруйг тодорхойлох",
      "img_url": "https://phet.colorado.edu/sims/html/curve-fitting/latest/curve-fitting-420.png",
      "iframe_url": "https://phet.colorado.edu/sims/html/curve-fitting/latest/curve-fitting_mn.html",
      "lesson_type": "math"
  },
  {
      "index": 26,
      "name": "Гравитацын Хүч Лаб: Үндсэн",
      "img_url": "https://phet.colorado.edu/sims/html/gravity-force-lab-basics/latest/gravity-force-lab-basics-420.png",
      "iframe_url": "https://phet.colorado.edu/sims/html/gravity-force-lab-basics/latest/gravity-force-lab-basics_mn.html",
      "lesson_type": "physics"
  },
  {
      "index": 27,
      "name": "Долгион Танилц",
      "img_url": "https://phet.colorado.edu/sims/html/waves-intro/latest/waves-intro-420.png",
      "iframe_url": "https://phet.colorado.edu/sims/html/waves-intro/latest/waves-intro_mn.html",
      "lesson_type": "physics"
  },
  {
      "index": 28,
      "name": "Нэвчилт",
      "img_url": "https://phet.colorado.edu/sims/html/diffusion/latest/diffusion-420.png",
      "iframe_url": "https://phet.colorado.edu/sims/html/diffusion/latest/diffusion_mn.html",
      "lesson_type": "chemistry"
  },
  {
      "index": 29,
      "name": "Хийтэй Танилц",
      "img_url": "https://phet.colorado.edu/sims/html/gases-intro/latest/gases-intro-420.png",
      "iframe_url": "https://phet.colorado.edu/sims/html/gases-intro/latest/gases-intro_mn.html",
      "lesson_type": "physics"
  },
  {
      "index": 30,
      "name": "Хийн Шинж",
      "img_url": "https://phet.colorado.edu/sims/html/gas-properties/latest/gas-properties-420.png",
      "iframe_url": "https://phet.colorado.edu/sims/html/gas-properties/latest/gas-properties_mn.html",
      "lesson_type": "physics"
  },
  {
      "index": 31,
      "name": "Хар биеийн Спектр",
      "img_url": "https://phet.colorado.edu/sims/html/blackbody-spectrum/latest/blackbody-spectrum-420.png",
      "iframe_url": "https://phet.colorado.edu/sims/html/blackbody-spectrum/latest/blackbody-spectrum_mn.html",
      "lesson_type": "physics"
  },
  {
      "index": 32,
      "name": "Масс ба Пүрш: Үндсэн",
      "img_url": "https://phet.colorado.edu/sims/html/masses-and-springs-basics/latest/masses-and-springs-basics-420.png",
      "iframe_url": "https://phet.colorado.edu/sims/html/masses-and-springs-basics/latest/masses-and-springs-basics_mn.html",
      "lesson_type": "physics"
  },
  {
      "index": 33,
      "name": "Энергийн Хэлбэрүүд ба Хувирлууд",
      "img_url": "https://phet.colorado.edu/sims/html/energy-forms-and-changes/latest/energy-forms-and-changes-420.png",
      "iframe_url": "https://phet.colorado.edu/sims/html/energy-forms-and-changes/latest/energy-forms-and-changes_mn.html",
      "lesson_type": "physics"
  },
  {
      "index": 34,
      "name": "Долгионы Интерференц",
      "img_url": "https://phet.colorado.edu/sims/html/wave-interference/latest/wave-interference-420.png",
      "iframe_url": "https://phet.colorado.edu/sims/html/wave-interference/latest/wave-interference_mn.html",
      "lesson_type": "physics"
  },
  {
      "index": 35,
      "name": "Бутархай: Холимог Тоо",
      "img_url": "https://phet.colorado.edu/sims/html/fractions-mixed-numbers/latest/fractions-mixed-numbers-420.png",
      "iframe_url": "https://phet.colorado.edu/sims/html/fractions-mixed-numbers/latest/fractions-mixed-numbers_mn.html",
      "lesson_type": "math"
  },
  {
      "index": 36,
      "name": "Бутархай: Тайлбар",
      "img_url": "https://phet.colorado.edu/sims/html/fractions-intro/latest/fractions-intro-420.png",
      "iframe_url": "https://phet.colorado.edu/sims/html/fractions-intro/latest/fractions-intro_mn.html",
      "lesson_type": "math"
  },
  {
      "index": 37,
      "name": "Бутархайг Бүтээх",
      "img_url": "https://phet.colorado.edu/sims/html/build-a-fraction/latest/build-a-fraction-420.png",
      "iframe_url": "https://phet.colorado.edu/sims/html/build-a-fraction/latest/build-a-fraction_mn.html",
      "lesson_type": "math"
  },
  {
      "index": 38,
      "name": "Бутархай: Тэнцэтгэл",
      "img_url": "https://phet.colorado.edu/sims/html/fractions-equality/latest/fractions-equality-420.png",
      "iframe_url": "https://phet.colorado.edu/sims/html/fractions-equality/latest/fractions-equality_mn.html",
      "lesson_type": "math"
  },
  {
      "index": 39,
      "name": "Кулоны Хууль",
      "img_url": "https://phet.colorado.edu/sims/html/coulombs-law/latest/coulombs-law-420.png",
      "iframe_url": "https://phet.colorado.edu/sims/html/coulombs-law/latest/coulombs-law_mn.html",
      "lesson_type": "physics"
  },
  {
      "index": 40,
      "name": "Квадрат Функцын График",
      "img_url": "https://phet.colorado.edu/sims/html/graphing-quadratics/latest/graphing-quadratics-420.png",
      "iframe_url": "https://phet.colorado.edu/sims/html/graphing-quadratics/latest/graphing-quadratics_mn.html",
      "lesson_type": "math"
  },
  {
      "index": 41,
      "name": "Масс ба Пүрш",
      "img_url": "https://phet.colorado.edu/sims/html/masses-and-springs/latest/masses-and-springs-420.png",
      "iframe_url": "https://phet.colorado.edu/sims/html/masses-and-springs/latest/masses-and-springs_mn.html",
      "lesson_type": "physics"
  },
  {
      "index": 42,
      "name": "Тэнцэтгэл Судлах: Хоёр Хувьсагч",
      "img_url": "https://phet.colorado.edu/sims/html/equality-explorer-two-variables/latest/equality-explorer-two-variables-420.png",
      "iframe_url": "https://phet.colorado.edu/sims/html/equality-explorer-two-variables/latest/equality-explorer-two-variables_mn.html",
      "lesson_type": "math"
  },
  {
      "index": 43,
      "name": "Тэнцэтгэл Судлах: Үндсэн",
      "img_url": "https://phet.colorado.edu/sims/html/equality-explorer-basics/latest/equality-explorer-basics-420.png",
      "iframe_url": "https://phet.colorado.edu/sims/html/equality-explorer-basics/latest/equality-explorer-basics_mn.html",
      "lesson_type": "math"
  },
  {
      "index": 44,
      "name": "Тэнцэтгэл Судлах",
      "img_url": "https://phet.colorado.edu/sims/html/equality-explorer/latest/equality-explorer-420.png",
      "iframe_url": "https://phet.colorado.edu/sims/html/equality-explorer/latest/equality-explorer_mn.html",
      "lesson_type": "math"
  },
  {
      "index": 45,
      "name": "Талбайн загварын Алгебр",
      "img_url": "https://phet.colorado.edu/sims/html/area-model-algebra/latest/area-model-algebra-420.png",
      "iframe_url": "https://phet.colorado.edu/sims/html/area-model-algebra/latest/area-model-algebra_mn.html",
      "lesson_type": "math"
  },
  {
      "index": 46,
      "name": "Талбайн Загвар Бутархайгаар",
      "img_url": "https://phet.colorado.edu/sims/html/area-model-decimals/latest/area-model-decimals-420.png",
      "iframe_url": "https://phet.colorado.edu/sims/html/area-model-decimals/latest/area-model-decimals_mn.html",
      "lesson_type": "math"
  },
  {
      "index": 47,
      "name": "Талбайн Загварын Үржвэр",
      "img_url": "https://phet.colorado.edu/sims/html/area-model-multiplication/latest/area-model-multiplication-420.png",
      "iframe_url": "https://phet.colorado.edu/sims/html/area-model-multiplication/latest/area-model-multiplication_mn.html",
      "lesson_type": "math"
  },
  {
      "index": 48,
      "name": "Талбайн Загварын Танилцуулга",
      "img_url": "https://phet.colorado.edu/sims/html/area-model-introduction/latest/area-model-introduction-420.png",
      "iframe_url": "https://phet.colorado.edu/sims/html/area-model-introduction/latest/area-model-introduction_mn.html",
      "lesson_type": "math"
  },
  {
      "index": 49,
      "name": "Генийг Илэрхийлэх Зүйлс",
      "img_url": "https://phet.colorado.edu/sims/html/gene-expression-essentials/latest/gene-expression-essentials-420.png",
      "iframe_url": "https://phet.colorado.edu/sims/html/gene-expression-essentials/latest/gene-expression-essentials_mn.html",
      "lesson_type": "biology"
  },
  {
      "index": 50,
      "name": "Конденсатортай лаборатори: Үндэс",
      "img_url": "https://phet.colorado.edu/sims/html/capacitor-lab-basics/latest/capacitor-lab-basics-420.png",
      "iframe_url": "https://phet.colorado.edu/sims/html/capacitor-lab-basics/latest/capacitor-lab-basics_mn.html",
      "lesson_type": "physics"
  },
  {
      "index": 51,
      "name": "Хэлхээний Иж бүрдэл: Тогтмол гүйдэл - Виртуаль Лаб",
      "img_url": "https://phet.colorado.edu/sims/html/circuit-construction-kit-dc-virtual-lab/latest/circuit-construction-kit-dc-virtual-lab-420.png",
      "iframe_url": "https://phet.colorado.edu/sims/html/circuit-construction-kit-dc-virtual-lab/latest/circuit-construction-kit-dc-virtual-lab_mn.html",
      "lesson_type": "physics"
  },
  {
      "index": 52,
      "name": "Хэлхээний Иж бүрдэл: Тогтмол Гүйдэл",
      "img_url": "https://phet.colorado.edu/sims/html/circuit-construction-kit-dc/latest/circuit-construction-kit-dc-420.png",
      "iframe_url": "https://phet.colorado.edu/sims/html/circuit-construction-kit-dc/latest/circuit-construction-kit-dc_mn.html",
      "lesson_type": "physics"
  },
  {
      "index": 53,
      "name": "Математик дүүжингийн лаборатори",
      "img_url": "https://phet.colorado.edu/sims/html/pendulum-lab/latest/pendulum-lab-420.png",
      "iframe_url": "https://phet.colorado.edu/sims/html/pendulum-lab/latest/pendulum-lab_mn.html",
      "lesson_type": "physics"
  },
  {
      "index": 54,
      "name": "Шидэгдсэн биеийн Хөдөлгөөн",
      "img_url": "https://phet.colorado.edu/sims/html/projectile-motion/latest/projectile-motion-420.png",
      "iframe_url": "https://phet.colorado.edu/sims/html/projectile-motion/latest/projectile-motion_mn.html",
      "lesson_type": "physics"
  },
  {
      "index": 55,
      "name": "Молекулын Туйлшрал",
      "img_url": "https://phet.colorado.edu/sims/html/molecule-polarity/latest/molecule-polarity-420.png",
      "iframe_url": "https://phet.colorado.edu/sims/html/molecule-polarity/latest/molecule-polarity_mn.html",
      "lesson_type": "chemistry"
  },
  {
      "index": 56,
      "name": "Шуурхай Өөрчлөх",
      "img_url": "https://phet.colorado.edu/sims/html/expression-exchange/latest/expression-exchange-420.png",
      "iframe_url": "https://phet.colorado.edu/sims/html/expression-exchange/latest/expression-exchange_mn.html",
      "lesson_type": "math"
  },
  {
      "index": 57,
      "name": "Налуу-Хэрчимийн График",
      "img_url": "https://phet.colorado.edu/sims/html/graphing-slope-intercept/latest/graphing-slope-intercept-420.png",
      "iframe_url": "https://phet.colorado.edu/sims/html/graphing-slope-intercept/latest/graphing-slope-intercept_mn.html",
      "lesson_type": "math"
  },
  {
      "index": 58,
      "name": "Үйлдэл Бүтээгч: Үндсэн",
      "img_url": "https://phet.colorado.edu/sims/html/function-builder-basics/latest/function-builder-basics-420.png",
      "iframe_url": "https://phet.colorado.edu/sims/html/function-builder-basics/latest/function-builder-basics_mn.html",
      "lesson_type": "math"
  },
  {
      "index": 59,
      "name": "Хамаарлын Тоглоомын талбай",
      "img_url": "https://phet.colorado.edu/sims/html/proportion-playground/latest/proportion-playground-420.png",
      "iframe_url": "https://phet.colorado.edu/sims/html/proportion-playground/latest/proportion-playground_mn.html",
      "lesson_type": "math"
  },
  {
      "index": 60,
      "name": "Нэгжийн харьцаа",
      "img_url": "https://phet.colorado.edu/sims/html/unit-rates/latest/unit-rates-420.png",
      "iframe_url": "https://phet.colorado.edu/sims/html/unit-rates/latest/unit-rates_mn.html",
      "lesson_type": "physics"
  },
  {
      "index": 61,
      "name": "Арвыг Үүсгэх",
      "img_url": "https://phet.colorado.edu/sims/html/make-a-ten/latest/make-a-ten-420.png",
      "iframe_url": "https://phet.colorado.edu/sims/html/make-a-ten/latest/make-a-ten_mn.html",
      "lesson_type": "math"
  },
  {
      "index": 62,
      "name": "Материйн Төлөв: Үндсэн",
      "img_url": "https://phet.colorado.edu/sims/html/states-of-matter-basics/latest/states-of-matter-basics-420.png",
      "iframe_url": "https://phet.colorado.edu/sims/html/states-of-matter-basics/latest/states-of-matter-basics_mn.html",
      "lesson_type": "physics"
  },
  {
      "index": 63,
      "name": "Материйн Төлөв",
      "img_url": "https://phet.colorado.edu/sims/html/states-of-matter/latest/states-of-matter-420.png",
      "iframe_url": "https://phet.colorado.edu/sims/html/states-of-matter/latest/states-of-matter_mn.html",
      "lesson_type": "physics"
  },
  {
      "index": 64,
      "name": "Гравитац Ба Орбит",
      "img_url": "https://phet.colorado.edu/sims/html/gravity-and-orbits/latest/gravity-and-orbits-420.png",
      "iframe_url": "https://phet.colorado.edu/sims/html/gravity-and-orbits/latest/gravity-and-orbits_mn.html",
      "lesson_type": "physics"
  },
  {
      "index": 65,
      "name": "Plinko магадлалын түгэлт",
      "img_url": "https://phet.colorado.edu/sims/html/plinko-probability/latest/plinko-probability-420.png",
      "iframe_url": "https://phet.colorado.edu/sims/html/plinko-probability/latest/plinko-probability_mn.html",
      "lesson_type": "math"
  },
  {
      "index": 66,
      "name": "Атомын харилцан үйлчлэл",
      "img_url": "https://phet.colorado.edu/sims/html/atomic-interactions/latest/atomic-interactions-420.png",
      "iframe_url": "https://phet.colorado.edu/sims/html/atomic-interactions/latest/atomic-interactions_mn.html",
      "lesson_type": "physics"
  },
  {
      "index": 67,
      "name": "Цахилгаан цэнэг болон орны шугам",
      "img_url": "https://phet.colorado.edu/sims/html/charges-and-fields/latest/charges-and-fields-420.png",
      "iframe_url": "https://phet.colorado.edu/sims/html/charges-and-fields/latest/charges-and-fields_mn.html",
      "lesson_type": "physics"
  },
  {
      "index": 68,
      "name": "Резерфордын Сарнил",
      "img_url": "https://phet.colorado.edu/sims/html/rutherford-scattering/latest/rutherford-scattering-420.png",
      "iframe_url": "https://phet.colorado.edu/sims/html/rutherford-scattering/latest/rutherford-scattering_mn.html",
      "lesson_type": "physics"
  },
  {
      "index": 69,
      "name": "Үйлдэл бүтээгч",
      "img_url": "https://phet.colorado.edu/sims/html/function-builder/latest/function-builder-420.png",
      "iframe_url": "https://phet.colorado.edu/sims/html/function-builder/latest/function-builder_mn.html",
      "lesson_type": "math"
  },
  {
      "index": 70,
      "name": "Изотопууд ба Атомын Масс",
      "img_url": "https://phet.colorado.edu/sims/html/isotopes-and-atomic-mass/latest/isotopes-and-atomic-mass-420.png",
      "iframe_url": "https://phet.colorado.edu/sims/html/isotopes-and-atomic-mass/latest/isotopes-and-atomic-mass_mn.html",
      "lesson_type": "chemistry"
  },
  {
      "index": 71,
      "name": "Нейрон",
      "img_url": "https://phet.colorado.edu/sims/html/neuron/latest/neuron-420.png",
      "iframe_url": "https://phet.colorado.edu/sims/html/neuron/latest/neuron_mn.html",
      "lesson_type": "biology"
  },
  {
      "index": 72,
      "name": "Тригно Аян",
      "img_url": "https://phet.colorado.edu/sims/html/trig-tour/latest/trig-tour-420.png",
      "iframe_url": "https://phet.colorado.edu/sims/html/trig-tour/latest/trig-tour_mn.html",
      "lesson_type": "math"
  },
  {
      "index": 73,
      "name": "Гэрлийн хугарал",
      "img_url": "https://phet.colorado.edu/sims/html/bending-light/latest/bending-light-420.png",
      "iframe_url": "https://phet.colorado.edu/sims/html/bending-light/latest/bending-light_mn.html",
      "lesson_type": "physics"
  },
  {
      "index": 74,
      "name": "Арифметик",
      "img_url": "https://phet.colorado.edu/sims/html/arithmetic/latest/arithmetic-420.png",
      "iframe_url": "https://phet.colorado.edu/sims/html/arithmetic/latest/arithmetic_mn.html",
      "lesson_type": "math"
  },
  {
      "index": 75,
      "name": "Гукийн хууль",
      "img_url": "https://phet.colorado.edu/sims/html/hookes-law/latest/hookes-law-420.png",
      "iframe_url": "https://phet.colorado.edu/sims/html/hookes-law/latest/hookes-law_mn.html",
      "lesson_type": "physics"
  },
  {
      "index": 76,
      "name": "Молекул ба Гэрэл",
      "img_url": "https://phet.colorado.edu/sims/html/molecules-and-light/latest/molecules-and-light-420.png",
      "iframe_url": "https://phet.colorado.edu/sims/html/molecules-and-light/latest/molecules-and-light_mn.html",
      "lesson_type": "physics"
  },
  {
      "index": 77,
      "name": "Хамгийн бага Квадратын Регресс",
      "img_url": "https://phet.colorado.edu/sims/html/least-squares-regression/latest/least-squares-regression-420.png",
      "iframe_url": "https://phet.colorado.edu/sims/html/least-squares-regression/latest/least-squares-regression_mn.html",
      "lesson_type": "math"
  },
  {
      "index": 78,
      "name": "Молекул Байгуулалт",
      "img_url": "https://phet.colorado.edu/sims/html/molecule-shapes/latest/molecule-shapes-420.png",
      "iframe_url": "https://phet.colorado.edu/sims/html/molecule-shapes/latest/molecule-shapes_mn.html",
      "lesson_type": "chemistry"
  },
  {
      "index": 79,
      "name": "Молекул байгуулалт: Үндсэн",
      "img_url": "https://phet.colorado.edu/sims/html/molecule-shapes-basics/latest/molecule-shapes-basics-420.png",
      "iframe_url": "https://phet.colorado.edu/sims/html/molecule-shapes-basics/latest/molecule-shapes-basics_mn.html",
      "lesson_type": "chemistry"
  },
  {
      "index": 80,
      "name": "Бодис, Бүтээгдэхүүн, Үлдэц",
      "img_url": "https://phet.colorado.edu/sims/html/reactants-products-and-leftovers/latest/reactants-products-and-leftovers-420.png",
      "iframe_url": "https://phet.colorado.edu/sims/html/reactants-products-and-leftovers/latest/reactants-products-and-leftovers_mn.html",
      "lesson_type": "chemistry"
  },
  {
      "index": 81,
      "name": "Дугуйт тэшүүрийн талбай",
      "img_url": "https://phet.colorado.edu/sims/html/energy-skate-park-basics/latest/energy-skate-park-basics-420.png",
      "iframe_url": "https://phet.colorado.edu/sims/html/energy-skate-park-basics/latest/energy-skate-park-basics_mn.html",
      "lesson_type": "physics"
  },
  {
      "index": 82,
      "name": "Фарадейн хууль",
      "img_url": "https://phet.colorado.edu/sims/html/faradays-law/latest/faradays-law-420.png",
      "iframe_url": "https://phet.colorado.edu/sims/html/faradays-law/latest/faradays-law_mn.html",
      "lesson_type": "physics"
  },
  {
      "index": 83,
      "name": "pH Хуваарь: Үндсэн",
      "img_url": "https://phet.colorado.edu/sims/html/ph-scale-basics/latest/ph-scale-basics-420.png",
      "iframe_url": "https://phet.colorado.edu/sims/html/ph-scale-basics/latest/ph-scale-basics_mn.html",
      "lesson_type": "chemistry"
  },
  {
      "index": 84,
      "name": "Талбай байгуулагч",
      "img_url": "https://phet.colorado.edu/sims/html/area-builder/latest/area-builder-420.png",
      "iframe_url": "https://phet.colorado.edu/sims/html/area-builder/latest/area-builder_mn.html",
      "lesson_type": "math"
  },
  {
      "index": 85,
      "name": "Чавхдасны Долгион",
      "img_url": "https://phet.colorado.edu/sims/html/wave-on-a-string/latest/wave-on-a-string-420.png",
      "iframe_url": "https://phet.colorado.edu/sims/html/wave-on-a-string/latest/wave-on-a-string_mn.html",
      "lesson_type": "physics"
  },
  {
      "index": 86,
      "name": "Өнгөний үзэгдэл",
      "img_url": "https://phet.colorado.edu/sims/html/color-vision/latest/color-vision-420.png",
      "iframe_url": "https://phet.colorado.edu/sims/html/color-vision/latest/color-vision_mn.html",
      "lesson_type": "physics"
  },
  {
      "index": 87,
      "name": "pH Хуваарь",
      "img_url": "https://phet.colorado.edu/sims/html/ph-scale/latest/ph-scale-420.png",
      "iframe_url": "https://phet.colorado.edu/sims/html/ph-scale/latest/ph-scale_mn.html",
      "lesson_type": "chemistry"
  },
  {
      "index": 88,
      "name": "Химийн Тэгшитгэлийг Тэнцүүлэх",
      "img_url": "https://phet.colorado.edu/sims/html/balancing-chemical-equations/latest/balancing-chemical-equations-420.png",
      "iframe_url": "https://phet.colorado.edu/sims/html/balancing-chemical-equations/latest/balancing-chemical-equations_mn.html",
      "lesson_type": "chemistry"
  },
  {
      "index": 89,
      "name": "Шулууны График",
      "img_url": "https://phet.colorado.edu/sims/html/graphing-lines/latest/graphing-lines-420.png",
      "iframe_url": "https://phet.colorado.edu/sims/html/graphing-lines/latest/graphing-lines_mn.html",
      "lesson_type": "math"
  },
  {
      "index": 90,
      "name": "Бутархайн Харьцуулалт",
      "img_url": "https://phet.colorado.edu/sims/html/fraction-matcher/latest/fraction-matcher-420.png",
      "iframe_url": "https://phet.colorado.edu/sims/html/fraction-matcher/latest/fraction-matcher_mn.html",
      "lesson_type": "math"
  },
  {
      "index": 91,
      "name": "Тэнцвэрийн хууль",
      "img_url": "https://phet.colorado.edu/sims/html/balancing-act/latest/balancing-act-420.png",
      "iframe_url": "https://phet.colorado.edu/sims/html/balancing-act/latest/balancing-act_mn.html",
      "lesson_type": "physics"
  },
  {
      "index": 92,
      "name": "Хүчил-Суурийн Уусмал",
      "img_url": "https://phet.colorado.edu/sims/html/acid-base-solutions/latest/acid-base-solutions-420.png",
      "iframe_url": "https://phet.colorado.edu/sims/html/acid-base-solutions/latest/acid-base-solutions_mn.html",
      "lesson_type": "chemistry"
  },
  {
      "index": 93,
      "name": "Даралтын Үйлчлэл",
      "img_url": "https://phet.colorado.edu/sims/html/under-pressure/latest/under-pressure-420.png",
      "iframe_url": "https://phet.colorado.edu/sims/html/under-pressure/latest/under-pressure_mn.html",
      "lesson_type": "physics"
  },
  {
      "index": 94,
      "name": "Үрэлт",
      "img_url": "https://phet.colorado.edu/sims/html/friction/latest/friction-420.png",
      "iframe_url": "https://phet.colorado.edu/sims/html/friction/latest/friction_mn.html",
      "lesson_type": "physics"
  },
  {
      "index": 95,
      "name": "Динамикийн үндэс",
      "img_url": "https://phet.colorado.edu/sims/html/forces-and-motion-basics/latest/forces-and-motion-basics-420.png",
      "iframe_url": "https://phet.colorado.edu/sims/html/forces-and-motion-basics/latest/forces-and-motion-basics_mn.html",
      "lesson_type": "physics"
  },
  {
      "index": 96,
      "name": "Жон Травольт",
      "img_url": "https://phet.colorado.edu/sims/html/john-travoltage/latest/john-travoltage-420.png",
      "iframe_url": "https://phet.colorado.edu/sims/html/john-travoltage/latest/john-travoltage_mn.html",
      "lesson_type": "physics"
  },
  {
      "index": 97,
      "name": "Концентрац",
      "img_url": "https://phet.colorado.edu/sims/html/concentration/latest/concentration-420.png",
      "iframe_url": "https://phet.colorado.edu/sims/html/concentration/latest/concentration_mn.html",
      "lesson_type": "chemistry"
  },
  {
      "index": 98,
      "name": "Гравитацийн хүчний лаборатори",
      "img_url": "https://phet.colorado.edu/sims/html/gravity-force-lab/latest/gravity-force-lab-420.png",
      "iframe_url": "https://phet.colorado.edu/sims/html/gravity-force-lab/latest/gravity-force-lab_mn.html",
      "lesson_type": "physics"
  },
  {
      "index": 99,
      "name": "Шаар ба цахилгаан статик",
      "img_url": "https://phet.colorado.edu/sims/html/balloons-and-static-electricity/latest/balloons-and-static-electricity-420.png",
      "iframe_url": "https://phet.colorado.edu/sims/html/balloons-and-static-electricity/latest/balloons-and-static-electricity_mn.html",
      "lesson_type": "physics"
  },
  {
      "index": 100,
      "name": "Бийрийн хуулийн Лаб",
      "img_url": "https://phet.colorado.edu/sims/html/beers-law-lab/latest/beers-law-lab-420.png",
      "iframe_url": "https://phet.colorado.edu/sims/html/beers-law-lab/latest/beers-law-lab_mn.html",
      "lesson_type": "chemistry"
  },
  {
      "index": 101,
      "name": "Молийн хэмжээ",
      "img_url": "https://phet.colorado.edu/sims/html/molarity/latest/molarity-420.png",
      "iframe_url": "https://phet.colorado.edu/sims/html/molarity/latest/molarity_mn.html",
      "lesson_type": "chemistry"
  },
  {
      "index": 102,
      "name": "Омын хууль",
      "img_url": "https://phet.colorado.edu/sims/html/ohms-law/latest/ohms-law-420.png",
      "iframe_url": "https://phet.colorado.edu/sims/html/ohms-law/latest/ohms-law_mn.html",
      "lesson_type": "physics"
  },
  {
      "index": 103,
      "name": "Дамжуулагчийн Эсэргүүцэл",
      "img_url": "https://phet.colorado.edu/sims/html/resistance-in-a-wire/latest/resistance-in-a-wire-420.png",
      "iframe_url": "https://phet.colorado.edu/sims/html/resistance-in-a-wire/latest/resistance-in-a-wire_mn.html",
      "lesson_type": "physics"
  },
  {
      "index": 104,
      "name": "Атом Угсрах",
      "img_url": "https://phet.colorado.edu/sims/html/build-an-atom/latest/build-an-atom-420.png",
      "iframe_url": "https://phet.colorado.edu/sims/html/build-an-atom/latest/build-an-atom_mn.html",
      "lesson_type": "chemistry"
  },


  {
      "index": 107,
      "name": "Шингэний Даралт ба Урсгал",
      "img_url": "https://phet.colorado.edu/sims/fluid-pressure-and-flow/fluid-pressure-and-flow-420.png",
      "iframe_url": "https://phet.colorado.edu/sims/cheerpj/fluid-pressure-and-flow/latest/fluid-pressure-and-flow.html?simulation=fluid-pressure-and-flow&locale=mn",
      "lesson_type": "physics"
  },
  {
      "index": 108,
      "name": "Сахар ба Давсны Уусмал",
      "img_url": "https://phet.colorado.edu/sims/sugar-and-salt-solutions/sugar-and-salt-solutions-420.png",
      "iframe_url": "https://phet.colorado.edu/sims/cheerpj/sugar-and-salt-solutions/latest/sugar-and-salt-solutions.html?simulation=sugar-and-salt-solutions&locale=mn",
      "lesson_type": "chemistry"
  },

  {
      "index": 110,
      "name": "Эсийн Бүрхүүлийн Суваг",
      "img_url": "https://phet.colorado.edu/sims/membrane-channels/membrane-channels-420.png",
      "iframe_url": "https://phet.colorado.edu/sims/cheerpj/membrane-channels/latest/membrane-channels.html?simulation=membrane-channels&locale=mn",
      "lesson_type": "biology"
  },
  {
      "index": 111,
      "name": "Конденсаторын Лаборатори",
      "img_url": "https://phet.colorado.edu/sims/capacitor-lab/capacitor-lab-420.png",
      "iframe_url": "https://phet.colorado.edu/sims/cheerpj/capacitor-lab/latest/capacitor-lab.html?simulation=capacitor-lab&locale=mn",
      "lesson_type": "physics"
  },
  {
      "index": 112,
      "name": "Хүч ба хөдөлгөөн",
      "img_url": "https://phet.colorado.edu/sims/motion-series/forces-and-motion-420.png",
      "iframe_url": "https://phet.colorado.edu/sims/cheerpj/motion-series/latest/motion-series.html?simulation=forces-and-motion&locale=mn",
      "lesson_type": "physics"
  },
  {
      "index": 113,
      "name": "Ramp: Forces and Motion",
      "img_url": "https://phet.colorado.edu/sims/motion-series/ramp-forces-and-motion-420.png",
      "iframe_url": "https://phet.colorado.edu/sims/cheerpj/motion-series/latest/motion-series.html?simulation=ramp-forces-and-motion&locale=mn",
      "lesson_type": "physics"
  },

  {
      "index": 115,
      "name": "Гене Машин: Лак Оперон",
      "img_url": "https://phet.colorado.edu/sims/gene-network/gene-machine-lac-operon-420.png",
      "iframe_url": "https://phet.colorado.edu/sims/cheerpj/gene-network/latest/gene-network.html?simulation=gene-machine-lac-operon&locale=mn",
      "lesson_type": "biology"
  },
  {
      "index": 116,
      "name": "Бетта Задрал",
      "img_url": "https://phet.colorado.edu/sims/nuclear-physics/beta-decay-420.png",
      "iframe_url": "https://phet.colorado.edu/sims/cheerpj/nuclear-physics/latest/nuclear-physics.html?simulation=beta-decay&locale=mn",
      "lesson_type": "physics"
  },
  {
      "index": 117,
      "name": "Цохны 2 хэмжээст Хөдөлгөөн",
      "img_url": "https://phet.colorado.edu/sims/ladybug-motion-2d/ladybug-motion-2d-420.png",
      "iframe_url": "https://phet.colorado.edu/sims/cheerpj/ladybug-motion-2d/latest/ladybug-motion-2d.html?simulation=ladybug-motion-2d&locale=mn",
      "lesson_type": "physics"
  },
  {
      "index": 118,
      "name": "Цацраг идэвхт хугацаат Тоглоом",
      "img_url": "https://phet.colorado.edu/sims/nuclear-physics/radioactive-dating-game-420.png",
      "iframe_url": "https://phet.colorado.edu/sims/cheerpj/nuclear-physics/latest/nuclear-physics.html?simulation=radioactive-dating-game&locale=mn",
      "lesson_type": "physics"
  },
  {
      "index": 119,
      "name": "Идэх ба Хөдөлгөөн",
      "img_url": "https://phet.colorado.edu/sims/eating-and-exercise/eating-and-exercise-420.png",
      "iframe_url": "https://phet.colorado.edu/sims/cheerpj/eating-and-exercise/latest/eating-and-exercise.html?simulation=eating-and-exercise&locale=mn",
      "lesson_type": "biology"
  },
  {
      "index": 120,
      "name": "Альфа Задрал",
      "img_url": "https://phet.colorado.edu/sims/nuclear-physics/alpha-decay-420.png",
      "iframe_url": "https://phet.colorado.edu/sims/cheerpj/nuclear-physics/latest/nuclear-physics.html?simulation=alpha-decay&locale=mn",
      "lesson_type": "physics"
  },
  {
      "index": 121,
      "name": "Мөсөн гол",
      "img_url": "https://phet.colorado.edu/sims/glaciers/glaciers-420.png",
      "iframe_url": "https://phet.colorado.edu/sims/cheerpj/glaciers/latest/glaciers.html?simulation=glaciers&locale=mn",
      "lesson_type": "biology"
  },
  {
      "index": 122,
      "name": "Хүчний Момент",
      "img_url": "https://phet.colorado.edu/sims/rotation/torque-420.png",
      "iframe_url": "https://phet.colorado.edu/sims/cheerpj/rotation/latest/rotation.html?simulation=torque&locale=mn",
      "lesson_type": "physics"
  },
  {
      "index": 123,
      "name": "Molecular Motors",
      "img_url": "https://phet.colorado.edu/sims/optical-tweezers/molecular-motors-420.png",
      "iframe_url": "https://phet.colorado.edu/sims/cheerpj/optical-tweezers/latest/optical-tweezers.html?simulation=molecular-motors&locale=mn",
      "lesson_type": "biology"
  },
  {
      "index": 124,
      "name": "Stretching DNA",
      "img_url": "https://phet.colorado.edu/sims/optical-tweezers/stretching-dna-420.png",
      "iframe_url": "https://phet.colorado.edu/sims/cheerpj/optical-tweezers/latest/optical-tweezers.html?simulation=stretching-dna&locale=mn",
      "lesson_type": "biology"
  },
  {
      "index": 125,
      "name": "Optical Tweezers and Applications",
      "img_url": "https://phet.colorado.edu/sims/optical-tweezers/optical-tweezers-420.png",
      "iframe_url": "https://phet.colorado.edu/sims/cheerpj/optical-tweezers/latest/optical-tweezers.html?simulation=optical-tweezers&locale=mn",
      "lesson_type": "biology"
  },
  {
      "index": 126,
      "name": "Цохны Хувьсгал",
      "img_url": "https://phet.colorado.edu/sims/rotation/rotation-420.png",
      "iframe_url": "https://phet.colorado.edu/sims/cheerpj/rotation/latest/rotation.html?simulation=rotation&locale=mn",
      "lesson_type": "physics"
  },
  {
      "index": 127,
      "name": "Устөрөгчийн Атомын Загвар",
      "img_url": "https://phet.colorado.edu/sims/hydrogen-atom/hydrogen-atom-420.png",
      "iframe_url": "https://phet.colorado.edu/sims/cheerpj/hydrogen-atom/latest/hydrogen-atom.html?simulation=hydrogen-atom&locale=mn",
      "lesson_type": "physics"
  },
  {
      "index": 128,
      "name": "Урвал ба Тооцоо",
      "img_url": "https://phet.colorado.edu/sims/reactions-and-rates/reactions-and-rates-420.png",
      "iframe_url": "https://phet.colorado.edu/sims/cheerpj/reactions-and-rates/latest/reactions-and-rates.html?simulation=reactions-and-rates&locale=mn",
      "lesson_type": "chemistry"
  },

  {
      "index": 130,
      "name": "Долгионы бүтэц",
      "img_url": "https://phet.colorado.edu/sims/bound-states/band-structure-420.png",
      "iframe_url": "https://phet.colorado.edu/sims/cheerpj/bound-states/latest/bound-states.html?simulation=band-structure&locale=mn",
      "lesson_type": "physics"
  },
  {
      "index": 131,
      "name": "Quantum Bound States",
      "img_url": "https://phet.colorado.edu/sims/bound-states/bound-states-420.png",
      "iframe_url": "https://phet.colorado.edu/sims/cheerpj/bound-states/latest/bound-states.html?simulation=bound-states&locale=mn",
      "lesson_type": "physics"
  },
  {
      "index": 132,
      "name": "Хоёр нүх ба",
      "img_url": "https://phet.colorado.edu/sims/bound-states/covalent-bonds-420.png",
      "iframe_url": "https://phet.colorado.edu/sims/cheerpj/bound-states/latest/bound-states.html?simulation=covalent-bonds&locale=mn",
      "lesson_type": "physics"
  },
  {
      "index": 133,
      "name": "Хялбаршуулсан MRI",
      "img_url": "https://phet.colorado.edu/sims/mri/mri-420.png",
      "iframe_url": "https://phet.colorado.edu/sims/cheerpj/mri/latest/mri.html?simulation=mri&locale=mn",
      "lesson_type": "biology"
  },


  {
      "index": 136,
      "name": "Квант тунель ба Долгионы багцууд",
      "img_url": "https://phet.colorado.edu/sims/quantum-tunneling/quantum-tunneling-420.png",
      "iframe_url": "https://phet.colorado.edu/sims/cheerpj/quantum-tunneling/latest/quantum-tunneling.html?simulation=quantum-tunneling&locale=mn",
      "lesson_type": "physics"
  },
  {
      "index": 137,
      "name": "Давс ба Уусмал",
      "img_url": "https://phet.colorado.edu/sims/soluble-salts/soluble-salts-420.png",
      "iframe_url": "https://phet.colorado.edu/sims/cheerpj/soluble-salts/latest/soluble-salts.html?simulation=soluble-salts&locale=mn",
      "lesson_type": "chemistry"
  },
  {
      "index": 138,
      "name": "Неоны ламп ба Бусад Ионы Гэрэл",
      "img_url": "https://phet.colorado.edu/sims/discharge-lamps/discharge-lamps-420.png",
      "iframe_url": "https://phet.colorado.edu/sims/cheerpj/discharge-lamps/latest/discharge-lamps.html?simulation=discharge-lamps&locale=mn",
      "lesson_type": "physics"
  },
  {
      "index": 139,
      "name": "Квант Оптикийн хяналт",
      "img_url": "https://phet.colorado.edu/sims/optical-quantum-control/optical-quantum-control-420.png",
      "iframe_url": "https://phet.colorado.edu/sims/cheerpj/optical-quantum-control/latest/optical-quantum-control.html?simulation=optical-quantum-control&locale=mn",
      "lesson_type": "physics"
  },
  {
      "index": 140,
      "name": "Налуу",
      "img_url": "https://phet.colorado.edu/sims/the-ramp/the-ramp-420.png",
      "iframe_url": "https://phet.colorado.edu/sims/cheerpj/the-ramp/latest/the-ramp.html?simulation=the-ramp&locale=mn",
      "lesson_type": "physics"
  },
  {
      "index": 141,
      "name": "Эргэх Урвал",
      "img_url": "https://phet.colorado.edu/sims/ideal-gas/reversible-reactions-420.png",
      "iframe_url": "https://phet.colorado.edu/sims/cheerpj/ideal-gas/latest/ideal-gas.html?simulation=reversible-reactions&locale=mn",
      "lesson_type": "chemistry"
  },
  {
      "index": 142,
      "name": "Фотоцахилгаан Үзэгдэл",
      "img_url": "https://phet.colorado.edu/sims/photoelectric/photoelectric-420.png",
      "iframe_url": "https://phet.colorado.edu/sims/cheerpj/photoelectric/latest/photoelectric.html?simulation=photoelectric&locale=mn",
      "lesson_type": "physics"
  },
  {
      "index": 143,
      "name": "Сав ба Энерги",
      "img_url": "https://phet.colorado.edu/sims/ideal-gas/balloons-and-buoyancy-420.png",
      "iframe_url": "https://phet.colorado.edu/sims/cheerpj/ideal-gas/latest/ideal-gas.html?simulation=balloons-and-buoyancy&locale=mn",
      "lesson_type": "physics"
  },
  {
      "index": 144,
      "name": "2 Хэмжээст Хөдөлгөөн",
      "img_url": "https://phet.colorado.edu/sims/motion-2d/motion-2d-420.png",
      "iframe_url": "https://phet.colorado.edu/sims/cheerpj/motion-2d/latest/motion-2d.html?simulation=motion-2d&locale=mn",
      "lesson_type": "physics"
  },
  {
      "index": 145,
      "name": "Квант Долгионы Интерференц",
      "img_url": "https://phet.colorado.edu/sims/quantum-wave-interference/quantum-wave-interference-420.png",
      "iframe_url": "https://phet.colorado.edu/sims/cheerpj/quantum-wave-interference/latest/quantum-wave-interference.html?simulation=quantum-wave-interference&locale=mn",
      "lesson_type": "physics"
  },
  {
      "index": 146,
      "name": "Хэлхээний Дохио",
      "img_url": "https://phet.colorado.edu/sims/signal-circuit/signal-circuit-420.png",
      "iframe_url": "https://phet.colorado.edu/sims/cheerpj/signal-circuit/latest/signal-circuit.html?simulation=signal-circuit&locale=mn",
      "lesson_type": "physics"
  },

  {
      "index": 148,
      "name": "1 Шулууны дагуух Хүч",
      "img_url": "https://phet.colorado.edu/sims/forces-1d/forces-1d-420.png",
      "iframe_url": "https://phet.colorado.edu/sims/cheerpj/forces-1d/latest/forces-1d.html?simulation=forces-1d&locale=mn",
      "lesson_type": "physics"
  },
  {
      "index": 149,
      "name": "Бтарей ба эсэргүүцэл",
      "img_url": "https://phet.colorado.edu/sims/battery-resistor-circuit/battery-resistor-circuit-420.png",
      "iframe_url": "https://phet.colorado.edu/sims/cheerpj/battery-resistor-circuit/latest/battery-resistor-circuit.html?simulation=battery-resistor-circuit&locale=mn",
      "lesson_type": "physics"
  },
  {
      "index": 150,
      "name": "батарейн хүчдэл",
      "img_url": "https://phet.colorado.edu/sims/battery-voltage/battery-voltage-420.png",
      "iframe_url": "https://phet.colorado.edu/sims/cheerpj/battery-voltage/latest/battery-voltage.html?simulation=battery-voltage&locale=mn",
      "lesson_type": "physics"
  },
  {
      "index": 151,
      "name": "Дамжуулалт",
      "img_url": "https://phet.colorado.edu/sims/conductivity/conductivity-420.png",
      "iframe_url": "https://phet.colorado.edu/sims/cheerpj/conductivity/latest/conductivity.html?simulation=conductivity&locale=mn",
      "lesson_type": "physics"
  },
  {
      "index": 152,
      "name": "Мөрөөдлийн Цахилгаан Орон",
      "img_url": "https://phet.colorado.edu/sims/efield/efield-420.png",
      "iframe_url": "https://phet.colorado.edu/sims/cheerpj/efield/latest/efield.html?simulation=efield&locale=mn",
      "lesson_type": "physics"
  },
  {
      "index": 153,
      "name": "Electric Field Hockey",
      "img_url": "https://phet.colorado.edu/sims/electric-hockey/electric-hockey-420.png",
      "iframe_url": "https://phet.colorado.edu/sims/cheerpj/electric-hockey/latest/electric-hockey.html?simulation=electric-hockey&locale=mn",
      "lesson_type": "physics"
  },
  {
      "index": 154,
      "name": "Лазерууд",
      "img_url": "https://phet.colorado.edu/sims/lasers/lasers-420.png",
      "iframe_url": "https://phet.colorado.edu/sims/cheerpj/lasers/latest/lasers.html?simulation=lasers&locale=mn",
      "lesson_type": "physics"
  },
  {
      "index": 155,
      "name": "Микро долгион",
      "img_url": "https://phet.colorado.edu/sims/microwaves/microwaves-420.png",
      "iframe_url": "https://phet.colorado.edu/sims/cheerpj/microwaves/latest/microwaves.html?simulation=microwaves&locale=mn",
      "lesson_type": "physics"
  },
  {
      "index": 156,
      "name": "Цөмийн Хуваагдал",
      "img_url": "https://phet.colorado.edu/sims/nuclear-physics/nuclear-fission-420.png",
      "iframe_url": "https://phet.colorado.edu/sims/cheerpj/nuclear-physics/latest/nuclear-physics.html?simulation=nuclear-fission&locale=mn",
      "lesson_type": "physics"
  },
  {
      "index": 157,
      "name": "Хагас дамжуулагч",
      "img_url": "https://phet.colorado.edu/sims/semiconductor/semiconductor-420.png",
      "iframe_url": "https://phet.colorado.edu/sims/cheerpj/semiconductor/latest/semiconductor.html?simulation=semiconductor&locale=mn",
      "lesson_type": "physics"
  },
  {
      "index": 158,
      "name": "Төөрөх Тоглоом",
      "img_url": "https://phet.colorado.edu/sims/maze-game/maze-game-420.png",
      "iframe_url": "https://phet.colorado.edu/sims/cheerpj/maze-game/latest/maze-game.html?simulation=maze-game&locale=mn",
      "lesson_type": "math"
  },
  {
      "index": 159,
      "name": "Явж буй Хүн",
      "img_url": "https://phet.colorado.edu/sims/moving-man/moving-man-420.png",
      "iframe_url": "https://phet.colorado.edu/sims/cheerpj/moving-man/latest/moving-man.html?simulation=moving-man&locale=mn",
      "lesson_type": "physics"
  },
  {
      "index": 160,
      "name": "Радио Долгион ба Цахилгаан соронзон Орон",
      "img_url": "https://phet.colorado.edu/sims/radio-waves/radio-waves-420.png",
      "iframe_url": "https://phet.colorado.edu/sims/cheerpj/radio-waves/latest/radio-waves.html?simulation=radio-waves&locale=mn",
      "lesson_type": "physics"
  },
  {
      "index": 161,
      "name": "Generator",
      "img_url": "https://phet.colorado.edu/sims/html/generator/latest/generator-420.png",
      "iframe_url": "https://phet.colorado.edu/sims/html/generator/latest/generator_en.html",
      "lesson_type": "physics"
  },
  {
      "index": 162,
      "name": "Magnets and Electromagnets",
      "img_url": "https://phet.colorado.edu/sims/html/magnets-and-electromagnets/latest/magnets-and-electromagnets-420.png",
      "iframe_url": "https://phet.colorado.edu/sims/html/magnets-and-electromagnets/latest/magnets-and-electromagnets_en.html",
      "lesson_type": "physics"
  },
  {
      "index": 163,
      "name": "Magnet and Compass",
      "img_url": "https://phet.colorado.edu/sims/html/magnet-and-compass/latest/magnet-and-compass-420.png",
      "iframe_url": "https://phet.colorado.edu/sims/html/magnet-and-compass/latest/magnet-and-compass_en.html",
      "lesson_type": "physics"
  },
  {
      "index": 164,
      "name": "Faraday's Electromagnetic Lab",
      "img_url": "https://phet.colorado.edu/sims/html/faradays-electromagnetic-lab/latest/faradays-electromagnetic-lab-420.png",
      "iframe_url": "https://phet.colorado.edu/sims/html/faradays-electromagnetic-lab/latest/faradays-electromagnetic-lab_en.html",
      "lesson_type": "physics"
  },
  {
      "index": 165,
      "name": "Projectile Sampling Distributions",
      "img_url": "https://phet.colorado.edu/sims/html/projectile-sampling-distributions/latest/projectile-sampling-distributions-420.png",
      "iframe_url": "https://phet.colorado.edu/sims/html/projectile-sampling-distributions/latest/projectile-sampling-distributions_en.html",
      "lesson_type": "physics"
  },
  {
      "index": 166,
      "name": "Projectile Data Lab",
      "img_url": "https://phet.colorado.edu/sims/html/projectile-data-lab/latest/projectile-data-lab-420.png",
      "iframe_url": "https://phet.colorado.edu/sims/html/projectile-data-lab/latest/projectile-data-lab_en.html",
      "lesson_type": "physics"
  },
  {
      "index": 167,
      "name": "Kepler's Laws",
      "img_url": "https://phet.colorado.edu/sims/html/keplers-laws/latest/keplers-laws-420.png",
      "iframe_url": "https://phet.colorado.edu/sims/html/keplers-laws/latest/keplers-laws_en.html",
      "lesson_type": "physics"
  },
  {
      "index": 168,
      "name": "Sound Waves",
      "img_url": "https://phet.colorado.edu/sims/html/sound-waves/latest/sound-waves-420.png",
      "iframe_url": "https://phet.colorado.edu/sims/html/sound-waves/latest/sound-waves_en.html",
      "lesson_type": "physics"
  },
  {
      "index": 169,
      "name": "Quadrilateral",
      "img_url": "https://phet.colorado.edu/sims/html/quadrilateral/latest/quadrilateral-420.png",
      "iframe_url": "https://phet.colorado.edu/sims/html/quadrilateral/latest/quadrilateral_en.html",
      "lesson_type": "math"
  }
]