export interface DogStateInterface {
  dogBreeds: string[];
  dogList: string[];
  breedName: string;
  dogImage: string;
  firstTime: boolean;
}

function state(): DogStateInterface {
  return {
    dogBreeds: [],
    dogList: [],
    breedName: 'African',
    dogImage: '',
    firstTime: true
  }
}

export default state;
