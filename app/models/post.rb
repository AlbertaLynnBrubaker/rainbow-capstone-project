class Post < ApplicationRecord
  belongs_to :user
  has_many :comments

  # def image_url
  #   Rails.application.routes.url_helpers.url_for(image) if image.attached?
  # end

end


