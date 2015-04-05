class CreateBirds < ActiveRecord::Migration
  def change
    create_table :birds do |t|
      t.uuid :token, unique: true, null: false

      t.text :comment
      t.boolean :refound, null: false

      t.boolean :collected, null: false
      t.text :collected_comment

      t.boolean :oil, null: false
      t.text :oil_comment

      t.integer :found_location_type, default: 0, null: false
      t.integer :foot_condition_type, default: 0, null: false
      t.integer :eye_type, default: 0, null: false

      t.integer :entanglement_type
      t.text :entanglement_comment

      t.integer :tie_location_type
      t.integer :closest_tie_color, default: 0
      t.integer :middle_tie_color, default: 0
      t.integer :farthest_tie_color, default: 0
      t.text :tie_location_comment

      t.integer :verification_method, default: 0, null: false
      t.text :verification_comment

      t.timestamps null: false
    end
  end
end
