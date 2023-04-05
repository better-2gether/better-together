import type { Org, User } from '../types';
interface LoginProps {
  setUser: (user: User | Org) => void;
  setIsUser: (isUser: boolean) => void;
}

const Login = (props: LoginProps): JSX.Element => {
  const { setUser, setIsUser } = props;
  return <div>Login</div>;
};

export default Login;
