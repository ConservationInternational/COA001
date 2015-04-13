class User < ActiveRecord::Base
  include Tokenable

  has_many :friendships, inverse_of: :user
  has_many :friends, through: :friendships, source: :friend

  has_many :participations, inverse_of: :user

  def full_name
    "#{first_name} #{last_name}"
  end
end
