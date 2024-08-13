function start(options){
  const iframe = document.querySelector('.rezizable-iframe');
  const fullscreenBtn = document.getElementById('fullscreenBtn');
  fullscreenBtn.addEventListener('click', function() {
      // Check if the Fullscreen API is supported
      if (iframe.requestFullscreen) {
          iframe.requestFullscreen();
      } else if (iframe.mozRequestFullScreen) { // Firefox
          iframe.mozRequestFullScreen();
      } else if (iframe.webkitRequestFullscreen) { // Chrome, Safari and Opera
          iframe.webkitRequestFullscreen();
      } else if (iframe.msRequestFullscreen) { // IE/Edge
          iframe.msRequestFullscreen();
      }
  });
  const createDiv = (name, img_url, iframe_link) => {
    const containerDiv = document.createElement('div');
    containerDiv.className = 'list-item';
    containerDiv.dataset.iframeLink = iframe_link; // attach iframe_link to the div object

    const itemDiv = document.createElement('div');
    itemDiv.className = 'item';
    itemDiv.style.backgroundImage = `url('${img_url}')`;
    containerDiv.appendChild(itemDiv);
    
    const span = document.createElement('span');
    span.textContent = name;

    const returninDiv = document.createElement('div');
    returninDiv.appendChild(containerDiv);
    returninDiv.appendChild(span)
    returninDiv.className = 'returningDiv';

    containerDiv.addEventListener('click', function clicking(event){
      iframe_link = event.target
      const iframe = document.querySelector('.rezizable-iframe');
      iframe.src = this.dataset.iframeLink;
      const container = document.querySelector('.container-iframe');
      container.style.display = 'flex';
      const main = document.getElementById('main');
      main.style.width = '250px';
      window.scrollTo(0, 0);
    });
    return returninDiv;
  };

  fetch('phet_simulations_mn_with_iframe.json').then(response => response.json()).then(data => {
      const container = document.getElementById('main');
      if (JSON.stringify(options) === JSON.stringify({
        physics: true,
        chemistry: true,
        math: true,
        biology: true
      })) {
        data.forEach(item => {
          const div = createDiv(item.name, item.img_url, item.iframe_url);
          container.appendChild(div);
        });
      } else {
        data.forEach(item => {
          if (options[item.lesson_type] === true) {
            const div = createDiv(item.name, item.img_url, item.iframe_url);
            container.appendChild(div);
          }
        });
      }
    }).catch(error => console.error(error)); 

  const container = document.getElementById('main');
  const filterContainer = document.getElementById('filterContainer');
  filterContainer.appendChild(container);
}


// Function to update options and restart
function updateOptionsAndRestart(filterName, isChecked) {
  options[filterName] = isChecked;
  // Clear the main container before restarting
  document.getElementById('main').innerHTML = '';
  start(options);
}

// Function to initialize checkboxes and start the application
function initializeApp() {
  const checkboxes = document.querySelectorAll('.checkbox-container input[type="checkbox"]');
  checkboxes.forEach(checkbox => {
    const filterName = checkbox.id.replace('-checkbox', '').toLowerCase();
    // Set initial checkbox state based on options
    checkbox.checked = true;
    
    checkbox.addEventListener('change', function() {
      updateOptionsAndRestart(filterName, this.checked);
    });
  });
  
  // Initial call to start
  start(options);
}

// Object to store the current state of filters
let options = {
  physics: true,
  chemistry: true,
  math: true,
  biology: true
};
// Run initialization when the DOM is fully loaded
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initializeApp);
} else {
  initializeApp();
}