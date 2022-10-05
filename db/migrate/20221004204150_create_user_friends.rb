class CreateUserFriends < ActiveRecord::Migration[7.0]
  def change
    create_table :user_friends do |t|
      t.integer :logged_user_id, foreign_key: true
      t.integer :friend_id, foreign_key: true
      
      t.timestamps
    end
  end
end
