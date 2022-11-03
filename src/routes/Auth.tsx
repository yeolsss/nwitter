import { authService } from '@/fbConfig';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

interface IForm {
  email: string;
  password: string;
}

interface IError {
  code: string;
  message: string;
}

function Auth() {
  const { register, setValue, handleSubmit } = useForm<IForm>();
  const [newAccount, setNewAccount] = useState<boolean>(true);
  const [error, setError] = useState<string>('');
  const onValid = async ({ email, password }: IForm) => {
    try {
      let data;
      if (newAccount) {
        data = await authService.createUserWithEmailAndPassword(
          email,
          password,
        );
      } else {
        data = await authService.signInWithEmailAndPassword(email, password);
      }
    } catch (error) {
      const err = error as IError;

      setError(err.message);
    }
  };
  const toggleAccount = () => setNewAccount((prev) => !prev);
  return (
    <div>
      <form onSubmit={handleSubmit(onValid)}>
        <input
          {...register('email', { required: true })}
          type="email"
          placeholder="email"
        />
        <input
          {...register('password', { required: true })}
          type="password"
          placeholder="Password"
        />
        <input
          type="submit"
          value={newAccount ? 'Create Account' : 'Sign In'}
        />
        {error}
      </form>
      <span onClick={toggleAccount}>
        {newAccount ? 'Sign in' : 'Create Account'}
      </span>
      <div>
        <button>Continue with Google</button>
        <button>Continue with Github</button>
      </div>
    </div>
  );
}

export default Auth;
