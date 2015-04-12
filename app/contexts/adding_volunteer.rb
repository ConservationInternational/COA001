class AddingVolunteer
  class << self
    def execute!(params)
      # TODO(yu): when this is clearer
      # So this is a pain in the ass because the legacy codebase has some stupid ass shit
      # The `volunteers` table in the legacy codebase also includes rows with null email and null passwords.  They allow
      # you to create a `volunteer` that is effectively not in the system yet.
      #
      # 1. Should we store these external users in a different table, or ruin our `users` table to accommodate externals?
      # 2. If we do store them in a different table, do we need to track association data (ex: `volunteer_participations`)
      # 3. KYS
    end
  end
end
