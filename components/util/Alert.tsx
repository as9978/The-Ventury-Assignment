import React, { Fragment, useRef } from "react";
import { useToast } from "@chakra-ui/toast";

import { useAppDispatch, useAppSelector } from "../../redux/reduxHooks";
import { removeAlert } from "../../redux/components/alertSlice";

const Alert = () => {
  const toast = useToast();

  const dispatch = useAppDispatch();
  const { alert } = useAppSelector((state) => state.alert);

  const toastRef: any = useRef();

  if (!alert) return null;

  let id = alert.title + alert.body;

  if (!toast.isActive(id)) {
    toastRef.current = toast({
      id,
      title: alert.title,
      description: alert.body,
      status: alert.status,
      variant: alert.variant,
      duration: alert.duration,
      position: alert.position,
      isClosable: true,
    });
  }

  setTimeout(
    () => {
      dispatch(removeAlert());
      toast.close(id);
    },
    alert.duration ? alert.duration : 5000
  );

  return <Fragment />;
};

export default Alert;
