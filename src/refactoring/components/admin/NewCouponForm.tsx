import { Coupon } from "../../../types";
import Button from "../Button";

interface Props {
  newCoupon: Coupon;
  updateNewCoupon: (newCoupon: Coupon) => void;
  onCouponAdd: (newCoupon: Coupon) => void;
}

const NewCouponForm = ({ newCoupon, updateNewCoupon, onCouponAdd }: Props) => {
  const handleAddCoupon = () => {
    onCouponAdd(newCoupon);
    updateNewCoupon({
      name: "",
      code: "",
      discountType: "percentage",
      discountValue: 0,
    });
  };
  return (
    <div className="space-y-2 mb-4">
      <input
        type="text"
        placeholder="쿠폰 이름"
        value={newCoupon.name}
        onChange={(e) =>
          updateNewCoupon({ ...newCoupon, name: e.target.value })
        }
        className="w-full p-2 border rounded"
      />
      <input
        type="text"
        placeholder="쿠폰 코드"
        value={newCoupon.code}
        onChange={(e) =>
          updateNewCoupon({ ...newCoupon, code: e.target.value })
        }
        className="w-full p-2 border rounded"
      />
      <div className="flex gap-2">
        <select
          value={newCoupon.discountType}
          onChange={(e) =>
            updateNewCoupon({
              ...newCoupon,
              discountType: e.target.value as "amount" | "percentage",
            })
          }
          className="w-full p-2 border rounded"
        >
          <option value="amount">금액(원)</option>
          <option value="percentage">할인율(%)</option>
        </select>
        <input
          type="number"
          placeholder="할인 값"
          value={newCoupon.discountValue}
          onChange={(e) =>
            updateNewCoupon({
              ...newCoupon,
              discountValue: parseInt(e.target.value),
            })
          }
          className="w-full p-2 border rounded"
        />
      </div>
      <Button
        label="쿠폰 추가"
        className="w-full bg-green-500 text-white p-2 rounded hover:bg-green-600"
        onClick={handleAddCoupon}
      />
    </div>
  );
};
export default NewCouponForm;
