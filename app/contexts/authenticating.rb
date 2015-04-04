class Authenticating
  class << self
    def execute!(password, salt, hashed_password)
      hash(password, salt) == hashed_password
    end

    private

    def hash(password, salt)
      intermediate = password + pepper + salt
      Digest::SHA1.hexdigest(intermediate)
    end

    def pepper
      "aMRbgUVL0fTilT"
    end
  end
end