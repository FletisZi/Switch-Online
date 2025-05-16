const API_BASE_URL = "http://192.168.0.8:3001";

export async function getSwitchs() {
    try {
        const response = await fetch(`${API_BASE_URL}/switch`);
        const data = await response.json();
        return data
    } catch (error) {
        console.error('Erro ao carregar o JSON:', error);
    }
};

export async function getPortsInSwitch (id) {
    try {
        const response = await fetch(`${API_BASE_URL}/port?id=${id}`);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Erro ao carregar o JSON:', error);
    }
};
