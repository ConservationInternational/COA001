class User::Friendship < ActiveRecord::Base
  belongs_to :user, inverse_of: :friendships
  belongs_to :friend, inverse_of: :friendships, class_name: "User"

  validates_uniqueness_of :user_id, scope: :friend_id
  validates_presence_of :user_id, :friend_id
end
