require 'rails_helper'

RSpec.describe Surveys::RemovingFriend do
  describe ".execute!" do
    subject { Surveys::RemovingFriend.execute!(friend, survey) }
    let(:friend) { FactoryGirl.build(:user, id: 1) }
    let(:survey) { Survey.new(id: 2) }
    let(:participation) { Survey::Participation.new(user_id: friend.id, survey_id: survey.id) }

    before do
      expect(Surveys::RemovingFriend).to receive(:participation).and_return participation
    end

    it "removes the friend from the survey" do
      expect_any_instance_of(Survey::Participation).to receive(:destroy)
      subject
    end
  end
end