import React from 'react';
import { Box, Flex, HStack, Img, Input, InputGroup, Button } from '@chakra-ui/react';
import { ChevronDownIcon } from '@chakra-ui/icons';
import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
} from '@chakra-ui/react';
import { InputLeftElement } from '@chakra-ui/react';
import Logo from '../assets/images/logo_top_bar.png';
import { Link, NavLink } from 'react-router-dom';
import { useAuth } from '../../context/auth';
import { useCart } from '../../context/cart';
import toast from 'react-hot-toast';

function NavBar() {
  const [auth, setAuth] = useAuth();
  const [cart] = useCart();

  const handleLogout = () => {
    setAuth({
      ...auth,
      user: null,
      token: '',
    });
    localStorage.removeItem('auth');
    toast.success('Logout Successfully');
  };

  return (
    <Box py={5} px={20} as="nav" bg={'#080609'}>
      <Flex
        gap={3}
        flexWrap={'wrap'}
        alignItems={'center'}
        justify={{ base: 'center', md: 'space-between' }}
      >
        <Link to="/">
          <Img w="10rem" src={Logo} />
        </Link>
        <HStack
          align={'center'}
          textTransform={'uppercase'}
          letterSpacing={'0.5px'}
          fontWeight={'400'}
          justify={'space-between'}
          spacing={'1.8rem'}
          listStyleType={'none'}
          as={'ul'}
          color={'white'}
        >
          <Link to="/">
            <Box
              className=" active:scale-75 cursor-pointer transition-all ease-in duration-150"
              as={'li'}
            >
              Home
            </Box>
          </Link>
          <Link to="/shop">
            <Box
              className=" active:scale-75 cursor-pointer transition-all ease-in duration-150"
              as={'li'}
            >
              Shop
            </Box>
          </Link>
          <Box as={'li'}>
            <Menu>
              <MenuButton
                px={4}
                spacing={2}
                py={2}
                transition="all 0.2s"
                borderRadius="md"
              >
                Categories <ChevronDownIcon fontSize={'20px'} />
              </MenuButton>
              <MenuList border={'gray'} bg={'gray.200'} p={2} color={'#afafaf'}>
                {/* Here you can map through your categories */}
                <MenuItem
                  _hover={{ bg: 'gray.300' }}
                  bg={'gray.200'}
                  color={'black'}
                >
                  Men's Clothing
                </MenuItem>
                <MenuDivider />
                <MenuItem
                  _hover={{ bg: 'gray.300' }}
                  bg={'gray.200'}
                  color={'black'}
                >
                  Women's Clothing
                </MenuItem>
                <MenuDivider color={'black'} />
                <MenuItem
                  _hover={{ bg: 'gray.300' }}
                  bg={'gray.200'}
                  color={'black'}
                >
                  Child's Clothing
                </MenuItem>
              </MenuList>
            </Menu>
          </Box>
        </HStack>
        <HStack align={'center'}>
          <InputGroup className="focus:outline-none" border={'none'}>
            <InputLeftElement color="white" fontSize="1.2em">
              <i className="fa-solid fa-search"></i>
            </InputLeftElement>
            <Input
              borderBottom="2px solid white"
              borderTop={'none'}
              borderX={'none'}
              placeholder="Search Products"
              type="search"
              _focus={{ boxShadow: 'none' }}
              color={'white'}
            />
          </InputGroup>
          <Link to="/cart">
            <Box position="relative">
              <i className="text-[20px]  text-white fa-light fa-cart-shopping p-2 active:scale-75 cursor-pointer transition-all ease-in duration-150"></i>
              {cart?.length > 0 && (
                <Box
                  position="absolute"
                  top="0"
                  right="0"
                  bg="red.500"
                  borderRadius="50%"
                  w="1.5rem"
                  h="1.5rem"
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                  color="white"
                  fontSize="0.8rem"
                >
                  {cart.length}
                </Box>
              )}
            </Box>
          </Link>
          <i className="text-[20px] text-white fa-light fa-heart p-2 active:scale-75 cursor-pointer transition-all ease-in duration-150"></i>

          <Menu>
            <MenuButton as={'Button'} rightIcon={<ChevronDownIcon />}>
              <i className="text-[20px] text-white fa-light fa-user p-2 active:scale-75 cursor-pointer transition-all ease-in duration-150"></i>
            </MenuButton>
            <MenuList border={'gray'} bg={'gray.200'} p={2} color={'#afafaf'}>
              {auth?.user ? (
                <>
                  <Link to={`/dashboard/${auth.user.role === 1 ? 'admin' : 'user'}`}>
                    <MenuItem
                      _hover={{ bg: 'gray.300' }}
                      bg={'gray.200'}
                      color={'black'}
                    >
                      Dashboard
                    </MenuItem>
                  </Link>
                  <MenuDivider />
                  <MenuItem
                    _hover={{ bg: 'gray.300' }}
                    bg={'gray.200'}
                    color={'black'}
                  >
                    Account
                  </MenuItem>
                  <MenuDivider color={'black'} />
                  <MenuItem
                    onClick={handleLogout}
                    _hover={{ bg: 'gray.300' }}
                    bg={'gray.200'}
                    color={'black'}
                  >
                    Sign Out
                  </MenuItem>
                </>
              ) : (
                <>
                  <Link to="/login">
                    <MenuItem
                      _hover={{ bg: 'gray.300' }}
                      bg={'gray.200'}
                      color={'black'}
                    >
                      Login
                    </MenuItem>
                  </Link>
                  <Link to="/register">
                    <MenuItem
                      _hover={{ bg: 'gray.300' }}
                      bg={'gray.200'}
                      color={'black'}
                    >
                      Register
                    </MenuItem>
                  </Link>
                </>
              )}
            </MenuList>
          </Menu>
        </HStack>
      </Flex>
    </Box>
  );
}

export default NavBar;
