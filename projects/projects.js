import { fetchJSON, renderProjects } from '../global.js';
import * as d3 from 'https://cdn.jsdelivr.net/npm/d3@7.9.0/+esm';

async function init() {
    const projects = await fetchJSON('../lib/projects.json');
    const projectsContainer = document.querySelector('.projects');
    renderProjects(projects, container, 'h2');

    let data = [1, 2]; 
    let colors = ['gold', 'purple'];
    
    let arcGenerator = d3.arc().innerRadius(0).outerRadius(50);
    let sliceGenerator = d3.pie();
    let arcData = sliceGenerator(data);
    let arcs = arcData.map((d) => arcGenerator(d));

    let svg = d3.select('svg');

    arcs.forEach((arc, idx) => {
        svg.append('path')
           .attr('d', arc)
           .attr('fill', colors[idx]);
    });
}

init();
