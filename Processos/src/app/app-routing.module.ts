import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { UsuarioComponent } from './pages/usuario/usuario.component';
import { MenuComponent } from './pages/menu/menu.component';
import { ProcessoComponent } from './pages/processo/processo/processo.component';
import { ProcessosComponent } from './pages/processo/processos/processos.component';
import { TipoUsuarioComponent } from './pages/tipo-usuario/tipo-usuario.component';


const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'usuario/:id',
    component: UsuarioComponent
  },
  {
    path: 'menu',
    component: MenuComponent
  },
  {
    path: 'processo',
    component: ProcessoComponent
  },
  {
    path: 'processo/:id',
    component: ProcessoComponent
  },
  {
    path: 'processos',
    component: ProcessosComponent
  },
  {
    path: 'tipo-Usuario',
    component: TipoUsuarioComponent
  },
  {
    path: '**',
    redirectTo: 'login'
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
