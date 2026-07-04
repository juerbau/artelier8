import {cn} from "@/lib/utils/cn";

export default function OrderSlider({
                                        label,
                                        name,
                                        value,
                                        onChange,
                                        min = 0,
                                        max = 10,
                                        leftLabel,
                                        rightLabel,
                                        className,
                                    }) {
    const percentage = ((value - min) / (max - min)) * 100;

    return (
        <div className={cn("space-y-4", className)}>
            {label && (
                <p className="font-roboto text-lg">
                    {label}
                </p>
            )}

            <div className="space-y-3">
                <div className="flex justify-between font-roboto text-base opacity-80">
                    <span>{leftLabel}</span>
                    <span>{rightLabel}</span>
                </div>

                <input
                    id={name}
                    name={name}
                    type="range"
                    min={min}
                    max={max}
                    value={value}
                    onChange={(e) => onChange(Number(e.target.value))}
                    className="w-full accent-black"
                />

                <div className="relative h-6">
                    <span
                        className="absolute -translate-x-1/2 font-roboto text-lg"
                        style={{
                            left: `${percentage}%`,
                        }}
                    >
                        {value}
                    </span>
                </div>
            </div>
        </div>
    );
}