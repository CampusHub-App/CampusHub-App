import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './App.css'
import React from 'react'
import Welcome from './Welcome.jsx'
import 'remixicon/fonts/remixicon.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import LoginPeserta from './LoginPeserta.jsx'
import ErrorPage from './ErrorPage.jsx'
import HomePage from './HomePage.jsx'
import WebinarPage from './Webinar.jsx'
import SeminarPage from './Seminar.jsx'
import SertifikasiPage from './Sertifikasi.jsx'
import WorkshopPage from './Workshop.jsx'
import KuliahTamuPage from './KuliahTamu.jsx'
import AdminPage from './admin/HomePage.jsx'
import UploadEvent from './admin/UploadEvent.jsx'
import UpdateEvent from './admin/UpdateEvent.jsx'
import LoginAdmin from './admin/LoginAdmin.jsx'
import MyEvents from './MyEvents.jsx'
import ProfilePagePersonalInfo from './ProfilePage.jsx'
import ProfilePagePassword from './ProfilePagePassword.jsx'
import MyEventStatusPage from './MyEventStatusPage.jsx'
import PreviewEvent from './PreviewEvent.jsx'
import DetailEvent from './DetailEvent.jsx'
import KodeUnik from './KodeUnik.jsx'
import SignInPeserta from './SignInPeserta.jsx'

const router = createBrowserRouter([
  {
    path: "/welcome",
    element: <Welcome/>,
    
  },
  {
    path: "/user/register",
    element: <SignInPeserta/>,
  },
  {
    path:"/user/login",
    element: <LoginPeserta/>,
  },
  {
    
    path:"/",
    element: <HomePage/>,
    errorElement: <ErrorPage/>,
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
    element:<AdminPage/>
  },
  {
    path:"/upload",
    element:<UploadEvent/>,
  },
  {
    path:"/update",
    element:<UpdateEvent/>
  },
  {
    path: "/admin/login",
    element:<LoginAdmin/>
  },
  {
    path:"/my-events",
    element:<MyEvents/>
  },
  {
    path:"/account/profile",
    element:<ProfilePagePersonalInfo/>
  },
  {
    path:"/account/password",
    element:<ProfilePagePassword/>
  },
  {
    path:"/my-events/:id/view/",
    element:<MyEventStatusPage/>
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
    path:"/:id/kode-unik/", 
    element:<KodeUnik />
  }
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router}/>
  </StrictMode>,
)
