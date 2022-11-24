import {acquireChart, addMatchers, releaseCharts, specsFromFixtures, triggerMouseEvent} from 'chartjs-test-utils';

window.devicePixelRatio = 1;
window.acquireChart = acquireChart;
window.triggerMouseEvent = triggerMouseEvent;

jasmine.fixtures = specsFromFixtures;

beforeAll(function() {
  Chart.register(window['chartjs-plugin-gradient']);
  // Disable colors plugin for tests.
  Chart.defaults.plugins.colors.enabled = false;
});

beforeEach(function() {
  addMatchers();
});

afterEach(function() {
  releaseCharts();
});

console.warn('Testing with chart.js v' + Chart.version);
