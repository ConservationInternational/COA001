module.exports = function(bookshelf, models, props) {
  props.tableName = "foot_type_families";
  props.groups = function() {
    return this.hasMany(models.Group);
  };

  var FootTypeFamily = bookshelf.Model.extend(props);

  return FootTypeFamily;
}
