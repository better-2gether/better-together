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

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      // login
    } catch (err) {
      // handle error
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
                onChange={(e) => setUserSelection(true)}
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
    </div>
  );
};

export default Login;
