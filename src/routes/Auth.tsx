import { authService } from '@/fbConfig';
import { FormEvent, useState } from 'react';
import { useForm } from 'react-hook-form';

interface IForm {
  email: string;
  password: string;
}

function Auth() {
  const { register, setValue, handleSubmit } = useForm<IForm>();
  const [newAccount, setNewAccount] = useState<boolean>(true);
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
      console.log(error);
    }
  };

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
        <input type="submit" value={newAccount ? 'Create Account' : 'Log In'} />
      </form>
      <div>
        <button>Continue with Google</button>
        <button>Continue with Github</button>
      </div>
    </div>
  );
}

export default Auth;
