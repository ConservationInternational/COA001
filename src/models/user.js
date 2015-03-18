module.exports = function(bookshelf, models, props) {
  props.tableName = "users";
  return bookshelf.Model.extend(props);
};