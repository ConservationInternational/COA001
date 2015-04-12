class MakingFriend
  class << self
    def execute!(user, friend)
      f = User::Friendship.new
      f.user_id = user.id
      f.friend_id = friend.id
      f.frequency = 0
      f.save!
      f
    end
  end
end
