import Dropdown, { Option } from "@/components/common/dropdown/Dropdown";
import DOMAIN_LIST from "@/features/constants/domain";
import styled from "styled-components";

const CustomDropdown = styled(Dropdown)`
  position: relative;
  color: black;
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
      />
    </>
  );
};

export default DomainDropdown;
