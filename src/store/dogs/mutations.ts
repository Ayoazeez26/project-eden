import { MutationTree } from 'vuex';
import { DogStateInterface } from './state';

const mutation: MutationTree<DogStateInterface> = {
  SET_DOGBREEDS (state, dogBreeds: string[]) {
    state.dogBreeds = dogBreeds;
  },
  SET_DOGLIST (state, dogList: string[]) {
    state.dogList = dogList;
  },
  SET_BREEDNAME (state, breedName: string) {
    state.breedName = breedName;
  }
};

export default mutation;
