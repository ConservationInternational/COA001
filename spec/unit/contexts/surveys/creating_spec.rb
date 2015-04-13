require 'rails_helper'

RSpec.describe Surveys::Creating do
  # WARNING hits database
  describe ".execute!" do
    subject { Surveys::Creating.execute!(user) }
    let(:user) { FactoryGirl.create(:dennis) }

    it "creates a Survey" do
      expect(subject).to be_kind_of Survey
    end

    it "adds the user as a participant" do
      expect{ subject }.to change{ Survey::Participation.count }.by 1
      p = Survey::Participation.first
      expect(p.survey_id).to eql subject.id
      expect(p.user_id).to eql user.id
      expect(p.role).to eql "submitter"
    end
  end
end
