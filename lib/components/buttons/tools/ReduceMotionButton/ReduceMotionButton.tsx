import { FC } from "react";
import { AccessibilikState, ChangeAccDraftHander } from "../../../../types";
import AccButton from "../../AccButton/AccButton";
import ReduceMotionIcon from "../../../../assets/icons/reduceMotion.svg?react";

interface ReduceMotionButtonProps {
  accState: AccessibilikState;
  onChangeAccState: (fn: ChangeAccDraftHander) => void;
}

const ReduceMotionButton: FC<ReduceMotionButtonProps> = ({
  accState,
  onChangeAccState,
}) => {
  const toggleHandler = () => {
    onChangeAccState((draft) => {
      draft.isReduceMotion = !draft.isReduceMotion;
    });
  };

  return (
    <AccButton
      Icon={ReduceMotionIcon}
      isToggled={accState.isReduceMotion}
      onToggle={toggleHandler}
      titleTranslationKey="tools.reduceMotion"
      title="Reduce Motion"
    />
  );
};

export default ReduceMotionButton;
