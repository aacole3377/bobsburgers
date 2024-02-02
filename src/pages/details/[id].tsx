import { GetStaticProps, GetStaticPaths } from 'next';
import { useRouter } from 'next/router'
import axios from 'axios';

interface Character {
    id: string;
    name: string;
    image: string;
    age?: string;
    gender?: string;
    hairColor?: string;
    occupation?: string;
    firstEpisode?: string;
    voicedBy?: string;
    wikiUrl: string;
    url: string;
}

interface CharacterProps {
    character: Character;
}

export const getStaticProps: GetStaticProps = async (context) => {
    const id = Number(context.params?.id as unknown);
    try {
        const res = await axios.get(`https://bobsburgers-api.herokuapp.com/characters/${id}`);
        const character: Character = res.data;

        return {
            props: {
                character,
            },
        };
    } catch (error) {
        console.error('Error fetching character data: ', error);
        return {
            props: {
                character: null,
            },
        };
    }
};



export const getStaticPaths: GetStaticPaths = async () => {
    const res = await axios.get('https://bobsburgers-api.herokuapp.com/characters/');
    const characters: Character[] = res.data;

    const paths = characters.map((character: Character) => ({
        params: { id: String(character.id) },
    }));

    return { paths, fallback: true };
};


export default function Character({ character }: CharacterProps) {
    const router = useRouter()
    if (router.isFallback) {
        return <div>Loading...</div>
    }

    return (
        <div className="p-5">
            <h1 className="text-2xl font-bold mb-4">{character.name}</h1>
            <p>Gender: {character.gender}</p>
            <p>Age: {character.age}</p>
            <p>Occupation: {character.occupation}</p>
            <p>First Episode: {character.firstEpisode}</p>
            <p>Voiced By: {character.voicedBy}</p>
            <a href={character.wikiUrl} className="text-blue-500">
                Wiki Link
            </a>
            <img src={character.image} alt={character.name} className="mt-4" />
        </div>
    );
}
