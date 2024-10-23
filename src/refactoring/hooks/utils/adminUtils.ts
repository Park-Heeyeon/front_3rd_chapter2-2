import { Discount, Product } from "../../../types";

/**
 * 주어진 제품 ID에 해당하는 제품을 찾는 함수
 * @param products - 제품 배열
 * @param productId - 찾고자 하는 제품의 ID
 * @returns - 찾은 제품 또는 undefined
 */
export const findUpdatedProduct = (products: Product[], productId: string) => {
  return products.find((product) => product.id === productId);
};

/**
 * 제품의 속성을 업데이트하는 함수
 * @param products - 제품 배열
 * @param productId - 업데이트할 제품의 ID
 * @param updates - 업데이트할 속성의 객체
 * @returns - 업데이트된 제품 또는 undefined
 */
export const updateProductAttr = (
  products: Product[],
  productId: string,
  updates: Partial<Product>
): Product | undefined => {
  const updatedProduct = findUpdatedProduct(products, productId);
  return updatedProduct ? { ...updatedProduct, ...updates } : undefined;
};

/**
 * 제품에 할인 추가하는 함수
 * @param product - 업데이트할 제품
 * @param newDiscount - 추가할 할인
 * @returns - 업데이트된 제품 또는 undefined
 */
export const addDiscountToProduct = (
  product: Product | undefined,
  newDiscount: Discount
) => {
  return product
    ? {
        ...product,
        discounts: [...product.discounts, newDiscount],
      }
    : undefined;
};

/**
 * 제품에서 특정 인덱스의 할인 제거하는 함수
 * @param product - 업데이트할 제품
 * @param index - 제거할 할인 인덱스
 * @returns - 업데이트된 제품 또는 undefined
 */
export const removeDiscountFromProduct = (
  product: Product | undefined,
  index: number
) => {
  return product
    ? {
        ...product,
        discounts: product.discounts.filter((_, i) => i !== index),
      }
    : undefined;
};
