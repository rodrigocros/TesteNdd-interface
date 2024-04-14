import { Routes } from '@angular/router';
import { UserListComponent } from './Features/user-list/user-list.component';
import { UserFormComponent } from './Features/user-form/user-form.component';

export const routes: Routes = [
    {
        path: '',
        component: UserListComponent
    },
    {
        path: 'create-user',
        component: UserFormComponent
    },
    {
        path: 'User/:id',
        component: UserFormComponent
    }
];
