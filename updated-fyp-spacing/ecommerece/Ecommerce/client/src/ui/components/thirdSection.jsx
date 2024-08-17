import { Flex, Img, Text, Button } from '@chakra-ui/react';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Img1 from '../assets/images/8cdbe123010c380e20f264a8fdd57938-removebg-preview-transformed-removebg-preview.png';
import ShopBtn from './ShopBtn/ShopBtnBg';

function ThirdSection() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const { data } = await axios.get('/api/v1/product/product-list/1'); // Fetch initial page of products
        setProducts(data?.products);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, []);

  return (
    <Flex
      flexDirection={'column'}
      my={14}
      mx={{ base: '30px', md: '40px' }}
      justify={'center'}
    >
      <Text as={'h2'} fontSize={'30px'} fontWeight={'700'}>
        Top Rated Products
      </Text>
      <Flex alignItems={'center'} justify={'center'} gap={10} my={10} flexWrap={{ base: 'wrap', md: 'nowrap' }}>
        {products.map((product) => (
          <Flex
            key={product._id}
            justify={'center'}
            w={{ base: '100%', md: '28%' }}
            rounded={20}
            gap={10}
            p={4}
            boxShadow={'0px 4px 10px rgba(0, 0, 0, 0.1)'}
          >
            <Img
              w={{ base: '20vw', md: '8vw' }}
              h={{ base: '8rem', md: '12rem' }}
              src={product.image || Img1} // Fallback to default image if product image is unavailable
              alt={product.name}
              objectFit={'cover'}
            />
            <Flex justify={'center'} flexDir={'column'}>
              <Text fontWeight={'600'} fontSize={'22px'}>
                {product.name}
              </Text>
              <Text color={'gray.700'} fontWeight={'500'} fontSize={'14px'}>
                {product.description.substring(0, 30)}...
              </Text>
              <Text fontSize={'25px'} fontWeight={'600'} color={'red'}>
                ${product.price}
              </Text>
              <ShopBtn />
            </Flex>
          </Flex>
        ))}
      </Flex>
    </Flex>
  );
}

export default ThirdSection;
