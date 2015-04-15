class Surveys::RemovingFriend
  class << self
    def execute!(friend, survey)
      p = participation(friend, survey)
      p.destroy!
    end

    private

    def participation(friend, survey)
      Survey::Participation.where(user_id: friend.id, survey_id: survey.id).first
    end
  end
end
