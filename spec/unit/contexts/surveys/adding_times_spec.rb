require 'rails_helper'

RSpec.describe Surveys::AddingTimes do
  describe '.execute!' do
    subject { Surveys::AddingTimes.execute!(survey, start_time, end_time) }

    let(:survey) { Survey.new }
    let(:start_time) { 1.hour.ago }
    let(:end_time) { Time.now }
    it "adds the times" do
      subject
      expect(survey.started_at).to eql start_time
      expect(survey.ended_at).to eql end_time
    end
  end
end