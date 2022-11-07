import { firebaseUserType } from '@/fbConfig';
import { atom } from 'recoil';

export const userObjState = atom<firebaseUserType | null>({
  key: 'userObjState',
  default: null,
  // TypeError: Cannot freeze 방지
  dangerouslyAllowMutability: true,
});
