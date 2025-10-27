import Link from "next/link";
import { Button } from "@/components/ui";

const ButtonPrimary = ({
  text,
  path,
  type = "button",
  variant = "primary",
  tone = "solid",
  size = "md",
  ...rest
}) => {
  if (path) {
    return (
      <Button
        as={Link}
        href={path}
        variant={variant}
        tone={tone}
        size={size}
        {...rest}
      >
        {text}
      </Button>
    );
  }

  return (
    <Button type={type} variant={variant} tone={tone} size={size} {...rest}>
      {text}
    </Button>
  );
};

export default ButtonPrimary;
