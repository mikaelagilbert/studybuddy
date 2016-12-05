# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)

User.destroy_all
Building.destroy_all
Room.destroy_all
StudySpot.destroy_all

huntsman = Building.create(name: 'Huntsman', address: '3730 Locust Walk')
h1 = Room.create(name: '1st Floor Quiet Study Room', building_id: huntsman.id)
h2 = Room.create(name: '2nd Floor Quiet Study Room', building_id: huntsman.id)
(0..5).each do |i|
  StudySpot.create(is_open: true, room_id: h1.id)
end

(0..5).each do |i|
  StudySpot.create(is_open: true, room_id: h2.id)
end

van_pelt = Building.create(name: 'Van Pelt Library', address: '3420 Walnut St')

fisher_fine_arts = Building.create(name: 'Fisher Fine Arts Library', address: '220 S. 34th St')
f1 = Room.create(name: 'First Floor', building_id: fisher_fine_arts.id)

commons = Building.create(name: '1920 Commons', address: '3800 Locust Walk')
c1 = Room.create(name: 'Starbucks under Commons', building_id: commons.id)
c2 = Room.create(name: 'Amazon@Penn', building_id: commons.id)

annenberg = Building.create(name: 'Annenberg Library', address: '3620 Walnut St')

mcneil = Building.create(name: 'McNeil Building', address: '3718 Locust Walk')

williams = Building.create(name: 'Williams Library', address: '255 S. 36th St')

education_commons = Building.create(name: 'Education Commons', address: 'Smith Walk')
