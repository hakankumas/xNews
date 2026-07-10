import YazarDetails from "./YazarDetails";

interface Props {
    params: Promise<{ slug: string }>;
}

export default async function YazarInfo({ params }: Props) {
    const { slug } = await params;

    return <YazarDetails slug={slug} />;
}
