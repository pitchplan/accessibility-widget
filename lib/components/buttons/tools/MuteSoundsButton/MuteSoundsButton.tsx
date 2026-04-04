import { FC } from "react";
import { AccessibilikState, ChangeAccDraftHander } from "../../../../types";
import AccButton from "../../AccButton/AccButton";
import MuteSoundsIcon from "../../../../assets/icons/muteSounds.svg?react";

interface MuteSoundsButtonProps {
  accState: AccessibilikState;
  onChangeAccState: (fn: ChangeAccDraftHander) => void;
}

const MuteSoundsButton: FC<MuteSoundsButtonProps> = ({
  accState,
  onChangeAccState,
}) => {
  const toggleHandler = () => {
    onChangeAccState((draft) => {
      draft.isMuteSounds = !draft.isMuteSounds;
    });
  };

  return (
    <AccButton
      Icon={MuteSoundsIcon}
      isToggled={accState.isMuteSounds}
      onToggle={toggleHandler}
      titleTranslationKey="tools.muteSounds"
      title="Mute Sounds"
    />
  );
};

export default MuteSoundsButton;
