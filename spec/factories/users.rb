FactoryGirl.define do
  factory :user do
    first_name "John"
    last_name  "Doe"
    email { "#{first_name}.#{last_name}@gmail.com" }

    factory :dee do
      first_name "Dee"
      last_name "Reynolds"
      email "dee@paddyspub.com"
    end
  end
end