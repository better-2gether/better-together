import { useState } from 'react';
import type { Org, User } from '../types';
import styles from './Login.module.css';
interface LoginProps {
  setUser: (user: User | Org) => void;
  setIsUser: (isUser: boolean) => void;
  setIsLoggedIn: (isLoggedIn: boolean) => void;
}

const Login = (props: LoginProps): JSX.Element => {
  const { setUser, setIsUser, setIsLoggedIn } = props;

  const [userSelection, setUserSelection] = useState<boolean>(true);
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [loginError, setLoginError] = useState<boolean>(false);

  // TODO: Add form validation.
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const route = userSelection ? 'api/users/login' : 'api/orgs/login';
      const response = await fetch(route, {
        method: 'POST',
        headers: {
          'Content-Type': 'Application/JSON',
        },
        body: JSON.stringify({ username, password }),
      });
      if (!response.ok) throw 'Unable to log in.';
      const data = await response.json();
      // Set user states.
      setIsUser(userSelection);
      if (data.org) setUser(data.org);
      if (data.user) setUser(data.user);
      setIsLoggedIn(true);
      localStorage.setItem('isLoggedIn', 'true');
    } catch (err) {
      setLoginError(true);
    }
  };

  return (
    <div className={styles.container}>
      <h1>Login</h1>
      <form className={styles.form} onSubmit={(e) => handleSubmit(e)}>
        <fieldset>
          <legend>Select account type:</legend>
          <div className={styles.formRow}>
            <div className={styles.formRadioOption}>
              <input
                id='typeUser'
                type='radio'
                name='type'
                value='user'
                onChange={() => setUserSelection(true)}
                checked
              />
              <label htmlFor='typeUser'>Volunteer</label>
            </div>
            <div className={styles.formRadioOption}>
              <input
                id='typeOrg'
                type='radio'
                name='type'
                value='org'
                onChange={() => setUserSelection(false)}
              />
              <label htmlFor='typeOrg'>Organization</label>
            </div>
          </div>
        </fieldset>
        <div className={styles.formRow}>
          <label htmlFor='username'>Username</label>
          <input
            type='text'
            name='username'
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div className={styles.formRow}>
          <label htmlFor='password'>Password</label>
          <input
            type='password'
            name='password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
      </form>
      <button type='submit' className={styles.btnLogin}>
        Login
      </button>
      {loginError && <div className={styles.formError}>Unable to log in.</div>}
    </div>
  );
};

export default Login;
