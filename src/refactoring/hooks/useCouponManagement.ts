import { useState } from "react";
import { Coupon, Discount } from "../../types";

const useCouponManagement = () => {
  const [newDiscount, setNewDiscount] = useState<Discount>({
    quantity: 0,
    rate: 0,
  });
  const [newCoupon, setNewCoupon] = useState<Coupon>({
    name: "",
    code: "",
    discountType: "percentage",
    discountValue: 0,
  });

  const updateNewDiscount = (updatedNewDiscount: Discount) => {
    setNewDiscount((prev) => ({ ...prev, ...updatedNewDiscount }));
  };

  const updateNewCoupon = (updatedNewCoupon: Coupon) => {
    setNewCoupon((prev) => ({ ...prev, ...updatedNewCoupon }));
  };

  return {
    newDiscount,
    updateNewDiscount,
    newCoupon,
    updateNewCoupon,
  };
};
export default useCouponManagement;
