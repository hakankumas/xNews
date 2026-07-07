import ClientTitle from "./ClientTitle";

interface Props {
    params: Promise<{ title: string }>;
}

export default async function Title({ params }: Props) {
    const { title } = await params;

    return <ClientTitle title={title} />;
}
