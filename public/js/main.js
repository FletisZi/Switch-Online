import { getSwitchs, getPortsInSwitch } from './api.js';
import {renderSwitch, renderPorts} from './handlesShow.js'
import { centerSwitchShow } from './centerSwitchShow.js';
import { zoomOut ,zoomDown } from './btnZoom.js';
import { loadSwitchOptions } from './loadSwitchOptions.js';

const switchInput = document.querySelector('#switchInput');
const switchList = document.querySelector('#switchList');
const options = Array.from(document.querySelectorAll('option'))
const btnSearch = document.querySelector('#btnSearch');
const zoomInBtn = document.querySelector('#zDown');
const zoomOutBtn = document.querySelector('#zOut');
const container = document.getElementById('container');
const svgWrapper = document.getElementById('svgWrapper');
const resultPanel = document.querySelector('.result-info');
const image = document.getElementById('svgImage');


let isDragging = false;
let startX, startY, scrollLeft, scrollTop;

btnSearch.addEventListener('click', async (e) => {
    e.preventDefault

    //const selected = options.find((item) => item.value == datalistSwitch.value)
    const selectedOption = [...switchList.options].find(opt => opt.value === switchInput.value);
    if (!selectedOption) return alert("Selecione uma opção!");
    const switchId = selectedOption.getAttribute('id_switch');
    await renderPorts(switchId);
});


window.addEventListener('load', () => {
  renderSwitch(image);
  centerSwitchShow();
  loadSwitchOptions(switchList);
});

document.addEventListener('click', (e) => {
  const showResult = document.querySelector('.showResult')
  // se o clique não foi em um <a> e nem dentro de .showResult
  if (!e.target.closest('a') && !e.target.closest('.showResult')) {
    showResult.classList.remove("Show");
    showResult.innerHTML = '';
  }
});

zoomInBtn.addEventListener('click', (e) => {
  e.preventDefault();
  zoomDown(svgWrapper);
});

zoomOutBtn.addEventListener('click', (e) => {
  e.preventDefault();
  zoomOut(svgWrapper);
});




