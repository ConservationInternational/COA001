class SurveysController < ApplicationController
  class WhatStep
    include ActiveModel::Model

    attr_accessor :beached_bird, :small_marine_debris, :medium_marine_debris, :large_marine_debris
  end

  class WhereStep
    include ActiveModel::Model

    attr_accessor :state, :beach, :weather, :surf, :oil, :comment
  end

  class WhoStep
    include ActiveModel::Model
  end

  # Step 1
  def what
    @what_step = WhatStep.new
  end

  def create
    @survey = Surveys::Creating.execute!(current_user)
    redirect_to edit_survey_who_path(token: @survey.token)
  end

  # Step 2
  def who
    @survey = Survey.where(token: params[:token]).first!
    @data_collectors = @survey.participants.sort_by { |f| f.full_name }
    @friends = (current_user.friends - @data_collectors).sort_by { |f| f.full_name }
  end

  def add_friend
    @survey = Survey.where(token: params[:token]).first!
    @friend = User.where(token: params[:friend][:token]).first!

    Surveys::AddingFriend.execute!(@friend, @survey)

    redirect_to edit_survey_who_path(token: @survey.token)
  end

  def remove_friend

  end

  # TODO(yu): remove this stub
  def current_user
    User.where(email: "mac@paddyspub.com").first
  end

  # Step 3
  def when
    @survey = Survey.where(token: params[:token]).first!
    @when_step = Surveys::AddingTimes::Model.new
  end

  def submit_when
    @survey = Survey.where(token: params[:token]).first!
    @when_step = Surveys::AddingTimes::Model.new(params[:when], true)
    Surveys::AddingTimes.execute!(@survey, @when_step).save!

    redirect_to edit_survey_where_path(token: @survey.token)
  end

  # Step 4
  def where
    @survey = Survey.where(token: params[:token]).first!
    @where_step = WhereStep.new
  end

  def submit_where
    @survey = Survey.where(token: params[:token]).first!

    redirect_to edit_survey_hub_path(token: @survey.token)
  end

  # Step 5
  def hub
    @survey = Survey.where(token: params[:token]).first!
  end
end
