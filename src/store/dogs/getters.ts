import { GetterTree } from 'vuex';
import { StateInterface } from '../index';
import { DogStateInterface } from './state';

export type Getters = {
  getDogList(state: DogStateInterface): string[] | [];
  getDogBreeds(state: DogStateInterface): string[] | [];
  getBreedName(state: DogStateInterface): string | '';
}

const getters: GetterTree<DogStateInterface, StateInterface> = {
  getDogList(state) {
    return state.dogList;
  },
  getDogBreeds(state) {
    return state.dogBreeds;
  },
  getBreedName(state) {
    return state.breedName;
  }
};

export default getters;
