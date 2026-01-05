import './App.css';
import AppRoutes from './routes/AppRoutes';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { checkSession } from './redux/slices/AuthSlicer';

function App() {
  const dispatch = useDispatch();
  
  useEffect(() => {
    dispatch(checkSession());
  }, [dispatch]);
  
  return (
    <AppRoutes/>
  );
}

export default App;
