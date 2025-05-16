import { getPortsInSwitch } from "./api.js";

export function renderPorts (id_switch) {
  
  const elRJ45 =  document.querySelectorAll("a");

  //mostrar todos os rj no switch
  elRJ45.forEach( async (el) => {
        if(el.className != "btnZomm" && el.classList.value != "portEth"){
          el.style.display = "flex";
        }
  });

  [2,3,11]

  //remove os rj que não estão conectados
  elRJ45.forEach( async (el) => {
    const resultData = await getPortsInSwitch(id_switch);
    const result = resultData.find((value) => value.name === el.id);
    if(!result && el.className != "btnZomm" && el.classList.value != "portEth"){
      el.style.display = "none";
    }
    el.onclick = () => stateClicked(el,id_switch);
  });
};


const stateClicked = async (state,id_switch) => {
  const id = state.id
  const showResult = document.querySelector('.showResult')
  console.log('aqui foi')
  const resultData = await getPortsInSwitch(id_switch);
  // const resultPdvs = await fetchPDVs();
  const result = resultData.find((value) => value.name === id);

  if (result) {
      showResult.classList.add("Show");
      showResult.innerHTML = `
          <div>
            <div>Porta: ${id}</div>
            <div>PDV: ${result.pdv}</div>
            <div>VLAN: ${result.vlan}</div>
            <div>IP: ${result.ip}</div>
            <label>LOCAL:
              <input list="Local"  value="${result.PDV}" />
              <datalist id="Local">
              </datalist>
            </label>
          </div>    
      `;
      const datalist = document.getElementById("Local");

      // resultPdvs.forEach(namePdvs => {
      //   const option = document.createElement("option");
      //   option.value = namePdvs.name;
      //   datalist.appendChild(option);
      // });

  } else {
      showResult.innerHTML = '';    
  }
};

export function renderSwitch (image) {
  fetch(image.src)
    .then((response) => response.text())
    .then((response) => {
        const span = document.createElement("span");
        span.innerHTML = response;
        const inlineSvg = span.querySelector("svg");
        image.parentNode.replaceChild(inlineSvg, image);
        return true;
    })
    .then(() => {
        renderPorts(1);
    });
}