import { FC, ReactNode } from "react";
import classNames from "classnames";
import { useTranslation } from "react-i18next";
import { IconSvgComponent } from "../../types";
import styles from "./AccMenuContentBlock.module.scss";
import { CollapsedStateKeys } from "../../config";

interface AccMenuContentBlockProps {
  children: ReactNode;
  name: CollapsedStateKeys;
  onCollapse: (name: CollapsedStateKeys) => void;
  isExpanded: boolean;
  Icon: IconSvgComponent;
  tKey: string;
}
const AccMenuContentBlock: FC<AccMenuContentBlockProps> = ({
  children,
  name,
  onCollapse,
  isExpanded,
  Icon,
  tKey,
}) => {
  const { t } = useTranslation();
  const classes = classNames(styles.accMenuContentBlock, {
    [styles.isExpanded]: isExpanded,
  });

  const toggleHandler = () => {
    onCollapse(name);
  };

  return (
    <div className={classes}>
      <div
        className={styles.accMenuContentBlock__header}
        onClick={toggleHandler}
        role="button"
        tabIndex={0}
      >
        <Icon />
        <h3 className={styles.accMenuContentBlock__title}>{t(tKey)}</h3>
        <span className={styles.accMenuContentBlock__arrow}>
          {isExpanded ? "\u25B2" : "\u25BC"}
        </span>
      </div>
      {isExpanded && (
        <div className={styles.accMenuContentBlock__content}>{children}</div>
      )}
    </div>
  );
};

export default AccMenuContentBlock;
