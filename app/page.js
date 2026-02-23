import { headers } from "next/headers"
import { redirect } from "next/navigation"

export default async function RootPage() {
    const acceptLang = (await headers()).get("accept-language") || ""

    const locale = acceptLang.startsWith("de") ? "de" : "en"

    redirect(`/${locale}`)
}