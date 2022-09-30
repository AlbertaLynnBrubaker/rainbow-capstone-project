class PostSerializer
  include JSONAPI::Serializer

  attributes :id, :content, :user, :user_avatar, :created_at, :image, :image_url, :group_data
end