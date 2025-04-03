import { NgModule, Component } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterComponent } from './components/register/register.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { PassComponent } from './components/pass/pass.component';
import { ListaComponent } from './components/lista/lista.component';
import { InicioComponent } from './components/inicio/inicio.component';
import { GimnasioComponent } from './components/gimnasio/gimnasio.component';
import { EntrenadoresComponent } from './components/entrenadores/entrenadores.component';
import { ActividadesComponent } from './components/actividades/actividades.component';
import { ClasesComponent } from './components/clases/clases.component';

const routes: Routes = [{path:"", component:LoginComponent},{path:"pass", component:PassComponent},{path:"lista",component:ListaComponent},{
  path:"register",component:RegisterComponent
},
{
  path:"login",component:LoginComponent
},{path:"inicio", component:InicioComponent}, {path:"gim", component:GimnasioComponent},{path:"entrenadores", component:EntrenadoresComponent},{
  path:"actividades", component:ActividadesComponent
},{path:"clases", component:ClasesComponent}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
