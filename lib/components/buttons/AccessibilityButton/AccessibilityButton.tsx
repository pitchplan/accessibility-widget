import { FC } from "react";
import styled from "./AccessibilityButton.module.scss";
import AccessibleIcon from "../../../assets/icons/accessibleIcon.svg?react";
import classNames from "classnames";

interface AccessibilityButtonProps {
  onShow?: () => void;
  showSpinner?:boolean;
  position?: "left" | "right";
}

const AccessibilityButton: FC<AccessibilityButtonProps> = ({onShow,showSpinner, position = "left"}) => {
  return (
    <a
      onClick={onShow}
      role="button"
      title="Open Accessibility Menu"
      className={classNames(styled.AccessibilityIcon,{
        [styled.showSpinner]: showSpinner,
        [styled.positionRight]: position === "right",
      })}
    >
      <AccessibleIcon title="AccessibleIcon"/>
    </a>
  );
};

export default AccessibilityButton;
