
export default function PageTitle ({
                                       title
                                   }){
    return (
        <div className="text-center">

            <h1 className="font-art text-[#F2EFE7] text-4xl md:text-5xl">
                {title}
            </h1>

        </div>
    );
}