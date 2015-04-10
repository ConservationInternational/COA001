module Tokenable
  extend ActiveSupport::Concern

  included do
    before_save :set_token

    def set_token
      self.token = SecureRandom.uuid if token.nil?
    end
  end
end