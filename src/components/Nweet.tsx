import { userObjState } from '@/atoms/atom';
import { dbService, INweet } from '@/fbConfig';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useRecoilValue } from 'recoil';

interface INweetProps {
  nweetObj: INweet;
}

interface IForm {
  newNweet: string;
}

function Nweet({ nweetObj }: INweetProps) {
  const userObj = useRecoilValue(userObjState);
  const [editing, setEditing] = useState<Boolean>(false);
  const [newNweet, setNewNweet] = useState<string>(nweetObj.text);
  const { register, setValue, handleSubmit } = useForm<IForm>();

  const handleDelete = async () => {
    const confirm = window.confirm('nweet를 삭제 하시겠습니까?');
    if (confirm) {
      //delete
      await dbService.doc(`nweets/${nweetObj.id}`).delete();
    }
  };

  const handleEditing = () => setEditing((prev) => !prev);

  const onValid = async ({ newNweet }: IForm) => {
    await dbService.doc(`nweets/${nweetObj.id}`).update({
      text: newNweet,
    });
    setEditing(false);
  };

  return (
    <div>
      {editing ? (
        <>
          <form onSubmit={handleSubmit(onValid)}>
            <input
              {...register('newNweet', { value: newNweet, required: true })}
              type="text"
              placeholder="Edit your Nweet"
            />
            <input type="submit" value="Update Nweet" />
          </form>
          <button onClick={handleEditing}>Cancel</button>
        </>
      ) : (
        <>
          <h4>{nweetObj.text}</h4>
          {nweetObj.creatorId === userObj?.uid ? (
            <>
              <button onClick={handleDelete}>Delete Nweet</button>
              <button onClick={handleEditing}>Edit Nweet</button>
            </>
          ) : null}
        </>
      )}
    </div>
  );
}

export default Nweet;
