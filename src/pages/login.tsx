import { useEffect } from 'react';
import handleGoogleSignIn from '../api/auth/google_auth';
import { useAppSelector } from '@/redux/hooks';
import { useDispatch } from 'react-redux';

const Login = () => {
  const dispatch = useDispatch();
  const auth = useAppSelector((state) => state.auth);
  const handleSignIn = () => {
    handleGoogleSignIn(dispatch);
  };
  useEffect(() => {
    if(auth){
      console.log(auth);
    }
  }, [auth])
  return (
    <div>
      <button onClick={handleSignIn}>Sign in with Google</button>
    </div>
  );
};

export default Login;
