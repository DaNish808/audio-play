const d3 = require('d3');

let data = [];

function initBrownian(words = ['hi', 'we\'re', 'the', 'default', '<li>', 'elements', 'and', 'we\'re', 'demonstrating', 'brownian', 'motion']){
  data = words
    .map(word => ({
      word,
      x: 50,
      y: 50,
      r: 0
    }));


  d3.select('#audio-el-root')
    .selectAll('li')
    .data(data)
    .enter().append('li')
    .attr('class', 'target-item')
    .style('top', d => `${d.y}%`)
    .style('left', d => `${d.x}%`)
    .style('transform', d => `rotate(${d.r}deg)`)
    .text(d => d.word);
}

function dataManip(cb, interval = 50) {
  data = data.map(cb);

  const targets = d3.selectAll('li.target-item')
    .data(data);

  // exit old elements deleted
  targets.exit()
    .remove();

  // update old elements not deleted
  targets
    .transition().duration(interval).ease(d3.easeLinear)
    .attr('class', 'target-item')
    .style('transform', d => `rotate(${d.r}deg)`)
    .style('top', d => `${d.y}%`)
    .style('left', d => `${d.x}%`)

  // add new elements
  targets.enter().append('li')
    .attr('class', 'target-item')
    .style('transform', d => `rotate(${d.r}deg)`)
    .style('top', d => `${d.y}%`)
    .style('left', d => `${d.x}%`)
    .transition().duration(interval)
    .text(d => d.word);
}

export {
  initBrownian,
  dataManip
};