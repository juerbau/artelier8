


export default function ArtistStatement({text}) {

    return (
        <div className="flex flex-col items-center text-center">


            {/* TEXT */}
            <div
                className="text-body leading-relaxed"
            >
                {text.split("\n\n").map((block, i) => (
                    <p key={i} className="mb-8">
                        {block.split("\n").map((line, j) => (
                            <span key={j}>
                  {line}
                                <br/>
                </span>
                        ))}
                    </p>
                ))}
            </div>

        </div>
    );
}