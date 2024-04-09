import ClothingItem from "./ClothingItem";
import EditableClothingItem from "./EditableClothingItem";

interface Clothes {
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

interface ClothesProps {
  clothes: Clothes[];
  categories: Category[];
  setItemDeleteId: React.Dispatch<React.SetStateAction<number | undefined>>;
  itemEditId: number | null;
  setItemEditId: React.Dispatch<React.SetStateAction<number | null>>;
  filter: string;
}

const ClothesList: React.FC<ClothesProps> = ({
  clothes,
  categories,
  setItemDeleteId,
  itemEditId,
  setItemEditId,
  filter,
}) => {
  return (
    <div className="clothesListContainer">
      <h2>Popis</h2>
      <table>
        <thead>
          <tr>
            <th>Vrsta</th>
            <th>Veličina</th>
            <th>Boja</th>
            <th>Slika</th>
            <th>Datum kupnje</th>
            <th>Opcije</th>
          </tr>
        </thead>
        <tbody>
          {clothes.map((item) =>
            itemEditId === item.id &&
            (filter === "Sve" || filter === item.category) ? (
              <EditableClothingItem
                key={item.id}
                item={item}
                categories={categories}
                setItemEditId={setItemEditId}
              />
            ) : filter === "Sve" || filter === item.category ? (
              <ClothingItem
                key={item.id}
                item={item}
                setItemDeleteId={setItemDeleteId}
                setItemEditId={setItemEditId}
              />
            ) : (
              <></>
            )
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ClothesList;
