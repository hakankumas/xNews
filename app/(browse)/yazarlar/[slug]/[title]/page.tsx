import OpinionDetails from "./OpinionDetails";

interface Props {
    params: Promise<{ title: string }>;
}

export default async function Title({ params }: Props) {
    const { title } = await params;

    return <OpinionDetails title={title} />;
}
