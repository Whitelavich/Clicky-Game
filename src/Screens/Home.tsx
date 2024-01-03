import { Card, CardBody } from '@nextui-org/react'
import ButtonCluster from '../Components/ButtonCluster'
import GraphCluster from '../Components/CanvasCluster'
import { useSelector } from 'react-redux'
import { getLevel1Reset } from '../Utils/Store/level1ResetSlice'
import ThemeCluster from '../Components/ThemeCluster'
import { getTheme } from '../Utils/Store/themeSlice'

const Home = () => {
    const level1Resets = useSelector(getLevel1Reset)

    return (
        <Card className={`${useSelector(getTheme)} rounded-none  max-h-screen min-h-screen gap-2 bg-background  `}>
            <CardBody className="gap-2 grid md:grid-cols-2 sm:grid-rows-3">
                <ButtonCluster />
                {level1Resets >= 3 && <GraphCluster />}
                {level1Resets >= 1 && (
                    <div className="md:col-span-2">
                        <ThemeCluster />
                    </div>
                )}
            </CardBody>
        </Card>
    )
}

export default Home
