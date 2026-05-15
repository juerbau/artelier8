import { SiInstagram } from "react-icons/si"

export default function InstagramLink() {
    return (
        <a
            href="https://www.instagram.com/artelier_8/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram"
            className="flex items-center opacity-80 transition-opacity duration-200 hover:opacity-100"
        >
            <SiInstagram
                className="h-[1em] w-[1em]"
            />
        </a>
    )
}