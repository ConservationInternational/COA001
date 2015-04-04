class CreateUsers < ActiveRecord::Migration
  def change
    create_table :users do |t|
      t.uuid :token, unique: true, null: false
      t.string :email, null: false
      t.string :hashed_password, null: false
      t.string :salt, null: false
      t.string :first_name, null: false
      t.string :middle_initial
      t.string :last_name, null: false

      t.timestamps null: false
    end
  end
end
