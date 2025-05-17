let zoomLevel = 1.5;

export function zoomDown (switchForm){
    zoomLevel += 0.4; // Aumenta o zoom
    switchForm.style.transform = `scale(${zoomLevel})`;
}

export function zoomOut(switchForm){
    zoomLevel -= 0.4; // Diminui o zoom
    switchForm.style.transform = `scale(${zoomLevel})`;
}