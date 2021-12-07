import React, { Dispatch, SetStateAction } from "react";
import { Flex, Text } from "@chakra-ui/layout";
import Icon from "@chakra-ui/icon";
import { FiMail } from "react-icons/fi";
import { CloseButton } from "@chakra-ui/close-button";

interface ShowEmailsProps {
  emails: string[];
  setEmails: Dispatch<SetStateAction<string[]>>;
  setU: Dispatch<SetStateAction<number>>;
}

const ShowEmails = ({ emails, setEmails, setU }: ShowEmailsProps) => {
  return (
    <Flex
      flexDirection="column"
      marginTop="16px"
      width="100%"
      height="30vh"
      maxHeight="30vh"
      bgColor="#f4f4f4"
      padding="20px"
      borderRadius="xl"
      overflowY="auto"
    >
      {emails.length === 0 ? (
        <Flex flex={1} justifyContent="center" alignItems="center">
          <Text fontFamily="SofiaPro-Bold" fontSize="14px">
            There is not any emails yet!
          </Text>
        </Flex>
      ) : (
        emails.map((email, index) => (
          <Flex
            key={index}
            flexDirection="row"
            alignItems="center"
            justifyContent="space-between"
            marginBottom="12px"
            bgColor="white"
            borderRadius="xl"
            paddingX="12px"
            paddingY="4px"
          >
            <Flex alignItems="center">
              <Icon as={FiMail} marginRight="8px" />
              <Text fontFamily="SofiaPro" fontSize="14px">
                {email}
              </Text>
            </Flex>

            <CloseButton
              _focus={{}}
              onClick={() => {
                setEmails((prev) => {
                  prev.splice(index, 1);
                  return prev;
                });
                setU((prev) => prev + 1);
              }}
            />
          </Flex>
        ))
      )}
    </Flex>
  );
};

export default ShowEmails;
