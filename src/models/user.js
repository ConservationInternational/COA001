module.exports = function(bookshelf, props) {
  props.tableName = "users";
  return bookshelf.Model.extend(props);
};