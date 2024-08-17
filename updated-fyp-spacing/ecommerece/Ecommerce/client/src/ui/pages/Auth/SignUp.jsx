import React, { useState } from "react";
import { Box, Button, Flex, Input, Text } from '@chakra-ui/react';
import BGImg from '../../assets/images/Screenshot 2024-08-05 122640.png';
import NavBar from '../../components/navBar';
import Footer from '../../components/Footer';
import { FormControl, FormLabel } from '@chakra-ui/react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import toast from "react-hot-toast";

function SignUp() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [question, setQuestion] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("/api/v1/auth/register", {
        name,
        email,
        password,
        phone,
        address,
        question
      });
      if (res && res.data.success) {
        toast.success(res.data.message);
        navigate("/login");
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };

  return (
    <>
      <NavBar/>
      <Box
        h={'100vh'}
        zIndex={-10}
        bgImg={BGImg}
        bgPosition={'center'}
        bgRepeat={'repeat'}
        bgSize={'cover'}
        display={'flex'}
        justifyContent={'center'}
        alignItems={'center'}
      >
        <Flex
          rounded={20}
          p={8}
          color={'white'}
          backdropFilter={'blur(20px) brightness(200%)'}
          bg={"whiteAlpha.200"}
          justify={'center'}
          w={{ base: '90%', md: '30%' }}
        >
          <Flex
            w={'100%'}
            justify={'center'}
            align={'center'}
            flexDir={'column'}
            as="form"
            onSubmit={handleSubmit}  // Attach the form submission handler
          >
            <Box my={5} textAlign={'center'}>
              <Text as={'h1'} fontSize={'5xl'} fontWeight={'500'}>
                Sign Up
              </Text>
            </Box>
            <FormControl my={5} w={'100%'}>
              <Box mb={8}>
                <FormLabel fontSize={'15px'} color={'white'}>
                  Enter Your Name
                </FormLabel>
                <Input
                  placeholder="Your Name*"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </Box>
              <Box mb={8}>
                <FormLabel fontSize={'15px'} color={'white'}>
                  Enter Your Email
                </FormLabel>
                <Input
                  placeholder="Your Email*"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </Box>
              <Box mb={8}>
                <FormLabel fontSize={'15px'} color={'white'}>
                  Enter Your Password
                </FormLabel>
                <Input
                  placeholder="Your Password*"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </Box>
              <Box mb={8}>
                <FormLabel fontSize={'15px'} color={'white'}>
                  Enter Your Phone
                </FormLabel>
                <Input
                  placeholder="Your Phone*"
                  type="text"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  required
                />
              </Box>
              <Box mb={8}>
                <FormLabel fontSize={'15px'} color={'white'}>
                  Enter Your Address
                </FormLabel>
                <Input
                  placeholder="Your Address*"
                  type="text"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  required
                />
              </Box>
              <Box mb={8}>
                <FormLabel fontSize={'15px'} color={'white'}>
                  Best Friend's Name?
                </FormLabel>
                <Input
                  placeholder="Security Question Answer*"
                  type="text"
                  value={question}
                  onChange={(e) => setQuestion(e.target.value)}
                  required
                />
              </Box>
              <Button type="submit" w={"100%"}>
                Register
              </Button>
              <Text mt={5}>
                Have An Account? <Link className='text-red-500' to={"/Login"}> Login</Link>
              </Text>
            </FormControl>
          </Flex>
        </Flex>
      </Box>
      <Footer/>
    </>
  );
}

export default SignUp;
