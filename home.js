// NewLine 15000
// 
document.addEventListener("DOMContentLoaded", main)
let mc, mctx, canvas, sel_shape, ctx, yPnts = [], xPnts = [], seriesType = 'Parent'
let bgColorList = ['#f8b4b4', '#89ff93']
let lastBg = 1
let lableArea = 50
let radius = 20
let shapeList = []
let panX = 0
let totalScaleX = []
let totalScaleY = []
let scaleX = 1
let scaleY = 1
let deltaX = 0
let deltaY = 0
let mouseSensitivity = 5
let canvasList = []
let childCanvasList = []
let n = 200
let n1 = 0
let noOfEle = 2001
let initalY = 0
let shapeToDraw = 'Box'
let cnvHeight = 0
let highestPnt = 0, lowestPnt = 0

function main() {
    abstractElements()
    wiring()
    Number.prototype.round = function (places) {
        return +(Math.round(this + "e+" + places) + "e-" + places);
    }
}

function abstractElements() {

    btnTemp = document.getElementById('btnTemp')


    sel_shape = document.getElementById('sel_shape')
    ghCnv = document.getElementById('ghostCanvas')
    gctx = ghCnv.getContext('2d')

    mc = document.getElementById('mainCanvas')
    mctx = mc.getContext('2d')
    cnvHeight = mc.height

    {//Ghost Canvas
        labelCanvas = document.createElement('canvas')
        labelCanvas.id = 0
        labelCanvas.height = mc.height * 2
        labelCanvas.width = mc.width * 2
        lctx = labelCanvas.getContext('2d')
        labelCanvas.ofstY = 0
        labelCanvas.position = "static"
    }
}

function dummyCode() {
    let cnv = document.createElement('canvas')
    cnv.height = screen.height * 1.5
    cnv.width = mc.width * 0.5
    let ctx = cnv.getContext('2d')
    // ctx.translate(0, (cnv.height / 2) * -1)
    ctx.beginPath()
    ctx.rect(0, cnv.height / 2, cnv.width, cnv.height / 2)
    ctx.fillStyle = "orange"
    ctx.strokeStyle = 'red'
    ctx.fill()
    ctx.stroke()
    ctx.closePath()

    mctx.drawImage(cnv, 10, (cnv.height - mc.height) * -1)
}

function wiring() {
    btnTemp.addEventListener('click', dummyCode.bind(this))


    let btnDraw = document.getElementById('btn_draw')
    btnDraw.addEventListener('click', ev => {
        if (seriesType == "Parent")
            draw.bind(this)()
        else
            drawChild.bind(this)()
    })

    sel_shape.addEventListener('change', function (ev) {
        shapeToDraw = sel_shape.value
    })
    mc.addEventListener('mousemove', mouseMove.bind(this))
    mc.addEventListener('wheel', onWheelScroll.bind(this))

    inpParent = document.getElementById('inp_parent')
    inpChild = document.getElementById('inp_child')
    inpParent.addEventListener('change', ev => { seriesType = 'Parent' })
    inpChild.addEventListener('change', ev => { seriesType = 'Child' })
}

function draw(firstTime) {
    canvasList.push({ c: createNewCanvas(mc.width * 30) })
    mctx.resetTransform()
    // initalY = canvasList[0].c.h / 2
    canvasList[0].c.getContext('2d').translate(0, (mc.height / 2))
    let data = getDrawPoints({ pointsFor: shapeToDraw, y: 150, no: noOfEle })
    canvasList[0].data = data
    canvasList[0].strokeStyle = "green"
    // canvasList[0].bgColor = bgColorList[lastBg]
    // lastBg = lastBg == 1 ? 0 : 1// '#89ff93'
    let canvas = canvasList[0].c
    canvasList[0].shape = shapeToDraw
    let params = {}
    params = canvasList[0]
    mctx.clearRect(0, 0, mc.width, mc.height)
    drawShapes.bind(this)(params)

    mctx.clearRect(0, 0, canvas.width, canvas.height)
    canvasList.forEach(cnvObj => {
        let cnv = cnvObj.c
        let tr = cnv.getContext('2d').getTransform()
        mctx.drawImage(cnv, cnv.x, cnv.y, cnv.w, cnv.h)
    });


}

