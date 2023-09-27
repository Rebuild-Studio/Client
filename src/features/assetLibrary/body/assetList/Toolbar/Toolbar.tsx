import { observer } from "mobx-react";
import { Fragment } from "react";
import CategoryLabel from "./CategoryLabel";

const Toolbar = observer(() => {
  return (
    <Fragment>
      <CategoryLabel />
      {/* <SelectedAssetListControl /> */}
      {/* <DomainDropbox /> */}
    </Fragment>
  );
});

export default Toolbar;
