import Slider from "@/components/Slider";
import OpinionColumn from "@/components/OpinionColumn";
import News1 from "@/components/News1";
import Author from "@/components/Author";

export default function App() {
    return (
        <div className="max-w-5xl mx-auto flex flex-col gap-5">
            <div className="flex flex-col lg:flex-row gap-5">
                <div className="w-full lg:w-2/3">
                    <Slider />
                </div>
                <div className="w-full lg:w-1/3">
                    <OpinionColumn />
                </div>
            </div>
            <News1 />
            <Author />
        </div>
    );
}
