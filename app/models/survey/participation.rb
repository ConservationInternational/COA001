class Survey::Participation < ActiveRecord::Base
  enum role: %w(data_collector submitter)
end
