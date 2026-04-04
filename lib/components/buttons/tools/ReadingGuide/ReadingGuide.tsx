import { FC } from "react";
import ReadingGuideIcon from "./../../../../assets/icons/readingGuide.svg?react";
import { AccessibilikState, ChangeAccDraftHander } from "../../../../types";
import AccButton from "../../AccButton/AccButton";
import styled from "./ReadingGuide.module.scss";

interface ReadingGuideProps {
  accState: AccessibilikState;
  onChangeAccState: (fn: ChangeAccDraftHander) => void;
}
const ReadingGuide: FC<ReadingGuideProps> = ({
  accState,
  onChangeAccState,
}) => {
  const { showReadingGuide, readingGuideGap } = accState;

  const toggleHandler = () => {
    onChangeAccState((draft) => {
      draft.showReadingGuide = !draft.showReadingGuide;
    });
  };

  const changeGap = (delta: number) => {
    onChangeAccState((draft) => {
      const next = draft.readingGuideGap + delta;
      if (next >= 20 && next <= 200) draft.readingGuideGap = next;
    });
  };

  const renderGapControl = () => {
    if (!showReadingGuide) return null;
    return (
      <div
        className={styled.accReadingGap}
        onClick={(e) => e.stopPropagation()}
        onTouchStart={(e) => e.stopPropagation()}
        onTouchEnd={(e) => e.stopPropagation()}
      >
        <button
          className={styled.accReadingGap__btn}
          onTouchEnd={(e) => { e.stopPropagation(); e.preventDefault(); changeGap(-10); }}
          onClick={(e) => { e.stopPropagation(); changeGap(-10); }}
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M19 13H5v-2h14v2z"/></svg>
        </button>
        <span className={styled.accReadingGap__label}>{readingGuideGap}px</span>
        <button
          className={styled.accReadingGap__btn}
          onTouchEnd={(e) => { e.stopPropagation(); e.preventDefault(); changeGap(10); }}
          onClick={(e) => { e.stopPropagation(); changeGap(10); }}
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"/></svg>
        </button>
      </div>
    );
  };

  return (
    <AccButton
      Icon={ReadingGuideIcon}
      isToggled={showReadingGuide}
      onToggle={toggleHandler}
      titleTranslationKey="tools.readingGuide"
      title="Reading Guide"
    >
      {renderGapControl()}
    </AccButton>
  );
};

export default ReadingGuide;