function drawChild() {
    childCanvasList.push({ c: createNewCanvas() })
    childCanvasList[0].c.getContext('2d').translate(0, (mc.height / 2))
    let data = getDrawPoints({ pointsFor: shapeToDraw, y: initalY, width: "dynamic", no: noOfEle }, true)
    getCords(data)
    childCanvasList[0].data = data
    childCanvasList[0].strokeStyle = "blue"
    // childCanvasList[0].bgColor = bgColorList[lastBg]
    // lastBg = lastBg == 1 ? 0 : 1// '#89ff93'
    childCanvasList[0].shape = shapeToDraw
    let params = {}
    params = childCanvasList[0]
    // mctx.clearRect(0, 0, mc.width, mc.height)
    drawShapes.bind(this)(params)

    // mctx.clearRect(0, 0, mc.width, mc.height)
    childCanvasList.forEach(cnvObj => {
        let cnv = cnvObj.c
        let tr = cnv.getContext('2d').getTransform()
        mctx.drawImage(cnv, cnv.x, cnv.y, cnv.w, cnv.h)
    });

}

function getDrawPoints({ pointsFor, no = 1000, width = 30, r = 40, x = 0, y = 50 }, getCords = true) {
    let list = []

    let w = width
    switch (pointsFor.toLowerCase()) {
        case 'circle':
            for (let i = 0; i < no; i++) {
                if (width == 'dynamic')
                    w = Math.ceil(Math.random() * (60 - 20) + 20)

                if (getCords) {
                    let bb = { x: x - r, y: y - r, w: r * 2, h: r * 2 }
                    list.push({ data: { x, y, r }, cords: bb })
                } else
                    list.push({ data: { x, y, r } })
                x = x + (r * 2)
            }
            break;
        case 'box':
            for (let i = 0; i < no; i++) {
                if (width == 'dynamic')
                    w = Math.ceil(Math.random() * (60 - 20) + 20)

                let dir = Math.random() * 10 < 5 ? -1 : 1
                let h = Math.random() * 50 * dir
                data = { x, y, w, h }
                if (getCords) {
                    let bb = { x, y, w, h, }
                    list.push({ data, cords: bb })
                } else
                    list.push({ data })
                x = x + w
                y = y + h
            }
            break
        case 'line':
            for (let i = 0; i < no; i++) {
                if (width == 'dynamic')
                    w = Math.ceil(Math.random() * (60 - 20) + 20)

                let wave = 20

                let y1 = Math.floor(Math.random() * ((y + wave) - (y - wave))) + (y - wave)

                if (y1 <= 10)
                    y1 = y + wave
                if (getCords) {
                    let bb = { x, y: y, w, h: y1 - y }
                    list.push({ data: { x, y, x1: x + w, y1 }, cords: bb })
                } else
                    list.push({ data: { x, y, x1: x + w, y1 } })

                x = x + w
                y = y1
            }
            break;

            break;
        default:
            break;
    }
    return list
}

function getCords(data) {
    data.forEach(dt => {
        let data = dt.data
        dt.parent = []
        let sp = 0
        let ep = 0
        canvasList.forEach((co, idx) => {
            let pdList = co.data
            for (let i = sp; i < pdList.length; i++) {
                const pd = pdList[i].data;
                let pnt = data.x
                let pnt1 = data.x + data.w
                if (pnt <= pd.x && pnt1 >= pd.x + pd.w) {
                    dt.parent.push(pd)
                } else if (pnt > pd.x && pnt <= pd.x + pd.w)
                    dt.parent.push(pd)
                else if (pnt1 > pd.x && pnt1 <= pd.x + pd.w)
                    dt.parent.push(pd)
            }
            sp = idx
        })
        // let lstPrnt = dt.parent[dt.parent.length - 1]
        // ep = ((data.x + data.w) - lstPrnt.x) + data.x
        // data.w = ep - data.x

    });
    return data
}

