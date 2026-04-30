import { fetchJSON, renderProjects } from '../global.js';
import * as d3 from 'https://cdn.jsdelivr.net/npm/d3@7.9.0/+esm';

const projects = await fetchJSON('../lib/projects.json');
let arcGenerator = d3.arc().innerRadius(0).outerRadius(50);

const projectsContainer = document.querySelector('.projects');

if (projectsContainer) {
    renderProjects(projects, projectsContainer, 'h2');
}

let arc = arcGenerator({
  startAngle: 0,
  endAngle: 2 * Math.PI,
});
