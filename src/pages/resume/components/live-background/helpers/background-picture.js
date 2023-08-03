
let lazyScrollValue = 0

const lazyScroll = () => {
    const scroltop = window.scrollY
    const delta = lazyScrollValue - scroltop
    if (delta > 0.5 | delta < -0.5) {
        lazyScrollValue = delta ? lazyScrollValue - delta / 25: lazyScrollValue + delta / 25
    }
    return lazyScrollValue
}


export const BackgroundPicture = (imageSrc, polygon, scrollOffset = 0, transformMatrix) => {

    // init
    let imageLoaded = false
    const image = new Image(2218, 1468);
    image.onload = () => {imageLoaded = true}
    image.src = imageSrc;
    const matrix = new DOMMatrix([1, 0, 0, 1, 0, 0]);
    let uW, uH

    if (!transformMatrix) {
        transformMatrix = (matrix, uW, uH, scroll) => matrix
            .rotate(scroll / 450 * -1)
            .translate((uW * -8), (uH * -115) + scroll / 5)
    }


    // resize
    const resize = (canvasSize) => {
        const {width, height} = canvasSize
        uW = width / 100
        uH = height / 100
    }

    const drawPolygon = (ctx, dots) => {
        ctx.beginPath()
        ctx.moveTo(uW * dots[0][0], uH * dots[0][1]);
        ctx.lineTo(uW * dots[1][0], uH * dots[1][1])
        ctx.lineTo(uW * dots[2][0], uH * dots[2][1])
        ctx.lineTo(uW * dots[3][0], uH * dots[3][1])
        ctx.closePath();
        ctx.fill()
    }

    // render
    const render = (ctx, frameCount) => {
        // Lazy Scroll
        const scroll = lazyScroll()

        // Clear canvas
        ctx.fillStyle = "rgb(245, 241, 240)";
        ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);

        // pattern
        if (imageLoaded) {
            const pat = ctx.createPattern(image, "repeat")
            pat.setTransform(transformMatrix(matrix, uW, uH, scroll + scrollOffset))
            ctx.fillStyle = pat
        } else {
            ctx.fillStyle = "transparent"
        }

        // poly
        drawPolygon(ctx, polygon)
    }

    return { render, resize }
}