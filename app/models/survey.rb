class Survey < ActiveRecord::Base
  include Tokenable

  has_many :participations
  has_many :participants, through: :participations, source: :user

  enum weather: %w(sun clouds fog rain snow)
end
