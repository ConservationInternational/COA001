class Survey::Participation < ActiveRecord::Base
  belongs_to :user, inverse_of: :participations
  belongs_to :friend, inverse_of: :friendships, class_name: "User"

  enum role: %w(data_collector submitter)
end
