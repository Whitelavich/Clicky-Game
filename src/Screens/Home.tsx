import { Card, CardBody, CardFooter } from '@nextui-org/react'
import ButtonCluster from '../Components/ButtonCluster'
import GraphCluster from '../Components/CanvasCluster'
import { useDispatch, useSelector } from 'react-redux'
import ThemeCluster from '../Components/ThemeCluster'
import { getTheme } from '../Utils/Store/themeSlice'
import { getReset } from '../Utils/Store/level1Slice'

const Home = () => {
    const level1Resets = useSelector(getReset)
    const dispatch = useDispatch()
    // @ts-ignore
    window.resetStore = () => {
        dispatch({ type: 'RESET_APP' })
    }
    return (
        <Card className={`${useSelector(getTheme)} rounded-none  max-h-screen min-h-screen bg-background   `}>
            <CardBody className="gap-2 grid md:grid-cols-2 md:grid-rows-1 grid-rows-2 grid-cols-1 w-full">
                <ButtonCluster />
                {level1Resets >= 3 && <GraphCluster />}
            </CardBody>
            <CardFooter className="py-12">
                {level1Resets >= 1 && (
                    <div className="md:col-span-2 w-full">
                        <ThemeCluster />
                    </div>
                )}
            </CardFooter>
        </Card>
    )
}

export default Home
