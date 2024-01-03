import {
    Button,
    Card,
    CardBody,
    CardFooter,
    Dropdown,
    DropdownItem,
    DropdownMenu,
    DropdownTrigger,
} from '@nextui-org/react'
import { useEffect, useState } from 'react'
import { format } from '../Utils/numbers'

import numeral from 'numeral'
import { useDispatch, useSelector } from 'react-redux'

import { getClock, getReset, getTier, setClock, setResets, setTier } from '../Utils/Store/level1Slice'
import { setTheme } from '../Utils/Store/themeSlice'
import { THEMES } from '../Utils/THEMES'

interface GameComponentProps {
    className?: string
}
function ButtonCluster(props: GameComponentProps) {
    const clicks = useSelector((state) => getTier(state, 0))
    const clickers = useSelector((state) => getTier(state, 1))
    const resets = useSelector(getReset)

    const updateTier = (tier: number, value: number) => {
        dispatch(setTier({ tier, value }))
    }
    // @ts-ignore

    type buttonOptions = '1' | '10' | 'MAX'

    const [selectedOption, setSelectedOption] = useState(new Set(['1']))
    const [devMode, setDevMode] = useState(false)

    const [clickerFarms, setClickerFarms] = useState(0)
    const [clickerVillages, setClickerVillages] = useState(0)
    const [clickerTowns, setClickerTowns] = useState(0)
    const [clickerCities, setClickerCities] = useState(0)
    const [clickerCountries, setClickerCountries] = useState(0)
    const [clickerContinents, setClickerContinents] = useState(0)
    const [clickerWorlds, setClickerWorlds] = useState(0)

    const entities: GameEntity[] = [
        {
            unit: 'Clicks',
            quantity: useSelector((state) => getTier(state, 0)),
            update: (quantity: number) => updateTier(0, quantity),
            tier: 0,
            onClick: (quantity) => {
                buyEntity(0, quantity)
            },
        },
        {
            unit: 'Clickers',
            quantity: useSelector((state) => getTier(state, 1)),
            update: (quantity: number) => updateTier(1, quantity),
            tier: 1,
            onClick: (quantity) => {
                buyEntity(1, quantity)
            },
        },
        {
            unit: 'Clicker Farms',
            quantity: useSelector((state) => getTier(state, 2)),
            update: (quantity: number) => updateTier(2, quantity),
            tier: 2,
            onClick: (quantity) => {
                buyEntity(2, quantity)
            },
        },
        {
            unit: 'Clicker Villages',
            quantity: useSelector((state) => getTier(state, 3)),
            update: (quantity: number) => updateTier(3, quantity),
            tier: 3,
            onClick: (quantity) => {
                buyEntity(3, quantity)
            },
        },
        {
            unit: 'Clicker Town',
            quantity: useSelector((state) => getTier(state, 4)),
            update: (quantity: number) => updateTier(4, quantity),
            tier: 4,
            onClick: (quantity) => {
                buyEntity(4, quantity)
            },
        },
        {
            unit: 'Clicker City',
            quantity: useSelector((state) => getTier(state, 5)),
            update: (quantity: number) => updateTier(5, quantity),
            tier: 5,
            onClick: (quantity) => {
                buyEntity(5, quantity)
            },
        },
        {
            unit: 'Clicker Country',
            quantity: useSelector((state) => getTier(state, 6)),
            update: (quantity: number) => updateTier(6, quantity),
            tier: 6,
            onClick: (quantity) => {
                buyEntity(6, quantity)
            },
        },
        {
            unit: 'Clicker Continents',
            quantity: useSelector((state) => getTier(state, 7)),
            update: (quantity: number) => updateTier(7, quantity),
            tier: 7,
            onClick: (quantity) => {
                buyEntity(7, quantity)
            },
        },
        {
            unit: 'Clicker Worlds',
            quantity: useSelector((state) => getTier(state, 8)),
            update: (quantity: number) => updateTier(8, quantity),
            tier: 8,
            onClick: (quantity) => {
                buyEntity(8, quantity)
            },
        },
    ]

    // const [gameSpeed, setGameSpeed] = useState(2000)

    const gameSpeed = useSelector(getClock)
    const dispatch = useDispatch()

    useEffect(() => {
        const gameLoop = setInterval(() => {
            // console.log(clicks,clickers,Date.now())
            entities.forEach((entity) => {
                if (
                    entities.indexOf(entity) < entities.length - 1 &&
                    entities[entities.indexOf(entity) + 1].quantity > 0
                ) {
                    entity.update(entity.quantity + entities[entities.indexOf(entity) + 1].quantity)
                }
            })
        }, gameSpeed)
        return () => clearTimeout(gameLoop)
    }, [gameSpeed, entities])

    const reset = () => {
        entities.forEach((entity) => {
            entity.update(0)
        })
        console.log(THEMES[resets])
        dispatch(setClock(2000))
        dispatch(setTheme(THEMES[resets + 1]))
        dispatch(setResets(resets + 1))
    }

    // @ts-ignore

    const buyEntity = (tier: number, quantity: number = 1) => {
        const targetEntity = entities.find((entity) => entity.tier === tier) as unknown as GameEntity

        if (targetEntity.tier === 0) {
            updateTier(targetEntity.tier, targetEntity.quantity + quantity)
        } else {
            const costEntity = entities[entities.indexOf(targetEntity) - 1]
            let cost = tier * 10
            // @ts-ignore
            if (devMode) {
                cost = 0
            }
            if (quantity === -1) {
                quantity = Math.floor(costEntity.quantity / cost)
            }
            console.log(`Buying ${quantity} ${targetEntity.unit} with ${cost} ${costEntity.unit}`)
            const canAfford = costEntity.quantity >= cost * quantity
            if (canAfford) {
                // targetEntity.update(targetEntity.quantity + quantity)
                updateTier(targetEntity.tier, targetEntity.quantity + quantity)
                costEntity.update(costEntity.quantity - cost * quantity)
            } else {
                alert(`You need ${cost * quantity} ${costEntity.unit} to get that`)
            }
        }
    }
    // @ts-ignore
    window.buyEntity = (tier, amount) => buyEntity(tier, amount)
    // @ts-ignore
    window.devMode = () => {
        setDevMode(!devMode)
    }

    interface GameEntity {
        unit: string
        tier: number
        quantity: any
        update: (quantity: number) => void
        onClick: (quantity: number) => void
    }
    const labelsMap: Record<buttonOptions, string> = { '1': '+1', '10': '+10', MAX: '+MAX' }
    const selectedOptionValue = Array.from(selectedOption)[0] as unknown as buttonOptions
    return (
        <Card className="bg-content2">
            <CardBody className="grid   lg:grid-cols-4 md:gap-4 grid-cols-1 gap-1 justify-center overflow-auto">
                {entities.map((entity) => {
                    return (
                        <Card
                            isPressable
                            onPress={() => {
                                buyEntity(
                                    entity.tier,
                                    selectedOptionValue === 'MAX'
                                        ? entity.tier === 0
                                            ? 100
                                            : -1
                                        : Number(selectedOptionValue)
                                )
                            }}
                            key={entity.tier}
                            className="bg-content1  min-h-[100px] bg-primary  text-primary-foreground"
                        >
                            <CardBody className="gap-1 pb-0  justify-center overflow-hidden min-h-fit ">
                                <div className=" pb-4 pt-0 grid grid-rows-2 text-center  ">
                                    <h1 className=" pb-0 pt-8 underline md:text-lg font-bold">{entity.unit}</h1>
                                    <p className="pt-0">
                                        {' '}
                                        {entity.quantity < 1e15
                                            ? numeral(entity.quantity).format('0.0a')
                                            : numeral(entity.quantity).format('0.0e+0')}
                                    </p>
                                </div>
                            </CardBody>
                        </Card>
                    )
                })}
            </CardBody>
            <CardFooter className="gap-3 py-6 justify-center text-center">
                <Button
                    color="primary"
                    isDisabled={clicks < 10 ** (resets + 1)}
                    disabled={clicks < 10 ** (resets + 1)}
                    onClick={() => reset()}
                >
                    {' '}
                    Reset: {resets}{' '}
                </Button>
                <p>Clicks Needed: {numeral(10 ** (resets + 1)).format('0.00a')}</p>
                <p>GameSpeed: {numeral(2000 / gameSpeed).format('0.00%')} </p>
                <Dropdown size="sm" placement="bottom-end">
                    <DropdownTrigger>
                        <Button color="primary" className="">
                            {selectedOption}⬇️
                        </Button>
                    </DropdownTrigger>
                    <DropdownMenu
                        disallowEmptySelection
                        selectedKeys={selectedOption}
                        selectionMode="single"
                        onSelectionChange={(keys) => {
                            // console.log(keys)
                            setSelectedOption(keys as unknown as Set<string>)
                        }}
                        className="max-w-[300px] bg-background"
                    >
                        <DropdownItem className="bg-content1" key="1">
                            +1
                        </DropdownItem>
                        <DropdownItem key="10">+10</DropdownItem>
                        <DropdownItem key="MAX">+Max</DropdownItem>
                    </DropdownMenu>
                </Dropdown>
            </CardFooter>
        </Card>
    )
}

export default ButtonCluster
