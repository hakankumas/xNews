export default async function YazarInfo({
    params,
}: {
    params: Promise<{ info: string }>;
}) {
    const { info } = await params;
    return <div>Yazar {info}</div>;
}
