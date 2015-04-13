require 'rails_helper'

RSpec.describe SurveysController, type: :controller do
  describe "GET /surveys/new" do
    it "responds with 200" do
      get :what
      expect(response).to be_success
      expect(response).to have_http_status 200
    end

    it "renders the what template" do
      get :what
      expect(response).to render_template :what
    end

    it "assigns a WhatStep" do
      get :what
      expect(assigns(:what_step)).to be_kind_of SurveysController::WhatStep
    end
  end

  describe "POST /surveys" do
    subject { post :create }
    let!(:current_user) { FactoryGirl.create(:mac) }

    it "redirects to edit survey who path" do
      subject
      expect(response).to redirect_to edit_survey_who_path(Survey.last.token)
      expect(response).to have_http_status 302
    end

    it "creates a Survey" do
      expect{ subject }.to change{ Survey.count }.by 1
    end

    it "adds the current user as a participant" do
      expect{ subject }.to change{ Survey::Participation.count }.by 1
      p = Survey::Participation.first
      expect(p.survey_id).to eql Survey.last.id
      expect(p.user_id).to eql current_user.id
      expect(p.role).to eql "submitter"
    end
  end

  describe "GET /surveys/:token/edit/who" do
    let(:survey) { Survey.create! }
    let!(:current_user) { FactoryGirl.create(:mac) }

    it "responds with 200" do
      get :who, token: survey.token
      expect(response).to be_success
      expect(response).to have_http_status 200
    end

    it "renders the who template" do
      get :who, token: survey.token
      expect(response).to render_template :who
    end

    it "assigns" do
      get :who, token: survey.token
      expect(assigns(:data_collectors)).to be_kind_of Array
      expect(assigns(:friends)).to be_kind_of Array
    end
  end

  describe "PUT /surveys/:token/friends" do
    subject { put :add_friend, token: survey.token, friend: { token: friend.token } }
    let(:survey) { Survey.create! }
    let(:friend) { FactoryGirl.create(:dee) }
    let!(:current_user) { FactoryGirl.create(:mac) }

    it "creates a participation" do
      expect{ subject }.to change{ Survey::Participation.count }.by 1
      p = Survey::Participation.first
      expect(p.user_id).to eql friend.id
      expect(p.survey_id).to eql survey.id
      expect(p.role).to eql "data_collector"
    end

    it "redirects to edit survey who path" do
      subject
      expect(response).to redirect_to edit_survey_who_path(survey.token)
      expect(response).to have_http_status 302
    end
  end

  describe "DELETE /surveys/:token/friend/:friend_token" do
    subject { delete :remove_friend, token: survey.token, friend_token: friend.token }
    let(:survey) { Survey.create! }
    let(:friend) { FactoryGirl.create(:dee) }
    let!(:current_user) { FactoryGirl.create(:mac) }
    before do
      Surveys::AddingFriend.execute!(friend, survey)
    end

    it "destroys the participation" do
      subject
      expect(Survey::Participation.where(survey_id: survey.id, user_id: friend.id).first).to eql nil
    end

    it "redirects to the edit survey who path" do
      subject
      expect(response).to redirect_to edit_survey_who_path(survey.token)
      expect(response).to have_http_status 302
    end
  end

  describe "GET /surveys/:token/edit/when" do
    let(:survey) { Survey.create!(started_at: started_at, ended_at: ended_at) }
    let(:started_at) { 3.days.ago }
    let(:ended_at) { 1.days.ago }

    it "responds with 200" do
      get :when, token: survey.token
      expect(response).to be_success
      expect(response).to have_http_status 200
    end

    it "renders the when template" do
      get :when, token: survey.token
      expect(response).to render_template :when
    end

    it "assigns a when model" do
      get :when, token: survey.token
      expect(assigns(:when_step)).to be_kind_of Surveys::AddingTimes::Model
      expect(assigns(:when_step).date).to eql started_at
      expect(assigns(:when_step).start_time).to eql started_at
      expect(assigns(:when_step).end_time).to eql ended_at
    end
  end

  describe "PUT /surveys/:token/edit/when" do
    subject { put :submit_when, token: survey.token, when: params }
    let(:survey) { Survey.create! }
    let(:params) do
      {
        "date(1i)" => date.year,
        "date(2i)" => date.month,
        "date(3i)" => date.day,
        "start_time(1i)" => start_time.year,
        "start_time(2i)" => start_time.month,
        "start_time(3i)" => start_time.day,
        "start_time(4i)" => start_time.hour,
        "start_time(5i)" => start_time.min,
        "end_time(1i)" => end_time.year,
        "end_time(2i)" => end_time.month,
        "end_time(3i)" => end_time.day,
        "end_time(4i)" => end_time.hour,
        "end_time(5i)" => end_time.min,
      }
    end
    let(:date) { DateTime.new.change(year: 2015, month: 4, day: 10) }
    let(:start_time) { DateTime.new.change(hour: 8, min: 34) }
    let(:end_time) { DateTime.new.change(hour: 8, min: 37) }

    it "assigns a when model with parameters from the request" do
      subject
      when_step = assigns(:when_step)
      expect(when_step).to be_kind_of Surveys::AddingTimes::Model
      expect(when_step.date.year).to eql 2015
      expect(when_step.date.month).to eql 4
      expect(when_step.date.day).to eql 10
      expect(when_step.start_time.hour).to eql 8
      expect(when_step.start_time.min).to eql 34
      expect(when_step.end_time.hour).to eql 8
      expect(when_step.end_time.min).to eql 37
    end

    it "updates the Survey" do
      subject
      survey.reload
      expect(survey.started_at.to_datetime.year).to eql 2015
      expect(survey.started_at.to_datetime.month).to eql 4
      expect(survey.started_at.to_datetime.day).to eql 10
      expect(survey.started_at.to_datetime.hour).to eql 8
      expect(survey.started_at.to_datetime.min).to eql 34

      expect(survey.ended_at.to_datetime.year).to eql 2015
      expect(survey.ended_at.to_datetime.month).to eql 4
      expect(survey.ended_at.to_datetime.day).to eql 10
      expect(survey.ended_at.to_datetime.hour).to eql 8
      expect(survey.ended_at.to_datetime.min).to eql 37
    end

    it "redirects to edit survey where path" do
      subject
      expect(response).to redirect_to edit_survey_where_path(token: survey.token)
      expect(response).to have_http_status 302
    end
  end

  describe "GET /surveys/:token/edit/where" do
    subject { get :where, token: survey.token }
    let(:survey) { Survey.create! }

    it "responds with 200" do
      subject
      expect(response).to be_success
      expect(response).to have_http_status 200
    end

    it "renders the what template" do
      subject
      expect(response).to render_template :where
    end

    it "assigns a WhatStep" do
      subject
      expect(assigns(:where_step)).to be_kind_of SurveysController::WhereStep
    end
  end

  describe "PUT /surveys/:token/edit/where" do
    subject { put :submit_where, token: survey.token, where: params }
    let(:survey) { Survey.create! }
    let(:params) { {} }

    it "assigns a where model with parameters from the request"

    # it "updates the Survey" do
    #   subject
    #   survey.reload
    #
    #   expect(survey.state_id).to eql 1
    #   expect(survey.beach_id).to eql 2
    # end

    it "redirects to edit survey where path" do
      subject
      expect(response).to redirect_to edit_survey_hub_path(token: survey.token)
      expect(response).to have_http_status 302
    end
  end
end