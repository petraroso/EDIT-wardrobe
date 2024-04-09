import axios from "axios";
import { FiEdit } from "react-icons/fi";
import { AiOutlineDelete } from "react-icons/ai";

interface Item {
  id: number;
  category: string;
  size: string;
  color: string;
  image: string;
  purchaseDate: string;
}

interface ItemProps {
  item: Item;
  setItemDeleteId: React.Dispatch<React.SetStateAction<number | undefined>>;
  setItemEditId: React.Dispatch<React.SetStateAction<number | null>>;
}

const ClothingItem: React.FC<ItemProps> = ({
  item,
  setItemDeleteId,
  setItemEditId,
}) => {
  function handleDeleteItem() {
    if (window.confirm("Jeste li sigurni da želite izbrisati artikal?")) {
      setItemDeleteId(item.id);
      axios
        .delete(`http://localhost:3001/clothes/${item.id}`)
        .then((rez) => console.log(rez));
    }
  }

  return (
    <tr className="clothesItemContainer">
      <td>{item.category}</td>
      <td>{item.size}</td>
      <td>
        <div
          className="itemColor"
          style={
            {
              "--backgroundColor": `${item.color}`,
            } as React.CSSProperties
          }
        ></div>
      </td>
      <td>
        <img
          src={item.image}
          className="clothingItemImage"
          alt="Clothing item"
        />
      </td>
      <td>{item.purchaseDate}</td>
      <td>
        <FiEdit onClick={() => setItemEditId(item.id)} />
        <AiOutlineDelete onClick={handleDeleteItem} />
      </td>
    </tr>
  );
};

export default ClothingItem;
