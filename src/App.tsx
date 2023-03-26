import React from "react";
import "./App.css";
import { ChatGpt } from "./ChatGpt";
import { DogImage } from "./DogImage";
import { Dogs } from "./Dogs";

const App: React.FC = () => {
  const [dogBreed, setDogBreed] = React.useState<string>('');
  const [dogSubBreed, setDogSubBreed] = React.useState<string | undefined>(undefined);
  const getBreed = (breed: string) => {
    if (breed !== dogBreed) {
      setDogBreed(breed);
      setDogSubBreed(undefined);
    }
  };
  const getBreedSubBreed = (breed: string, sub: string) => {
    if (breed !== dogBreed || sub !== dogSubBreed) {
      setDogBreed(breed);
      setDogSubBreed(sub);
    }
  };

  return (
    <div className="App">
      <div className="row">
        <div className="column">
          <Dogs onBreedClick={getBreed} onSubBreedClick={getBreedSubBreed}/>
        </div>
        <div className="column">
          <DogImage dogBreed={dogBreed} dogSubBreed={dogSubBreed} /> 
          <ChatGpt dogBreed={dogBreed} dogSubBreed={dogSubBreed} />
        </div>
      </div>
    </div>
  );
};

export default App;
