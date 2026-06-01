
import clsx from "clsx";

export default function Wordmark({
                                     className,
                                     artClassName,
                                     scriptClassName,
                                 }) {
    return (
        <span className={clsx("whitespace-nowrap", className)}>
      <span
          className={clsx(
              "font-black text-white",
              artClassName
          )}
      >
        ART
      </span>

      <span
          className={clsx(
              "font-signature text-[#D8B56A]",
              scriptClassName
          )}
      >
        elier8
      </span>
    </span>
    );
}