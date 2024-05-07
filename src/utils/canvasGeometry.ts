export const assignCanvasWidthHight = (canvas: HTMLCanvasElement) => {
    let viewportHeight = window.innerHeight;
    let viewportWidth = window.innerWidth;

    
    console.log('innerWidth ', window.innerWidth)
    if (window.innerWidth < 768) {
        // for mobiles and tablets
        canvas.width = Math.floor((viewportWidth));
        canvas.height = Math.floor(viewportWidth + (25*viewportWidth/100))
    } else if (window.innerWidth > 768) {
        // for laptop and pc
        canvas.width = Math.round((90 * viewportHeight) / 100);
        canvas.height = Math.round((90 * viewportHeight) / 100);
        console.log('innerWidth ', window.innerWidth)
    }


}