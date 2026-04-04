import { FC } from "react";
import { AccessibilikState, ChangeAccDraftHander } from "../../types";
import BigCursorButton from "../buttons/tools/BigCursorButton/BigCursorButton";
import StopAnimationsButton from "../buttons/tools/StopAnimationsButton/StopAnimationsButton";
import ReduceMotionButton from "../buttons/tools/ReduceMotionButton/ReduceMotionButton";
import HideImagesButton from "../buttons/tools/HideImagesButton/HideImagesButton";
import FocusIndicatorButton from "../buttons/tools/FocusIndicatorButton/FocusIndicatorButton";


interface AccToolsProps {
    accState: AccessibilikState;
    onChangeAccState: (fn: ChangeAccDraftHander) => void;
}

const AccTools:FC<AccToolsProps> = ({accState,onChangeAccState}) => {
    return <>
      <BigCursorButton accState={accState} onChangeAccState={onChangeAccState}/>
      <StopAnimationsButton accState={accState} onChangeAccState={onChangeAccState}/>
      <ReduceMotionButton accState={accState} onChangeAccState={onChangeAccState}/>
      <HideImagesButton accState={accState} onChangeAccState={onChangeAccState}/>
      <FocusIndicatorButton accState={accState} onChangeAccState={onChangeAccState}/>
    </>
}
export default AccTools;