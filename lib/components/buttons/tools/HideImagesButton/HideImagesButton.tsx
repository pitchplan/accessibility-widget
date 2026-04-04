import { FC } from "react";
import { AccessibilikState, ChangeAccDraftHander } from "../../../../types";
import AccButton from "../../AccButton/AccButton";
import HideImagesIcon from "../../../../assets/icons/hideImages.svg?react";

interface HideImagesButtonProps {
  accState: AccessibilikState;
  onChangeAccState: (fn: ChangeAccDraftHander) => void;
}

const HideImagesButton: FC<HideImagesButtonProps> = ({
  accState,
  onChangeAccState,
}) => {
  const toggleHandler = () => {
    onChangeAccState((draft) => {
      draft.isHideImages = !draft.isHideImages;
    });
  };

  return (
    <AccButton
      Icon={HideImagesIcon}
      isToggled={accState.isHideImages}
      onToggle={toggleHandler}
      titleTranslationKey="tools.hideImages"
      title="Hide Images"
    />
  );
};

export default HideImagesButton;
