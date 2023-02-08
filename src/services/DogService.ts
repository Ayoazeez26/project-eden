import axios from '@/plugins/axios';

export const fetchAllDogs = async (): Promise<unknown> => {
  try {
    const response = await axios.get('/breeds/list/all');
    if (response) {
      return Promise.resolve(response.data);
    }
  } catch (e) {
    return Promise.reject(e);
  }
};

export const fetchDogBreeds = async (): Promise<unknown> => {
  try {
    const response = await axios.get('/breeds/list/all');
    if (response) {
      return Promise.resolve(response.data);
    }
  } catch (e) {
    return Promise.reject(e);
  }
};

export const getByBreed = async (data: string): Promise<unknown> => {
  try {
    const response = await axios.get(`/breed/${data}/images`);
    if (response) {
      return Promise.resolve(response.data);
    }
  } catch (e) {
    return Promise.reject(e);
  }
};