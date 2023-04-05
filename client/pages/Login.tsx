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
    <div>
      <h1>Login</h1>
      <form>
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
      </form>
    </div>
  );
};

export default Login;