function createObj(cords) {
    let obj = {}
    obj.cords = cords
    if (shapeToDraw == 'Line') {
        obj.bb = { x: cords.x, w: cords.x1 - cords.x }
        if (cords.y1 - cords.y < 0) {
            obj.bb.y = cords.y + (cords.y1 - cords.y)
            obj.bb.h = Math.abs(cords.y1 - cords.y)
        } else {
            obj.bb.y = cords.y
            obj.bb.h = cords.y1 - cords.y
        }
    } else if (shapeToDraw == 'Circle') {
        obj.bb = {
            x: cords.x - cords.r,
            y: cords.y - cords.r,
            w: cords.r * 2,
            h: cords.r * 2
        }
    } else if (shapeToDraw == 'Box') {
        obj.bb = {
            x: cords.x,
            y: cords.y,
            w: cords.w,
            h: cords.h
        }
    }
    return obj
}

function mouseMove(event) {
    switch (event.buttons) {
        case 0:
            // onHover(event)
            break;
        case 1:
            panning(event)
            break;

        default:
            break;
    }
}

function panning(ev) {
    console.time("panning")
    {// Create new Canvas(s) based on data
        //for parent
        if (canvasList.length > 0) {
            let lstCnv = canvasList[0].c

            if ((canvasList.length == 1 && lstCnv.x > 0) || lstCnv.x >= -50 && (lstCnv.x != 0 && canvasList.length != 1)) {
                {
                    let data = getDrawPoints({ pointsFor: shapeToDraw, y: initalY, no: noOfEle })
                    let result = placeNRegNewCanvas(data, canvasList, 'Parent')
                    drawData(canvasList)
                }
            }
        }
        //for child
        if (childCanvasList.length > 0) {
            let lstCnv = childCanvasList[0].c
            if ((childCanvasList.length == 1 && lstCnv.x > 0) || lstCnv.x >= -50 && (lstCnv.x != 0 && childCanvasList.length != 1)) {
                let data = getDrawPoints({ pointsFor: shapeToDraw, y: initalY, no: noOfEle, width: 'dynamic' })
                getCords(data)
                let result = placeNRegNewCanvas(data, childCanvasList, 'Child')
                drawData(childCanvasList)
            }
        }
    }

    mctx.clearRect(0, 0, mc.width, mc.height)
    // curCanvas = undefined
    let seIdx = getStartEndIdx()
    for (let i = 0; i < canvasList.length; i++) {
        let cnv = canvasList[i].c
        cnv.x += ev.movementX
        cnv.y += ev.movementY
        if (i >= seIdx.sIdx && i <= seIdx.eIdx) {
            console.log("drawn", i, "out of", canvasList.length - 1);
            mctx.drawImage(cnv, cnv.x, cnv.y, cnv.w, cnv.h)
        }

    }
    for (let i = 0; i < childCanvasList.length; i++) {
        let cnv = childCanvasList[i].c
        cnv.x += ev.movementX
        cnv.y += ev.movementY
        // if (i >= seIdx.sIdx && i <= seIdx.eIdx) {
        mctx.drawImage(cnv, cnv.x, cnv.y, cnv.w, cnv.h)
        // }

    }
    panX += ev.movementX

    console.timeEnd("panning")

}

function drawData(cnvList) {
    mctx.clearRect(0, 0, mc.width, mc.height)
    for (let i = 0; i < cnvList.length; i++) {
        const cnvObj = cnvList[i];
        drawShapes(cnvObj)
    }
}

