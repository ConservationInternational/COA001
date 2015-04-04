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

      # TODO(yu) various types
      # found_location_type
      # foot_condition_type
      # eye_type

      # TODO(yu) entanglement_type
      t.text :entanglement_comment

      # TODO(yu) tie stuff
      # tie_location_type
      # closest_tie_color
      # middle_tie_color
      # farthest_tie_color
      t.text :tie_location_comment

      # TODO(yu) verification_method
      t.text :verification_comment

      t.timestamps null: false
    end
  end
end
