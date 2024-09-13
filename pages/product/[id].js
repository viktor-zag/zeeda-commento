import { useRouter } from 'next/router';
import Commento from '../../components/Commento.js';

const Product = () => {
  const router = useRouter();
  const { id } = router.query;

  return <Commento pageId={id} />;
};

export default Product;