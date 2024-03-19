import React from "react";
import { Flex, Rate } from "antd";

const desc = ["terrible", "bad", "normal", "good", "wonderful"];

interface RatingProps {
  value: number;
  onChange?: any;
  disabled?: boolean;
}
export default function Rating({ value, onChange, disabled }: RatingProps) {
  return (
    <Flex gap="middle" vertical>
      <Rate
        tooltips={desc}
        onChange={onChange}
        value={value}
        disabled={disabled}
      />
      {value ? <span>{desc[value - 1]}</span> : null}
    </Flex>
  );
}
