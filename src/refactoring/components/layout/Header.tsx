import Button from "../Button";

interface Props {
  isAdmin: boolean;
  toggleAdmin: () => void;
}

const Header = ({ isAdmin, toggleAdmin }: Props) => {
  return (
    <nav className="bg-blue-600 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-2xl font-bold">쇼핑몰 관리 시스템</h1>
        <Button
          label={isAdmin ? "장바구니 페이지로" : "관리자 페이지로"}
          className="bg-white text-blue-600 px-4 py-2 rounded hover:bg-blue-100"
          onClick={toggleAdmin}
        />
      </div>
    </nav>
  );
};

export default Header;
