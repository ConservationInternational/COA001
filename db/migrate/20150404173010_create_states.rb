class CreateStates < ActiveRecord::Migration
  def change
    create_table :states do |t|
      t.uuid :token, unique: true, null: false
      t.string :code, null: false
      t.string :name, null: false

      t.timestamps null: false
    end
  end
end
