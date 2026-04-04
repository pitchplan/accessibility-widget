import { FC } from "react";
import styled from "./Footer.module.scss";

const Footer: FC = () => {
  return (
    <footer className={styled.accFooter}>
      <span>Originally by Vladi Iokhim | Enhanced by <a href="https://www.pitch-plan.com" target="_blank" rel="noopener noreferrer" style={{color: "inherit", textDecoration: "underline"}}>PitchPlan</a></span>
    </footer>
  );
};

export default Footer;
