import { observer } from "mobx-react";
import Accordion from "@/components/layout/Accordion";
const DisplaySetting = observer(() => {
  return (
    <>
      <Accordion title={"배경컬러"}></Accordion>
      <Accordion title={"그리드"}></Accordion>
    </>
  );
});

export default DisplaySetting;
