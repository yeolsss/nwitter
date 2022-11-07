import { dbService } from '@/fbConfig';
import { useForm } from 'react-hook-form';

interface IForm {
  nweet: string;
}

function Home() {
  const { register, handleSubmit, setValue } = useForm();
  const onValid = async ({ nweet }: IForm) => {
    await dbService.collection('nweets').add({
      nweet,
      createdAt: Date.now(),
    });
    setValue('nweet', '');
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onValid)}>
        <input
          {...register('nweet', { required: true })}
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
