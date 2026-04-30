import { fetchJSON, renderProjects } from '../global.js';
import * as d3 from 'https://cdn.jsdelivr.net/npm/d3@7.9.0/+esm';

async function init() {
    const projects = await fetchJSON('../lib/projects.json');
    const projectsContainer = document.querySelector('.projects');
    renderProjects(projects, projectsContainer, 'h2');

    let data = [1, 2, 3, 4, 5, 5]; 
    let colors = d3.scaleOrdinal(d3.schemeTableau10);
    
    let arcGenerator = d3.arc().innerRadius(0).outerRadius(50);
    let sliceGenerator = d3.pie();
    let arcData = sliceGenerator(data);
    let arcs = arcData.map((d) => arcGenerator(d));

    let svg = d3.select('#projects-plot');
    svg.selectAll('*').remove();
    
    arcs.forEach((arc, idx) => {
        svg.append('path')
           .attr('d', arc)
           .attr('fill', colors(idx));
    });
}

init();
