export default function OrderRadioGroup({
                                            name,
                                            value,
                                            options,
                                            onChange,
                                        }) {
    return (
        <div className="space-y-3">
            {options.map((option) => (
                <label
                    key={option.value}
                    className="flex cursor-pointer items-center gap-3"
                >
                    <input
                        type="radio"
                        name={name}
                        value={option.value}
                        checked={value === option.value}
                        onChange={(e) =>
                            onChange(e.target.value)
                        }
                        className="h-4 w-4 accent-black"
                    />

                    <span className="font-roboto text-lg">
                        {option.label}
                    </span>
                </label>
            ))}
        </div>
    );
}