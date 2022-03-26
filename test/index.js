import {acquireChart, addMatchers, releaseCharts, specsFromFixtures} from 'chartjs-test-utils';

window.devicePixelRatio = 1;
window.acquireChart = acquireChart;

jasmine.fixtures = specsFromFixtures;

beforeEach(function() {
  addMatchers();
});

afterEach(function() {
  releaseCharts();
});

console.warn('Testing with chart.js v' + Chart.version);
