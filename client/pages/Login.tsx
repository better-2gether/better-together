import { useState } from 'react';
import type { Org, User } from '../types';
interface LoginProps {
  setUser: (user: User | Org) => void;
  setIsUser: (isUser: boolean) => void;
  setIsLoggedIn: (isLoggedIn: boolean) => void;
}

const Login = (props: LoginProps): JSX.Element => {
  const { setUser, setIsUser, setIsLoggedIn } = props;

  const [userSelection, setIsUserSelection] = useState<boolean>(true);
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      // login
    } catch (err) {
      setFormStatus('failure');
    }
  };

  return (
    <div>
      <h1>Login</h1>
      <form></form>
    </div>
  );
};

export default Login;
