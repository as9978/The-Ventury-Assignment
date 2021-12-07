import React, { useState } from "react";
import { Flex, Text } from "@chakra-ui/layout";
import { Skeleton } from "@chakra-ui/skeleton";
import { Button } from "@chakra-ui/button";
import { useMutation, useQueryClient } from "react-query";

import { getJoke } from "../../api/jokes/getJoke";
import { shareJoke } from "../../api/jokes/shareJoke";
import { useAppDispatch } from "../../redux/reduxHooks";
import { setAlert } from "../../redux/components/alertSlice";

interface ShowJokeProps {
  emails: string[];
}

const ShowJoke = ({ emails }: ShowJokeProps) => {
  const [isSharing, setIsSharing] = useState(false);

  const dispatch = useAppDispatch();

  const queryClient = useQueryClient();

  const { data, status } = getJoke();

  const shareJokeMutation = useMutation(
    ({ joke, emails }: { joke: string; emails: string[] }) =>
      shareJoke(joke, emails),
    {
      onMutate: () => setIsSharing(true),
      onError: () => {
        setIsSharing(false);
        dispatch(
          setAlert({
            title: "Error",
            body: "Something is wrong please try again.",
            status: "error",
          })
        );
      },
      onSuccess: () => {
        setIsSharing(false);
        dispatch(
          setAlert({
            title: "Successful",
            body: "Joke shared successfully.",
            status: "success",
          })
        );
      },
    }
  );

  return (
    <Skeleton
      isLoaded={status === "success"}
      width="100%"
      height="20vh"
      marginTop="24px"
      borderRadius="xl"
    >
      <Flex
        flex={1}
        padding="20px"
        borderWidth="2px"
        borderColor="#f4f4f4"
        borderRadius="xl"
        flexDirection="column"
      >
        <Text borderRadius="md" fontFamily="SofiaPro-Bold" fontSize="20px">
          Joke of day
        </Text>
        {status === "success" && (
          <Text
            fontFamily="SofiaPro"
            fontSize="16px"
            marginTop="12px"
            minHeight="10vh"
          >
            {data.value.joke}
          </Text>
        )}
        <Flex
          width="100%"
          marginTop="20px"
          flexDirection={{ base: "column", md: "row" }}
          justifyContent={{ base: "center", md: "flex-end" }}
        >
          <Button
            bgColor="blue.400"
            color="white"
            _hover={{ bgColor: "blue.500" }}
            _active={{ bgColor: "blue.600" }}
            _focus={{}}
            isLoading={status !== "success"}
            loadingText="Thinking about new joke ..."
            marginRight={{ base: 0, md: "16px" }}
            marginBottom={{ base: "16px", md: 0 }}
            onClick={() => queryClient.refetchQueries("joke")}
          >
            Tell me new joke
          </Button>
          <Button
            bgColor="orange.400"
            color="white"
            _hover={{ bgColor: "orange.500" }}
            _active={{ bgColor: "orange.600" }}
            _focus={{}}
            isLoading={isSharing}
            loadingText="Sharing"
            onClick={() => {
              if (emails.length === 0) {
                dispatch(
                  setAlert({
                    title: "No email",
                    body: "Please add some emails to share this joke.",
                    status: "warning",
                  })
                );
              } else {
                shareJokeMutation.mutate({ joke: data.value.joke, emails });
              }
            }}
          >
            Share this joke
          </Button>
        </Flex>
      </Flex>
    </Skeleton>
  );
};

export default ShowJoke;
