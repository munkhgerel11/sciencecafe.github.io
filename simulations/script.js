// Global variables
let options = {
  physics: true,
  chemistry: true,
  math: true,
  biology: true
};

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
  
  // Adjust iframe height
  const headerHeight = container.querySelector('.iframe-header').offsetHeight;
  iframe.style.height = `calc(100% - ${headerHeight}px)`;
  
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

  fetch('phet_simulations_mn_with_iframe.json')
    .then(response => response.json())
    .then(data => {
      const container = document.getElementById('main');
      const allOptionsEnabled = Object.values(options).every(val => val === true);

      data.forEach(item => {
        if (allOptionsEnabled || options[item.lesson_type]) {
          const div = createDiv(item.name, item.img_url, item.iframe_url);
          container.appendChild(div);
        }
      });
    })
    .catch(error => console.error(error));
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