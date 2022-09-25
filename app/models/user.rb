class User < ApplicationRecord
  has_secure_password

  has_many :posts
  has_many :comments, through: :posts

  has_one_attached :avatar

  validates :username, :email, :password, :password_confirmation, presence: true
  validates :username, uniqueness: true
  # validates :password, length: {minimum: 8}

  def avatar_url
    Rails.application.routes.url_helpers.url_for(avatar) if avatar.attached?
  end
end
