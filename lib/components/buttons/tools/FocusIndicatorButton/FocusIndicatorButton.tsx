import { FC } from "react";
import { AccessibilikState, ChangeAccDraftHander } from "../../../../types";
import AccButton from "../../AccButton/AccButton";
import FocusIndicatorIcon from "../../../../assets/icons/focusIndicator.svg?react";

interface FocusIndicatorButtonProps {
  accState: AccessibilikState;
  onChangeAccState: (fn: ChangeAccDraftHander) => void;
}

const FocusIndicatorButton: FC<FocusIndicatorButtonProps> = ({
  accState,
  onChangeAccState,
}) => {
  const toggleHandler = () => {
    onChangeAccState((draft) => {
      draft.isFocusIndicator = !draft.isFocusIndicator;
    });
  };

  return (
    <AccButton
      Icon={FocusIndicatorIcon}
      isToggled={accState.isFocusIndicator}
      onToggle={toggleHandler}
      titleTranslationKey="tools.focusIndicator"
      title="Focus Indicator"
    />
  );
};

export default FocusIndicatorButton;
