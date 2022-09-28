class Post < ApplicationRecord
  belongs_to :user
  has_many :comments, dependent: :destroy

  has_one_attached :image, dependent: :purge_later

  validates :content, presence: true

  def image_url
    Rails.application.routes.url_helpers.url_for(image) if image.attached?
  end

  def user_avatar
    self.user.avatar_url
  end

  # def commenter_avatar(user_id)
  #   u = User.find(user_id)
  #   u.avatar_url
  # end

  # def comments_data
  #   comments = self.comments.order(:created_at)
  #   comments = comments.map do |c| {comment: c, comment_image: c.comment_image, comment_image_url: c.comment_image_url, user: c.user, user_avatar: commenter_avatar(c.user.id)} end
  # end

end


