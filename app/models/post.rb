class Post < ApplicationRecord
  belongs_to :user
  belongs_to :group, optional: true
  has_many :comments, dependent: :destroy

  has_one_attached :image, dependent: :purge_later

  validates :content, presence: true


  def image_url
    Rails.application.routes.url_helpers.url_for(image) if image.attached?
  end

  def user_avatar
    self.user.avatar_url
  end

  def group_data
    if(self.group)
      title = self.group.title
      avatar = self.group.avatar_url
      group_data = {title: title, avatar: avatar}
    end
  end
end


