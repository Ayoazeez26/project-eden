import { ActionTree } from 'vuex';
import { StateInterface } from '../index';
import { DogStateInterface } from './state';

const actions: ActionTree<DogStateInterface, StateInterface> = {
  setDogBreeds ({ commit }, payload: string[]) {
    commit('SET_DOGBREEDS', payload);
  },
  setDogList ({ commit }, payload: string[]) {
    commit('SET_DOGLIST', payload);
  },
  setBreedName ({ commit }, payload: string) {
    commit('SET_BREEDNAME', payload);
  },
  clearDogList ({ commit }) {
    commit('CLEAR_DOGLIST');
  },
  setDogImage ({ commit }, payload: string) {
    commit('SET_DOGIMAGE', payload);
  },
  changeFirstTime ({ commit }) {
    commit('CHANGE_FIRSTTIME');
  }
};

export default actions;
