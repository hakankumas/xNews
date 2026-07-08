import Link from "next/link";

export default function NewDetails_TopicMenu(topic: string) {
    return (
        <div className="w-1/4">
            <Link
                href={`/x`}
                className="text-2xl font-bold cursor-pointer"
            >{`x Haberleri`}</Link>
        </div>
    );
}
