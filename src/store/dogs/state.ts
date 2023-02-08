export interface DogStateInterface {
  dogBreeds: string[];
  dogList: string[];
  breedName: string;
  dogImage: string;
}

function state(): DogStateInterface {
  return {
    dogBreeds: [],
    dogList: [],
    breedName: '',
    dogImage: ''
  }
}

export default state;
