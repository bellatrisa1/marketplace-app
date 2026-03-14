interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
}

export default function SearchBar({ value, onChange }: SearchBarProps) {
  return (
    <div className="search">
      <input
        className="search__input"
        type="text"
        placeholder="Найти товар в Orvix"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
      <button className="search__button" type="button" aria-label="Поиск">
        🔍
      </button>
    </div>
  );
}
