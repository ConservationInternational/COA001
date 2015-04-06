class CreateBeaches < ActiveRecord::Migration
  def change
    create_table :beaches do |t|
      t.uuid :token, unique: true, null: false

      t.string :code
      t.string :name

      t.text :description
      t.text :start_description
      t.text :turn_description

      t.boolean :vehicles_allowed
      t.boolean :dogs_allowed

      t.timestamps null: false
    end
  end
end
