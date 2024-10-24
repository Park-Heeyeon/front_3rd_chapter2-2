import { Product } from "../../../types";
import { useProductContext } from "../../contexts/ProductProvider";

interface Props {
  product: Product;
}
const DiscountInfo = ({ product }: Props) => {
  const { updateEditingProduct } = useProductContext();
  return (
    <div>
      {product.discounts.map((discount, index) => (
        <div key={index} className="mb-2">
          <span>
            {discount.quantity}개 이상 구매 시 {discount.rate * 100}% 할인
          </span>
        </div>
      ))}
      <button
        data-testid="modify-button"
        onClick={() => updateEditingProduct(product)}
        className="bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600 mt-2"
      >
        수정
      </button>
    </div>
  );
};
export default DiscountInfo;
