import { useEffect, useState } from 'react';
import { Button } from '@chakra-ui/react';
import { ArrowBackIcon } from '@chakra-ui/icons';
import { Flex, HStack, Img, Text, Icon, Select } from '@chakra-ui/react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { useToast } from '@chakra-ui/react';
import axios from 'axios';
import NavBar from '../components/navBar';
import Footer from '../components/Footer';
import { useCart } from '../../context/cart';
import ProductImg from '../assets/images/0a48d49733d61d3fa6a2ad469bc69ff3-removebg-preview-transformed.png';

function ProductPage() {
  const params = useParams();
  const navigate = useNavigate();
  const toast = useToast();
  const [product, setProduct] = useState(null);
  const [selectedAttributes, setSelectedAttributes] = useState({});
  const [cart, setCart] = useCart();

  const getProduct = async () => {
    try {
      const { data } = await axios.get(`/api/v1/product/get-product/${params.slug}`);
      setProduct(data?.product);
    } catch (error) {
      console.log(error);
    }
  };

  const handleAttributeChange = (key, value, price) => {
    setSelectedAttributes({
      ...selectedAttributes,
      [key]: { value, price }
    });
  };

  const calculatePrice = () => {
    if (!product) return 0;
    let totalPrice = product.price;
    Object.values(selectedAttributes).forEach(attr => {
      totalPrice += attr.price;
    });
    return totalPrice;
  };

  const onAddToCart = () => {
    if (product) {
      setCart([...cart, { ...product, selectedAttributes }]);
      localStorage.setItem('cart', JSON.stringify([...cart, { ...product, selectedAttributes }]));
      toast({
        title: 'Product Added to Cart',
        description: "You've successfully added the product to your cart",
        status: 'success',
        duration: 2000,
        isClosable: true,
        position: 'top-right',
      });
    }
  };

  useEffect(() => {
    if (params?.slug) getProduct();
  }, [params?.slug]);

  if (!product) {
    return <Text>Loading...</Text>;
  }

  return (
    <>
      <NavBar />
      <Flex justify={'center'} h={'100vh'} alignItems={'center'} flexDir={'column'} my={{ base: '6rem', md: '1rem' }}>
        <Flex
          mx={{ base: '30px', md: '60px' }}
          justify={'center'}
          rounded={20}
          p={10}
          gap={20}
          boxShadow={'10px 10px 20px rgba(0, 0, 0, 0.1)'}
          flexWrap={'wrap'}
        >
          <Img
            w={{ base: '60%', md: '30%' }}
            src={ProductImg}
            alt={product.name}
          />
          <Flex flexDir={'column'} justify={'center'} gap={2}>
            <Link to="/">
              <HStack>
                <Icon as={ArrowBackIcon} />
                <Text _hover={{ color: 'green' }}>Home</Text>
              </HStack>
            </Link>
            <Text fontWeight={'700'} fontSize={'40px'} textTransform={'uppercase'}>
              {product.name}
            </Text>
            <Text fontWeight={'500'} fontSize={'15px'}>
              {product.description}
            </Text>
            <Text fontWeight={'500'} fontSize={'25px'} color={'green'}>
              {calculatePrice().toLocaleString('en-US', { style: 'currency', currency: 'USD' })}
            </Text>
            <Text textAlign={'left'} textTransform={'uppercase'}>
              <strong>Category: </strong> {product.category.name} {/* Ensure this is a string */}
            </Text>
            {product.attributes.map((attr, index) => (
              <HStack key={index}>
                <Text fontWeight={'bold'}>{attr.key}:</Text>
                <Select
                  w={'9rem'}
                  placeholder={`Select ${attr.key}`}
                  onChange={(e) => {
                    const selectedOption = attr.values.find(value => value.value === e.target.value);
                    if (selectedOption) {
                      handleAttributeChange(attr.key, selectedOption.value, selectedOption.price);
                    }
                  }}
                >
                  {attr.values.map((option, idx) => (
                    <option key={idx} value={option.value}>{option.value}</option>
                  ))}
                </Select>
              </HStack>
            ))}
            <HStack mt={4}>
              <Button mt={5} colorScheme="red" onClick={onAddToCart}>
                Add to Cart
              </Button>
              <Button variant="ghost" mt={5} colorScheme="red">
                Buy Now
              </Button>
            </HStack>
          </Flex>
        </Flex>
      </Flex>
      <Footer />
    </>
  );
}

export default ProductPage;
