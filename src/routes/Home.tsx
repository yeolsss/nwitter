import { userObjState } from '@/atoms/atom';
import { dbService, firebaseUserType, firesoreType } from '@/fbConfig';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useRecoilValue } from 'recoil';

interface IForm {
  nweet: string;
}

function Home() {
  const { register, handleSubmit, setValue } = useForm<IForm>();
  const [nweets, setNweets] = useState<firesoreType[]>([]);
  const userObj = useRecoilValue(userObjState);

  useEffect(() => {
    dbService.collection('nweets').onSnapshot((snapshot) => {
      const nweetAry = snapshot.docs.map((doc) => ({
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
            <h4>{nweet.text}</h4>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Home;
