import clsx from "clsx";

export default function PageIntro ({
                                       title, text
                                   }){
    return (
        <div className="text-center">

            <h1 className="font-art text-[#F2EFE7] text-4xl md:text-5xl">
                {title}
            </h1>

            <div className={clsx(
                "mx-auto mt-5 h-px  bg-[#D8B56A]",
                "w-200"
                )}/>

            <p className="mt-8 font-art text-[#F2EFE7] text-xl md:text-2xl leading-relaxed max-w-3xl mx-auto">
                {text}
            </p>

        </div>
    );
}