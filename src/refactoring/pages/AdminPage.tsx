import { Coupon, Product } from "../../types.ts";
import { Container, SectionBox, SubSection } from "../components/index.ts";
import useProductManagement from "../hooks/useProductManagement.ts";
import useCouponManagement from "../hooks/useCouponManagement.ts";
import Button from "../components/Button.tsx";
import CouponList from "../components/admin/CouponList.tsx";
import NewCouponForm from "../components/admin/NewCouponForm.tsx";
import NewProductForm from "../components/admin/NewProductForm.tsx";

interface Props {
  products: Product[];
  coupons: Coupon[];
  onProductAdd: (newProduct: Product) => void;
  onCouponAdd: (newCoupon: Coupon) => void;
  onProductUpdate: (newProduct: Product) => void;
}

export const AdminPage = ({
  products,
  coupons,
  onProductAdd,
  onCouponAdd,
  onProductUpdate,
}: Props) => {
  const {
    openProductIds,
    toggleProductAccordion,
    editingProduct,
    updateEditingProduct,
    showNewProductForm,
    toggleShowNewProductForm,
    newProduct,
    updateNewProduct,
  } = useProductManagement();

  const { newDiscount, updateNewDiscount, newCoupon, updateNewCoupon } =
    useCouponManagement();

  // handleEditProduct 함수 수정
  const handleEditProduct = (product: Product) => {
    updateEditingProduct({ ...product });
  };

  // 새로운 핸들러 함수 추가
  const handleProductNameUpdate = (productId: string, newName: string) => {
    if (editingProduct && editingProduct.id === productId) {
      const updatedProduct = { ...editingProduct, name: newName };
      updateEditingProduct(updatedProduct);
    }
  };

  // 새로운 핸들러 함수 추가
  const handlePriceUpdate = (productId: string, newPrice: number) => {
    if (editingProduct && editingProduct.id === productId) {
      const updatedProduct = { ...editingProduct, price: newPrice };
      updateEditingProduct(updatedProduct);
    }
  };

  // 수정 완료 핸들러 함수 추가
  const handleEditComplete = () => {
    if (editingProduct) {
      onProductUpdate(editingProduct);
      updateEditingProduct(null);
    }
  };

  const handleStockUpdate = (productId: string, newStock: number) => {
    const updatedProduct = products.find((p) => p.id === productId);
    if (updatedProduct) {
      const newProduct = { ...updatedProduct, stock: newStock };
      onProductUpdate(newProduct);
      updateEditingProduct(newProduct);
    }
  };

  const handleAddDiscount = (productId: string) => {
    const updatedProduct = products.find((p) => p.id === productId);
    if (updatedProduct && editingProduct) {
      const newProduct = {
        ...updatedProduct,
        discounts: [...updatedProduct.discounts, newDiscount],
      };
      onProductUpdate(newProduct);
      updateEditingProduct(newProduct);
      updateNewDiscount({ quantity: 0, rate: 0 });
    }
  };

  const handleRemoveDiscount = (productId: string, index: number) => {
    const updatedProduct = products.find((p) => p.id === productId);
    if (updatedProduct) {
      const newProduct = {
        ...updatedProduct,
        discounts: updatedProduct.discounts.filter((_, i) => i !== index),
      };
      onProductUpdate(newProduct);
      updateEditingProduct(newProduct);
    }
  };

  return (
    <Container title="관리자 페이지">
      <SectionBox title="상품 관리">
        <Button
          label={showNewProductForm ? "취소" : "새 상품 추가"}
          className="bg-green-500 text-white px-4 py-2 rounded mb-4 hover:bg-green-600"
          onClick={() => toggleShowNewProductForm(!showNewProductForm)}
        />
        {showNewProductForm && (
          <NewProductForm
            newProduct={newProduct}
            updateNewProduct={updateNewProduct}
            onProductAdd={onProductAdd}
            toggleShowNewProductForm={toggleShowNewProductForm}
          />
        )}
        <div className="space-y-2">
          {products.map((product, index) => (
            <div
              key={product.id}
              data-testid={`product-${index + 1}`}
              className="bg-white p-4 rounded shadow"
            >
              <button
                data-testid="toggle-button"
                onClick={() => toggleProductAccordion(product.id)}
                className="w-full text-left font-semibold"
              >
                {product.name} - {product.price}원 (재고: {product.stock})
              </button>
              {openProductIds.has(product.id) && (
                <div className="mt-2">
                  {editingProduct && editingProduct.id === product.id ? (
                    <div>
                      <div className="mb-4">
                        <label className="block mb-1">상품명: </label>
                        <input
                          type="text"
                          value={editingProduct.name}
                          onChange={(e) =>
                            handleProductNameUpdate(product.id, e.target.value)
                          }
                          className="w-full p-2 border rounded"
                        />
                      </div>
                      <div className="mb-4">
                        <label className="block mb-1">가격: </label>
                        <input
                          type="number"
                          value={editingProduct.price}
                          onChange={(e) =>
                            handlePriceUpdate(
                              product.id,
                              parseInt(e.target.value)
                            )
                          }
                          className="w-full p-2 border rounded"
                        />
                      </div>
                      <div className="mb-4">
                        <label className="block mb-1">재고: </label>
                        <input
                          type="number"
                          value={editingProduct.stock}
                          onChange={(e) =>
                            handleStockUpdate(
                              product.id,
                              parseInt(e.target.value)
                            )
                          }
                          className="w-full p-2 border rounded"
                        />
                      </div>
                      {/* 할인 정보 수정 부분 */}
                      <div>
                        <h4 className="text-lg font-semibold mb-2">
                          할인 정보
                        </h4>
                        {editingProduct.discounts.map((discount, index) => (
                          <div
                            key={index}
                            className="flex justify-between items-center mb-2"
                          >
                            <span>
                              {discount.quantity}개 이상 구매 시{" "}
                              {discount.rate * 100}% 할인
                            </span>
                            <button
                              onClick={() =>
                                handleRemoveDiscount(product.id, index)
                              }
                              className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
                            >
                              삭제
                            </button>
                          </div>
                        ))}
                        <div className="flex space-x-2">
                          <input
                            type="number"
                            placeholder="수량"
                            value={newDiscount.quantity}
                            onChange={(e) =>
                              updateNewDiscount({
                                ...newDiscount,
                                quantity: parseInt(e.target.value),
                              })
                            }
                            className="w-1/3 p-2 border rounded"
                          />
                          <input
                            type="number"
                            placeholder="할인율 (%)"
                            value={newDiscount.rate * 100}
                            onChange={(e) =>
                              updateNewDiscount({
                                ...newDiscount,
                                rate: parseInt(e.target.value) / 100,
                              })
                            }
                            className="w-1/3 p-2 border rounded"
                          />
                          <button
                            onClick={() => handleAddDiscount(product.id)}
                            className="w-1/3 bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
                          >
                            할인 추가
                          </button>
                        </div>
                      </div>
                      <button
                        onClick={handleEditComplete}
                        className="bg-green-500 text-white px-2 py-1 rounded hover:bg-green-600 mt-2"
                      >
                        수정 완료
                      </button>
                    </div>
                  ) : (
                    <div>
                      {product.discounts.map((discount, index) => (
                        <div key={index} className="mb-2">
                          <span>
                            {discount.quantity}개 이상 구매 시{" "}
                            {discount.rate * 100}% 할인
                          </span>
                        </div>
                      ))}
                      <button
                        data-testid="modify-button"
                        onClick={() => handleEditProduct(product)}
                        className="bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600 mt-2"
                      >
                        수정
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      </SectionBox>

      <SectionBox title="쿠폰 관리">
        <SubSection>
          <NewCouponForm
            newCoupon={newCoupon}
            updateNewCoupon={updateNewCoupon}
            onCouponAdd={onCouponAdd}
          />
          <CouponList coupons={coupons} />
        </SubSection>
      </SectionBox>
    </Container>
  );
};
