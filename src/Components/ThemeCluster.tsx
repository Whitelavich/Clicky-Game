import { Button, Card, CardBody, CardFooter, CardHeader } from '@nextui-org/react'

import { setTheme } from '../Utils/Store/themeSlice'
import { useDispatch, useSelector } from 'react-redux'

import { THEME_NAME, themes, THEMES } from '../Utils/THEMES'
import { getReset } from '../Utils/Store/level1Slice'

const ThemeCluster = () => {
    const dispatch = useDispatch()

    const onClick = (theme: THEME_NAME) => {
        dispatch(setTheme(theme))
    }
    const resets = useSelector(getReset)

    const themeSubset = () => {
        if (resets === 0) {
            return THEMES.slice(0, 1)
        }
        return THEMES.slice(0, resets < THEMES.length ? resets + 1 : THEMES.length)
    }
    return (
        <Card className="bg-content2">
            <CardHeader className="justify-center ">Reset To Unlock More Themes</CardHeader>
            <CardBody className="overflow-auto">
                <div className="grid grid-cols-6  gap-20">
                    {themeSubset().map((theme) => {
                        return (
                            <Button
                                key={theme}
                                size="sm"
                                className="col-auto"
                                style={{
                                    backgroundColor: themes[theme].colors.primary.DEFAULT,
                                    color: themes[theme].colors.primary.foreground,
                                }}
                                onClick={() => {
                                    onClick(theme)
                                }}
                            >
                                {theme}
                            </Button>
                        )
                    })}
                </div>
            </CardBody>
        </Card>
    )
}
export default ThemeCluster
