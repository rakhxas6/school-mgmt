import './App.css';
import AppRoutes from './routes/AppRoutes';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { checkSession } from './redux/slices/AuthSlicer';
import {  Toaster } from 'react-hot-toast';

function App() {
  const dispatch = useDispatch();
  
  useEffect(() => {
    dispatch(checkSession());
  }, [dispatch]);
  
  return (
    <>
    <Toaster/>
    <AppRoutes/>
    </>
  );
}

export default App;
