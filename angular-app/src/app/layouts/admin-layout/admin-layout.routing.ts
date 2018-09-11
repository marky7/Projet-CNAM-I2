import { Routes } from '@angular/router';

import { TableListComponent } from '../../table-list/table-list.component';
import { NotificationsComponent } from '../../notifications/notifications.component';

export const AdminLayoutRoutes: Routes = [
    { path: 'table-list', component: TableListComponent },
    { path: 'notifications', component: NotificationsComponent }
];
