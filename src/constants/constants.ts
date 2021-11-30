import images from "./images";

export const SOCKET_API_SERVER = 'http://localhost:443/socket/';
export const SOCKET_SERVER = 'ws://localhost:443';

// export const SOCKET_API_SERVER = 'http://23.88.34.166:443/socket/';
// export const SOCKET_SERVER = 'ws://23.88.34.166:443';

export const APP_VERSION = '0.1.0';

export const ENABLE_REDUX_DEV_TOOLS = true;

export const THEMES = {
    LIGHT: 'LIGHT',
    ONE_DARK: 'ONE_DARK',
    UNICORN: 'UNICORN'
};

export const LEFT_BAR_WIDTH = 72;
export const BAR_HEIGHT_V = 50;

export const MAIN_LEFT_MENU = {
    left: [
        {
            title: 'Social',
            icon: [
                images.bar.socialBlue,
                images.bar.socialGreen,
            ],
            action: '/page/social'
        },
        {
            title: 'Messages',
            icon: [
                images.bar.emailBlue,
                images.bar.emailGreen,
            ],
            action: '/page/message'
        },
        {
            title: 'Planner',
            icon: [
                images.bar.plannerBlue,
                images.bar.plannerGreen,
            ],
            action: '/page/planner'
        },
        {
            title: 'Wallet',
            icon: [
                images.bar.walletBlue,
                images.bar.walletGreen,
            ],
            action: '/page/wallet'
        },
        {
            title: 'To Do',
            icon: [
                images.bar.todoBlue,
                images.bar.todoGreen,
            ],
            action: '/page/todo'
        },
        {
            title: 'Me',
            icon: [
                images.bar.userBlue,
                images.bar.userGreen,
            ],
            action: '/page/me'
        }
    ],
};
export const MessageTabs = [
    {
        text: 'All',
        flex: 1,
    },
    {
        text: 'Messages',
        flex: 1.5,
    },
    {
        text: 'Emails',
        flex: 1,
    },
];


