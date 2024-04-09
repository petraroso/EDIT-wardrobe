interface Category {
  id: string;
  name: string;
}

interface FilterProps {
  categories: Category[];
  filter: string;
  setFilter: React.Dispatch<React.SetStateAction<string>>;
}

const Filters: React.FC<FilterProps> = ({ categories, filter, setFilter }) => {
  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilter(e.target.value);
  };
  return (
    <div className="filtersContainer">
      <h2>Filter</h2>
      <label>
        <input
          type="radio"
          id="allCategories"
          name="category"
          checked={filter === "Sve"}
          value="Sve"
          onChange={handleFilterChange}
        ></input>
        Sve
      </label>
      {categories.map((category) => (
        <label key={category.id}>
          <input
            type="radio"
            id={category.name}
            name="category"
            value={category.name}
            onChange={handleFilterChange}
          ></input>
          {category.name}
        </label>
      ))}
    </div>
  );
};

export default Filters;
