export const assignCanvasWidthHight = (canvas: HTMLCanvasElement) => {
    let viewportHeight = window.innerHeight;
    let viewportWidth = window.innerWidth;

    // for mobiles 
    if (viewportWidth < 450) {
        canvas.width = Math.floor((viewportWidth));
        canvas.height = Math.floor(viewportWidth + (25*viewportWidth/100))
    } else if (viewportWidth > 450 && viewportWidth < 1200) {

    }


    // for laptops and desktops
    // if (viewportHeight < viewportWidth) {
    //     // 90% of the viewport height is set to canvas
    //     canvas.width = Math.round((90 * viewportHeight) / 100);
    //     canvas.height = Math.round((90 * viewportHeight) / 100);
    //     console.log('90% of height: ', Math.round((90 * viewportHeight) / 100));
    // } else {
    //     canvas.width = Math.round((90 * viewportWidth) / 100);
    //     canvas.height = Math.round((90 * viewportWidth) / 100);
    //     console.log('90% of width: ', Math.round((90 * viewportWidth) / 100));

    // }

}