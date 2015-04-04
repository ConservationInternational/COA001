class CreateSpecies < ActiveRecord::Migration
  def change
    create_table :species do |t|
      t.uuid :token, unique: true, null: false

      t.references :subgroup, null: false

      t.string :code, null: false
      t.string :name, null: false

      t.integer :tarsus_min, null: false
      t.integer :tarsus_max, null: false
      t.integer :wing_min, null: false
      t.integer :wing_max, null: false
      t.integer :bill_min, null: false
      t.integer :bill_max, null: false

      t.string :verification_source, null: false

      t.boolean :sex_difference, null: false
      t.boolean :active, null: false

      t.timestamps null: false
    end
  end
end
