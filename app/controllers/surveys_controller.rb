class SurveysController < ApplicationController
  # Types
  # People
  # Timing
  # Conditions
  # Adding Data Types
  def new
    @survey = Survey.create
  end
end
