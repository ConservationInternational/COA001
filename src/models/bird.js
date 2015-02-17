module.exports = function(bookshelf, props) {
  props.tableName = "birds";
  return bookshelf.Model.extend(props);
};