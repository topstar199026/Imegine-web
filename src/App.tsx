import { FC } from 'react';
import { create } from 'jss';
import rtl from 'jss-rtl';
import {
	jssPreset,
	StylesProvider,
	ThemeProvider
} from '@material-ui/core';
import { SnackbarProvider } from 'notistack';

import useSettings from './hooks/useSettings';
import { createTheme } from 'src/theme';
import { createBrowserHistory } from 'history';
import { Router } from 'react-router-dom';
import { AuthProvider } from './contexts/JWTAuthContext';
import routes, { renderRoutes } from './routes/routes';

import './App.css';
const jss = create({ plugins: [...jssPreset().plugins, rtl()] });
const history = createBrowserHistory();

const App:FC = () => {	
	const { settings } = useSettings();
	const theme = createTheme({
		direction: settings.direction,
		responsiveFontSizes: settings.responsiveFontSizes,
		theme: settings.theme,
		barStyle: settings.barStyle,
	});

	return (
		<ThemeProvider theme={theme}>
			<StylesProvider jss={jss}>
				<SnackbarProvider
					dense
					maxSnack={3}
					>
					<Router history={history}>
						<AuthProvider>
							{renderRoutes(routes)}
						</AuthProvider>
					</Router>
				</SnackbarProvider>
			</StylesProvider>
		</ThemeProvider>
	);
}

export default App;
