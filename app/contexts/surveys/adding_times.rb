class Surveys::AddingTimes
  class Model
    include ActiveModel::Model

    attr_accessor :date, :start_time, :end_time

    def initialize(params = {}, form = false)
      if form
        @date = parse_date(params, :date)
        @start_time = parse_time(params, :start_time)
        @end_time = parse_time(params, :end_time)
      else
        @date = params[:date]
        @start_time = params[:start_time]
        @end_time = params[:end_time]
      end
    end

    def model_name
      ActiveModel::Name.new(self.class, nil, "When")
    end

    def started_at
      parse_datetime(date, start_time)
    end

    def ended_at
      parse_datetime(date, end_time)
    end

    private

    def parse_datetime(date, time)
      DateTime.new.change(
        year: date.year,
        month: date.month,
        day: date.day,
        hour: time.hour,
        min: time.min)
    end

    def parse_date(params, prefix)
      year = params["#{prefix}(1i)"].to_i
      month = params["#{prefix}(2i)"].to_i
      day = params["#{prefix}(3i)"].to_i

      DateTime.new.change(year: year, month: month, day: day)
    end

    def parse_time(params, prefix)
      hour = params["#{prefix}(4i)"].to_i
      min = params["#{prefix}(5i)"].to_i

      DateTime.new.change(hour: hour, min: min)
    end
  end

  class << self
    def execute!(survey, model)
      survey.started_at = model.started_at
      survey.ended_at = model.ended_at
      survey
    end
  end
end