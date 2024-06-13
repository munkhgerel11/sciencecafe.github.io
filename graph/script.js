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
      xmin: -4.1,
      ymin: -2.2,
      xmax: 4.1,
      ymax: 2.2,
    },
    showGrid: true,
  },
  expressions: {},
};

var currentState = {
  version: 9,
  graph: {
    viewport: {
      xmin: -10,
      ymin: -10,
      xmax: 10,
      ymax: 10,
    },
    showGrid: false,
  },
  expressions: {
    list: [
      {
        type: "expression",
        id: "1",
        color: "#c74440",
      },
    ],
  },
};

calculator.setState(desmosCycloidState);

// function output() {
//   calculator.updateSettings({
//     expressions: false,
//     showGrid: false
//   });
// }

// var currentData = document.getElementById("button");
// currentData.addEventListener("click", output, true);
