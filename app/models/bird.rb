class Bird < ActiveRecord::Base
  enum found_location_type: %w(flt_unknown high wrack surf_line)
  enum foot_condition_type: %w(fct_unknown pliable stiff rotten missing_feet)
  enum eye_type: %w(et_unknown clear sunk gone head_missing)
  enum entanglement_type: %w(net fishing_line hook plastic other_man_made_substance)
  enum tie_location_type: %w(right_wing left_wing leg bill multiple)
  enum verification_method: %w(none measurement_and_photograph measurement photograph)

  TIE_COLORS = %w(none white red orange yellow dark_green blue gray brown purple black)
end
