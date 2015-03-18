module.exports = function(bookshelf, models, props) {
  props.tableName = "toe_types";
  var ToeType = bookshelf.Model.extend(props);

  return ToeType;
}