import { Img, Flex, Text } from '@chakra-ui/react';
import Img1 from '../assets/images/Screenshot 2024-08-03 160225.png';
import ShopBtn from './ShopBtn/ShopBtn';
import { useState, useEffect } from 'react';
import axios from 'axios';

function SecSection() {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const getAllCategory = async () => {
      try {
        const { data } = await axios.get("/api/v1/category/all-category");
        if (data?.success) {
          setCategories(data?.category);
        }
      } catch (error) {
        console.log(error);
      }
    };

    getAllCategory();
  }, []);

  return (
    <Flex
      position={'relative'}
      gap={10}
      flexDir={{ base: 'column', md: 'row' }}
      flexWrap={"wrap"}
      m={10}
      mx={5}
      px={5}
      justify={'center'}
    >
      {categories.map((category) => (
        <Flex
          key={category._id}
          rounded={10}
          flexDir={'column'}
          gap={14}
          fontWeight={'600'}
          fontSize={'18px'}
          flexWrap={'wrap'}
          py={5}
          px={10}
          bg={'#080609'}
          position="relative"
        >
          <Text color={'gray.200'} zIndex={10}>
            {category.name.split(' ').join(' ')}
          </Text>
          <ShopBtn />
          <Img position={'absolute'} w={{ base: "30vw", md: "10vw" }} src={Img1} />
        </Flex>
      ))}
    </Flex>
  );
}

export default SecSection;
