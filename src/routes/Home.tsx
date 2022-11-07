import { dbService, firesoreType } from '@/fbConfig';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';

interface IForm {
  nweet: string;
}

function Home() {
  const { register, handleSubmit, setValue } = useForm();
  const [nweets, setNweets] = useState<firesoreType[]>([]);
  const getNweets = async () => {
    const dbNweets = await dbService.collection('nweets').get();
    dbNweets.forEach((document) => {
      const nweetObject = {
        ...document.data(),
        id: document.id,
      };
      setNweets((prev) => [nweetObject, ...prev]);
    });
  };
  useEffect(() => {
    getNweets();
  }, []);
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
      <div>
        {nweets.map((nweet) => (
          <div key={nweet.id}>
            <h4>{nweet.nweet}</h4>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Home;
