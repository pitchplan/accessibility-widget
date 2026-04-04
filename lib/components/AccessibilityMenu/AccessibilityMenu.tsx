import { FC, useEffect, useRef, useState } from "react";
import { ACC_MENU_CONTAINER_ID } from "../../constants";
import Header from "../Header/Header";
import { AccessibilikState, ChangeAccDraftHander } from "../../types";
import { produce } from "immer";
import Footer from "../Footer/Footer";
import Select from "react-select";
import styled from "./AccessibilityMenu.module.scss";
import AccMenuContent from "../AccMenuContent/AccMenuContent";
import AccProfiles from "../AccProfiles/AccProfiles";
import {
  CollapsedState,
  CollapsedStateKeys,
  collapsedStateInit,
  langMap,
  langOptions,
} from "../../config";

interface AccessibilityMenuProps {
  display: string;
  accState: AccessibilikState;
  onChangeAccState: (fn: ChangeAccDraftHander) => void;
  onLangChange: (langCode: string) => void;
  onInit: () => void;
  onShow: () => void;
  showAcc: boolean;
  hasLanguages: boolean;
  position: "left" | "right";
  onPositionChange: (pos: "left" | "right") => void;
}

const AccessibilityMenu: FC<AccessibilityMenuProps> = ({
  accState,
  display,
  onInit,
  onLangChange,
  onChangeAccState,
  onShow,
  showAcc,
  hasLanguages,
  position,
  onPositionChange,
}) => {
  const [collapsedState, setCollapsedState] =
    useState<CollapsedState>(collapsedStateInit);
  const { language } = accState;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const selectRef = useRef<any>(null);
  useEffect(() => {
    if (selectRef.current) {
      selectRef.current.focus();
    }
  }, []);

  const toggleCollapseHandler = (name: CollapsedStateKeys) => {
    setCollapsedState((p) => {
      return produce(collapsedStateInit, (draft) => {
        const prevExpandedState = p[name].isExpanded;
        draft[name].isExpanded = !prevExpandedState;
      });
    });
  };

  return (
    <div id={ACC_MENU_CONTAINER_ID} className={styled.accAccessibilityMenu}>
      <div style={{ display }} className={`${styled.accMenu} ${position === "right" ? styled.positionRight : ""}`}>
        <Header onShow={onShow} onInit={onInit} />
        <div className={styled.accToolbar}>
          <Select
            className={styled["acc-lang-select-container"]}
            options={hasLanguages ? langOptions : [langOptions[0]]}
            value={langMap[language]}
            onChange={(lang) => lang && onLangChange(lang.value)}
            ref={selectRef}
            styles={{
              control: (base) => ({ ...base, minHeight: 42, borderRadius: 4, border: "1px solid #ccc", lineHeight: 1.4 }),
              option: (base) => ({ ...base, color: "#333", fontSize: 14, padding: "10px 12px", lineHeight: 1.4 }),
              singleValue: (base) => ({ ...base, color: "#333", fontSize: 14, lineHeight: 1.4, overflow: "visible" }),
              valueContainer: (base) => ({ ...base, padding: "4px 12px" }),
              menu: (base) => ({ ...base, zIndex: 200, borderRadius: 4 }),
              menuList: (base) => ({ ...base, maxHeight: 250 }),
            }}
          />
          <button
            className={styled.accPositionBtn}
            onClick={() => onPositionChange(position === "left" ? "right" : "left")}
            title={position === "left" ? "Move to right" : "Move to left"}
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
              {position === "left"
                ? <path d="M4 11v2h12l-5.5 5.5 1.42 1.42L19.84 12l-7.92-7.92L10.5 5.5 16 11H4z"/>
                : <path d="M20 11v2H8l5.5 5.5-1.42 1.42L4.16 12l7.92-7.92L13.5 5.5 8 11h12z"/>
              }
            </svg>
          </button>
        </div>
        <AccProfiles
          accState={accState}
          onChangeAccState={onChangeAccState}
        />
        <AccMenuContent
          onCollapse={toggleCollapseHandler}
          accState={accState}
          onChangeAccState={onChangeAccState}
          collapsedState={collapsedState}
        />
        <Footer />
      </div>
      {showAcc && <div className={styled.accAccessibilityMenu__overlay}></div>}
    </div>
  );
};

export default AccessibilityMenu;
