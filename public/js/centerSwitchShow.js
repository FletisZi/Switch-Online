export function centerSwitchShow(){
    // centralizar o switch na tela
    const content = document.querySelector(".svg-wrapper");

    const centerX = (content.scrollWidth - container.clientWidth) / 2;
    const centerY = (content.scrollHeight - container.clientHeight) / 2;
    
    container.scrollLeft = centerX - 100;
    container.scrollTop = centerY - 100;
    container.scrollLeft = 50; // scroll horizontal
    container.scrollTop = 600; // opcional: scroll vertical
}