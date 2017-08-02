import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Dashboard from '../components/Dashboard';
import Main from '../components/Main';
import NotFound from '../components/NotFound';

import Login from '../components/Login/Login';
import Signup from '../components/Signup/Signup';
import Forgot from '../components/Forgot/Forgot';
import Areas from '../components/Areas/Areas';
import Descripcion from '../components/Descripcion/Descripcion';
import VistaPrevia from '../components/VistaPrevia/VistaPrevia';
import Felicitaciones from '../components/Felicitaciones/Felicitaciones';
import Servicios from '../components/Servicios/Servicios';
import Ventas from '../components/Ventas/Ventas';
import Perfil from '../components/Perfil/Perfil';

// Admin
import AdminLogin from '../components/Admin/Login';
import AdminServicios from '../components/Admin/Servicios';
import AdminUsuarios from '../components/Admin/Usuarios';
import AdminPerfil from '../components/Admin/Perfil';




const Root = () => {
  return (
    <Switch>
      <Main>
        <Route exact path='/' component={Dashboard}/>
        <Route path='/login' component={Login}/>
        <Route path='/signup' component={Signup}/>
        <Route path='/forgot' component={Forgot}/>
        <Route path='/areas' component={Areas}/>
        <Route path='/descripcion' component={Descripcion}/>
        <Route path='/vistaPrevia' component={VistaPrevia}/>
        <Route path='/felicitaciones' component={Felicitaciones}/>
        <Route path='/servicios' component={Servicios}/>
        <Route path='/ventas' component={Ventas}/>
        <Route path='/perfil' component={Perfil}/>

        <Route path='/admin/login' component={AdminLogin}/>
        <Route path='/admin/servicios' component={AdminServicios}/>
        <Route path='/admin/usuarios' component={AdminUsuarios}/>
        <Route path='/admin/perfil' component={AdminPerfil}/>
      </Main>

      <Route path="*" component={NotFound} status={404} />

    </Switch>
  );
};

export default Root;
