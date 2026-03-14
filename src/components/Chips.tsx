const chips = ["Все", "Скидки", "Дешевле", "Дороже"];

interface ChipsProps {
  activeChip: string;
  onChange: (chip: string) => void;
}

export default function Chips({ activeChip, onChange }: ChipsProps) {
  return (
    <section className="chips">
      {chips.map((chip) => (
        <button
          key={chip}
          className={`chip ${activeChip === chip ? "chip--active" : ""}`}
          type="button"
          onClick={() => onChange(chip)}
        >
          {chip}
        </button>
      ))}
    </section>
  );
}
