import React, { FC } from "react";
import { ButtonProps, Button } from "@/components/ui/button";
import { Loader } from "lucide-react";

type TProps = {
  isLoading: boolean;
  children: React.ReactNode;
} & ButtonProps;

export const LoadingButton: FC<TProps> = ({
  isLoading,
  children,
  ...props
}) => {
  return (
    <div>
      <Button {...props} disabled={props.disabled || isLoading}>
        {isLoading && <Loader className="mr-2 h-4 w-4 animate-spin" />}
        {children}
      </Button>
    </div>
  );
};
