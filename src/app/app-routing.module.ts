import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FormEmpleadoComponent } from './components/form-empleado/form-empleado.component';
import { ListEmpleadoComponent } from './components/list-empleado/list-empleado.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: '/list-empleados' },
  { path: 'list-empleados', component: ListEmpleadoComponent },
  { path: 'create-empleado', component: FormEmpleadoComponent },
  { path: 'edit-empleado/:id', component: FormEmpleadoComponent },
  { path: '**', component: ListEmpleadoComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
