class User < ApplicationRecord
  has_secure_password

  has_many :posts
  has_many :comments, through: :posts

  has_one_attached :avatar

  validates :username, :email, :password, :password_confirmation, presence: true
  validates :username, uniqueness: true
  validates :username, format: { with: /\A[a-z0-9A-Z]+\z/ }
  validates :full_name, format: { with: /\A[a-zA-Z ]+\z/ }
  # validates :password, length: {minimum: 8}

  def avatar_url
    Rails.application.routes.url_helpers.url_for(avatar) if avatar.attached?
  end

  def first_name
    self.full_name.split(' ')[0]
  end
end
