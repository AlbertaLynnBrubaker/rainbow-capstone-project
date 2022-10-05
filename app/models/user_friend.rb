class UserFriend < ApplicationRecord
  belongs_to :logged_user, class_name: "User"
  belongs_to :friend, class_name: "User"

  validates :logged_user_id, :friend_id, presence: true

  validate :friend_once

  def friend_once
    friends = User.find_by(id: self[:logged_user_id]).friends
    self.errors.add("A User can only friend another User once") if friends.find_by(id: self[:friend_id])
  end
end
