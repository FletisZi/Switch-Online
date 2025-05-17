import { getSwitchs } from "./api.js";
export async function loadSwitchOptions(switchList) {
  const dataSwitchs = await getSwitchs();
  
  dataSwitchs.forEach(item => {
    const option = document.createElement('option');
    option.value = item.nome;
    option.setAttribute('id_Switch', item.id);
    switchList.appendChild(option);
  });
}