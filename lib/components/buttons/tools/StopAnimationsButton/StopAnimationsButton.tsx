import { FC } from "react";
import { AccessibilikState, ChangeAccDraftHander } from "../../../../types";
import AccButton from "../../AccButton/AccButton";
import StopAnimationsIcon from "../../../../assets/icons/stopAnimations.svg?react";

interface StopAnimationsButtonProps {
  accState: AccessibilikState;
  onChangeAccState: (fn: ChangeAccDraftHander) => void;
}

const StopAnimationsButton: FC<StopAnimationsButtonProps> = ({
  accState,
  onChangeAccState,
}) => {
  const toggleHandler = () => {
    onChangeAccState((draft) => {
      draft.isStopAnimations = !draft.isStopAnimations;
    });
  };

  return (
    <AccButton
      Icon={StopAnimationsIcon}
      isToggled={accState.isStopAnimations}
      onToggle={toggleHandler}
      titleTranslationKey="tools.stopAnimations"
      title="Stop Animations"
    />
  );
};

export default StopAnimationsButton;
