import { userObjState } from '@/atoms/atom';
import Nweet from '@/components/Nweet';
import { dbService, INweet } from '@/fbConfig';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useRecoilValue } from 'recoil';

interface IForm {
  nweet: string;
}

function Home() {
  const { register, handleSubmit, setValue } = useForm<IForm>();
  const [nweets, setNweets] = useState<INweet[]>([]);
  const userObj = useRecoilValue(userObjState);
  useEffect(() => {
    dbService.collection('nweets').onSnapshot((snapshot) => {
      const nweetAry: INweet[] = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setNweets(nweetAry);
    });
  }, []);
  const onValid = async ({ nweet }: IForm) => {
    await dbService.collection('nweets').add({
      text: nweet,
      createdAt: Date.now(),
      creatorId: userObj?.uid,
    });
    setValue('nweet', '');
  };
  return (
    <div>
      <form onSubmit={handleSubmit(onValid)}>
        <input
          {...register('nweet', { required: true, maxLength: 120 })}
          type="text"
          placeholder="What'on your mind?"
        />
        <input type="submit" value="Nweet" />
      </form>
      <div>
        {nweets.map((nweet) => (
          <Nweet key={nweet.id} nweetObj={nweet} />
        ))}
      </div>
    </div>
  );
}

export default Home;
