class CreateUsers < ActiveRecord::Migration
  def change
    create_table :users do |t|
      t.string :token
      t.string :email
      t.string :hashed_password
      t.string :salt
      t.string :first_name
      t.string :middle_initial
      t.string :last_name

      t.timestamps null: false
    end
  end
end
