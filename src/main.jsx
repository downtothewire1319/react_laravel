import { createRoot } from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'
import route from './routes.jsx'
import AppProvider from './context/AppContext.jsx'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  

<>
<AppProvider>


  
  <RouterProvider router={route}>


  </RouterProvider>
    </AppProvider>
  </>
)
