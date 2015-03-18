module.exports = function(bookshelf, models, props) {
  props.tableName = "groups";
  props.subgroups = function() {
    return this.hasMany(models.Subgroup);
  };
  var Group = bookshelf.Model.extend(props);

  return Group;
};