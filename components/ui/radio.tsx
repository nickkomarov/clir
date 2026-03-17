// Figma component: Radio
// Figma file: V0MgmJpx3GHKhMKId1aEaz — node 3928:6813
// Variants: State=Unselected, State=Selected

"use client";

interface RadioProps {
  selected?: boolean;
  onChange?: (selected: boolean) => void;
  className?: string;
}

export function Radio({
  selected = false,
  onChange,
  className,
}: RadioProps) {
  return (
    <button
      role="radio"
      aria-checked={selected}
      onClick={() => onChange?.(!selected)}
      className={`flex size-[24px] items-center justify-center rounded-full transition-colors ${
        selected
          ? "border-2 border-primary-black bg-primary-white"
          : "border-[1.5px] border-neutral-100 bg-primary-white"
      } ${className ?? ""}`}
    >
      {selected && (
        <span className="size-[10px] rounded-full bg-primary-black" />
      )}
    </button>
  );
}
