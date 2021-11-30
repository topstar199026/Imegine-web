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

type Routes = {
	exact?: boolean;
	path?: string | string[];
	guard?: any;
	layout?: any;
	component?: any;
	routes?: Routes;
}[];

export const renderRoutes = (routes: Routes = []): JSX.Element => {
	
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
								{
									route.layout ?
										<Layout path={props.history.location} >
											{route.routes
												? renderRoutes(route.routes)
												: <Component {...props} />}
										</Layout>
										:
										<Layout>
										{route.routes
											? renderRoutes(route.routes)
											: <Component {...props} />}
										</Layout>
								}
								
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
	// {
	// 	exact: true,
	// 	guard: GuestGuard,
	// 	path: '/login',
	// 	// component: lazy(() => import('src/views/auth/LoginView'))
	// },
	// {
	// 	exact: true,
	// 	path: '/login-unprotected',
	// 	// component: lazy(() => import('src/views/auth/LoginView'))
	// },
	// {
	// 	exact: true,
	// 	guard: GuestGuard,
	// 	path: '/register',
	// 	// component: lazy(() => import('src/views/auth/RegisterView'))
	// },
	// {
	// 	exact: true,
	// 	path: '/register-unprotected',
	// 	// component: lazy(() => import('src/views/auth/RegisterView'))
	// },
	{
		path: '/page',
		guard: AuthGuard,
		layout: DashboardLayout,
		routes: [
			{
				exact: true,
				path: '/page/social',
				component: lazy(() => import('src/pages/Social'))
			}, 
			{
				exact: true,
				path: [
					'/page/message',
					'/page/message/:messageId'
				],
				component: lazy(() => import('src/pages/Message'))
			}, 
			{
				exact: true,
				path: [
					'/page/wallet',
					'/page/wallet/:walletId'
				],
				component: lazy(() => import('src/pages/Wallet'))
			}, 
			{
				exact: true,
				path: [
					'/page/planner',
					'/page/planner/:plannerId',
					'/page/planner/:plannerId/:action',
				],
				component: lazy(() => import('src/pages/Planner'))
			}, 
			{
				exact: true,
				path: '/page/me',
				component: lazy(() => import('src/pages/Me'))
			}, 
			{
				exact: true,
				path: '/page/todo',
				component: lazy(() => import('src/pages/Todo'))
			},      
			// {
			// 	exact: true,
			// 	path: '/app',
			// 	component: () => <Redirect to="/app/reports/dashboard" />
			// },
			{
				component: () => <Redirect to="/404" />
			}
		]
	},
	{
		path: '*',
		layout: MainLayout,
		guard: GuestGuard,
		routes: [
			{
				exact: true,
				path: '/',
				component: HomeView
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
				component: () => <Redirect to="/404" />
			}
		]
	}
];

export default routes;
