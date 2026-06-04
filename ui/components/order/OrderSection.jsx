

export default function OrderSection({ title, children }) {
    return (
        <section className="pt-10">

            <h2 className="mb-5 font-roboto text-2xl">
                {title}
            </h2>

            <div className="space-y-5">
                {children}
            </div>
        </section>
    );
}