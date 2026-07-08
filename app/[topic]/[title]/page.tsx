import NewDetails from "./NewDetails";

interface Props {
    params: Promise<{ title: string }>;
}

export default async function Title({ params }: Props) {
    const { title } = await params;

    return <NewDetails title={title} />;
}
