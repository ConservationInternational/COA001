module.exports = function(bookshelf, models, props) {
  props.tableName = "species";
  var Specie = bookshelf.Model.extend(props);

  return Specie;
};