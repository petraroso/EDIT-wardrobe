import "./App.css";
import axios from "axios";
import { useState, useEffect } from "react";
import Filters from "./components/Filters";
import InputForm from "./components/InputForm";
import ClothesList from "./components/ClothesList";

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
interface FormData {
  category: string;
  size: string;
  color: string;
  image: string;
  purchaseDate: string;
}
function App() {
  const [clothes, setClothes] = useState<Clothes[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [filter, setFilter] = useState("Sve");
  const [itemDeleteId, setItemDeleteId] = useState<number | undefined>();
  const [itemEditId, setItemEditId] = useState<number | null>(null);
  const [formData, setFormData] = useState<FormData>({
    category: "",
    size: "",
    color: "#000000",
    image: "",
    purchaseDate: "",
  });

  useEffect(() => {
    axios
      .get("http://localhost:3001/clothes")
      .then((res) => {
        setClothes(res.data);
      })
      .catch((err) => console.log(err.message));
    axios
      .get("http://localhost:3001/categories")
      .then((res) => {
        setCategories(res.data);
      })
      .catch((err) => console.log(err.message));
  }, [itemDeleteId, itemEditId, formData]);

  return (
    <>
      <header>
        <h2>Moja garderoba</h2>
      </header>
      <div className="container">
        <InputForm
          categories={categories}
          formData={formData}
          setFormData={setFormData}
        />
        <div className="filterAndListContainer">
          <Filters
            categories={categories}
            filter={filter}
            setFilter={setFilter}
          />
          <ClothesList
            clothes={clothes}
            categories={categories}
            setItemDeleteId={setItemDeleteId}
            itemEditId={itemEditId}
            setItemEditId={setItemEditId}
            filter={filter}
          />
        </div>
      </div>
    </>
  );
}

export default App;
