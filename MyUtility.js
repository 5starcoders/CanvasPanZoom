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