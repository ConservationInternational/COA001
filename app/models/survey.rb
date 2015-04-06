class Survey < ActiveRecord::Base
  include Tokenable

  enum weather: %w(sun clouds fog rain snow)
end
