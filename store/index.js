import '@firebase/app';
import "@firebase/firestore";
import "@firebase/auth";
import '@firebase/storage';
import { vuexfireMutations } from 'vuexfire'

export const mutations = {
  ...vuexfireMutations,
}
