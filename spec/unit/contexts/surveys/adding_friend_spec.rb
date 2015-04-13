require 'rails_helper'

RSpec.describe Surveys::AddingFriend do
  describe ".execute!" do
    subject { Surveys::AddingFriend.execute!(friend, survey) }
    let(:friend) { FactoryGirl.build(:user, id: 1) }
    let(:survey) { Survey.new(id: 2) }

    context "when avoiding database" do
      before do
        expect_any_instance_of(Survey::Participation).to receive(:save!)
      end

      it "adds the friend to the survey" do
        expect(subject).to be_kind_of Survey::Participation
        expect(subject.survey_id).to eql 2
        expect(subject.user_id).to eql 1
        expect(subject.travel_time).to eql nil
        expect(subject.role).to eql "data_collector"
      end
    end

    # WARNING hits database
    it "should be idempotent" do
      p = Surveys::AddingFriend.execute!(friend, survey)

      expect{ subject }.not_to change{ Survey::Participation }
      expect(subject.id).to eql p.id
    end
  end
end