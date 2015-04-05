require 'rails_helper'

RSpec.describe Fortress do
  describe ".validate!" do
    subject { schema.validate!(hash) }
    let(:schema) { Fortress.new(schema_hash) }
    let(:schema_hash) do
      {
        dee: dee,
        funny: funny
      }
    end
    let(:dee) { Fortress.string }
    let(:funny) { Fortress.boolean }

    context "when types mismatch" do
      let(:hash) { { dee: 1 }}
      it "raises an error" do
        expect{ subject }.to raise_error(Fortress::TypeMismatchError)
      end
    end

    context "when hash has keys not specified in the schema" do
      let(:hash) { { dee: "flying animal", charlie: "day man" } }
      it "raises an error" do
        expect{ subject }.to raise_error(Fortress::UnexpectedKeyError)
      end
    end

    context "when hash is missing a key" do
      let(:hash) { { dee: "flying animal" } }

      context "when missing key is not required" do
        it "returns true" do
          expect(subject).to eql true
        end
      end

      context "when missing key is required" do
        let(:funny) { Fortress.boolean.required }

        it "raises an error" do
          expect{ subject }.to raise_error(Fortress::MissingRequiredKeyError)
        end
      end
    end

    context "when hash matches schema" do
      let(:hash) { { dee: "flying animal", funny: true } }
      it "returns true" do
        expect(subject).to eql true
      end
    end

    context "when schema specifies valid options" do
      let(:dee) { Fortress.string.valid("Bird", "Dead Bird", "Big Bird") }

      context "when hash has invalid value" do
        let(:hash) { { dee: "flying animal" } }

        it "raises an error" do
          expect{ subject }.to raise_error(Fortress::InvalidValueError)
        end
      end

      context "when hash has valid value" do
        let(:hash) { { dee: "Dead Bird" } }

        it "returns true" do
          expect(subject).to eql true
        end
      end
    end
  end
end
