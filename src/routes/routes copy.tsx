import React, {
	Suspense,
	Fragment,
	lazy
} from 'react';
import {
	Switch,
	Redirect,
	Route
} from 'react-router-dom';
import DashboardLayout from 'src/layouts/DashboardLayout';
import MainLayout from 'src/layouts/MainLayout';
import HomeView from 'src/pages/Home';
import LoadingScreen from 'src/components/Welcome/LoadingScreen';
import AuthGuard from 'src/components/Guard/AuthGuard';
import GuestGuard from 'src/components/Guard/GuestGuard';
import MainGuard from 'src/components/Guard/MainGuard';

type Routes = {
	exact?: boolean;
	path?: string | string[];
	guard?: any;
	layout?: any;
	component?: any;
	routes?: Routes;
}[];

export const renderRoutes = (routes: Routes = []): JSX.Element => {
	console.log('renderRoutes', routes)
	return (
		<Suspense fallback={<LoadingScreen />}>
			<Switch>
				{routes.map((route, i) => {
					const Guard = route.guard || Fragment;
					const Layout = route.layout || Fragment;
					const Component = route.component;

					return (
						<Route
							key={i}
							path={route.path}
							exact={route.exact}
							render={(props) => (
							<Guard>
								<Layout>
								{route.routes
									? renderRoutes(route.routes)
									: <Component {...props} />}
								</Layout>
							</Guard>
							)}
						/>
					);
				})}
			</Switch>
		</Suspense>
	)
};

const routes: Routes = [
	{
		exact: true,
		path: '/404',
		component: lazy(() => import('src/pages/Error/NotFoundView'))
	},
	{
		exact: true,
		path: '/home',
		component: lazy(() => import('src/pages/Home'))
	},
	{
		exact: true,
		path: '/scan-qr',
		component: lazy(() => import('src/pages/ScanQR'))
	},
	{
		path: '/page',
		guard: AuthGuard,
		layout: DashboardLayout,
		routes: [
			{
				exact: true,
				path: '/page/message',
				component: lazy(() => import('src/pages/Message'))
			},  
			// {
			// 	component: () => <Redirect to="/404" />
			// }
		]
	},
	{
		exact: true,
		path: '/',
		guard: MainGuard,
		component: lazy(() => import('src/pages/Home'))
	  },
];

export default routes;
