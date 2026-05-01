import { fetchJSON, renderProjects } from '../global.js';
import * as d3 from 'https://cdn.jsdelivr.net/npm/d3@7.9.0/+esm';

let selectedIndex = -1;

async function init() {
    const projects = await fetchJSON('../lib/projects.json');
    const projectsContainer = document.querySelector('.projects');
    const searchInput = document.querySelector('.searchBar');

    renderProjects(projects, projectsContainer, 'h2');
    renderPieChart(projects);

    searchInput.addEventListener('input', (event) => {
        let query = event.target.value.toLowerCase();

        let filteredProjects = projects.filter((project) => {
            let values = Object.values(project).join('\n').toLowerCase();
            return values.includes(query);
        });

        renderProjects(filteredProjects, projectsContainer, 'h2');
        renderPieChart(filteredProjects);
    });
}

function renderPieChart(projectsGiven) {
    let rolledData = d3.rollups(
        projectsGiven,
        (v) => v.length,
        (d) => d.year
    );

    let data = rolledData.map(([year, count]) => {
        return { value: count, label: year };
    });

    let svg = d3.select('#projects-plot');
    svg.selectAll('path').remove();
    let legend = d3.select('.legend');
    legend.selectAll('*').remove();

    let colors = d3.scaleOrdinal(d3.schemeTableau10);
    let sliceGenerator = d3.pie().value((d) => d.value);
    let arcData = sliceGenerator(data);
    let arcGenerator = d3.arc().innerRadius(0).outerRadius(50);

    arcData.forEach((d, i) => {
        svg.append('path')
           .attr('d', arcGenerator(d))
           .attr('fill', colors(i))
           .on('click', () => {
               selectedIndex = selectedIndex === i ? -1 : i;

               svg.selectAll('path')
                  .attr('class', (_, idx) => (idx === selectedIndex ? 'selected' : ''));

               legend.selectAll('li')
                     .attr('class', (_, idx) => (idx === selectedIndex ? 'selected legend-item' : 'legend-item'));

               const projectsContainer = document.querySelector('.projects');
               if (selectedIndex === -1) {
                   renderProjects(projectsGiven, projectsContainer, 'h2');
               } else {
                   let selectedYear = data[selectedIndex].label;
                   let filteredProjects = projectsGiven.filter(p => p.year === selectedYear);
                   renderProjects(filteredProjects, projectsContainer, 'h2');
               }
           });
    });

    data.forEach((d, idx) => {
        legend.append('li')
              .attr('style', `--color:${colors(idx)}`)
              .attr('class', 'legend-item')
              .html(`<span class="swatch"></span> ${d.label} <em>(${d.value})</em>`);
    });
}

init();