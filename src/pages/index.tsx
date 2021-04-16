import { useColorModeValue } from "@chakra-ui/color-mode";

import { Box, Flex, SimpleGrid, Button, Text, Input } from "@chakra-ui/react";
import { Textarea } from "@chakra-ui/textarea";
import Head from "next/head";
import { useCallback, useState } from "react";

export default function Home() {
  const bg = useColorModeValue("gray.100", "gray.800");
  const [textoComum, setTextoComum] = useState("");
  const [valueEncode, setEncode] = useState("");
  const [codigo, setCodigo] = useState(0);

  const handleEncoding = useCallback(() => {
    const texto = encodingCesar(textoComum, codigo);

    setEncode(texto);
  }, [textoComum, codigo]);

  const handleDecoding = useCallback(() => {
    const texto = decodingCesar(valueEncode, codigo);

    setEncode(texto);
  }, [valueEncode, codigo]);

  function handleClear() {
    setEncode("");
    setCodigo(0);
    setTextoComum("");
  }

  const encodingCesar = (text, shift) => {
    return String.fromCharCode(
      ...text
        .split("")
        .map((char) => ((char.charCodeAt() - 97 + shift) % 26) + 97)
    );
  };

  const decodingCesar = (text, shift) => {
    return String.fromCharCode(
      ...text
        .split("")
        .map((char) => ((char.charCodeAt() - 97 - shift) % 26) + 97)
    );
  };

  return (
    <Flex
      as="main"
      minHeight="77vh"
      flexDir="column"
      w="100%"
      my="6"
      maxWidth="1480"
      mx="auto"
      px="6"
    >
      <Head>
        <title>Inicio | Cifra de cesar</title>
        Ok
      </Head>

      <SimpleGrid flex="1" gap="4" minChildWidth="320px" align="flex-start">
        <Box p={["6", "8"]} bg={bg} borderRadius={8} pb="4">
          <Flex flexDir="row" justify="space-between" align="center">
            <Text fontSize="lg" mb="4">
              Codigo normal
            </Text>
            <Button
              mb="4"
              background="green.500"
              onClick={handleEncoding}
              disabled={!codigo || !textoComum}
            >
              Criptografar
            </Button>
          </Flex>
          <Input
            mb="4"
            placeholder="Digite a chave"
            value={codigo}
            onChange={(e) => setCodigo(Number(e.target.value))}
          />
          <Textarea
            value={textoComum}
            onChange={(e) => setTextoComum(e.target.value)}
            placeholder="Digite o texto aqui..."
            size="sm"
          />

          <Button w="100%" my="2" onClick={handleClear} background="gray.400">
            Limpar
          </Button>
        </Box>

        <Box p={["6", "8"]} bg={bg} borderRadius={8} pb="4">
          <Flex flexDir="row" justify="space-between" align="center">
            <Text fontSize="lg" mb="4">
              Codigo Criptografado
            </Text>
            <Button
              mb="4"
              background="red.500"
              disabled={!valueEncode}
              onClick={handleDecoding}
            >
              Descriptografar
            </Button>
          </Flex>

          <Textarea
            value={valueEncode}
            placeholder="Digite o texto aqui..."
            size="sm"
            disabled
          />
        </Box>
      </SimpleGrid>
    </Flex>
  );
}
