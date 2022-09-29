class Membership < ApplicationRecord
  belongs_to :group
  belongs_to :user

  validates :group_id, :user_id, presence: true

  validate :one_member_per

  def one_member_per
    members = Group.find_by(id: self.group_id).memberships
    self.errors.add("A User can only be a member of a Group once") if members.find_by(user_id: self.user_id)
  end

  # def one_group_per
  #   self.errors.add("A Group can only have a User as a member once") if Membership.find_by(group_id: self.group_id)
  # end
end
