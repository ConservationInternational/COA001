require 'rails_helper'

RSpec.describe Surveys::AddingTimes do
  let(:date) { DateTime.new.change(year: 2015, month: 4, day: 10) }
  let(:start_time) { DateTime.new.change(hour: 8, min: 34) }
  let(:end_time) { DateTime.new.change(hour: 8, min: 37) }

  describe Surveys::AddingTimes::Model do
    describe '#initialize' do
      subject { Surveys::AddingTimes::Model.new(params, form) }

      context "when params format is from a form" do
        let(:form) { true }
        let(:params) do
          {
            "date(1i)" => date.year,
            "date(2i)" => date.month,
            "date(3i)" => date.day,
            "start_time(1i)" => start_time.year,
            "start_time(2i)" => start_time.month,
            "start_time(3i)" => start_time.day,
            "start_time(4i)" => start_time.hour,
            "start_time(5i)" => start_time.min,
            "end_time(1i)" => end_time.year,
            "end_time(2i)" => end_time.month,
            "end_time(3i)" => end_time.day,
            "end_time(4i)" => end_time.hour,
            "end_time(5i)" => end_time.min,
          }
        end

        it "initializes the properties properly" do
          expect(subject.date.year).to eql 2015
          expect(subject.date.month).to eql 4
          expect(subject.date.day).to eql 10
          expect(subject.start_time.hour).to eql 8
          expect(subject.start_time.min).to eql 34
          expect(subject.end_time.hour).to eql 8
          expect(subject.end_time.min).to eql 37
        end
      end
    end
  end

  describe '.execute!' do
    subject { Surveys::AddingTimes.execute!(survey, model) }
    let(:survey) { Survey.new }
    let(:model) { Surveys::AddingTimes::Model.new(params) }
    let(:params) { { date: date, start_time: start_time, end_time: end_time } }

    it "adds the times" do
      subject
      expect(survey.started_at).to eql DateTime.new.change(year: 2015, month: 4, day: 10, hour: 8, min: 34)
      expect(survey.ended_at).to eql DateTime.new.change(year: 2015, month: 4, day: 10, hour: 8, min: 37)
    end
  end
end