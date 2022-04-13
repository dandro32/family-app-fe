import { useState } from "react";

interface BooleanHandler {
  (): void;
}

const useBoolean = (
  initialValue: boolean
): [boolean, BooleanHandler, BooleanHandler, BooleanHandler] => {
  const [state, setState] = useState(initialValue);

  const handleSetFalse = () => {
    setState(false);
  };

  const handleSetTrue = () => {
    setState(true);
  };

  const handleToggle = () => {
    setState(!state);
  };

  return [state, handleSetTrue, handleSetFalse, handleToggle];
};

export { useBoolean };
