import clsx from "clsx";

export default function PageTitle ({
                                       title,
                                       textSize = "text-4xl md:text-5xl"
                                   }){
    return (
        <div className="text-center">

            <h1 className={clsx(
                "text-[#F2EFE7]",
                textSize)}
            >
                {title}
            </h1>

        </div>
    );
}