import Dropdown, { Option } from "@/components/common/dropdown/Dropdown";
import DOMAIN_LIST from "@/features/assetLibrary/constants/domain";
import { grayColors } from "@/resources/colors/colors";
import styled from "styled-components";

const CustomDropdown = styled(Dropdown)`
  position: relative;
`;

const DomainDropdown = () => {
  const options: Option[] = DOMAIN_LIST.map((domain) => ({
    label: domain.domainKR,
    value: domain.domain,
  }));
  return (
    <>
      <CustomDropdown
        placeholder="도메인 선택"
        options={options}
        size="150px"
        backgroundColor={grayColors["3a3a3a"]}
      />
    </>
  );
};

export default DomainDropdown;
