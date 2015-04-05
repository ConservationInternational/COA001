class CreateSurveys < ActiveRecord::Migration
  def change
    create_table :surveys do |t|
      t.uuid :token, unique: true, null: false

      t.references :beach #, null: false

      t.integer :weather
      t.text :comments
      t.boolean :verified

      t.datetime :started_at #, null: false
      t.datetime :ended_at #, null: false

      t.timestamps null: false
    end
  end
end
