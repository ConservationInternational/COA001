class Surveys::AddingFriend
  class << self
    def execute!(friend, survey)
      p = Survey::Participation.new
      p.survey_id = survey.id
      p.user_id = friend.id
      p.role = :data_collector

      begin
        p.save!
      rescue ActiveRecord::RecordNotUnique
        p = Survey::Participation.where(survey_id: survey.id, user_id: friend.id).first!
      end

      p
    end
  end
end
