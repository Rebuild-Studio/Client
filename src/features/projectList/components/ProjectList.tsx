import { useEffect, useState } from "react";
import { styled } from "styled-components";
import MenuButton, { MenuButtonProps } from "@/components/common/MenuButton";
import { basicColors, bgColors, grayColors } from "@/resources/colors/colors";
import { ProjectCards } from "./ProjectCards";
import { TemplateCards } from "./TemplateCards";
import storeContainer from "@/store/storeContainer";
import { observer } from "mobx-react";
import { useFetchProjectList } from "../hooks/useFetchProjectList query";
import { useToast } from "@/hooks/useToast";
import { useFetchProject } from "../hooks/useFetchProject";
import Tab from "@/components/layout/Tab";

const ProjectList = observer(() => {
  const { projectStateStore, projectStore } = storeContainer;
  const [selectedTabIndex, setSelectedTabIndex] = useState(0);
  const { addToast } = useToast();
  const { data } = useFetchProjectList({
    onError: (error) => {
      addToast(`프로젝트 리스트 불러오기에 실패했습니다. ${error}`);
    },
  });
  const [error, fetchProject] = useFetchProject("MX");

  const onClickClose = () => {
    projectStateStore.clearModal();
  };

  const onClickLoad = async () => {
    if (!projectStore.selectedProject) {
      addToast("프로젝트를 선택해주세요");
      return;
    }
    addToast("프로젝트를 불러오는 중입니다.");
    projectStore.setProjectInfo(projectStore.selectedProject);
    await fetchProject();

    projectStateStore.clearModal();
  };

  useEffect(() => {
    error && addToast(`프로젝트 불러오기에 실패했습니다. ${error}`);
  }, [addToast, error]);

  return (
    <StyledComponentList>
      <StyledHeader>
        <StyledTitle>컴포넌트 목록</StyledTitle>
        {/* <input type="text" placeholder="에셋을 입력해주세요"></input> */}
      </StyledHeader>
      <StyledTab>
        <Tab
          activeTab={selectedTabIndex}
          tabs={["내 컴포넌트", "컴포넌트 템플릿"]}
          backgroundColor={bgColors[343434]}
          underbarColor={basicColors.lightLimeGreen}
          width="400px"
          height="50px"
          onTabChange={(idx) => {
            setSelectedTabIndex(idx);
          }}
        />
      </StyledTab>
      <StyledContent>
        {selectedTabIndex == 0 ? (
          <ProjectCards projects={data ? data : []} />
        ) : (
          <TemplateCards projects={[]} />
        )}
      </StyledContent>
      <StyledFooter>
        <MenuButton
          {...confirmButtonStyle}
          label="불러오기"
          onClick={onClickLoad}
          disabled={false}
        />
        <MenuButton
          {...closeButtonStyle}
          label="닫기"
          onClick={onClickClose}
          disabled={false}
        />
      </StyledFooter>
    </StyledComponentList>
  );
});

export default ProjectList;

const StyledComponentList = styled.div`
  width: 70vw;
  min-width: 500px;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  background-color: ${bgColors[404040]};
  border-radius: 10px;
  overflow: hidden;
`;

const StyledHeader = styled.div`
  height: 44px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const StyledTab = styled.div`
  background-color: ${bgColors[343434]};
  padding-left: 22px;
`;

const StyledTitle = styled.p`
  margin-left: 20px;
  line-height: 1.5;
  letter-spacing: 0.00938em;
  color: ${basicColors.white};
  font-family: SourceHanSansKR;
  font-size: 14px;
  font-weight: 500;
`;

const StyledContent = styled.div`
  width: 100%;
  height: 50vh;
  display: flex;
`;

const StyledFooter = styled.div`
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  background-color: ${bgColors[343434]};
  padding-right: 22px;
  gap: 20px;
`;

const confirmButtonStyle: Omit<
  MenuButtonProps,
  "label" | "onClick" | "disabled"
> = {
  width: "138px",
  height: "34px",
  minHeight: "32px",
  minWidth: "80px",
  borderRadius: "6px",
  backgroundColor: basicColors.lightLimeGreen,
  fontFamily: "SourceHanSansKR",
  fontSize: "small",
  fontWeight: 500,
  color: bgColors[101728],
  hoverBackgroundColor: basicColors.limeGreen,
};

const closeButtonStyle: Omit<
  MenuButtonProps,
  "label" | "onClick" | "disabled"
> = {
  width: "138px",
  height: "34px",
  minHeight: "32px",
  minWidth: "80px",
  borderRadius: "6px",
  backgroundColor: bgColors[282828],
  fontFamily: "SpoqaHanSansNeo",
  fontSize: "small",
  fontWeight: 500,
  color: basicColors.white,
  hoverBackgroundColor: grayColors[808080],
};
