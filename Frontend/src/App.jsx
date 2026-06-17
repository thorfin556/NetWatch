import LoginPage from './pages/LoginPage';
import { Route,Routes } from 'react-router-dom';
import heroImg from './assets/hero.png'
import './App.css'
import RegisterPage from './pages/RegisterPage';
import Dashboard from './pages/Dashboard';
import ProtectedRoute from './components/ProtectedRoute';

import MonitorPage from './pages/MonitorPage';
import EditPage from './pages/EditMonitorPage';
import MonitorDetailPage from './pages/MonitorDetailPage';
import FeaturesPage from './pages/FeaturesPage';
import AboutMePage from './pages/AboutMe';
import SettingsPage from './pages/SettingsPage';
import AlertsPage from './pages/AlertPage';

function App(){
  return (
    <>
    
    <Routes>
      <Route path='/login' element ={<LoginPage/>}/>
      <Route path='/' element ={<LoginPage/>}/>
      <Route path='/register' element ={<RegisterPage/>}/>
      <Route path='/features' element ={<FeaturesPage/>}/>
      <Route path="/settings" element={<SettingsPage />} />
      <Route path="/alerts" element={<AlertsPage />} />
      <Route path='/about-me' element ={<AboutMePage/>}/>
      <Route path='/edit-monitor/:id' element ={<EditPage/>}/>
      <Route path='/monitor/:id' element ={<MonitorDetailPage/>}/>
      <Route path='/monitor' element ={<MonitorPage/>}/>
      <Route
      path='/dashboard'
      element ={
        <ProtectedRoute>
          <Dashboard/>
        </ProtectedRoute>
      }/>


    </Routes>
    
    </>
  )
}

export default App
