const abbrs = ['K', 'M', 'B', 'T', 'Qa', 'Qi', 'Sx', 'Sp', 'O', 'N', 'D']
let formatter = Intl.NumberFormat('en', {
    notation: 'scientific',
})
export const format = (value: number) => {
    if (value.toString().length > 33) {
        return formatter.format(value)
    }
    if (value.toString().length > 3) {
        return `${value.toString().slice(0, 1)}.${value.toString()} ${abbrs[Math.floor(value / 1000) - 1]}`
    } else {
        return value
    }
}
