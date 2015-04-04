class CreateAddresses < ActiveRecord::Migration
  def change
    create_table :addresses do |t|
      t.uuid :token

      t.references :state, null: false

      t.string :street_address
      t.string :city
      t.string :zipcode

      t.timestamps null: false
    end
  end
end