function onWheelScroll(ev) {
    // console.time("Scale")
    ev.preventDefault()
    mctx.clearRect(0, 0, mc.width, mc.height)

    if (ev.ctrlKey) {// scale Y
        scaleY = 1 + (mouseSensitivity / (ev.deltaY * -1))
        scaleX = 1
    } else if (ev.altKey) {//scale X
        scaleY = 1
        scaleX = 1 + (mouseSensitivity / (ev.deltaY * -1))
    } else {
        scaleX = scaleY = 1 + (mouseSensitivity / (ev.deltaY * -1))
    }


    deltaX = (ev.offsetX * scaleX) - ev.offsetX
    deltaY = (ev.offsetY * scaleY) - ev.offsetY
    panX = (panX * scaleX) - deltaX
    // console.log("after scale", panX);
    totalScaleX.push(scaleX)
    totalScaleY.push(scaleY)


    let c_pCanvas = [...canvasList, ...childCanvasList]

    c_pCanvas.forEach(cnvObj => {
        let cnv = cnvObj.c
        cnv.x = (cnv.x * scaleX) - deltaX
        cnv.y = (cnv.y * scaleY) - deltaY
        cnv.w = cnv.w * scaleX
        cnv.h = cnv.h * scaleY

        mctx.drawImage(cnv, cnv.x, cnv.y, cnv.w, cnv.h)
    })
    // console.timeEnd("Scale")

}

function createNewCanvas(w = mc.width * 2, h = cnvHeight) {
    let canvas = document.createElement('canvas')
    canvas.id = canvasList.length
    canvas.width = w
    canvas.height = h
    let ctx = canvas.getContext('2d')
    // ctx.beginPath()
    // ctx.fillRect(0, 0, canvas.width, canvas.height)
    // ctx.closePath()

    canvas.x = 0
    canvas.y = 0
    canvas.w = canvas.width //* scaleX
    canvas.h = canvas.height //* scaleY
    return canvas
}

function placeNRegNewCanvas(data, cnvList, pagingFor) {
    let leftMostCnv = cnvList[0].c

    let totalWidth = (data[data.length - 1].cords.x + data[data.length - 1].cords.w) //* scaleX

    let result = createDynamicCnv(totalWidth, data, pagingFor)
    let newCnvList = result.objList
    cnvList.unshift(...newCnvList.reverse())

    for (let i = 0; i < cnvList.length; i++) {
        const cnvObj = cnvList[i];
        const cnv = cnvObj.c

        cnv.height = highestPnt - lowestPnt
        cnv.h = cnv.height
        cnv.w = cnv.width

        for (let i = 0; i < totalScaleX.length; i++) {
            cnv.w *= totalScaleX[i];
            cnv.h *= totalScaleY[i]
        }
        cnv.getContext('2d').translate(0, lowestPnt * -1)
    }

    //set curCanvas postion back to original
    let curCnv = cnvList[cnvList.length - 1].c
    curCnv.x = panX

    // position other cnvs accordingly
    let stPnt = curCnv.x
    for (let i = cnvList.length - 2; i >= 0; i--) {
        const cnvObj = cnvList[i];
        // console.log({ i });
        let cnv = cnvObj.c
        cnv.x = (stPnt - cnv.w)
        cnv.y = leftMostCnv.y
        stPnt = cnv.x
        // cnvObj.bgColor = bgColorList[lastBg]// "#f8b4b4"
        // lastBg = lastBg == 1 ? 0 : 1
    }
    lastBg = 0
    // initalY = (highestPnt - lowestPnt) / 2


    // let cnvObj = { c: cnv, data, shape: shapeToDraw }
    console.log({ txt: "No of Canvas", l: cnvList.length });
    return { cnvList: newCnvList }
}

