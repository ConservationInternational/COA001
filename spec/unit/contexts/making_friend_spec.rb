require 'rails_helper'

RSpec.describe MakingFriend do
  describe ".execute!" do
    subject { MakingFriend.execute!(user, friend) }
    let(:user) { FactoryGirl.build(:user, id: 1) }
    let(:friend) { FactoryGirl.build(:user, id: 2) }

    before do
      expect_any_instance_of(User::Friendship).to receive(:save!).and_return true
    end

    it "makes a Friendship" do
      expect(subject).to be_kind_of User::Friendship
      expect(subject.user_id).to eql 1
      expect(subject.friend_id).to eql 2
      expect(subject.frequency).to eql 0
    end
  end
end