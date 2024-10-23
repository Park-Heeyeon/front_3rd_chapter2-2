import { Product } from "../../../types";

interface Props {
  newProduct: Omit<Product, "id">;
  updateNewProduct: (newProduct: Omit<Product, "id">) => void;
  onProductAdd: (newProduct: Product) => void;
  toggleShowNewProductForm: (isShowForm: boolean) => void;
}
const NewProductForm = ({
  newProduct,
  updateNewProduct,
  onProductAdd,
  toggleShowNewProductForm,
}: Props) => {
  const handleAddNewProduct = () => {
    const productWithId = { ...newProduct, id: Date.now().toString() };
    onProductAdd(productWithId);
    updateNewProduct({
      name: "",
      price: 0,
      stock: 0,
      discounts: [],
    });
    toggleShowNewProductForm(false);
  };
  return (
    <div className="bg-white p-4 rounded shadow mb-4">
      <h3 className="text-xl font-semibold mb-2">새 상품 추가</h3>
      <div className="mb-2">
        <label
          htmlFor="productName"
          className="block text-sm font-medium text-gray-700"
        >
          상품명
        </label>
        <input
          id="productName"
          type="text"
          value={newProduct.name}
          onChange={(e) =>
            updateNewProduct({ ...newProduct, name: e.target.value })
          }
          className="w-full p-2 border rounded"
        />
      </div>
      <div className="mb-2">
        <label
          htmlFor="productPrice"
          className="block text-sm font-medium text-gray-700"
        >
          가격
        </label>
        <input
          id="productPrice"
          type="number"
          value={newProduct.price}
          onChange={(e) =>
            updateNewProduct({
              ...newProduct,
              price: parseInt(e.target.value),
            })
          }
          className="w-full p-2 border rounded"
        />
      </div>
      <div className="mb-2">
        <label
          htmlFor="productStock"
          className="block text-sm font-medium text-gray-700"
        >
          재고
        </label>
        <input
          id="productStock"
          type="number"
          value={newProduct.stock}
          onChange={(e) =>
            updateNewProduct({
              ...newProduct,
              stock: parseInt(e.target.value),
            })
          }
          className="w-full p-2 border rounded"
        />
      </div>
      <button
        onClick={handleAddNewProduct}
        className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
      >
        추가
      </button>
    </div>
  );
};
export default NewProductForm;