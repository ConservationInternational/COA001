class CreateSubgroups < ActiveRecord::Migration
  def change
    create_table :subgroups do |t|
      t.uuid :token, unique: true, null: false

      t.references :group, null: false

      t.string :name, null: false

      t.timestamps null: false
    end
  end
end
