import React from 'react';
import './App.css';
import { DOG_API_URL } from './configuration';

interface ComponentProps {
    dogBreed: string;
    dogSubBreed?: string;
}

interface DogApiImageResponse {
    message: string[];
    status: 'success' | 'error';
}

export const DogImage: React.FC<ComponentProps> = ({
    dogBreed,
    dogSubBreed,
}) => {
    const [dogImgs, setDogImgs] = React.useState<string[]>([]);
    const getDogImages = async () => {
        try {
            const response = await fetch(`${DOG_API_URL}/breed/${dogBreed}/images`);
            if (!response.ok) {
                throw new Error(
                    `Failed to fetch image. Status: ${response.status}`,
                );
            }
            const data: DogApiImageResponse = await response.json();
            let message: string[] = [];
            if (!dogSubBreed) {
                message = data.message;
            } else {
                message = data.message.filter((item) =>
                    item.includes(`${dogBreed}-${dogSubBreed}`),
                );
            }
            let images: string[] = [];
            if (message.length <= 3) {
                for (let i = 0; i < 3; i++) {
                    images.push(message[i]);
                }
            } else {
                for (let i = 0; i < 3; i++) {
                    images.push(
                        message[Math.floor(Math.random() * message.length)],
                    );
                }
            }

            setDogImgs(images);
        } catch (error) {
            console.error('Error fetching dog image:', error);
        }
    };

    React.useEffect(() => {
        if (dogBreed) getDogImages();
    }, [dogBreed]);
    return !dogImgs ? null : (
        <div>
            {dogImgs.map((dogImg) => {
                return (
                    <img
                        key={dogImg}
                        className="topImage"
                        src={dogImg}
                        alt={dogBreed}
                    />
                );
            })}
        </div>
    );
};
