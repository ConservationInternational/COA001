class Surveys::AddingFriend
  class << self
    def execute!(friend, survey)
      p = Survey::Participation.new
      p.survey_id = survey.id
      p.user_id = friend.id
      p.role = :data_collector
      p.save!
      p
    end
  end
end
