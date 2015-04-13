class Surveys::Creating
  class << self
    def execute!(user)
      Survey.transaction do
        @survey = Survey.create!
        add_participation(user, @survey)
        @survey
      end
    end

    private

    def create_survey
      Survey.create!
    end

    def add_participation(user, survey)
      Survey::Participation.create!(
        survey_id: survey.id,
        user_id: user.id,
        role: :submitter)
    end
  end
end