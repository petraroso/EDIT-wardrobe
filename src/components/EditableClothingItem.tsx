import axios from "axios";
import { useState, useEffect } from "react";
import { TiDeleteOutline } from "react-icons/ti";
import { TbCircleCheck } from "react-icons/tb";
interface Item {
  id: number;
  category: string;
  size: string;
  color: string;
  image: string;
  purchaseDate: string;
}
interface Category {
  id: string;
  name: string;
}

interface ItemProps {
  item: Item;
  categories: Category[];
  setItemEditId: React.Dispatch<React.SetStateAction<number | null>>;
}

const EditableClothingItem: React.FC<ItemProps> = ({
  item,
  categories,
  setItemEditId,
}) => {
  const [newData, setNewData] = useState<Item>({
    id: 0,
    category: "",
    size: "",
    color: "#000000",
    image: "",
    purchaseDate: "",
  });

  useEffect(() => {
    setNewData(item);
  }, []);

  const handleFormData = (
    event: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>
  ) => {
    const { name, value } = event.target;
    setNewData({ ...newData, [name]: value });
  };

  const sendData = () => {
    axios
      .patch(`https://json-server-test-r74d.onrender.com/clothes/${newData.id}`, newData)
      .then((result) => console.log(result))
      .catch((err) => console.log(err.message));

    setItemEditId(null);
  };

  function handleAbort() {
    setItemEditId(null);
  }

  return (
    <tr>
      <td>
        <select
          id="category"
          name="category"
          value={newData.category}
          onChange={handleFormData}
          required
        >
          {categories.map((category) => (
            <option key={category.name} value={category.name}>
              {category.name}
            </option>
          ))}
        </select>
      </td>
      <td>
        <select
          id="size"
          name="size"
          value={newData.size}
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
      </td>
      <td>
        <input
          type="color"
          id="colorpicker"
          name="color"
          value={newData.color}
          onChange={handleFormData}
          required
        />
      </td>
      <td>
        <input
          type="text"
          id="image"
          name="image"
          placeholder="Url do slike"
          value={newData.image}
          onChange={handleFormData}
        ></input>
      </td>
      <td>
        <input
          type="date"
          id="purchaseDate"
          name="purchaseDate"
          value={newData.purchaseDate}
          onChange={handleFormData}
        />
      </td>
      <td>
        <TbCircleCheck onClick={sendData} />
        <TiDeleteOutline onClick={handleAbort} />
      </td>
    </tr>
  );
};
export default EditableClothingItem;
