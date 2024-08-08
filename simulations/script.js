(function() {
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
    containerDiv.appendChild(span);

    containerDiv.addEventListener('click', function clicking(event){
      iframe_link = event.target
      const container = document.getElementsByClassName('container-iframe')[0];
      container.innerHTML = `<iframe src="${this.dataset.iframeLink}" frameborder="1"  allowfullscreen></iframe>`
      window.scrollTo(0, 0);
    });
    return containerDiv;
  };

  fetch('phet_simulations_mn_with_iframe.json').then(response => response.json()).then(data => {
      const container = document.getElementById('main');
      data.forEach(item => {
        const div = createDiv(item.name, item.img_url, item.iframe_url);
        container.appendChild(div);
      });
    }).catch(error => console.error(error));

  const container = document.getElementById('main');
  const wrapper = document.getElementById('wrapper');
  wrapper.appendChild(container);
})();


