import { GetterTree } from 'vuex';
import { StateInterface } from '../index';
import { DogStateInterface } from './state';

export type Getters = {
  getDogList(state: DogStateInterface): string[] | [];
  getDogBreeds(state: DogStateInterface): string[] | [];
  getBreedName(state: DogStateInterface): string;
  getDogImage(state: DogStateInterface): string;
  getFirstTime(staet: DogStateInterface): boolean;
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
  },
  getDogImage(state) {
    return state.dogImage;
  },
  getFirstTime(state) {
    return state.firstTime;
  }
};

export default getters;
