require 'rails_helper'

RSpec.describe Authenticating, type: :context do
  subject { Authenticating.execute!(password, salt, hashed_password) }
  let(:salt) { "371024000.661984040026753" }
  let(:hashed_password) { "2b7ee684c4a65c870ce95d678a6794e200f6079e" }

  describe ".execute!" do
    context "when correct" do
      let(:password) { "sucker" }

      it "returns true" do
        expect(subject).to eql true
      end
    end

    context "when incorrect" do
      let(:password) { "notasucker" }

      it "returns false" do
        expect(subject).to eql false
      end
    end
  end
end
