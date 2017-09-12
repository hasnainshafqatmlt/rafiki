import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Home from '../components/Home';
import Main from '../components/Main';
import NotFound from '../components/NotFound';

import Login from '../components/Login/Login';
import Signup from '../components/Signup/Signup';
import SignupStep2 from '../components/Signup/SignupStep2';
import Forgot from '../components/Forgot/Forgot';
import ForgotStep2 from '../components/Forgot/ForgotStep2';
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
        <Route exact path='/' component={Home}/>
        <Route path='/login' component={Login}/>
        <Route path='/signup' exact component={Signup}/>
        <Route path='/signup/verification' component={SignupStep2}/>
        <Route path='/forgot' exact component={Forgot}/>
        <Route path='/forgot/verification' component={ForgotStep2}/>
        <Route path='/areas' exact component={Areas}/>
        <Route path='/areas/:serviceId/:edit?' component={Areas}/>
        <Route path='/descripcion' exact component={Descripcion}/>
        <Route path='/descripcion/:serviceId' component={Descripcion}/>
        <Route path='/vistaPrevia' exact component={VistaPrevia}/>
        <Route path='/vistaPrevia/:serviceId' component={VistaPrevia}/>
        <Route path='/felicitaciones' component={Felicitaciones}/>
        <Route path='/servicios' component={Servicios}/>
        <Route path='/ventas' component={Ventas}/>
        <Route path='/perfil' component={Perfil}/>

        <Route path='/admin/login' component={AdminLogin}/>
        <Route path='/admin/servicios' component={AdminServicios}/>
        <Route path='/admin/vistaPrevia/:serviceId' component={VistaPrevia}/>
        <Route path='/admin/usuarios' component={AdminUsuarios}/>
        <Route path='/admin/perfil' component={AdminPerfil}/>
      </Main>

      <Route path="*" component={NotFound} status={404} />

    </Switch>
  );
};

export default Root;
