import { useEffect, useState } from "react";
import styled from "styled-components";
import DOMAIN_LIST, { Domain } from "@/features/assetLibrary/constants/domain";
import Dropdown, { Option } from "@components/common/dropdown/Dropdown";
import assetCategoryStore from "@store/assetCategoryStore";
import assetLibraryStore from "@store/assetLibraryStore";
import { grayColors } from "@resources/colors/colors";

const DomainDropdown = () => {
  const domains: Option[] = DOMAIN_LIST.map((domain) => ({
    label: domain.domainKR,
    value: domain.domain
  }));
  const [selectedOption, setSelectedOption] = useState<Option>(domains[0]);

  const onClickOption = (option: Option) => {
    setSelectedOption(option);
  };

  useEffect(() => {
    assetLibraryStore.initLibrary();
    assetCategoryStore.setCurrentDomain({
      domain: selectedOption!.value,
      domainKR: selectedOption!.label
    } as Domain);
  }, [selectedOption]);

  return (
    <>
      <CustomDropdown
        onClick={onClickOption}
        placeholder="도메인 선택"
        options={domains}
        size="150px"
        backgroundColor={grayColors["3a3a3a"]}
      />
    </>
  );
};

export default DomainDropdown;

const CustomDropdown = styled(Dropdown)`
  position: relative;
`;
