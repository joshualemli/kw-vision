
// Joshua A Lemli, 2018

const Vis = (function(){

    var world = {
        pause: false,
        xDimPx: 0,
        yDimPx: 0,
        gridSize: 10,
        gridAlign: true,
        xDimGrid: 0,
        yDimGrid: 0
    }


    const Artist = (function(){
        var canvas, context, resizeTimeout, lastResizeTime = 0
        var color = {
            r:0, g:0, b:0,
            rFree:false, gFree:false, bFree:false,
            dr:0, dg:0, db:0,
            opacity:1,
            bw: false
        }
        const stepColor = () => {
            new Array("r","g","b").forEach( key => {
                if (Math.random() > 0.99) color["d"+key] = (Math.random() - 0.5) * 2
                color[key] += color["d"+key]
                if (color[key] > 255) color[key] = 255
                else if (color[key] < 0) color[key] = 0
            })
            context.fillStyle = context.strokeStyle = `rgb(${Math.floor(color.r)},${Math.floor(color.g)},${Math.floor(color.b)})`
        }
        const resize = () => {
            if (resizeTimeout) clearTimeout(resizeTimeout)
            let t = new Date().getTime()
            if (t - lastResizeTime > 150) {
                lastResizeTime = t
                world.xDimPx = context.canvas.width = canvas.offsetWidth
                world.yDimPx = context.canvas.height = canvas.offsetHeight
            }
            else resizeTimeout = setTimeout(resize,150)
        }

        // const setRandomFillStyle = () => context.fillStyle = `rgb(${Math.floor(Math.random()*256)},${Math.floor(Math.random()*256)},${Math.floor(Math.random()*256)})`
        // const setRandomStrokeStyle = () => context.strokeStyle = `rgb(${Math.floor(Math.random()*256)},${Math.floor(Math.random()*256)},${Math.floor(Math.random()*256)})`

        const setRandomFillStyle = () => {
            if (color.bw) context.fillStyle = "rgb(0,0,0)"
            else if (color.rFree || color.gFree || color.bFree) {
                context.fillStyle = "rgb(" +
                    (color.rFree ? Math.floor(Math.random()*256) : color.r) + "," +
                    (color.gFree ? Math.floor(Math.random()*256) : color.g) + "," +
                    (color.bFree ? Math.floor(Math.random()*256) : color.b) + ")"
            }
        }
        const setRandomStrokeStyle = () => {
            if (color.bw) context.strokeStyle = "rgb(0,0,0)"
            else if (color.rFree || color.gFree || color.bFree) {
                context.strokeStyle = "rgb(" +
                    (color.rFree ? Math.floor(Math.random()*256) : color.r) + "," +
                    (color.gFree ? Math.floor(Math.random()*256) : color.g) + "," +
                    (color.bFree ? Math.floor(Math.random()*256) : color.b) + ")"
            }
        }

        const init = () => {
            canvas = document.getElementById("canvas")
            context = canvas.getContext("2d")
            resize()
            window.addEventListener("resize",resize)
            // color changers
            var change = {}
            new Array("rFree","gFree","bFree").forEach( key => {
                change[key] = () => {
                    color[key] = Math.random() > 0.66 ? true : false
                    setTimeout(change[key],Math.floor(Math.random()*5000))
                }
                change[key]()
            })
            change.bw = () => {
                color.bw = Math.random() > 0.9 ? true : false
                setTimeout(change.bw,Math.floor(Math.random()*5000))
            }
            change.bw()
        }
        return {
            init : init,
            stepColor : stepColor,
            floatingPartialArc : () => {
                setRandomStrokeStyle()
                context.lineWidth = Math.round(Math.random()*20) / 10
                context.beginPath()
                context.arc(
                    Math.random() * world.xDimPx,
                    Math.random() * world.yDimPx,
                    Math.random() * Math.max(world.xDimPx,world.yDimPx) + 0.5,
                    Math.random() * 2,
                    Math.random() * 2 * Math.PI,
                    Math.random() > 0.5 ? true : false
                )
                context.stroke()
            },
            floatingFillRectangle : () => {
                setRandomFillStyle()
                context.fillRect(
                    Math.random() * world.xDimPx,
                    Math.random() * world.yDimPx,
                    Math.random() * 20, Math.random() * 20
                )
            },
            floatingOutlineRectangle : () => {
                setRandomStrokeStyle()
                context.strokeRect(
                    Math.random() * world.xDimPx,
                    Math.random() * world.yDimPx,
                    Math.random() * 20, Math.random() * 20
                )
            },
            snappedCircle : () => {
                setRandomFillStyle()
                context.lineWidth = Math.round(Math.random()*30) / 10
                context.beginPath()
                context.arc(
                    world.gridAlign ? Math.floor( Math.random() * world.xDimGrid ) * world.gridSize : Math.random()*world.xDimPx,
                    world.gridAlign ? Math.floor( Math.random() * world.yDimGrid ) * world.gridSize : Math.random()*world.yDimPx,
                    world.gridSize * Math.random(),
                    0, 2*Math.PI, false
                )
                context.fill()
            },
            snappedFillRectangle : () => {
                setRandomFillStyle()
                context.fillRect(
                    world.gridAlign ? Math.floor( Math.random() * world.xDimGrid ) * world.gridSize : Math.random()*world.xDimPx,
                    world.gridAlign ? Math.floor( Math.random() * world.yDimGrid ) * world.gridSize : Math.random()*world.yDimPx,
                    world.gridSize, world.gridSize
                )
            },
            snappedOutlineRectangle : () => {
                setRandomStrokeStyle()
                context.strokeRect(
                    world.gridAlign ? Math.floor( Math.random() * world.xDimGrid ) * world.gridSize : Math.random()*world.xDimPx,
                    world.gridAlign ? Math.floor( Math.random() * world.yDimGrid ) * world.gridSize : Math.random()*world.yDimPx,
                    world.gridSize, world.gridSize
                )
            },

        }
    })()


    const Quote = (function(){//quotes by lemli
        var showNewTimeout
        const MAX_DELAY_ADD = 45e3
        const MIN_INTERVAL = 15e3
        const quotes = [
            `time is a void into which existence is collapsing`,
            `there is nothing`,
        ]
        return function() {
            
        }
    })()

    
    const Gridmogrify = (function(){
        const MAX_ACCEL = 0.001
        const MAX_DSDT = 0.1
        const MAX_GRID = 16, MIN_GRID = 0.3
        var dsdt = 0
        var accel = 0
        return function() {
            accel += ( Math.random()-0.5 ) / 3000
            if (accel > MAX_ACCEL || accel < -MAX_ACCEL) accel = 0
            dsdt += accel
            world.gridSize += dsdt
            if (world.gridSize > MAX_GRID) {
                world.gridSize = MAX_GRID
                dsdt = accel = 0
            }
            else if (world.gridSize < MIN_GRID) {
                world.gridSize = MIN_GRID
                dsdt = accel = 0
            }
            else {
                if (dsdt > MAX_DSDT) dsdt = MAX_DSDT
                else if (dsdt < -MAX_DSDT) dsdt = -MAX_DSDT
            }
            world.xDimGrid = world.xDimPx / world.gridSize
            world.yDimGrid = world.yDimPx / world.gridSize
            //if (Math.random() > 0.99) console.log("gridSize = "+world.gridSize.toFixed(2))
        }
    })()

    const loop = () => {
        let tStart = performance.now()
        if (!world.pause) {
            Gridmogrify()
            Artist.stepColor()
            var nArtifacts = Math.floor( Math.random()*200 + 100 )
            while (nArtifacts--) {
                var choice = Math.floor(Math.random()*90)
                if (choice === 0) Artist.floatingPartialArc()
                else if (choice < 9) Artist.floatingFillRectangle()
                else if (choice < 22) Artist.floatingOutlineRectangle()
                else if (choice < 25) Artist.snappedCircle()
                else if (choice < 50) Artist.snappedOutlineRectangle()
                else Artist.snappedFillRectangle()
            }
        }
        if (Math.random() > 0.97) console.log("drawTime = " + Math.round(performance.now()-tStart))
        window.requestAnimationFrame(loop)
    }


    return function() {
        console.log(" \n \n  Kirkwoodizer v0.1\n \n    by Joshua A. Lemli\n    2018\n ")
        window.addEventListener("keydown",()=>world.pause=!world.pause)
        Artist.init()
        Quote()
        // randomize use of grid align
        const randomizeGridAlign = () => {
            world.gridAlign = Math.random() > 0.5 ? true : false
            setTimeout(randomizeGridAlign,Math.floor(Math.random()*7000))
        }
        randomizeGridAlign()
        loop()
    }

})()

window.onload = Vis

/*

sin(tan(x))



*/