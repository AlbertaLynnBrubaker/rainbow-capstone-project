class UserFriend < ApplicationRecord
  belongs_to :logged_user, class_name: "User"
  belongs_to :friend, class_name: "User"
end
