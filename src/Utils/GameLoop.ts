import buttonCluster from '../Components/ButtonCluster'

export const gameLoop = (callback: () => void) => {
    setInterval(() => {
        callback()
    }, 2000)
}
