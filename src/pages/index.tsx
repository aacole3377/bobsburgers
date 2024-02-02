import axios from 'axios'
import Link from 'next/link'
import { GetStaticProps } from 'next'

interface Character {
    id: number;
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


export const getStaticProps: GetStaticProps = async () => {
    const res = await axios.get('https://bobsburgers-api.herokuapp.com/characters/')

    const characters: Character[] = res.data

    return {
        props: {
            characters,
        },
        revalidate: 60,
    }
}

interface Props {
    characters: Character[];
}

export default function Home({ characters }: Props) {
    return (
        <div className="min-h-screen bg-gray-100 py-6 flex flex-col justify-center sm:py-12">
            <div className="relative py-3 sm:max-w-xl sm:mx-auto">
                <h1 className="text-2xl font-bold mb-4 text-center text-black">Bobs Burgers Characters Directory</h1>
                <ul className="space-y-2">
                    {characters.map((character) => (
                        <li key={character.id} className="p-2 bg-gray-200 rounded shadow">
                            <Link href={`/details/${String(character.id)}`} passHref>
                                <span className="text-blue-700 text-black cursor-pointer">{character.name}</span>
                            </Link>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    )
}