function createDynamicCnv(totalWidth, data, pagingFor) {
    let allowedWidth = 35000
    let objList = []
    let noOfCnv = Math.ceil(totalWidth / allowedWidth)
    let elePerCnv = Math.floor(data.length / noOfCnv)
    let tempArr = [...data]
    let ew = data[0].cords.w

    let cnt = 0
    if (pagingFor == 'Parent') {
        do { // Creating canvas & Calculating width for same
            let cnv = document.createElement('canvas')
            let dataArr = tempArr.splice(0, elePerCnv)
            cnv.width = (dataArr.length > elePerCnv ? elePerCnv : dataArr.length) * ew
            cnv.height = cnvHeight
            cnv.x = 0
            cnv.y = 0
            cnv.w = cnv.width
            cnv.h = cnv.height
            cnv.id = cnt
            let obj = { c: cnv, data: dataArr, shape: shapeToDraw, strokeStyle: 'green' }
            objList.unshift(obj)
            cnt++
        } while (tempArr.length > 0);
    } else {
        let cnv = document.createElement('canvas')
        let cnvCnt = 0
        do { // Creating canvas & Calculating width for same
            let dt = data[cnt].cords
            if (dt.x + dt.w > allowedWidth * cnvCnt || cnt == 0) {

                if (cnt > 0) {
                    let lstObj = objList[objList.length - 1]
                    lstObj.c.width = (lstObj.data[lstObj.data.length - 1].cords.x + lstObj.data[lstObj.data.length - 1].cords.w) - lstObj.data[0].cords.x
                    lstObj.c.w = lstObj.c.width
                }

                let cnv = document.createElement('canvas')
                cnv.height = cnvHeight
                cnv.x = 0
                cnv.y = 0
                cnv.h = cnv.height
                cnv.id = cnvCnt
                objList.push({ c: cnv, data: [], shape: shapeToDraw, strokeStyle: 'blue' })
                cnvCnt++
            }
            let lstObj = objList[objList.length - 1]

            lstObj.data.push(tempArr.splice(0, 1)[0])
            // cnv.width = (dataArr.length > elePerCnv ? elePerCnv : dataArr.length) * ew

            // let obj = { c: cnv, data: dataArr, shape: shapeToDraw }
            // objList.unshift(obj)
            cnt++
        } while (tempArr.length > 0);
        objList.reverse()
    }

    objList.forEach(obj => { // Reseting x & X1(line) value, starting from 0
        let data = obj.data
        let x = 0
        for (let i = 0; i < data.length; i++) {
            const c = data[i].cords;
            if (shapeToDraw == "Circle") {
                c.x = x
                highestPnt = Math.max(highestPnt, c.y + c.h)
                lowestPnt = Math.min(lowestPnt, c.y)
            }
            else if (shapeToDraw == 'Box') {
                c.x = x
                highestPnt = Math.max(highestPnt, (c.y + c.h))
                lowestPnt = Math.min(lowestPnt, (c.y + c.h))

            }
            else if (shapeToDraw == 'Line') {
                c.x = x
                // c.x1 = x //+ ew
                highestPnt = Math.max(highestPnt, c.y + c.h, c.y)
                lowestPnt = Math.min(lowestPnt, c.y + c.h, c.y)
            }
            x = c.x + c.w
        }
    })

    console.log({ highestPnt, lowestPnt })

    return { objList }
}

function getStartEndIdx() {

    let fromPx = 0
    let toPx = mc.width
    //now check which canvas start point(x) and end point(x+w) falls between fromPx and toPx
    cnvIdx = []
    // console.log({ fromPx, toPx });
    for (let i = canvasList.length - 1; i >= 0; i--) {
        const c = canvasList[i].c;
        // console.log(JSON.stringify({ i, x: c.x, w: c.w, x1: (c.x + c.w), scrX: panX, scrX1: panX + mc.width, o: panX - mc.width }));
        if (c.x <= fromPx && c.x + c.w >= toPx) {
            cnvIdx.push(i)
            break // as this canvas cover entire screen
        } else if (c.x >= fromPx && c.x <= toPx) {// starting part is in
            cnvIdx.push(i)
        } else if (c.x + c.w >= fromPx && c.x + c.w <= toPx) {// ending part is in
            cnvIdx.push(i)
        }
    }
    // console.log(cnvIdx);
    return { sIdx: Math.min(...cnvIdx), eIdx: Math.max(...cnvIdx) }

}

function clearCanvas(cctx) {
    cctx.clearRect(0, 0, cctx.canvas.width, cctx.canvas.height)
}

function gc() {
    let lst = []
    canvasList.forEach(cnvObj => {
        let cnv = cnvObj.c
        lst.push({ id: cnv.id, x: cnv.x, x1: cnv.x + cnv.w, w: cnv.w, y: cnv.y, h: cnv.h, cnt: cnvObj.data.length })
    })
    return lst
}
