import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import React from 'react'
import Welcome from './Welcome.jsx'
import 'remixicon/fonts/remixicon.css'

import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Signinpeserta from './Signinpeserta.jsx'
import Loginpeserta from './Loginpeserta.jsx'
import Errorpage from './Errorpage.jsx'
import Homepage from './Homepage.jsx'
import Landingpage from './Landingpage.jsx'
import WebinarPage from './Webinar.jsx'
import SeminarPage from './Seminar.jsx'
import SertifikasiPage from './Sertifikasi.jsx'
import WorkshopPage from './Workshop.jsx'
import KuliahTamuPage from './KuliahTamu.jsx'
import Adminpage from './admin/Homepage.jsx'
import Uploadevent from './admin/Uploadevent.jsx'
import Updateevent from './admin/Updateevent.jsx'
import Loginadmin from './admin/Loginadmin.jsx'
import MyEvents from './myevent.jsx'
import Cardpage from './components/CardPage.jsx'
import ProfilePagePersonalInfo from './Profilepage.jsx'
import ProfilePagePassword from './ProfilePagePassword.jsx'
import DescriptionPageRegistered from './DescriptionPageRegistered.jsx'
import PreviewEvent from './PreviewEvent.jsx'
import DetailEvent from './Detailevent.jsx'
import DescriptionPageCancel from './DescriptionPageCancel.jsx'
import KodeUnik from './KodeUnik.jsx'
import Signinadmin from './admin/Signinadmin.jsx'

const router = createBrowserRouter([
  {
    path: "/welcome",
    element: <Welcome/>,
    
  },
  {
    path: "/home",
    element: <Homepage/>,
    
  },
  {
    path: "/user/register",
    element: <Signinpeserta/>,
  },
  {
    path:"/user/login",
    element: <Loginpeserta/>,
  },
  {
    
    path:"/",
    element: <Landingpage/>,
    errorElement: <Errorpage/>,
  },
  {
    path:"/webinar",
    element: <WebinarPage/>
  },
  {
    path:"/seminar",
    element:<SeminarPage/>
  },
  {
    path:"/kuliah-tamu",
    element: <KuliahTamuPage/>
  },
  {
    path:"/workshop",
    element:<WorkshopPage/>
  },
  {
    path:"/sertifikasi",
    element: <SertifikasiPage/>
  },
  {
    path:"/admin",
    element:<Adminpage/>
  },
  {
    path:"/upload",
    element:<Uploadevent/>,
  },
  {
    path:"/update",
    element:<Updateevent/>
  },
  {
    path: "/admin/login",
    element:<Loginadmin/>
  },
  {
    path:"/my-event",
    element:<MyEvents/>
  },
  {
    path:"/:id/my-event",
    element:<MyEvents/>
  },
  {
    path:"/profile",
    element:<ProfilePagePersonalInfo/>
  },
  {
    path:"/password",
    element:<ProfilePagePassword/>
  },
  {
    path:"/myeventsregister/:id",
    element:<DescriptionPageRegistered/>
  },
  {
    path:"/:id/preview/",
    element:<PreviewEvent/>
  },

  {
    path:"/:id/view/", 
    element:<DetailEvent />
  },
  {
    path:"/:id/cancel/",
    element:<DescriptionPageCancel />
  },
  {
    path:"/:id/kode-unik/", 
    element:<KodeUnik />
  },
  {
    path: "/admin/register",
    element:<Signinadmin/>
  }
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router}/>
  </StrictMode>,
)
