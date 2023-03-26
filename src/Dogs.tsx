import React from 'react';
import './App.css';
import { API_URL } from './configuration';

interface ComponentProps {
    onBreedClick: (breed: string) => void;
    onSubBreedClick?: (breed: string, sub: string) => void;
}

interface DogBreedsResponse {
    message: {
        [breed: string]: string[];
    };
    status: string;
}

export const Dogs: React.FC<ComponentProps> = ({
    onBreedClick,
    onSubBreedClick,
}) => {
    const [dogData, setDogData] = React.useState<
        DogBreedsResponse['message'] | undefined
    >(undefined);
    const getDogsList = async () => {
        const response = await fetch(`${API_URL}/dog-breeds/list/all`);
        const data = await response.json();
        setDogData(data.message);
    };
    const handleBreedClick = (breed: string) => {
        onBreedClick(breed);
    };
    const handleSubBreedClick = (breed: string, sub: string) => {
        onSubBreedClick?.(breed, sub);
    };
    React.useEffect(() => {
        getDogsList();
    }, []);
    return (
        <>
            <ul>
                {!!dogData &&
                    Object.entries(dogData).map(
                        ([breed, subBreeds]: [string, string[]]) => {
                            return subBreeds.length === 0 ? (
                                <li className="list-elem" key={breed}>
                                    <span
                                        onClick={() => handleBreedClick(breed)}
                                    >
                                        {breed}
                                    </span>
                                </li>
                            ) : (
                                <li className="list-elem" key={breed}>
                                    <span
                                        onClick={() => handleBreedClick(breed)}
                                    >
                                        {breed}
                                    </span>
                                    <ul>
                                        {subBreeds.map((sub) => {
                                            return (
                                                <li
                                                    className="list-elem"
                                                    key={sub}
                                                    onClick={() =>
                                                        handleSubBreedClick(
                                                            breed,
                                                            sub,
                                                        )
                                                    }
                                                >
                                                    <span>
                                                        {sub} {breed}
                                                    </span>
                                                </li>
                                            );
                                        })}
                                    </ul>
                                </li>
                            );
                        },
                    )}
            </ul>
        </>
    );
};
