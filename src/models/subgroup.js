module.exports = function(bookshelf, models, props) {
  props.tableName = "subgroups";
  props.species = function() {
    return this.hasMany(models.Specie);
  };

  var Subgroup = bookshelf.Model.extend(props);

  return Subgroup;
};