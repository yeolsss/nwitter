import { useForm } from 'react-hook-form';

interface IForm {
  chat: string;
}

function Home() {
  const { register, handleSubmit, getValues } = useForm();
  const onValid = ({ chat }: IForm) => {
    console.log(chat);
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onValid)}>
        <input
          {...register('chat', { required: true })}
          type="text"
          placeholder="What'on your mind?"
          maxLength={120}
        />
        <input type="submit" value="Nweet" />
      </form>
    </div>
  );
}

export default Home;
