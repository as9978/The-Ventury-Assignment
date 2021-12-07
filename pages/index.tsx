import { useEffect, useState } from "react";
import { Flex, Text } from "@chakra-ui/layout";

import { EmailsInput, ShowEmails } from "../components/emails";
import { ShowJoke } from "../components/joke";

export default function Home() {
  const [emails, setEmails] = useState<string[]>([]);
  const [u, setU] = useState(0);

  useEffect(() => {}, [u]);

  return (
    <Flex
      flex={1}
      width={{ base: "90%", md: "60%" }}
      margin="auto"
      minHeight="100vh"
      alignItems="flex-start"
      flexDirection="column"
    >
      {/* Title */}
      <Flex
        width="100%"
        alignItems="center"
        justifyContent="center"
        marginY="48px"
      >
        <Text fontFamily="SofiaPro-Bold" fontSize="48px">
          The Ventury Assignment
        </Text>
      </Flex>

      {/* Add New Email */}
      <EmailsInput
        onAddEmail={(email) => {
          setEmails((prev) => {
            // Add new email
            prev.push(email);

            // Sort by email name
            prev.sort((x, y) => {
              const xName = x.split("@")[0];
              const yName = y.split("@")[0];

              return xName == yName ? 0 : xName < yName ? -1 : 1;
            });

            // Sort by email domain
            prev.sort((x, y) => {
              const xDomain = x.split("@")[1];
              const yDomain = y.split("@")[1];
              return xDomain == yDomain ? 0 : xDomain < yDomain ? -1 : 1;
            });

            return prev;
          });
          setU((prev) => prev + 1);
        }}
      />

      {/* Show Emails */}
      <ShowEmails {...{ emails, setEmails, setU }} />

      {/* Show Joke */}
      <ShowJoke {...{ emails }} />
    </Flex>
  );
}
