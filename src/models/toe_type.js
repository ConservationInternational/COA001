module.exports = function(bookshelf, props) {
  props.tableName = "toe_types";
  var ToeType = bookshelf.Model.extend(props);

  return ToeType;
}