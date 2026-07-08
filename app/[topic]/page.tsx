import TopicList from "./TopicList";

interface Props {
    params: Promise<{ topic: string }>;
}

export default async function Topic({ params }: Props) {
    const { topic } = await params;

    return <TopicList topic={topic} />;
}
