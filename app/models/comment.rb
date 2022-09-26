class Comment < ApplicationRecord
  belongs_to :post
  belongs_to :user  

  has_one_attached :comment_image

  validates :content, presence: true

  def comment_image_url
    Rails.application.routes.url_helpers.url_for(comment_image) if comment_image.attached?
  end

  def user_avatar
    self.user.avatar_url
  end

  def commenter_avatar(user_id)
    u = User.find(user_id)
    u.avatar_url
  end

  def comment_data
    c = self
    comment = {comment: c, comment_image: c.comment_image, comment_image_url: c.comment_image_url, user: c.user, user_avatar: commenter_avatar(c.user.id)}
  end

end
