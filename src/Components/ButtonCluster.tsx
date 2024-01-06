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
    Progress,
} from '@nextui-org/react'
import { useEffect, useState } from 'react'
import { format } from '../Utils/numbers'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

import numeral from 'numeral'
import { useDispatch, useSelector } from 'react-redux'

import { getClock, getReset, getTier, setClock, setResets, setTier } from '../Utils/Store/level1Slice'
import { setTheme } from '../Utils/Store/themeSlice'
import { THEMES } from '../Utils/THEMES'
import { incrementAllTimeResets, incrementAllTimeTier } from '../Utils/Store/allTimeStatsSlice'
import useSound from 'use-sound'
import click from '../Assets/audio/click.mp3'

interface GameComponentProps {
    className?: string
}
function ButtonCluster(props: GameComponentProps) {
    const toastClass = {
        success: 'bg-blue-600',
        error: 'bg-red-600',
        info: 'bg-gray-600',
        warning: 'bg-orange-400',
        default: 'bg-gradient-to-tr from-primary via-primary text-primary-foreground',
        dark: 'bg-white-600 font-gray-300',
    }

    const [clickSound] = useSound(click, { volume: 0.1 })
    const clicks = useSelector((state) => getTier(state, 0))

    const resets = useSelector(getReset)

    const updateTier = (tier: number, value: number) => {
        dispatch(setTier({ tier, value }))
    }
    // @ts-ignore

    type buttonOptions = '1' | '10' | 'MAX'

    const [selectedOption, setSelectedOption] = useState(new Set(['1']))
    const [devMode, setDevMode] = useState(false)

    const entities: GameEntity[] = [
        {
            unit: 'Clicks',
            quantity: useSelector((state) => getTier(state, 0)),
            tier: 0,
        },
        {
            unit: 'Clickers',
            quantity: useSelector((state) => getTier(state, 1)),
            tier: 1,
        },
        {
            unit: 'Clicker Farms',
            quantity: useSelector((state) => getTier(state, 2)),
            tier: 2,
        },
        {
            unit: 'Clicker Villages',
            quantity: useSelector((state) => getTier(state, 3)),
            tier: 3,
        },
        {
            unit: 'Clicker Town',
            quantity: useSelector((state) => getTier(state, 4)),
            tier: 4,
        },
        {
            unit: 'Clicker City',
            quantity: useSelector((state) => getTier(state, 5)),
            tier: 5,
        },
        {
            unit: 'Clicker Country',
            quantity: useSelector((state) => getTier(state, 6)),
            tier: 6,
        },
        {
            unit: 'Clicker Continents',
            quantity: useSelector((state) => getTier(state, 7)),
            tier: 7,
        },
        {
            unit: 'Clicker Worlds',
            quantity: useSelector((state) => getTier(state, 8)),
            tier: 8,
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
                    updateTier(entity.tier, entity.quantity + entities[entities.indexOf(entity) + 1].quantity)
                    if (entity.tier === 0 && entity.quantity >= 10 ** (resets + 1)) {
                        toast('Time to Reset!', { position: 'top-right' })
                    }
                }
            })
        }, gameSpeed)
        return () => clearTimeout(gameLoop)
    }, [entities, gameSpeed])

    const reset = () => {
        entities.forEach((entity) => {
            updateTier(entity.tier, 0)
        })
        dispatch(setClock(2000))
        if (resets + 1 < THEMES.length) dispatch(setTheme(THEMES[resets + 1]))
        dispatch(incrementAllTimeResets(1))
        dispatch(setResets(resets + 1))
    }

    // @ts-ignore

    const buyEntity = (tier: number, quantity: number = 1) => {
        const targetEntity = entities.find((entity) => entity.tier === tier) as unknown as GameEntity

        if (targetEntity.tier === 0) {
            clickSound()
            updateTier(targetEntity.tier, targetEntity.quantity + quantity)
            dispatch(incrementAllTimeTier({ tier: targetEntity.tier, value: quantity }))
            if (targetEntity.quantity + quantity >= 10 ** (resets + 1)) {
                toast('Time to Reset!', { position: 'top-right' })
            }
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
            if (quantity === 0) {
                toast(`You need  at least ${cost} ${costEntity.unit} to get that`, { position: 'top-right' })
            }
            // console.log(`Buying ${quantity} ${targetEntity.unit} with ${cost} ${costEntity.unit}`)
            const canAfford = costEntity.quantity >= cost * quantity

            if (canAfford) {
                // targetEntity.update(targetEntity.quantity + quantity)
                clickSound()
                updateTier(targetEntity.tier, targetEntity.quantity + quantity)
                dispatch(incrementAllTimeTier({ tier: targetEntity.tier, value: quantity }))
                updateTier(costEntity.tier, costEntity.quantity - cost * quantity)
            } else {
                toast(`You need ${cost * quantity} ${costEntity.unit} to get that`, {
                    position: 'top-right',
                    className: 'bg-primary',
                })
                // alert(`You need ${cost * quantity} ${costEntity.unit} to get that`)
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
    }
    const labelsMap: Record<buttonOptions, string> = { '1': '+1', '10': '+10', MAX: '+MAX' }
    const selectedOptionValue = Array.from(selectedOption)[0] as unknown as buttonOptions

    return (
        <Card className="bg-content2">
            <CardHeader className="justify-end gap-2">
                {' '}
                <ToastContainer
                    position="top-left"
                    autoClose={1000}
                    toastClassName={(toast) =>
                        //@ts-ignore
                        toastClass[toast.type || 'default'] +
                        ' relative flex p-1 min-h-10 rounded-md justify-between overflow-hidden cursor-pointer'
                    }
                />
                <p>Speed: {numeral(2000 / gameSpeed).format('0.00%')}</p>
                <ButtonGroup variant="shadow" size="sm">
                    <Button color="primary" disabled isDisabled>
                        {selectedOption}
                    </Button>
                    <Dropdown size="sm" placement="bottom-end">
                        <DropdownTrigger>
                            <Button isIconOnly color="primary" className="">
                                ⬇️
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
                </ButtonGroup>
            </CardHeader>

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
                            className={`${
                                entity.tier === 0 ? 'col-span-full' : ''
                            }   min-h-[100px] text-primary-foreground bg-gradient-to-br from-primary via-primary`}
                        >
                            <CardBody className="gap-1 pb-0  justify-center overflow-hidden min-h-fit ">
                                <div className=" pb-4 pt-0 grid grid-rows-2 text-center  ">
                                    <h1 className=" pb-0 pt-8 underline md:text-lg font-bold">{entity.unit}</h1>
                                    <p className="pt-0">
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
            <CardFooter className="gap-2 py-8 justify-center text-center">
                <Progress
                    value={(clicks / 10 ** (resets + 1)) * 100}
                    showValueLabel
                    label={`Clicks Needed: ${10 ** (resets + 1)}`}
                ></Progress>

                <Button
                    size="sm"
                    color="primary"
                    isDisabled={clicks < 10 ** (resets + 1)}
                    disabled={clicks < 10 ** (resets + 1)}
                    onClick={() => reset()}
                >
                    {' '}
                    Reset: {resets}{' '}
                </Button>
            </CardFooter>
        </Card>
    )
}

export default ButtonCluster
