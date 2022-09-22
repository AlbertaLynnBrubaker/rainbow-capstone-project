class CommentSerializer
  include JSONAPI::Serializer
  attributes :id, :content, :post_id, :user_id
end
