import ClientTopic from "./ClientTopic";

interface Props {
    params: Promise<{ topic: string }>;
}

export default async function Topic({ params }: Props) {
    const { topic } = await params;

    return <ClientTopic topic={topic} />;
}
