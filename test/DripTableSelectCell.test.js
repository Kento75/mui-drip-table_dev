import React from "react";
import { spy, stub } from "sinon";
import { mount, shallow } from "enzyme";
import { assert, expect, should } from "chai";
import Checkbox from "@material-ui/core/Checkbox";
import DripTableSelectCell from "../src/DripTableSelectCell";

describe("<DripTableSelectCell />", function() {
  before(() => {});

  // テーブルセル動作チェック
  it("should render table select cell", () => {
    const mountWrapper = mount(<DripTableSelectCell checked={false} />);

    const actualResult = mountWrapper.find(Checkbox);
    assert.strictEqual(actualResult.length, 1);
  });

  // チェックボックス動作チェック
  it("should render table select cell checked", () => {
    const mountWrapper = mount(<DripTableSelectCell checked={true} />);

    const actualResult = mountWrapper.find(Checkbox);
    assert.strictEqual(actualResult.props().checked, true);
  });

  // チェックボックス動作チェック(選択解除)
  it("should render table select cell unchecked", () => {
    const mountWrapper = mount(<DripTableSelectCell checked={false} />);

    const actualResult = mountWrapper.find(Checkbox);
    assert.strictEqual(actualResult.props().checked, false);
  });

  // it("should trigger onColumnUpdate prop callback when calling method handleColChange", () => {
  //   const options = {};
  //   const onColumnUpdate = spy();

  //   const shallowWrapper = shallow(
  //     <DripTableViewCol
  //       columns={columns}
  //       onColumnUpdate={onColumnUpdate}
  //       viewColStyles={defaultViewColStyles}
  //       options={options}
  //     />,
  //   ).dive();

  //   const instance = shallowWrapper.instance();

  //   instance.handleColChange(0);
  //   assert.strictEqual(onColumnUpdate.callCount, 1);
  // });
});
