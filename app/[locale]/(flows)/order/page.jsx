import OrderIntro from "@/ui/components/order/OrderIntro";
import OrderForm from "@/ui/components/order/OrderForm";

export default async function OrderPage({ params, searchParams }) {
    const { locale } = await params;
    const { token } = await searchParams;

    return (
        <>
            <OrderIntro locale={locale} />
            <OrderForm locale={locale} token={token} />
        </>
    );
}