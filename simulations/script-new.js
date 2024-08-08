(function() {
    const simulationGrid = document.querySelector('.simulation-grid');
    const containerIframe = document.querySelector('.container-iframe');
  
    const createSimulationItem = (name, img_url, iframe_link, description) => {
      const containerDiv = document.createElement('div');
      containerDiv.className = 'list-item';
      containerDiv.dataset.iframeLink = iframe_link; 
  
      const itemDiv = document.createElement('div');
      itemDiv.className = 'item';
      itemDiv.style.backgroundImage = `url('${img_url}')`;
      containerDiv.appendChild(itemDiv);
  
      const descriptionDiv = document.createElement('div');
      descriptionDiv.className = 'description';
      descriptionDiv.textContent = description;
      containerDiv.appendChild(descriptionDiv);
  
      containerDiv.addEventListener('click', function() {
        containerIframe.innerHTML = `<iframe src="${this.dataset.iframeLink}" width="800px" height="600px" frameborder="1" allowfullscreen></iframe>`;
        window.scrollTo(0, 0);
      });
  
      return containerDiv;
    };
  
    fetch('phet_simulations_mn_with_iframe.json')
      .then(response => response.json())
      .then(data => {
        data.forEach(item => {
          const div = createSimulationItem(item.name, item.img_url, item.iframe_url, item.description);
          simulationGrid.appendChild(div);
        });
      })
      .catch(error => console.error(error));
  
    const filterSelect = document.createElement('select');
    filterSelect.addEventListener('change', () => {
      filterSimulations();
    });
  
    const sortSelect = document.createElement('select');
    sortSelect.addEventListener('change', () => {
      sortSimulations();
    });
  
    const filterSimulations = () => {
      // Implement filtering logic here
    };
  
    const sortSimulations = () => {
      // Implement sorting logic here
    };
  
    // Add the filter and sort controls to the page
    const filtersContainer = document.createElement('div');
    filtersContainer.appendChild(filterSelect);
    filtersContainer.appendChild(sortSelect);
    simulationGrid.parentNode.insertBefore(filtersContainer, simulationGrid);
  })();