class Surveys::AddingTimes
  class << self
    def execute!(survey, start_time, end_time)
      survey.started_at = start_time
      survey.ended_at = end_time
    end
  end
end