import React from "react";
import { Input, Text, Flex, Button } from "@chakra-ui/react";
import { useFormik } from "formik";
import * as Yup from "yup";

interface EmailsInputProps {
  onAddEmail: (email: string) => void;
}

const validationSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email.").required("Email is required."),
});

const EmailsInput = ({ onAddEmail }: EmailsInputProps) => {
  const { handleChange, handleBlur, handleSubmit, errors, touched } = useFormik(
    {
      validationSchema: validationSchema,
      initialValues: { email: "" },
      onSubmit: ({ email }) => onAddEmail(email),
    }
  );

  return (
    <Flex
      width="100%"
      flexDirection={{ base: "column", md: "row" }}
      alignItems="center"
    >
      {/* Input */}
      <Flex width={{ base: "100%", md: "80%" }} flexDirection="column">
        <Input
          width="100%"
          placeholder="user@example.com"
          onChange={handleChange("email")}
          onBlur={handleBlur("email")}
          borderRadius="xl"
          _focus={{
            borderColor: errors.email ? "red.500" : "green.500",
          }}
        />
        {touched.email && errors.email && (
          <Text
            variant="SofiaPro"
            fontSize="16px"
            color="red.500"
            marginTop="8px"
          >
            * {errors.email}
          </Text>
        )}
      </Flex>

      {/* Submit Button */}
      <Button
        width={{ base: "100%", md: "auto" }}
        onClick={() => handleSubmit()}
        marginLeft={{ base: 0, md: "48px" }}
        marginTop={{ base: "24px", md: 0 }}
        paddingX="12px"
        _focus={{}}
      >
        Add new email
      </Button>
    </Flex>
  );
};

export default EmailsInput;
