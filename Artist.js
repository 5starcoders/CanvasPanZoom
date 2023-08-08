// export default class Artist {

function drawBox(dctx, list, strokeStyle) {
    dctx.beginPath()
    dctx.strokeStyle = strokeStyle
    for (let i = 0; i < list.length; i++) {
        let cords = list[i].cords
        let x = cords.x
        let y = cords.y
        let w = cords.w
        let h = cords.h

        dctx.rect(x, y, w, h)
        dctx.stroke()
        drawtext(dctx, i, x, y)
    }
    dctx.closePath()
    return
}

function drawCircle(dctx, list, strokeStyle) {
    console.time("circle")
    dctx.beginPath()
    dctx.strokeStyle = strokeStyle
    for (let i = 0; i < list.length; i++) {
        let cords = list[i].cords
        let r = cords.w / 2
        let x = cords.x + r
        let y = cords.y + r
        dctx.arc(x, y, r, 0, Math.PI * 2, true)
        dctx.rect(x, y, 1, 1)
        dctx.stroke()
        drawtext(dctx, i, x, y)
    }
    dctx.closePath()
    console.timeEnd('circle')
}

function drawCircle1({ yPnts, xPnts, strokeStyle }) {

    shapeList = []
    let trns = ctx.getTransform()

    for (let i = 0; i < yPnts.length - 1; i++) {
        let xp = 0, yp = 0
        xp = (xPnts[i] * trns.a) + trns.e
        yp = (yPnts[i] * trns.d) + trns.f

        ctx.beginPath()
        ctx.arc(xp, yp, radius, 0, Math.PI * 2, true)
        ctx.rect(xp, yp, 1, 1)
        ctx.stroke()
        ctx.closePath()
        drawtext(ctx, i, xp, yp)

        if (i == 0) {
            let xp = 0, yp = 0
            xp = (xPnts[i] * trns.a) + trns.e
            yp = (yPnts[i] * trns.d) + trns.f
            ctx1.beginPath()
            ctx1.arc(xp, yp, radius, 0, Math.PI * 2, true)
            ctx1.stroke()
        }

    }

    return
}

function drawtext(ctx, txt, x, y, strokeStyle) {
    ctx.save()
    ctx.beginPath()
    ctx.font = "12px Arial"
    ctx.fillStyle = "black"
    ctx.translate(x, y)
    ctx.rotate(-Math.PI / 2)
    ctx.fillText(txt, 0, 0)
    ctx.closePath()
    ctx.restore()
}

function drawLines(dctx, list, strokeStyle) {
    dctx.beginPath()
    dctx.strokeStyle = strokeStyle
    for (let i = 0; i < list.length; i++) {
        let cords = list[i].cords
        let x = cords.x, y = cords.y, x1 = cords.x + cords.w, y1 = cords.y + cords.h
        dctx.moveTo(x, y)
        dctx.lineTo(x1, y1)
        dctx.stroke()
        drawtext(dctx, i, x, y)
    }
    dctx.closePath()
}

function drawbox(pCtx) {
    pCtx.beginPath()
    pCtx.globalAlpha = 0.6
    pCtx.fillStyle = "red"
    pCtx.rect(0, 0, pCtx.width, pCtx.height)
    pCtx.fill()
}
// }
