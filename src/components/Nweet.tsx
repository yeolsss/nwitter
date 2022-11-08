import { userObjState } from '@/atoms/atom';
import { INweet } from '@/fbConfig';
import { useState } from 'react';
import { useRecoilValue } from 'recoil';

interface INweetProps {
  nweetObj: INweet;
}

function Nweet({ nweetObj }: INweetProps) {
  const userObj = useRecoilValue(userObjState);

  return (
    <div key={nweetObj.id}>
      <h4>{nweetObj.text}</h4>
      {nweetObj.creatorId === userObj?.uid ? (
        <>
          <button>Delete Nweet</button>
          <button>Edit Nweet</button>
        </>
      ) : null}
    </div>
  );
}

export default Nweet;
