class CreateToeTypes < ActiveRecord::Migration
  def change
    create_table :toe_types do |t|
      t.uuid :token, unique: true, null: false
      t.string :code, null: false
      t.string :name, null: false
      t.boolean :active, null: false

      t.timestamps null: false
    end
  end
end
