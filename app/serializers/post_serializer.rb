class PostSerializer
  include JSONAPI::Serializer

  attributes :id, :content, :comments_data, :user, :user_avatar, :created_at, :image, :image_url

  
end