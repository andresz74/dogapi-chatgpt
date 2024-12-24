import React from 'react';
import { ChatCompletionRequestMessageRoleEnum } from 'openai';
import ReactMarkdown from 'react-markdown';
import { CHATGPT_API_URL } from './configuration';

export interface ComponentProps {
    dogBreed: string;
    dogSubBreed: string | undefined;
}

export const ChatGpt: React.FC<ComponentProps> = ({
    dogBreed,
    dogSubBreed,
}) => {
    const [response, setResponse] = React.useState<string | undefined>(
        undefined,
    );

    const chatGptMessages = [
        {
            role: ChatCompletionRequestMessageRoleEnum.User,
            content: `Is a ${
                !dogSubBreed ? '' : dogSubBreed
            } ${dogBreed} an aggressive dog breed??`,
        },
        {
            role: ChatCompletionRequestMessageRoleEnum.User,
            content: `Does a ${
                !dogSubBreed ? '' : dogSubBreed
            } ${dogBreed} lives longer?`,
        },
        {
            role: ChatCompletionRequestMessageRoleEnum.User,
            content: `What can you tell me about ${
                !dogSubBreed ? '' : dogSubBreed
            } ${dogBreed}?`,
        },
    ];

    const getOpenAIResponse = async () => {
        try {
            const response = await fetch(`${CHATGPT_API_URL}/api/openai-chat`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ chatGptMessages }),
            });

            const data = await response.json();
            console.log(data.choices[0].message?.content);
            setResponse(data.choices[0].message?.content);
        } catch (error) {
            console.error(error);
        }
    };

    React.useEffect(() => {
        console.log('Effect triggered for dogBreed:', dogBreed);
        setResponse('');
        if (!!dogBreed) getOpenAIResponse();
    }, [dogBreed]);

    return (
        <>
            {!dogBreed ? (
                <div>{'Click on a breed'}</div>
            ) : !response ? (
                <div>{'Loading...'}</div>
            ) : (
                <>
                    <h1 className="title1">
                        {dogBreed} {!dogSubBreed ? '' : dogSubBreed}
                    </h1>
                    <ReactMarkdown children={response} />
                </>
            )}
        </>
    );
};
