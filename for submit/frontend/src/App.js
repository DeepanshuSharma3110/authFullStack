import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from './pages/homePage';
import Login from './pages/login';
import Register from './pages/register';
import Forgotpassword from './pages/forgot-password';
import ChangePassword from './pages/changePassword';


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/'element={<HomePage />}/>
        <Route path='/login' element={<Login />}/>
        <Route path='/register' element={<Register />}/>
        <Route path='/forgot-password' element={<Forgotpassword />}/>
        <Route path='/resetPassword/:id' element={<ChangePassword />}/>
        
      </Routes>
    </BrowserRouter>
  );
}

export default App;