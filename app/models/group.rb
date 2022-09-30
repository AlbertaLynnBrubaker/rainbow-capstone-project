class Group < ApplicationRecord
  has_many :memberships, dependent: :destroy
  has_many :users, through: :memberships

  has_many :posts

  has_one_attached :avatar, dependent: :purge_later

  validates :title, uniqueness: true

  def avatar_url
    Rails.application.routes.url_helpers.url_for(avatar) if avatar.attached?
  end

  def blurb
    "#{self.description[0..59]}..."
  end
end
