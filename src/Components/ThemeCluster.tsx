import { Button, Card, CardBody, CardFooter, CardHeader } from '@nextui-org/react'

import { setTheme } from '../Utils/Store/themeSlice'
import { useDispatch, useSelector } from 'react-redux'
import { getLevel1Reset } from '../Utils/Store/level1ResetSlice'
import { THEME_NAME, themes, THEMES } from '../Utils/THEMES'

const ThemeCluster = () => {
    const dispatch = useDispatch()

    const onClick = (theme: THEME_NAME) => {
        dispatch(setTheme(theme))
    }
    const resets = useSelector(getLevel1Reset)

    const themeSubset = () => {
        if (resets === 0) {
            return THEMES.slice(0, 1)
        }
        return THEMES.slice(0, resets < THEMES.length ? resets + 1 : THEMES.length)
    }
    return (
        <Card className="bg-content2">
            <CardHeader className="justify-center ">Reset To Unlock More Themes</CardHeader>
            <CardBody>
                <div className="grid grid-cols-4 gap-4">
                    {themeSubset().map((theme) => {
                        return (
                            <Button
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
