import {
    Button,
    ButtonGroup,
    Card,
    CardBody,
    CardFooter,
    CardHeader,
    Dropdown,
    DropdownItem,
    DropdownMenu,
    DropdownTrigger,
    getKeyValue,
    Slider,
    Table,
    TableBody,
    TableCell,
    TableColumn,
    TableHeader,
    TableRow,
} from '@nextui-org/react'
import { ReactElement, useEffect, useState } from 'react'
import { format } from '../Utils/numbers'

import numeral from 'numeral'
import { useDispatch, useSelector } from 'react-redux'
import { getLevel1Clock, setLevel1Clock } from '../Utils/Store/level1ClockSlice'
import { getTier0, setTier0 } from '../Utils/Store/tier0Slice'
import { getLevel1Reset, incrementLevel1Reset } from '../Utils/Store/level1ResetSlice'
import { setTheme } from '../Utils/Store/themeSlice'
import { THEMES } from '../Utils/THEMES'

interface GameComponentProps {
    className?: string
}
function ButtonCluster(props: GameComponentProps) {
    const clicks = useSelector(getTier0)
    const resets = useSelector(getLevel1Reset)

    const setClicks = (amount: number) => {
        dispatch(setTier0(amount))
    }
    type buttonOptions = '1' | '10' | 'MAX'

    const [selectedOption, setSelectedOption] = useState(new Set(['1']))
    const [devMode, setDevMode] = useState(false)
    const [clickers, setClickers] = useState(0)
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
            quantity: clicks,
            update: (quantity: number) => setClicks(quantity),
            tier: 0,
            onClick: (quantity) => {
                buyEntity(0, quantity)
            },
        },
        {
            unit: 'Clickers',
            quantity: clickers,
            update: (quantity: number) => setClickers(quantity),
            tier: 1,
            onClick: (quantity) => {
                buyEntity(1, quantity)
            },
        },
        {
            unit: 'Clicker Farms',
            quantity: clickerFarms,
            update: (quantity: number) => setClickerFarms(quantity),
            tier: 2,
            onClick: (quantity) => {
                buyEntity(2, quantity)
            },
        },
        {
            unit: 'Clicker Villages',
            quantity: clickerVillages,
            update: (quantity: number) => setClickerVillages(quantity),
            tier: 3,
            onClick: (quantity) => {
                buyEntity(3, quantity)
            },
        },
        {
            unit: 'Clicker Town',
            quantity: clickerTowns,
            update: (quantity: number) => setClickerTowns(quantity),
            tier: 4,
            onClick: (quantity) => {
                buyEntity(4, quantity)
            },
        },
        {
            unit: 'Clicker City',
            quantity: clickerCities,
            update: (quantity: number) => setClickerCities(quantity),
            tier: 5,
            onClick: (quantity) => {
                buyEntity(5, quantity)
            },
        },
        {
            unit: 'Clicker Country',
            quantity: clickerCountries,
            update: (quantity: number) => setClickerCountries(quantity),
            tier: 6,
            onClick: (quantity) => {
                buyEntity(6, quantity)
            },
        },
        {
            unit: 'Clicker Continents',
            quantity: clickerContinents,
            update: (quantity: number) => setClickerContinents(quantity),
            tier: 7,
            onClick: (quantity) => {
                buyEntity(7, quantity)
            },
        },
        {
            unit: 'Clicker Worlds',
            quantity: clickerWorlds,
            update: (quantity: number) => setClickerWorlds(quantity),
            tier: 8,
            onClick: (quantity) => {
                buyEntity(8, quantity)
            },
        },
    ]

    // const [gameSpeed, setGameSpeed] = useState(2000)

    const gameSpeed = useSelector(getLevel1Clock)
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
    }, [
        gameSpeed,
        clicks,
        clickers,
        clickerFarms,
        clickerVillages,
        clickerTowns,
        clickerCities,
        clickerCountries,
        clickerContinents,
        clickerWorlds,
    ])

    const tableColumns = [
        {
            key: 'unit',
            label: '',
        },
        {
            key: '1X',
            label: '1X',
        },
        {
            key: '10X',
            label: '10X',
        },
        {
            key: 'MAX',
            label: 'Max',
        },
    ]
    const reset = () => {
        entities.forEach((entity) => {
            entity.update(0)
        })
        console.log(THEMES[resets])
        dispatch(setLevel1Clock(2000))
        dispatch(setTheme(THEMES[resets + 1]))
        dispatch(incrementLevel1Reset())
    }

    // @ts-ignore

    const buyEntity = (tier: number, quantity: number = 1) => {
        const targetEntity = entities.find((entity) => entity.tier === tier) as unknown as GameEntity

        if (targetEntity.tier === 0) {
            targetEntity.update(targetEntity.quantity + quantity)
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
                targetEntity.update(targetEntity.quantity + quantity)
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
            <CardBody className="grid sm:grid-cols-2  md:grid-cols-4 gap-4 justify-center">
                {entities.map((entity) => {
                    return (
                        <Card
                            key={entity.tier}
                            className="bg-content1 overflow-scroll min-h-[110px] max-h-fit max-w-fit"
                        >
                            <CardHeader className=" justify-center">
                                {entity.unit} : {entity.quantity}
                            </CardHeader>
                            <CardBody className="gap-2  justify-center overflow-hidden ">
                                <ButtonGroup variant="flat">
                                    <Button
                                        color="primary"
                                        onClick={() =>
                                            buyEntity(
                                                entity.tier,
                                                selectedOptionValue === 'MAX'
                                                    ? entity.tier === 0
                                                        ? 100
                                                        : -1
                                                    : Number(selectedOptionValue)
                                            )
                                        }
                                    >
                                        {labelsMap[selectedOptionValue]}
                                    </Button>
                                    <Dropdown placement="bottom-end">
                                        <DropdownTrigger>
                                            <Button>▼</Button>
                                        </DropdownTrigger>
                                        <DropdownMenu
                                            key={entity.tier}
                                            disallowEmptySelection
                                            selectedKeys={selectedOption}
                                            selectionMode="single"
                                            onSelectionChange={(keys) => {
                                                console.log(keys)
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
                                </ButtonGroup>
                            </CardBody>
                        </Card>
                    )
                })}

                {/*<Table hideHeader>*/}
                {/*    <TableHeader columns={tableColumns}>*/}
                {/*        {(column) => <TableColumn key={column.key}>{column.label}</TableColumn>}*/}
                {/*    </TableHeader>*/}
                {/*    <TableBody items={entities} className="bg-content2 gap-1">*/}
                {/*        {(item) => (*/}
                {/*            <TableRow key={item.unit} className="gap-1">*/}
                {/*                <TableCell>*/}
                {/*                    {item.unit} :*/}
                {/*                    {item.quantity < 1e15*/}
                {/*                        ? numeral(item.quantity).format('0.0a')*/}
                {/*                        : numeral(item.quantity).format('0.0e+0')}*/}
                {/*                </TableCell>*/}
                {/*                <TableCell>*/}
                {/*                    <Button size="sm" color="primary" onClick={() => item.onClick(1)}>*/}
                {/*                        1X*/}
                {/*                    </Button>*/}
                {/*                </TableCell>*/}
                {/*                <TableCell>*/}
                {/*                    <Button*/}
                {/*                        size="sm"*/}
                {/*                        color="primary"*/}
                {/*                        isDisabled={resets < 5 && item.tier === 0}*/}
                {/*                        onClick={() => item.onClick(10)}*/}
                {/*                    >*/}
                {/*                        10X*/}
                {/*                    </Button>*/}
                {/*                </TableCell>*/}
                {/*                <TableCell>*/}
                {/*                    <Button*/}
                {/*                        size="sm"*/}
                {/*                        color="primary"*/}
                {/*                        isDisabled={resets < 10 && item.tier === 0}*/}
                {/*                        onClick={() => item.onClick(item.tier === 0 ? 100 : -1)}*/}
                {/*                    >*/}
                {/*                        {item.tier === 0 ? '100X' : 'MAX'}*/}
                {/*                    </Button>*/}
                {/*                </TableCell>*/}
                {/*            </TableRow>*/}
                {/*        )}*/}
                {/*    </TableBody>*/}
                {/*</Table>*/}
            </CardBody>
            <CardFooter className="gap-3 py-6">
                {/*<Slider*/}
                {/*    step={1}*/}
                {/*    minValue={10}*/}
                {/*    maxValue={5000}*/}
                {/*    label={'Game Speed'}*/}
                {/*    value={gameSpeed}*/}
                {/*    onChange={(value) => setGameSpeed(value as number)}*/}
                {/*/>*/}

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
            </CardFooter>
        </Card>
    )
}

export default ButtonCluster
