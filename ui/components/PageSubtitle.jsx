
export default function PageSubtitle ({
                                       subtitle
                                   }){
    return (
        <div className="text-center">

            <p className="mt-8 font-art text-[#F2EFE7] text-xl md:text-2xl leading-relaxed max-w-3xl mx-auto">
                {subtitle}
            </p>

        </div>
    );
}