import React from "react";
import PropTypes from "prop-types";
import Chip from "@material-ui/core/Chip";
import { withStyles } from "@material-ui/core/styles";

const defaultFilterListStyles = {
  root: {
    display: "flex",
    justifyContent: "left",
    flexWrap: "wrap",
    margin: "0px 16px 0px 16px",
  },
  chip: {
    margin: "8px 8px 0px 0px",
  },
};

class DripTableFilterList extends React.Component {
  static propTypes = {
    filterList: PropTypes.array.isRequired,
    onFilterUpdate: PropTypes.func,
    classes: PropTypes.object,
  };

  render() {
    const { classes, filterList, filterUpdate } = this.props;

    return (
      <div className={classes.root}>
        {filterList.map((item, index) =>
          item.map((data, colIndex) => (
            <Chip
              label={data}
              key={colIndex}
              onDelete={filterUpdate.bind(null, index, data, "checkbox")}
              className={classes.chip}
            />
          )),
        )}
      </div>
    );
  }
}

export default withStyles(defaultFilterListStyles, { name: "DripTableFilterList" })(DripTableFilterList);
