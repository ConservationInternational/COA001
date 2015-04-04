class CreateFootTypeFamilies < ActiveRecord::Migration
  def change
    create_table :foot_type_families do |t|
      t.uuid :token, unique: true, null: false

      t.references :toe_type, null: false

      t.string :name, null: false
      t.string :description
      t.boolean :active, null: false

      t.timestamps null: false
    end
  end
end
