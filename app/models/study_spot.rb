# == Schema Information
#
# Table name: study_spots
#
#  id         :integer          not null, primary key
#  is_open    :boolean
#  room_id    :integer
#  created_at :datetime         not null
#  updated_at :datetime         not null
#  arduino_id :string
#

class StudySpot < ActiveRecord::Base
  validates :is_open, presence: true
  belongs_to :room

  attr_accessor :is_open
end
