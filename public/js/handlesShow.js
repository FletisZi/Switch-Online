import { getPortsInSwitch } from "./api.js";

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

export function renderPorts (id_switch) {
  
  const elRJ45 =  document.querySelectorAll("a");

  //mostrar todos os rj no switch
  showRJPort(elRJ45)
  //remove os rj que não estão conectados
  removeRJPort(elRJ45,id_switch)

};

const stateClicked = async (state,id_switch) => {

  const id = state.id
  const showResult = document.querySelector('.showResult')
  const resultData = await getPortsInSwitch(id_switch);
  const result = resultData.find((value) => value.name === id);

  if (result) {
      showResult.classList.add("Show");
      showResult.innerHTML = `
          <form id="portUpdateForms">
            <div id="idPortUpdate" setPort="${result.name}">Porta: ${id}</div>
            <div>VLAN: ${result.vlan}</div>
            <div>IP: ${result.ip}</div>
            <label>LOCAL:
              <input type="text"  value="${result.pdv}" id="inputPDV" />
            </label>
            <button type="submit">Salvar</button>
          </div>    
      `;

      document.getElementById('portUpdateForms').addEventListener('submit', async (e) => {
      e.preventDefault();

      const pdv = document.getElementById('inputPDV').value;
      const id = document.getElementById('idPortUpdate').getAttribute("setPort");
      const selectedOption = [...switchList.options].find(opt => opt.value === switchInput.value);
      const switchId = selectedOption.getAttribute('id_switch');


      try {
        const response = await fetch('/updateport', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ "id_switch":switchId, "nome":id,"pdv":pdv})
        });

        const data = await response.json();

        if (response.ok) {
          alert('✅ Local alterado com sucesso');
          showResult.innerHTML = '';
          showResult.classList.remove('Show');
        } else {
          alert('❌ Erro ao cadastrar: ' + (data.erro || 'Tente novamente'));
        }
      } catch (error) {
        document.getElementById('mensagem').textContent = '❌ Erro de conexão com o servidor.';
        console.log(error);
      }
    });

  } else {
    showResult.innerHTML = '';
    showResult.classList.remove('Show');
  }
};

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

    <form class="forms tow" id="addPortForms">
      <div>Porta: ${id}</div>
      <label class="labelAdd">PDV : <input type="text" placeholder="Insira o local" id="inputPDV"></label>      
      <label class="labelAdd">VLAN : <input type="text" placeholder="Insira qual vlan esta passando" id="inputVLAN"></label>
      <label class="labelAdd">IP : <input type="text" placeholder="Insira qual IP esta passando" id="inputIP"></label>
      <label class="labelAdd">IP : <input type="text" placeholder="Insira qual IP esta passando" id="InputPath_panel"></label>
      <button type="submit" >Salvar</button>
    </div>    
  `;

  document.getElementById('addPortForms').addEventListener('submit', async (e) => { 
    e.preventDefault();
    
    const PDV = document.querySelector("#inputPDV").value;
    const VLAN = document.querySelector("#inputVLAN").value;
    const IP = document.querySelector("#inputIP").value;
    const path_panel = document.querySelector("#InputPath_panel").value;
    const selectedOption = [...switchList.options].find(opt => opt.value === switchInput.value);
    const switchId = selectedOption.getAttribute('id_switch');

    fetchPostNewPortETH({switchId,id,VLAN,PDV,IP,path_panel})
    
  });

}

function removeRJPort (elRJ45, id_switch) {
  elRJ45.forEach( async (el) => {
    const resultData = await getPortsInSwitch(id_switch);
    const result = resultData.find((value) => value.name === el.id);
    if(!result && el.className != "btnZomm" && el.classList.value != "portEth"){
      el.style.display = "none";
    }
    el.onclick = () => stateClicked(el,id_switch);
  });
}

function showRJPort (elRJ45){
  elRJ45.forEach( async (el) => {
        if(el.className != "btnZomm" && el.classList.value != "portEth"){
          el.style.display = "flex";
        }
  });
}


async function fetchPostNewPortETH({ switchId, id, VLAN, PDV, IP, path_panel }) {
  try {
    const response = await fetch('/port', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        id_switch: switchId,
        nome: id,
        vlan: VLAN,
        pdv: PDV,
        ip: IP,
        path_panel: path_panel,
      }),
    });

    const data = await response.json();

    if (response.ok) {
      alert('✅ Porta Inserida com sucesso');
      const showResult = document.querySelector('.showResult');
      if (showResult) {
        showResult.innerHTML = '';
        showResult.classList.remove('Show');
      }

      renderPorts(switchId);
    } else {
      alert('❌ Erro ao cadastrar: ' + (data.erro || 'Tente novamente'));
    }
  } catch (error) {
    document.getElementById('mensagem').textContent = '❌ Erro de conexão com o servidor.';
    console.error(error);
  }
}
