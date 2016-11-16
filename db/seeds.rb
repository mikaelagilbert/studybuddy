# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)

Building.destroy_all
Room.destroy_all
StudySpot.destroy_all

huntsman = Building.create(name: 'Huntsman')
h1 = Room.create(name: '1st Floor Quiet Study Room', building_id: huntsman.id)
h2 = Room.create(name: '2nd Floor Quiet Study Room', building_id: huntsman.id)
huntsman.save

van_pelt = Building.create(name: 'Van Pelt Library')

fisher_fine_arts = Building.create(name: 'Fisher Fine Arts Library')
f1 = Room.create(name: 'First Floor', building_id: fisher_fine_arts.id)

commons = Building.create(name: '1920 Commons')
c1 = Room.create(name: 'Starbucks under Commons', building_id: commons.id)
c2 = Room.create(name: 'Amazon@Penn', building_id: commons.id)

annenberg = Building.create(name: 'Annenberg Library')

mcneil = Building.create(name: 'McNeil')

williams = Building.create(name: 'Williams Library')

fagin = Building.create(name: 'Claire M. Fagin Hall')