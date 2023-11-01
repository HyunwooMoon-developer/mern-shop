import { useContext } from 'react';
import { Form, InputGroup } from 'react-bootstrap';
import { ShopContext } from '../context/shop';
import { AiOutlineSearch } from 'react-icons/ai';

const SearchItem = () => {
  const { q, searchProduct } = useContext(ShopContext) as ShopContextType;

  return (
    <InputGroup className="mb-1">
      <InputGroup.Text>
        <AiOutlineSearch />
      </InputGroup.Text>
      <Form.Control
        type="text"
        value={q}
        placeholder="Search product"
        onChange={(e) => searchProduct(e.target.value)}
      />
    </InputGroup>
  );
};

export default SearchItem;
