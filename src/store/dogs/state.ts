export interface DogStateInterface {
  dogBreeds: string[];
  dogList: string[];
  breedName: string;
}

function state(): DogStateInterface {
  return {
    dogBreeds: [],
    dogList: [],
    breedName: ''
  }
}

export default state;
