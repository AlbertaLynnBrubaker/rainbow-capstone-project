class User < ApplicationRecord
  has_secure_password

  has_many :posts, dependent: :destroy
  has_many :comments, through: :posts
  has_many :memberships, dependent: :destroy
  has_many :groups, through: :memberships

  has_one_attached :avatar, dependent: :purge_later

  validates :username, :email, presence: true
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
