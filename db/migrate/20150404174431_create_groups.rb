class CreateGroups < ActiveRecord::Migration
  def change
    create_table :groups do |t|
      t.uuid :token, unique: true, null: false

      t.references :foot_type_family, null: false

      t.string :name, null: false
      t.string :code, null: false
      t.string :description
      t.boolean :active, null: false
      t.boolean :composite, null: false

      t.timestamps null: false
    end
  end
end
