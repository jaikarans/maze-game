import { config } from "..";

export const assignCanvasWidthHight = (canvas: HTMLCanvasElement) => {
    let viewportHeight = window.innerHeight;
    let viewportWidth = window.innerWidth;

    
    // console.log('innerW ', window.innerWidth)
    if (window.innerWidth < 768) {
        // for mobiles and tablets
        canvas.width = viewportWidth;

        if (viewportWidth + (25*viewportWidth)/ 100 < viewportHeight){
            canvas.height = viewportWidth + (25*viewportWidth)/ 100;

        } else {
            canvas.height = (90 * viewportHeight) / 100;
        }
        
        config.mobile = true;
        
    } else if (window.innerWidth >= 768) {
        // for laptop and pc
        
        if (viewportWidth + ((25*viewportWidth)/ 100) < viewportHeight){
            canvas.width = viewportWidth;
            canvas.height = viewportWidth + (25*viewportWidth)/ 100;

        } else {
            if (viewportWidth < viewportHeight) {
                canvas.width = 90*(viewportWidth)/100;
                canvas.height = 90*( viewportWidth)/100;
            } else {
                canvas.width =  90*(viewportHeight)/100;
                canvas.height = 90*(viewportHeight)/100;
            }

        }
        
        config.mobile = false;
        // console.log('innerWidth ', window.innerWidth)
    }


}