import { fetchJSON, renderProjects } from '../global.js';
import * as d3 from 'https://cdn.jsdelivr.net/npm/d3@7.9.0/+esm';

async function init() {
    const projects = await fetchJSON('../lib/projects.json');
    const projectsContainer = document.querySelector('.projects');

    renderProjects(projects, projectsContainer, 'h2');
    renderPieChart(projects);
}

function renderPieChart(projects) {
    let rolledData = d3.rollups(
        projects,
        (v) => v.length,
        (d) => d.year
    );

    let data = rolledData.map(([year, count]) => {
        return { value: count, label: year };
    });

    let arcGenerator = d3.arc().innerRadius(0).outerRadius(50);
    let sliceGenerator = d3.pie().value((d) => d.value);
    let arcData = sliceGenerator(data);
    let colors = d3.scaleOrdinal(d3.schemeTableau10);

    let svg = d3.select('#projects-pie-plot');
    svg.selectAll('path').remove();

    arcData.forEach((d, idx) => {
        svg.append('path')
           .attr('d', arcGenerator(d))
           .attr('fill', colors(idx));
    });
}

init();
