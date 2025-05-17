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
        renderPorts(0);
        renderPortETH();
    });
}

// function renderPortETH() {
//   const ports = document.querySelectorAll(".portEth");

//   ports.forEach((el) => {
//     el.addEventListener("click", () => {
//       // Remove botão anterior se existir
//       const existing = el.querySelector("foreignObject");
//       if (existing) {
//         existing.remove();
//         return; // Alterna visibilidade no clique
//       }

//       // Pega posição da porta
//       const bbox = el.getBBox();
//       const x = bbox.x + bbox.width / 2 - 40; // centraliza horizontalmente
//       const y = bbox.y + bbox.height + 5;     // logo abaixo da porta

//       // Cria foreignObject
//       const foreignObject = document.createElementNS("http://www.w3.org/2000/svg", "foreignObject");
//       foreignObject.setAttribute("x", x + 30);
//       foreignObject.setAttribute("y", y - 28);
//       foreignObject.setAttribute("width", "80");
//       foreignObject.setAttribute("height", "30");

//       // Cria div e botão HTML
//       const div = document.createElement("div");
//       div.setAttribute("xmlns", "http://www.w3.org/1999/xhtml");

//       const button = document.createElement("button");
//       button.textContent = "+";
//       button.style.width = "20px";
//       button.style.height = "20px";
//       button.style.backgroundColor = "#C25555";
//       button.style.color = "white";
//       button.style.border = "none";
//       button.style.borderRadius = "5px";
//       button.style.cursor = "pointer";

//       button.addEventListener("click", (e) => {
//         e.stopPropagation(); // evita que o clique feche o botão
//         alert("Botão clicado na porta!");
//       });

//       div.appendChild(button);
//       foreignObject.appendChild(div);
//       el.appendChild(foreignObject);
//     });
//   });
// }

function renderPortETH() {
  const ports = document.querySelectorAll(".portEth");

  ports.forEach((el) => {
    el.addEventListener("click", (e) => {
      e.stopPropagation(); // impede o clique de sair pro documento

      // Remove se já existir
      const existing = el.querySelector("foreignObject");
      if (existing) {
        existing.remove();
        return;
      }

      // Remove outros botões antes de adicionar novo
      removeAllForeignObjects();

      // Posição exata
      const bbox = el.getBBox();
      const x = bbox.x + bbox.width / 2 - 40;
      const y = bbox.y + bbox.height + 5;

      const foreignObject = document.createElementNS("http://www.w3.org/2000/svg", "foreignObject");
      foreignObject.setAttribute("x", x+ 30);
      foreignObject.setAttribute("y", y- 28);
      foreignObject.setAttribute("width", "80");
      foreignObject.setAttribute("height", "30");

      const div = document.createElement("div");
      div.setAttribute("xmlns", "http://www.w3.org/1999/xhtml");

      const button = document.createElement("button");
      button.textContent = "+";
      button.style.width = "20px";
      button.style.height = "20px";
      button.style.backgroundColor = "#C25555";
      button.style.color = "white";
      button.style.border = "none";
      button.style.borderRadius = "5px";
      button.style.cursor = "pointer";

      button.addEventListener("click", (e) => {
        e.stopPropagation(); // impede que o clique feche o botão
        //alert("Botão clicado!");
        console.log(el.getAttribute("id_port"))
        createNewPort(el.getAttribute("id_port"))
      });

      div.appendChild(button);
      foreignObject.appendChild(div);
      el.appendChild(foreignObject);
    });
  });

  // Remove todos os botões ao clicar fora
  document.addEventListener("click", () => {
    removeAllForeignObjects();
  });
}

function removeAllForeignObjects() {
  const all = document.querySelectorAll(".portEth foreignObject");
  all.forEach((f) => f.remove());
}



function createNewPort(id){
  
  const showResult = document.querySelector('.showResult')

  showResult.classList.add("Show");
  showResult.innerHTML = `
      <div>
        <div>Porta: ${id}</div>
        <div>PDV: </div>
        <div>VLAN: </div>
        <div>IP: </div>
    
      </div>    
  `;


}