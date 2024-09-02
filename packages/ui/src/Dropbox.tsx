interface DropboxType {
  options: {
    value: string;
    displayText: string;
  }[];
  onSelect: (value: string) => void;
}

export function Dropbox({ options, onSelect }: DropboxType) {
  return (
    <div className="pt-2">
      <select 
        onChange={(e) => {
          onSelect(e.target.value);
        }}
        className="py-3 px-1 w-full bg-slate-100 rounded-lg"
      >
        {options.map((option) => {
          return <option value={option.value}>{option.displayText}</option>;
        })}
      </select>
    </div>
  );
}
