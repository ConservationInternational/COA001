# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)

require 'factory_girl'
require './spec/factories/users'

State.create(code: 'FL', name: 'Florida')
State.create(code: 'WA', name: 'Washington')

dee = FactoryGirl.create(:dee)
mac = FactoryGirl.create(:mac)
dennis = FactoryGirl.create(:dennis)
charlie = FactoryGirl.create(:charlie)
frank = FactoryGirl.create(:frank)

pub = [dee, mac, dennis, charlie, frank]

pub.each do |person|
  pub.each do |friend|
    MakingFriend.execute!(person, friend) unless person.id == friend.id
  end
end
