import { FC } from "react";
import { AccessibilikState, ChangeAccDraftHander } from "../../../../types";
import AccButton from "../../AccButton/AccButton";
import ParagraphSpacingIcon from "../../../../assets/icons/paragraphSpacing.svg?react";
import AccValueControl from "../../AccValueControl/AccValueControl";

interface ParagraphSpacingButtonProps {
  accState: AccessibilikState;
  onChangeAccState: (fn: ChangeAccDraftHander) => void;
}

const ParagraphSpacingButton: FC<ParagraphSpacingButtonProps> = ({
  accState,
  onChangeAccState,
}) => {
  const { paragraphSpacing } = accState;
  const isParagraphSpacing = !!paragraphSpacing;

  const increaseHandler = () => {
    onChangeAccState((draft) => {
      draft.paragraphSpacing++;
    });
  };

  const decreaseHandler = () => {
    onChangeAccState((draft) => {
      if (draft.paragraphSpacing > 0) {
        draft.paragraphSpacing--;
      }
    });
  };

  const toggleHandler = () => {
    onChangeAccState((draft) => {
      draft.paragraphSpacing = !draft.paragraphSpacing ? 1 : 0;
    });
  };

  const renderControlButtons = () => {
    if (!isParagraphSpacing) return null;
    return (
      <AccValueControl
        onIncrease={increaseHandler}
        onToggle={toggleHandler}
        onDescrease={decreaseHandler}
      />
    );
  };

  return (
    <AccButton
      Icon={ParagraphSpacingIcon}
      titleTranslationKey="content.paragraphSpacing"
      title="Paragraph Spacing"
      stats={paragraphSpacing ? `${paragraphSpacing}x` : undefined}
      elementType={!isParagraphSpacing ? "button" : "div"}
      isActive={isParagraphSpacing}
      onToggle={!isParagraphSpacing ? toggleHandler : undefined}
    >
      {renderControlButtons()}
    </AccButton>
  );
};

export default ParagraphSpacingButton;
