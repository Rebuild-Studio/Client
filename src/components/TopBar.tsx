import React from "react";
import { styled } from "styled-components";
import { bgColors, basicColors } from "@/resources/colors/colors";
import BottomPopOver from "./layout/popover/BottomPopOver";
import IconButton from "./buttons/IconButton";
import CavasBar from "./CanvaseBar";
import { useState } from "react";

interface Props {}

const BoxWrapper = styled.div`
  height: 54px;
  width: 100%;
  background-color: #222222;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
`;
const AppBarWrapper = styled.div`
  width: 100%;
  height: 78px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  background-color: transparent;
`;

const AppBarItem = styled.div`
  margin-right: 20px;
`;

const ComponentName = styled.div`
  font-family: SpoqaHanSansNeo;
  font-size: 14px;
  font-weight: 400;
  color: ${basicColors.white};
  text-transform: none;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
`;
const TopBar = (props: Props) => {
  const [open, setOpen] = useState(false);

  return (
    <div>
      <BoxWrapper>
        <AppBarWrapper>
          <AppBarItem>
            <div>
              <span
                style={{
                  fontSize: 14,
                  color: basicColors.white,
                  marginLeft: "16px",
                }}
                onClick={() => {
                  setOpen(!open);
                }}
              >
                캔버스
              </span>
            </div>
          </AppBarItem>
          <AppBarItem>
            <span style={{ fontSize: 14, color: basicColors.white }}>
              인터렉션 에디터
            </span>
          </AppBarItem>
        </AppBarWrapper>
        <div style={{ flexGrow: 1 }} />
        <ComponentName>컴포넌트 네임</ComponentName>
        <div style={{ flexGrow: 1 }} />
        <IconButton
          Icon={() => <img src={"/icons/studio/icon_씬설정.svg"} />}
        />
        <IconButton
          Icon={() => <img src={"/icons/studio/icon_미리보기.svg"} />}
        />
      </BoxWrapper>
      {open && <CavasBar />}
    </div>
  );
};

export default TopBar;
