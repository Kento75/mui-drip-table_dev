import React from "react";
import { spy, stub } from "sinon";
import { mount, shallow } from "enzyme";
import { assert, expect, should } from "chai";
import IconButton from "@material-ui/core/IconButton";
import SearchIcon from "@material-ui/icons/Search";
import DownloadIcon from "@material-ui/icons/FileDownload";
import PrintIcon from "@material-ui/icons/Print";
import ViewColumnIcon from "@material-ui/icons/ViewColumn";
import ClearIcon from "@material-ui/icons/Clear";
import FilterIcon from "@material-ui/icons/FilterList";
import DripTableToolbar from "../src/DripTableToolbar";
import DripTableSearch from "../src/DripTableSearch";
import textLabels from "../src/textLabels";

describe("<DripTableToolbar />", function() {
  let data;
  let columns;
  let options;

  before(() => {
    options = {
      print: true,
      download: true,
      search: true,
      filter: true,
      viewColumns: true,
      textLabels,
    };
    columns = ["First Name", "Company", "City", "State"];
    data = [
      ["Joe James", "Test Corp", "Yonkers", "NY"],
      ["John Walsh", "Test Corp", "Hartford", "CT"],
      ["Bob Herm", "Test Corp", "Tampa", "FL"],
      ["James Houston", "Test Corp", "Dallas", "TX"],
    ];
  });

  // ツールバー動作チェック
  it("should render a toolbar", () => {
    const mountWrapper = mount(<DripTableToolbar columns={columns} data={data} options={options} />);
    const actualResult = mountWrapper.find(IconButton);
    assert.strictEqual(actualResult.length, 5);
  });

  // オプションチェック(検索=false)
  it("should render a toolbar with no search icon if option.search = false", () => {
    const newOptions = { ...options, search: false };
    const mountWrapper = mount(<DripTableToolbar columns={columns} data={data} options={newOptions} />);
    const actualResult = mountWrapper.find(SearchIcon);
    assert.strictEqual(actualResult.length, 0);
  });

  // オプションチェック(ダウンロード=false)
  it("should render a toolbar with no download icon if option.download = false", () => {
    const newOptions = { ...options, download: false };
    const mountWrapper = mount(<DripTableToolbar columns={columns} data={data} options={newOptions} />);
    const actualResult = mountWrapper.find(DownloadIcon);
    assert.strictEqual(actualResult.length, 0);
  });

  // オプションチェック(印刷=false)
  it("should render a toolbar with no print icon if option.print = false", () => {
    const newOptions = { ...options, print: false };
    const mountWrapper = mount(<DripTableToolbar columns={columns} data={data} options={newOptions} />);
    const actualResult = mountWrapper.find(PrintIcon);
    assert.strictEqual(actualResult.length, 0);
  });

  // オプションチェック(カラム表示・非表示選択=false)
  it("should render a toolbar with no view columns icon if option.viewColumns = false", () => {
    const newOptions = { ...options, viewColumns: false };
    const mountWrapper = mount(<DripTableToolbar columns={columns} data={data} options={newOptions} />);
    const actualResult = mountWrapper.find(ViewColumnIcon);
    assert.strictEqual(actualResult.length, 0);
  });

  // オプションチェック(フィルターリスト=false)
  it("should render a toolbar with no filter icon if option.filter = false", () => {
    const newOptions = { ...options, filter: false };
    const mountWrapper = mount(<DripTableToolbar columns={columns} data={data} options={newOptions} />);
    const actualResult = mountWrapper.find(FilterIcon);
    assert.strictEqual(actualResult.length, 0);
  });

  // オプションチェック(検索ボックス表示=false)
  it("should render a toolbar with a search clicking search icon", () => {
    const mountWrapper = mount(<DripTableToolbar columns={columns} data={data} options={options} />);
    const instance = mountWrapper.instance();

    instance.setActiveIcon("search");
    mountWrapper.update();

    const actualResult = mountWrapper.find(DripTableSearch);
    assert.strictEqual(actualResult.length, 1);
  });

  // 検索キャンセル実行時、動作チェック
  it("should hide search after clicking cancel icon", () => {
    const searchTextUpdate = () => {};
    const mountWrapper = mount(
      <DripTableToolbar searchTextUpdate={searchTextUpdate} columns={columns} data={data} options={options} />,
    );
    const instance = mountWrapper.instance();

    // display search
    instance.setActiveIcon("search");
    mountWrapper.update();

    let actualResult = mountWrapper.find(DripTableSearch);
    assert.strictEqual(actualResult.length, 1);

    // now hide it and test
    instance.hideSearch();
    mountWrapper.update();

    actualResult = mountWrapper.find(DripTableSearch);
    assert.strictEqual(actualResult.length, 0);
  });

  // フィルターアイコン表示動作チェック
  it("should set icon when calling method setActiveIcon", () => {
    const mountWrapper = mount(<DripTableToolbar columns={columns} data={data} options={options} />);
    const instance = mountWrapper.instance();

    instance.setActiveIcon("filter");
    mountWrapper.update();

    const state = mountWrapper.state();
    assert.strictEqual(state.iconActive, "filter");
  });

  // ダウンロード実行時、動作チェック
  it("should download CSV when calling method handleCSVDownload", () => {
    const mountWrapper = mount(<DripTableToolbar columns={columns} data={data} options={options} />);
    const instance = mountWrapper.instance();

    const appendSpy = spy(document.body, "appendChild");
    const removeSpy = spy(document.body, "removeChild");
    instance.handleCSVDownload();

    assert.strictEqual(appendSpy.callCount, 1);
    assert.strictEqual(removeSpy.callCount, 1);
  });
});
