class CreateUserFriendships < ActiveRecord::Migration
  def change
    create_table :user_friendships do |t|
      t.integer :user_id
      t.integer :friend_id
      t.integer :frequency

      t.timestamps null: false
    end
  end
end
