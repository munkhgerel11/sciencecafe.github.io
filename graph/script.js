var elt = document.getElementById("calculator");
var calculator = Desmos.GraphingCalculator(elt, {
  invertedColors: true,
  pasteGraphLink: true,
  // expressions: false,
  settingsMenu: false,
  showGrid: true,
  zoomFit: true,
});

var desmosCycloidState = {
  version: 9,
  graph: {
    viewport: {
      xmin: -50,
      ymin: -20,
      xmax: 50,
      ymax: 30,
    },
    showGrid: true,
  },
  expressions: {
    list: [
      { id: 'graph1', type: 'expression', latex: 'y=50x-300 \\left\\{0<=y<=13\\right\\}', color: '#0C4BC1' }, 
      // y=50x-300 {0<=y<=13}
      { id: 'graph2', type: 'expression', latex: 'y=-50x-300 \\left\\{0<=y<=13\\right\\}', color: '#0C4BC1' }, 
      // y=-50x-300 {0<=y<=13}
      { id: 'graph3', type: 'expression', latex: 'x^2/39+(y-13)^2/1.3^2=1', color: '#0C4BC1' }, 
      // x^2/39+(y-13)^2/1.3^2=1
      { id: 'graph4', type: 'expression', latex: '(x-5.4)^2+(y-6)^2=3.8^2 \\left\\{y<=6\\right\\} \\left\\{x>=6\\right\\}', color: '#0C4BC1' },
      // (x-5.4)^2+(y-6)^2=3.8^2 {y<=6} {x>=6}
      { id: 'graph5', type: 'expression', latex: '(x-5.4)^2+(y-6)^2=3.8^2 \\left\\{y>=6\\right\\} \\left\\{x>=6\\right\\}', color: '#0C4BC1' },
      // (x-5.4)^2+(y-6)^2=3.8^2 {y>=6} {x>=6.2}
      { id: 'graph6', type: 'expression', latex: '(x-5.4)^2+(y-6)^2=5.2^2 \\left\\{y<=6\\right\\} \\left\\{x>=6\\right\\}', color: '#0C4BC1' },
      // (x-5.4)^2+(y-6)^2=5.2^2 {y<=6} {x>=6}
      { id: 'graph7', type: 'expression', latex: '(x-5.4)^2+(y-6)^2=5.2^2 \\left\\{y>=6\\right\\} \\left\\{x>=6\\right\\}', color: '#0C4BC1' },
      // (x-5.4)^2+(y-6)^2=5.2^2 {y>=6} {x>=6.2}
      { id: 'graph8', type: 'expression', latex: 'x^2/2.1^2-(y-18)^2/3.5^2=1 \\left\\{15<=y<=20\\right\\}', color: '#0C4BC1' },
      // // x^2/2.1^2-(y-18)^2/3.5^2=1 {15<=y<=20}
      { id: 'graph9', type: 'expression', latex: 'x^2/2.5^2+(y-21)^2/3.5^2=1 \\left\\{20<=y<=23\\right\\}', color: '#0C4BC1' },
      // // x^2/2.5^2+(y-21)^2/3.5^2=1 {20<=y<=23}
      { id: 'graph10', type: 'expression', latex: 'x^2/1.97^2-(y-24)^2/3.3^2=1 \\left\\{23<=y<=27\\right\\}', color: '#0C4BC1' },
      // // x^2/1.97^2-(y-24)^2/3.3^2=1 {23<=y<=27}  
      { id: 'graph11', type: 'expression', latex: 'x^2/6^2+(y)^2/1.3^2=1 \\left\\{y<=0\\right\\}', color: '#0C4BC1' },
      { "id": "label", "type": "expression", "latex": "(1.2, 10)", "label": "Sc", "showLabel": true, "color": "#000000" }
    ]
  },
};

calculator.setState(desmosCycloidState);
function output() {
  calculator.updateSettings({
    expressions: false,
    showGrid: false
  });
}

// var currentData = document.getElementById("button");
// currentData.addEventListener("click", output, true);
