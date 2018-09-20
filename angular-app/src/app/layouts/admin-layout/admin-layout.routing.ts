import { Routes } from '@angular/router';

import { TableListComponent } from '../../table-list/table-list.component';
import { NotificationsComponent } from '../../notifications/notifications.component';
import { MesuresComponent } from '../../mesures/mesures.component';

export const AdminLayoutRoutes: Routes = [
    { path: 'table-list', component: TableListComponent },
    { path: 'notifications', component: NotificationsComponent },
    { path: 'mesures', component: MesuresComponent }
];
