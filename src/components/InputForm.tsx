import axios from "axios";
interface Category {
  id: string;
  name: string;
}
interface FormData {
  category: string;
  size: string;
  color: string;
  image: string;
  purchaseDate: string;
}

interface FormProps {
  categories: Category[];
  formData: FormData;
  setFormData: React.Dispatch<React.SetStateAction<FormData>>;
}

const InputForm: React.FC<FormProps> = ({
  categories,
  formData,
  setFormData,
}) => {
  const handleFormData = (
    event: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>
  ) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const sendData = () => {
    if (formData.category === "" || formData.size === "") {
      window.alert("Unesite kategoriju i veličinu.");
    } else {
      axios
        .post("https://json-server-test-r74d.onrender.com/clothes", formData)
        .then((result) => console.log(result))
        .catch((err) => console.log(err.message));
    }
  };

  return (
    <form className="formContainer">
      <h2>Dodaj novi artikal</h2>
      <select
        id="category"
        name="category"
        value={formData.category}
        onChange={handleFormData}
        required
      >
        {categories.map((category) => (
          <option key={category.name} value={category.name}>
            {category.name}
          </option>
        ))}
      </select>
      <select
        id="size"
        name="size"
        value={formData.size}
        onChange={handleFormData}
        required
      >
        <option value={"xxs"}>xxs</option>
        <option value={"xs"}>xs</option>
        <option value={"s"}>s</option>
        <option value={"m"}>m</option>
        <option value={"l"}>l</option>
        <option value={"xl"}>xl</option>
        <option value={"xxl"}>xxl</option>
        <option value={"3xl"}>3xl</option>
        <option value={"4xl"}>4xl</option>
        <option value={"5xl"}>5xl</option>
      </select>

      <input
        type="color"
        id="colorpicker"
        name="color"
        value={formData.color}
        onChange={handleFormData}
        required
      />
      <input
        type="text"
        id="image"
        name="image"
        placeholder="Url do slike (npr. ../pants.jpg)"
        value={formData.image}
        onChange={handleFormData}
      ></input>
      <input
        type="date"
        id="purchaseDate"
        name="purchaseDate"
        value={formData.purchaseDate}
        onChange={handleFormData}
        placeholder="Datum"
      />

      <button onClick={sendData}>Spremi ✔️</button>
    </form>
  );
};

export default InputForm;
