import _ from 'lodash';
import {
colors as mColors,
createTheme as createMuiTheme,
responsiveFontSizes
} from '@material-ui/core';
import type { Theme as MuiTheme } from '@material-ui/core/styles/createTheme';
import type { Shadows as MuiShadows } from '@material-ui/core/styles/shadows';
import type {
Palette as MuiPalette,
TypeBackground as MuiTypeBackground
} from '@material-ui/core/styles/createPalette';
import { THEMES } from 'src/constants/constants';
import { softShadows, strongShadows } from './shadows';
import typography from './typography';
import colors from 'src/constants/colors';

interface TypeBackground extends MuiTypeBackground {
	dark: string;
}

interface TypeBar extends MuiTypeBackground {
	dark: string;
}

interface Palette extends MuiPalette {
	background: TypeBackground;
	children1: TypeBackground;
	bar: TypeBar;
}

export interface Theme extends MuiTheme {
	name: string;
	palette: Palette;
}

type Direction = 'ltr' | 'rtl';
type BarStyle = 'left' | 'bottom';

interface ThemeConfig {
	direction?: Direction;
	responsiveFontSizes?: boolean;
	theme?: string;
	barStyle?: BarStyle;
}

interface ThemeOptions { 
	name?: string;
	direction?: Direction;
	typography?: Record<string, any>;
	overrides?: Record<string, any>;
	palette?: Record<string, any>;
	shadows?: MuiShadows;
	barStyle?: BarStyle;
}

const baseOptions: ThemeOptions = {
	direction: 'ltr',
	barStyle: 'left',
	typography,
	overrides: {
		MuiLinearProgress: {
		root: {
			borderRadius: 3,
			overflow: 'hidden'
		}
		},
		MuiListItemIcon: {
		root: {
			minWidth: 32
		}
		},
		MuiChip: {
			root: {
				backgroundColor: 'rgba(0,0,0,0.075)'
			}
		}
	}
};

const themesOptions: ThemeOptions[] = [
	{
		name: THEMES.LIGHT,
		overrides: {
			MuiInputBase: {
				input: {
					'&::placeholder': {
						opacity: 1,
						color: mColors.blueGrey[600]
					}
				}
			}
		},
		palette: {
			type: 'light',
			action: {
				active: mColors.blueGrey[600]
			},
			background: {
				default: mColors.common.white,
				dark: '#f4f6f8',
				paper: mColors.common.white
			},
			children1: {
				default: colors.$backgroundGrey,
				dark: colors.$backgroundGrey,
				paper: colors.$backgroundGrey,
			},
			primary: {
				main: mColors.indigo[600]
			},
			secondary: {
				main: '#5850EC'
			},
			text: {
				primary: mColors.blueGrey[900],
				secondary: mColors.blueGrey[600]
			},
			bar: {
				default: colors.$barPrimaryColor,
				dark: colors.$barPrimaryColor,
				paper: colors.$barPrimaryColor,
			},
		},
		shadows: softShadows
	},
	{
		name: THEMES.ONE_DARK,
		palette: {
			type: 'dark',
			action: {
				active: 'rgba(255, 255, 255, 0.54)',
				hover: 'rgba(255, 255, 255, 0.04)',
				selected: 'rgba(255, 255, 255, 0.08)',
				disabled: 'rgba(255, 255, 255, 0.26)',
				disabledBackground: 'rgba(255, 255, 255, 0.12)',
				focus: 'rgba(255, 255, 255, 0.12)'
			},
			background: {
				default: '#282C34',
				dark: '#1c2025',
				paper: '#282C34'
			},
			children1: {
				default: colors.$backgroundGrey,
				dark: colors.$backgroundGrey,
				paper: colors.$backgroundGrey,
			},
			primary: {
				main: '#8a85ff'
			},
			secondary: {
				main: '#8a85ff'
			},
			text: {
				primary: '#e6e5e8',
				secondary: '#adb0bb'
			},
			bar: {
				primary: colors.$barPrimaryColor,
			},
		},
		shadows: strongShadows
	},
	{
		name: THEMES.UNICORN,
		palette: {
			type: 'dark',
			action: {
				active: 'rgba(255, 255, 255, 0.54)',
				hover: 'rgba(255, 255, 255, 0.04)',
				selected: 'rgba(255, 255, 255, 0.08)',
				disabled: 'rgba(255, 255, 255, 0.26)',
				disabledBackground: 'rgba(255, 255, 255, 0.12)',
				focus: 'rgba(255, 255, 255, 0.12)'
			},
			background: {
				default: '#2a2d3d',
				dark: '#222431',
				paper: '#2a2d3d'
			},
			children1: {
				default: colors.$backgroundGrey,
				dark: colors.$backgroundGrey,
				paper: colors.$backgroundGrey,
			},
			primary: {
				main: '#a67dff'
			},
			secondary: {
				main: '#a67dff'
			},
			text: {
				primary: '#f6f5f8',
				secondary: '#9699a4'
			},
			bar: {
				primary: colors.$barPrimaryColor,
			},
		},
		shadows: strongShadows
	}
];

export const createTheme = (config: ThemeConfig = {}): Theme => {
	let themeOptions = themesOptions.find((theme) => theme.name === config.theme);

	if (!themeOptions) {
		console.warn(new Error(`The theme ${config.theme} is not valid`));
		[themeOptions] = themesOptions;
	}

	let theme = createMuiTheme(
		_.merge(
		{},
		baseOptions,
		themeOptions,
		{ direction: config.direction, barStyle: config.barStyle }
		)
	);

	if (config.responsiveFontSizes) {
		theme = responsiveFontSizes(theme);
	}
	
	return theme as unknown as Theme;
}
