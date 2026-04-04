import { FC } from "react";
import { AccessibilikState, ChangeAccDraftHander } from "../../../../types";
import AccButton from "../../AccButton/AccButton";
import ReadableFontIcon from "../../../../assets/icons/readableFont.svg?react";

interface ReadableFontButtonProps {
  accState: AccessibilikState;
  onChangeAccState: (fn: ChangeAccDraftHander) => void;
}

const ReadableFontButton: FC<ReadableFontButtonProps> = ({
  accState,
  onChangeAccState,
}) => {
  const toggleHandler = () => {
    onChangeAccState((draft) => {
      draft.isReadableFont = !draft.isReadableFont;
    });
  };

  return (
    <AccButton
      Icon={ReadableFontIcon}
      isToggled={accState.isReadableFont}
      onToggle={toggleHandler}
      titleTranslationKey="content.readableFont"
      title="Readable Font"
    />
  );
};

export default ReadableFontButton;
