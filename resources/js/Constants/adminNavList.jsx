import { AdminUrls } from "./siteUrls";

export const adminNavList = [
    {name: 'Dashboard', path: AdminUrls.DASHBOARD, component: 'Admin/Dashboard'},
    {name: 'Categories', path: AdminUrls.CATEGORIES, component: 'Admin/Categories'},
    {name: 'Questions', path: AdminUrls.QUESTIONS, component: 'Admin/Questions'},
    {name: 'Users', path: AdminUrls.USERS, component: 'Admin/Users'},
]
