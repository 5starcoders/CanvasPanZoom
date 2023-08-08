function creatYPoint(min = 1800, max = 2000, cnt = 200, unique = false) {
    let list = []
    let count = min
    while (list.length < cnt) {
        min = Math.ceil(min);
        max = Math.floor(max);
        let num = count //Math.floor(Math.random() * (max - min + 1)) + min
        if (unique) {
            if (list.indexOf(num) === -1) list.push(num);
        } else {
            list.push(num);
        }
        count = count + (radius * 3)
    }
    return list
}

function createXPoints(interval, cnt = 200) {
    let list = []
    let c = 0
    while (list.length < cnt) {
        // list.push(canvas.width / 10)
        list.push(c)
        c = c + interval
    }
    return list
}

function onHover(e) {
    // let obj = hitTest(e.offsetX, e.offsetY)
    // {
    //     var show_wh = false
    //     var div_idx = document.getElementById('lbl_idx')
    //     var div_x = document.getElementById('lbl_x')
    //     var div_y = document.getElementById('lbl_y')
    //     var div_wx = document.getElementById('lblw_x1')
    //     var div_val_wx = document.getElementById('lbl_val_wx')
    //     var div_hy = document.getElementById('lblh_y1')
    //     var div_val_hy = document.getElementById('lbl_val_hy')
    //     var td_wh = document.getElementById('td_wh'),
    //         lbl_val_w = document.getElementById('lbl_val_w'),
    //         lbl_val_h = document.getElementById('lbl_val_h')
    // }
    // if (obj.length > 0) {
    //     div_idx.innerHTML = obj[0].idx
    //     div_x.innerHTML = obj[0].cords.x
    //     div_y.innerHTML = obj[0].cords.y
    //     if (obj[0].cords.x1) {
    //         div_wx.innerHTML = "X1: "
    //         div_val_wx.innerHTML = obj[0].cords.x1
    //         show_wh = true
    //     } else {
    //         div_wx.innerHTML = "W: "
    //         div_val_wx.innerHTML = obj[0].cords.w
    //     }

    //     if (obj[0].cords.y1) {
    //         div_hy.innerHTML = "Y1: "
    //         div_val_hy.innerHTML = obj[0].cords.y1
    //     } else {
    //         div_hy.innerHTML = "H: "
    //         div_val_hy.innerHTML = obj[0].cords.h
    //     }
    // } else {
    //     div_idx.innerHTML = ""
    //     div_x.innerHTML = ""
    //     div_y.innerHTML = ""
    //     div_val_wx.innerHTML = ""
    //     div_val_hy.innerHTML = ""
    //     lbl_val_w.innerHTML = ""
    //     lbl_val_h.innerHTML = ""
    // }

    // if (show_wh == true) {
    //     td_wh.classList.remove("hideEle")
    //     lbl_val_w.innerHTML = obj[0].cords.x1 - obj[0].cords.x
    //     lbl_val_h.innerHTML = obj[0].cords.y1 - obj[0].cords.y
    // }
}

function isOnScale(offsetX, offsetY) {

    let result = { y: false, x: false }
    let onScale = { x: false, y: false }
    if (offsetX > canvas.width - lableArea && offsetX < canvas.width) {
        onScale.y = true
    }
    if (offsetY > canvas.height - lableArea && offsetY < canvas.height) {
        onScale.x = true
    }
    return onScale
}

function drawClipStrap() {
    mctx.beginPath()
    mctx.rect(canvas.width - lableArea, 0, lableArea, canvas.height)
    mctx.rect(0, canvas.height - lableArea, canvas.width, lableArea)
    mctx.fillStyle = 'lightgray'
    mctx.fill()
}

function hitTest(scrX, scrY) { //screen x and screen Y
    let { e: stX, f: stY, a: zx, d: zy } = ctx.getTransform().invertSelf()
    let x = Math.round((scrX * zx) + stX) // context
    let y = Math.round((scrY * zy) + stY)

    let idxs = 0

    for (var i = 0; i < shapeList.length; i++) {
        let { bb, cords } = shapeList[i]
        if ((x >= bb.x && x <= bb.x + bb.w) &&
            (y >= bb.y && y <= bb.y + bb.h)) {
            return [{ idx: i, cords }]
        }
    }
    return []
}