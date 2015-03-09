module.exports = function(bookshelf, props) {
  props.tableName = "foot_type_families";
  var FootTypeFamily = bookshelf.Model.extend(props);

  return FootTypeFamily;
}
