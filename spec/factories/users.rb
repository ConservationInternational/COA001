FactoryGirl.define do
  factory :user do
    first_name "John"
    last_name  "Doe"
    email { "#{first_name}.#{last_name}@gmail.com" }
    hashed_password { Faker::Internet.password }
    salt { Faker::Internet.password }

    factory :dee do
      first_name "Dee"
      last_name "Reynolds"
      email "dee@paddyspub.com"
    end

    factory :mac do
      first_name "Mac"
      last_name "McDonald"
      email "mac@paddyspub.com"
    end

    factory :dennis do
      first_name "Dennis"
      last_name "Reynolds"
      email "dennis@paddyspub.com"
    end

    factory :charlie do
      first_name "Charlie"
      last_name "Day"
      email "charlie@paddyspub.com"
    end

    factory :frank do
      first_name "Frank"
      last_name "Reynolds"
      email "frank@paddyspub.com"
    end
  end
end