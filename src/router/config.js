import { lazy } from 'react'

const Config = [
	
	{
		path: '/',
		component: lazy(() => import("@components/homeLayout/homeLayout")),
		routes:[
			{
				path: '/',
				component: lazy(() => import("@pages/home/home")),
				exact: true,
				name:'补贴申请',
			},
		]
	}
	,{
		path: "*",
		component: lazy(() => import("@pages/home/home")),
		exact: true,
		name:'404',
	},
];


export default Config;
