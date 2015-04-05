class CreatingBird
  class << self
    def execute!(params)
      if Fortress.new(bird_schema).validate!(params)
        Bird.create!(params)
      end
    end

    private

    def bird_schema
      {
        survey_token: Fortress.string.required,
        found_location_type: Fortress.string.valid(Bird.found_location_types.keys).required,
        foot_condition_type: Fortress.string.valid(Bird.foot_condition_types.keys).required,
        eye_type: Fortress.string.valid(Bird.eye_types.keys).required,
        entanglement_type: Fortress.string.valid(Bird.entanglement_types.keys),
        tie_location_type: Fortress.string.valid(Bird.tie_location_types.keys),
        closest_tie_color: Fortress.string.valid(Bird::TIE_COLORS),
        middle_tie_color: Fortress.string.valid(Bird::TIE_COLORS),
        farthest_tie_color: Fortress.string.valid(Bird::TIE_COLORS),
        verification_method: Fortress.string.valid(Bird.verification_methods.keys).required,
        refound: Fortress.boolean.required,
        collected: Fortress.boolean.required,
        oil: Fortress.boolean.required,
        comment: Fortress.string,
        collected_comment: Fortress.string,
        entanglement_comment: Fortress.string,
        oil_comment: Fortress.string,
        tie_location_comment: Fortress.string,
        verification_comment: Fortress.string,
      }
    end
  end
end
