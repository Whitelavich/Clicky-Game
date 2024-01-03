import { commonColors } from '@nextui-org/react'
export const THEMES: THEME_NAME[] = [
    'Default',
    'Dark',
    'Hearts',
    'Pastel_Gem',
    'Prairie',
    'Wonka',
    'Autumn',
    'Space',
    'Mint',
    'Mystery',
]
export type THEME_NAME =
    | 'Default'
    | 'Dark'
    | 'Hearts'
    | 'Mystery'
    | 'Pastel_Gem'
    | 'Prairie'
    | 'Wonka'
    | 'Autumn'
    | 'Space'
    | 'Mint'

export type THEME = {
    colors: {
        primary: {
            DEFAULT: string
            foreground: string
        }
        foreground: string
        background: string
        content1: string
        content2: string
    }
}
export const themes: Record<THEME_NAME, THEME> = {
    Default: {
        colors: {
            primary: {
                DEFAULT: '#1269ec',
                foreground: commonColors.white,
            },
            foreground: commonColors.black,
            background: commonColors.zinc[200],
            content1: commonColors.zinc[300],
            content2: commonColors.zinc[400],
        },
    },
    Dark: {
        colors: {
            primary: {
                DEFAULT: '#6423bc',
                foreground: commonColors.white,
            },
            foreground: commonColors.white,
            background: commonColors.zinc[900],
            content1: commonColors.zinc[800],
            content2: commonColors.zinc[700],
        },
    },
    Hearts: {
        colors: {
            primary: {
                DEFAULT: commonColors.red[600],
                foreground: commonColors.zinc[300],
            },
            foreground: commonColors.zinc[500],
            background: commonColors.red[200],
            content1: commonColors.red[200],
            content2: commonColors.red[300],
        },
    },
    Pastel_Gem: {
        colors: {
            primary: {
                DEFAULT: '#6DD6DA',
                foreground: commonColors.zinc[600],
            },
            foreground: commonColors.zinc[600],
            background: '#817F82',
            content1: '#AE8CA3',
            content2: '#A2ABB5',
        },
    },
    Prairie: {
        colors: {
            primary: {
                DEFAULT: '#E3D888',
                foreground: commonColors.zinc[800],
            },
            foreground: commonColors.zinc[200],
            background: '#31231E',
            content1: '#5A3A31',
            content2: '#84714F',
        },
    },
    Wonka: {
        colors: {
            primary: {
                DEFAULT: '#87B37A',
                foreground: commonColors.zinc[800],
            },
            foreground: commonColors.zinc[100],
            background: '#4B296B',
            content1: '#4C2C72',
            content2: '#77867F',
        },
    },
    Autumn: {
        colors: {
            primary: {
                DEFAULT: '#BC5F04',
                foreground: commonColors.zinc[800],
            },
            foreground: commonColors.zinc[100],
            background: '#010001',
            content1: '#2B0504',
            content2: '#874000',
        },
    },
    Space: {
        colors: {
            primary: {
                DEFAULT: '#D499B9',
                foreground: commonColors.zinc[800],
            },
            foreground: commonColors.zinc[100],
            background: '#011638',
            content1: '#2E294E',
            content2: '#9055A2',
        },
    },
    Mint: {
        colors: {
            primary: {
                DEFAULT: '#B5FFE1',
                foreground: commonColors.zinc[800],
            },
            foreground: commonColors.zinc[100],
            background: '#4E878C',
            content1: '#65B891',
            content2: '#93E5AB',
        },
    },
    Mystery: {
        colors: {
            primary: {
                DEFAULT: `#${Math.floor(Math.random() * 16777215).toString(16)}`,
                foreground: `#${Math.floor(Math.random() * 16777215).toString(16)}`,
            },
            foreground: `#${Math.floor(Math.random() * 16777215).toString(16)}`,
            background: `#${Math.floor(Math.random() * 16777215).toString(16)}`,
            content1: `#${Math.floor(Math.random() * 16777215).toString(16)}`,
            content2: `#${Math.floor(Math.random() * 16777215).toString(16)}`,
        },
    },
}
