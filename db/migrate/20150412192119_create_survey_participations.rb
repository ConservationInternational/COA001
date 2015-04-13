class CreateSurveyParticipations < ActiveRecord::Migration
  def change
    create_table :survey_participations do |t|
      t.integer :survey_id
      t.integer :user_id
      t.integer :travel_time
      t.integer :role

      t.timestamps null: false
    end

    add_index :survey_participations, [:survey_id, :user_id], unique: true
  end
end
