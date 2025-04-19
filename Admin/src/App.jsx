import { useState } from 'react'
import Navabr from './components/Navbar/Navbar'
import Sidebar from './components/Siderbar/Sidebar'
import {Routes,Route} from 'react-router-dom'
import Add from './pages/Add/Add.jsx'
import List from './pages/List/List.jsx'
import Order from './pages/Orders/Order.jsx'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'

function App() {
  const [count, setCount] = useState(0)
  const url="http//:localhost:4000" //pass this to all components in props instead of creating url in each component

  return (
    <div>
      <ToastContainer />
      <Navabr />
      <hr />
      <div className="app-content">
        <Sidebar />
        <Routes>
          <Route path="/add" element={<Add />} />
          <Route path="/list" element={<List />} />
          <Route path="/orders" element={<Order />} />
        </Routes>
      </div>
    </div>
  )
}

export default App
