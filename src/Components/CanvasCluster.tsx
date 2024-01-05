import { Card, CardBody, CardFooter, CardHeader, Progress } from '@nextui-org/react'
import { useEffect, useRef, useState } from 'react'

import { useDispatch, useSelector } from 'react-redux'

import numeral from 'numeral'

import { throttle } from 'lodash'
import { getTheme } from '../Utils/Store/themeSlice'

import { THEME_NAME, themes } from '../Utils/THEMES'
import { getClock, getReset, getTier, setClock } from '../Utils/Store/level1Slice'
export interface CanvasClusterProps {
    className?: string
}
const CanvasCluster = (props: CanvasClusterProps) => {
    const canvasRef = useRef(null)
    const [coverage, setCoverage] = useState(0)
    const level1Clock = useSelector(getClock)
    const [loopTime, setLoopTime] = useState(3000)
    const dispatch = useDispatch()
    const clicks = useSelector((state) => getTier(state, 0))
    const level1Resets = useSelector(getReset)
    const [coords, setCoords] = useState({ x: 0, y: 0 })
    const theme: THEME_NAME = useSelector(getTheme)

    useEffect(() => {
        const gameLoop = setInterval(() => {
            // console.log(clicks,clickers,Date.now())

            const canvas: any = canvasRef.current

            const context = canvas.getContext('2d')
            const displayWidth = canvas.clientWidth
            const displayHeight = canvas.clientHeight
            // Check if the canvas is not the same size.
            const needResize = canvas.width !== displayWidth || canvas.height !== displayHeight

            if (needResize) {
                // Make the canvas the same size
                canvas.width = displayWidth
                canvas.height = displayHeight
            }
            const imgData = context.getImageData(0, 0, canvas.width, canvas.height).data
            // console.log({ imgData })
            const alphaValues = imgData.filter((value: number, index: number) => index % 4 === 4 - 1 && value === 0)
            const maxPixels = canvas.width * canvas.height
            const localCoverage = 1 - alphaValues.length / maxPixels
            setCoverage(localCoverage)
            console.log({ localCoverage })
            if (localCoverage >= 0.1 && localCoverage <= 0.5) {
                dispatch(setClock(level1Clock - 100))
                setLoopTime(loopTime > 200 ? loopTime - 200 : 200)
            } else {
                const newClock = level1Clock + 100
                dispatch(setClock(newClock))
                console.log(newClock)
                setLoopTime(loopTime + 100)
            }

            // setDotSize(dotSize + (dotSize * coverage ?? 1))
            // console.log({ dotSize })
            context.clearRect(0, 0, canvas.width, canvas.height)
        }, loopTime)
        return () => clearTimeout(gameLoop)
    }, [canvasRef, loopTime])

    const draw = (event: any) => {
        event.nativeEvent.stopImmediatePropagation()

        const content2 = themes[theme].colors.content2
        const primary = themes[theme].colors.primary.DEFAULT

        const canvas = event.target
        const context = canvas.getContext('2d')

        // console.log({ event })
        context.beginPath()
        context.lineWidth = level1Resets
        const gradient = context.createLinearGradient(0, 0, canvas.width, canvas.height)
        gradient.addColorStop('0', content2)
        gradient.addColorStop('0.5', primary)
        gradient.addColorStop('1.0', content2)
        context.strokeStyle = gradient
        context.lineCap = 'round'
        context.moveTo(coords.x, coords.y)
        context.lineTo(event.nativeEvent.layerX, event.nativeEvent.layerY)
        context.stroke()
        setCoords({ x: event.nativeEvent.layerX, y: event.nativeEvent.layerY })
        // console.log(context)

        // context.fillStyle = `#${Math.floor(Math.random() * 16777215).toString(16)}`
        // context.fillRect(event.nativeEvent.layerX, event.nativeEvent.layerY, level1Resets + 2, level1Resets + 2)
    }

    const tap = (event: any) => {
        event.nativeEvent.stopImmediatePropagation()

        const content2 = themes[theme].colors.content2
        const primary = themes[theme].colors.primary.DEFAULT

        const canvas = event.target
        const context = canvas.getContext('2d')

        // console.log('tap', { event })
        // console.log(event.nativeEvent.targetTouches[0].clientX, event.nativeEvent.targetTouches[0].clientY)
        // context.beginPath()
        // context.lineWidth = level1Resets
        const gradient = context.createLinearGradient(0, 0, canvas.width, canvas.height)
        gradient.addColorStop('0', content2)
        gradient.addColorStop('0.5', primary)
        gradient.addColorStop('1.0', content2)
        context.strokeStyle = gradient
        const rect = canvas.getBoundingClientRect()

        // context.rect(, , 40, 40)
        // context.fill()
        context.lineCap = 'round'
        context.moveTo(coords.x, coords.y)
        context.lineTo(event.touches[0].clientX - rect.left, event.touches[0].clientY - rect.top)
        context.stroke()
        setCoords({ x: event.touches[0].clientX - rect.left, y: event.touches[0].clientY - rect.top })
    }
    const debouncedDrawHandler = throttle(draw, 1000)

    return (
        <Card className={`${props.className} bg-content2 gap-2 `}>
            <CardHeader className="justify-center py-0">
                {' '}
                <p>Coverage : {numeral(coverage).format('0.00%')}</p>
            </CardHeader>
            <CardBody className="bg-content1">
                <canvas
                    className="overflow-hidden max-h-screen"
                    height="100%"
                    width="100%"
                    ref={canvasRef}
                    onMouseMove={draw}
                    onTouchMove={tap}
                >
                    Ruh Roh
                </canvas>
            </CardBody>
        </Card>
    )
}

export default CanvasCluster
